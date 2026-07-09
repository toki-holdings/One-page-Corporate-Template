import contextlib
import http.server
import os
import re
import socket
import socketserver
import subprocess
import sys
import threading
import time
import urllib.error
import urllib.request
import webbrowser
from pathlib import Path
from urllib.parse import urlsplit


APP_DIR = Path(__file__).resolve().parent
HOST = "127.0.0.1"
START_PORT = 8787
URL_FILE_ARG = "--url-file="
SUPABASE_PROXY_PREFIX = "/__supabase"
START_PORT_ENV = "KAISHA_RAKU_START_PORT"


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "apikey, authorization, content-type, prefer")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
        super().end_headers()

    def log_message(self, format, *args):
        return

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        if self.path.startswith(SUPABASE_PROXY_PREFIX):
            self.handle_supabase_proxy()
            return
        super().do_GET()

    def do_POST(self):
        if self.path.startswith(SUPABASE_PROXY_PREFIX):
            self.handle_supabase_proxy()
            return
        self.send_error(404)

    def do_PATCH(self):
        if self.path.startswith(SUPABASE_PROXY_PREFIX):
            self.handle_supabase_proxy()
            return
        self.send_error(404)

    def do_DELETE(self):
        if self.path.startswith(SUPABASE_PROXY_PREFIX):
            self.handle_supabase_proxy()
            return
        self.send_error(404)

    def api_base_url(self):
        config_file = APP_DIR / "supabase-config.js"
        try:
            text = config_file.read_text(encoding="utf-8")
        except OSError:
            return ""
        match = re.search(r'url:\s*["\']([^"\']+)["\']', text)
        if not match:
            match = re.search(r'apiBase:\s*["\']([^"\']+)["\']', text)
        return match.group(1).rstrip("/") if match else ""

    def handle_supabase_proxy(self):
        base_url = self.api_base_url()
        if not base_url:
            self.send_json_error(500, "Cloud API URL is missing.")
            return
        split = urlsplit(self.path)
        upstream_path = split.path[len(SUPABASE_PROXY_PREFIX):] or "/"
        upstream_url = f"{base_url}{upstream_path}"
        if split.query:
            upstream_url = f"{upstream_url}?{split.query}"
        length = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(length) if length else None
        headers = {}
        for name in ("apikey", "authorization", "content-type", "prefer"):
            value = self.headers.get(name)
            if value:
                headers[name] = value
        request = urllib.request.Request(upstream_url, data=body, headers=headers, method=self.command)
        try:
            with urllib.request.urlopen(request, timeout=20) as response:
                data = response.read()
                self.send_response(response.status)
                self.send_header("Content-Type", response.headers.get("Content-Type", "application/json"))
                self.end_headers()
                self.wfile.write(data)
        except urllib.error.HTTPError as error:
            data = error.read()
            self.send_response(error.code)
            self.send_header("Content-Type", error.headers.get("Content-Type", "application/json"))
            self.end_headers()
            self.wfile.write(data)
        except Exception as error:
            self.send_json_error(502, f"Supabase connection failed: {error}")

    def send_json_error(self, status, message):
        payload = ('{"message": "%s"}' % str(message).replace("\\", "\\\\").replace('"', '\\"')).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(payload)


class LocalTCPServer(socketserver.TCPServer):
    allow_reuse_address = True


def free_port(start_port):
    for port in range(start_port, start_port + 50):
        with contextlib.closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                sock.bind((HOST, port))
            except OSError:
                continue
            return port
    raise RuntimeError("No free local port found.")


def main():
    has_app = (APP_DIR / "index.html").exists()
    has_admin = (APP_DIR / "admin.html").exists()
    page = "admin.html" if "--admin" in sys.argv and has_admin else "index.html"
    if not has_app and has_admin:
        page = "admin.html"
    url_file = ""
    for arg in sys.argv:
        if arg.startswith(URL_FILE_ARG):
            url_file = arg[len(URL_FILE_ARG):]
    start_port = int(os.environ.get(START_PORT_ENV) or START_PORT)
    port = free_port(start_port)
    handler = lambda *args, **kwargs: QuietHandler(*args, directory=str(APP_DIR), **kwargs)
    with LocalTCPServer((HOST, port), handler) as server:
        app_url = f"http://{HOST}:{port}/index.html" if has_app else ""
        admin_url = f"http://{HOST}:{port}/admin.html" if has_admin else ""
        url = f"http://{HOST}:{port}/{page}?v=20260710-cloud10"
        print("")
        print("会社ラク経営 is running locally.")
        if app_url:
            print(f"App: {app_url}")
        if admin_url:
            print(f"管理后台: {admin_url}")
        print("Close this window to stop the local app.")
        print("")
        if url_file:
            Path(url_file).write_text(url, encoding="utf-8")
        if os.environ.get("KAISHA_RAKU_NO_BROWSER") != "1":
            if os.environ.get("KAISHA_RAKU_SYSTEM_OPEN") == "1":
                threading.Timer(0.8, lambda: subprocess.Popen(["/usr/bin/open", url])).start()
            else:
                threading.Timer(0.8, lambda: webbrowser.open(url)).start()
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            time.sleep(0.1)


if __name__ == "__main__":
    main()
