const storageKey = "unique-ledger-admin-state";
const sessionKey = "unique-ledger-admin-current-user";
const sessionCompanyKey = "unique-ledger-admin-current-company";
const languageKey = "unique-ledger-admin-language";
const documentDbName = "unique-ledger-employee-documents";
const documentStoreName = "documents";
const employeeDocumentLimit = 100 * 1024 * 1024;
const actionTypes = ["入库", "出库", "退货入库", "调拨", "盘点", "损耗"];
const roles = ["老板", "管理员", "仓库", "店铺", "财务", "只读"];
const locationTypes = ["仓库", "店铺", "平台"];
const permissionModules = [
  ["dashboard", "总览"],
  ["products", "商品"],
  ["inventory", "库存"],
  ["sales", "销售"],
  ["marketplace", "会社ラク市場"],
  ["expenses", "费用成本"],
  ["employees", "员工"],
  ["wages", "工资"],
  ["transactions", "流水"],
  ["users", "权限"],
];
const permissionActions = [
  ["view", "查看"],
  ["edit", "新增/修改"],
  ["delete", "删除"],
  ["export", "导出/PDF"],
];
const defaultLogins = {
  u1: { loginId: "boss", password: "123456" },
  u2: { loginId: "warehouse", password: "123456" },
  u3: { loginId: "store", password: "123456" },
  u4: { loginId: "finance", password: "123456" },
};
const scopedCompanyKeys = [
  "users", "locations", "products", "batches", "transactions", "customers", "sales", "expenses", "wages",
  "marketplaceListings", "marketplaceInquiries", "marketplaceVerifications", "marketplaceReports",
];
const uiTranslations = {
  ja: {
    "经营库存后台": "業務・在庫・経営管理",
    "开发版后台": "業務管理システム",
    "语言": "言語",
    "总览": "ダッシュボード",
    "商品": "商品",
    "库存": "在庫",
    "销售": "販売",
    "会社ラク市場": "会社ラク市場",
    "费用成本": "費用・コスト",
    "员工": "社員",
    "工资": "給与",
    "流水": "履歴",
    "权限": "権限",
    "重置示例": "サンプル初期化",
    "导出 JSON": "JSON出力",
    "退出": "ログアウト",
    "登录": "ログイン",
    "唯一账本登录": "会社ラク経営 ログイン",
    "开发版默认社長ID：boss / 123456": "開発用社長ID：boss / 123456",
    "登录ID": "ログインID",
    "密码": "パスワード",
    "ID 或密码不正确。": "IDまたはパスワードが正しくありません。",
    "周期总费用": "期間費用合計",
    "销售-费用差额": "売上-費用差額",
    "销售额": "売上高",
    "商品数量": "商品数",
    "库存总件数": "在庫総数",
    "低库存商品": "低在庫商品",
    "最近流水": "最近の履歴",
    "各位置库存": "拠点別在庫",
    "临期批次": "期限間近ロット",
    "批次": "ロット",
    "到期": "期限",
    "动作": "操作",
    "数量": "数量",
    "位置": "拠点",
    "操作人": "担当者",
    "类型": "種別",
    "预警线": "アラート基準",
    "新增商品": "商品追加",
    "商品列表": "商品一覧",
    "SKU、条码、分类和预警线会用于库存联动": "SKU・バーコード・分類・アラート基準は在庫連動に利用します",
    "商品名": "商品名",
    "条码": "バーコード",
    "分类": "分類",
    "品牌": "ブランド",
    "规格": "規格",
    "库存预警线": "在庫アラート基準",
    "销售价": "販売価格",
    "商品图片": "商品画像",
    "条码图片": "バーコード画像",
    "保存商品": "商品を保存",
    "搜索商品、SKU、条码、分类": "商品・SKU・バーコード・分類を検索",
    "低库存": "低在庫",
    "正常": "正常",
    "编辑": "編集",
    "保存": "保存",
    "取消": "キャンセル",
    "暂无图片": "画像なし",
    "暂无条码图片": "バーコード画像なし",
    "更换图片": "画像変更",
    "更换条码图片": "バーコード画像変更",
    "删除图片": "画像削除",
    "删除条码图片": "バーコード画像削除",
    "当前库存": "現在庫",
    "库存状态": "在庫状態",
    "保存商品修改": "商品変更を保存",
    "产品列表": "商品一覧",
    "库存动作": "在庫操作",
    "入库": "入庫",
    "出库": "出庫",
    "退货入库": "返品入庫",
    "调拨": "移動",
    "盘点": "棚卸",
    "损耗": "ロス",
    "保存库存动作": "在庫操作を保存",
    "修改库存批次": "ロット在庫修正",
    "删除库存批次": "ロット削除",
    "批次库存": "ロット在庫",
    "新批次 / 不指定批次": "新規ロット / 指定なし",
    "来源位置": "移動元",
    "目标位置": "移動先",
    "数量 / 盘点后数量": "数量 / 棚卸後数量",
    "新批次号": "新規ロット番号",
    "备注：订单号、损耗原因、调拨说明等": "備考：注文番号・ロス理由・移動メモなど",
    "新增固定取引先": "固定取引先追加",
    "ToB固定取引先": "ToB固定取引先",
    "登録": "登録",
    "新增销售": "販売追加",
    "选择客户后，后续可用于請求書・納品書": "顧客を選択すると請求書・納品書に利用できます",
    "销售记录": "販売記録",
    "销售日期": "販売日",
    "客户": "顧客",
    "平台/店铺": "プラットフォーム/店舗",
    "员工": "社員",
    "销售数量": "販売数量",
    "销售单价（税抜）": "販売単価（税抜）",
    "税率 %": "税率 %",
    "税率": "税率",
    "平台手续费": "プラットフォーム手数料",
    "运费": "送料",
    "备注/注文番号・納品書番号など": "備考 / 注文番号・納品書番号など",
    "保存销售": "販売を保存",
    "剩余库存": "残在庫",
    "金额": "金額",
    "日期": "日付",
    "单价": "単価",
    "费用": "費用",
    "毛利": "粗利益",
    "总": "合計",
    "本位置": "この拠点",
    "請求書兼納品書": "請求書兼納品書",
    "請求書": "請求書",
    "納品書": "納品書",
    "周期总费用": "期間費用合計",
    "记账周期设置": "会計期間設定",
    "开始日期": "開始日",
    "结束日期": "終了日",
    "更新": "更新",
    "新增费用项目": "費用項目追加",
    "项目名可自定义，例如产品进价、物流费、办公室费用、人工费": "項目名は自由に設定できます。例：商品仕入、物流費、事務所費、人件費",
    "项目名": "項目名",
    "新项目名": "新規項目名",
    "没有时填写，会自动加入表格": "未登録の場合に入力すると自動で追加されます",
    "发生日期": "発生日",
    "金额（税込）": "金額（税込）",
    "备注": "備考",
    "保存费用": "費用を保存",
    "12个月费用成本表": "12か月費用表",
    "按项目名汇总，每个月一目了然": "項目別に集計し、月別の推移を確認できます",
    "合计": "合計",
    "月合计": "月合計",
    "明细": "明細",
    "新增员工": "社員追加",
    "员工管理": "社員管理",
    "员工人数": "社員数",
    "在职员工": "在籍社員",
    "默认基本給合計": "基本給合計",
    "工资记录": "給与記録",
    "自定义角色": "役割",
    "姓名": "氏名",
    "员工编号": "社員番号",
    "部门": "部署",
    "入职日期": "入社日",
    "基本工资": "基本給",
    "保险基准额": "標準報酬月額",
    "电话": "電話",
    "证件信息": "証明書情報",
    "证件截止日期": "証明書有効期限",
    "上传证件": "証明書アップロード",
    "保存员工": "社員を保存",
    "删除员工": "社員削除",
    "员工资料": "社員情報",
    "工资计算": "給与計算",
    "給与记录管理": "給与記録管理",
    "保存记录": "記録を保存",
    "导出PDF": "PDF出力",
    "本人負担 明細": "本人負担明細",
    "会社負担 明細": "会社負担明細",
    "公司总支出": "会社総支出",
    "个人负担": "本人負担",
    "新增账号": "アカウント追加",
    "创建后可设置登录ID、密码和权限": "作成後にログインID・パスワード・権限を設定できます",
    "姓名 / ID 名称": "氏名 / アカウント名",
    "角色": "役割",
    "老板": "社長",
    "管理员": "管理者",
    "仓库": "倉庫",
    "店铺": "店舗",
    "财务": "経理",
    "只读": "閲覧のみ",
    "保存账号": "アカウントを保存",
    "新增位置": "拠点追加",
    "仓库、店铺、平台都统一管理": "倉庫・店舗・プラットフォームを一元管理",
    "位置名称": "拠点名",
    "保存位置": "拠点を保存",
    "账号权限管理": "アカウント権限管理",
    "开发版密码保存在本机浏览器数据里": "開発版ではパスワードはこのブラウザ内に保存されます",
    "状态": "状態",
    "启用": "有効",
    "停用": "無効",
    "按角色重置权限": "役割の標準権限に戻す",
    "栏目": "メニュー",
    "查看": "表示",
    "新增/修改": "追加/編集",
    "删除": "削除",
    "导出/PDF": "出力/PDF",
    "保存权限": "権限を保存",
    "仓库 / 店铺 / 平台": "倉庫 / 店舗 / プラットフォーム",
    "搜索日期、客户、商品、平台、员工、备注": "日付・顧客・商品・プラットフォーム・担当者・備考を検索",
    "暂无数据": "データなし",
    "暂无商品": "商品なし",
    "暂无客户": "顧客なし",
    "未记录": "未記録",
    "未指定": "未指定",
    "未设置": "未設定",
    "恢复": "復元",
    "已删除工资记录": "削除済み給与記録",
    "1年内可恢复": "1年以内は復元できます",
    "平台": "プラットフォーム",
    "其他费用": "その他費用",
    "未知商品": "不明商品",
    "无图": "画像なし",
    "预警": "アラート",
    "售价": "販売価格",
    "入库、出库、退货、调拨、盘点、损耗": "入庫・出庫・返品入庫・移動・棚卸・ロス",
    "所有动作都会写入流水，库存数量自动联动": "すべての操作は履歴に記録され、在庫数と自動連動します",
    "入库/退货入库：选择商品和目标位置，可填写新批次。出库/损耗/盘点：优先选择现有批次。调拨：选择现有批次和目标位置。": "入庫/返品入庫：商品と入庫先を選択し、新規ロットも入力できます。出庫/ロス/棚卸：既存ロットを優先して選択します。移動：既存ロットと移動先を選択します。",
    "修正批次、位置、到期日和当前数量": "ロット・拠点・期限・現在数量を修正します",
    "正式版会改成归档；当前开发版会直接移除": "正式版ではアーカイブ方式に変更予定です。現在の開発版では直接削除します",
    "新批次号（留空不改）": "新規ロット番号（空欄なら変更なし）",
    "位置不变": "拠点変更なし",
    "当前数量（留空不改）": "現在数量（空欄なら変更なし）",
    "修改备注": "修正メモ",
    "删除原因": "削除理由",
    "删除批次": "ロット削除",
    "批次数量": "ロット数量",
    "商品总库存": "商品総在庫",
    "库存流水": "在庫履歴",
    "时间": "日時",
    "搜索动作、商品、位置、备注": "操作・商品・拠点・備考を検索",
    "暂无明细": "明細なし",
    "产品进价": "商品仕入",
    "物流费": "物流費",
    "办公室费用": "事務所費",
    "人工费": "人件費",
    "广告费": "広告費",
    "仓储费": "倉庫費",
    "参考销售数据": "販売データ参考",
    "平台销售": "プラットフォーム販売",
    "销售配送": "販売配送",
    "费用成本示例": "費用サンプル",
    "支払条件未設定": "支払条件未設定",
    "取引先を保存": "取引先を保存",
    "参考销售表：按商品、平台/店铺、数量和单价记录": "販売表を参考に、商品・プラットフォーム/店舗・数量・単価を記録します",
    "未设置SKU": "SKU未設定",
    "员工资料会作为工资计算的默认数据": "社員情報は給与計算の初期値として利用されます",
    "基本給是实际工资，保険基準額只用于保险计算": "基本給は実給与、保険基準額は保険計算のみに使用します",
    "默认基本給": "標準基本給",
    "默认保険基準額": "標準保険基準額",
    "员工を保存": "社員を保存",
    "编号未设": "社員番号未設定",
    "部门未设": "部署未設定",
    "在职/启用": "在籍/有効",
    "证件文件": "証明書ファイル",
    "证件容量": "証明書容量",
    "支持图片和 PDF，多文件总量不超过 100MB": "画像とPDFに対応。複数ファイル合計100MBまで保存できます",
    "个人工资记录": "個人給与記録",
    "老板权限：可删除员工": "社長権限：社員削除可",
    "只有老板可以删除员工": "社員削除は社長のみ可能です",
    "暂无员工": "社員なし",
    "暂无工资记录": "給与記録なし",
    "选择月份导出PDF": "月を選択してPDF出力",
    "月": "月",
    "支給総額": "支給総額",
    "本人控除合計": "本人控除合計",
    "差引支給額": "差引支給額",
    "删除记录": "記録削除",
    "暂无证件文件": "証明書ファイルなし",
    "文件": "ファイル",
    "下载": "ダウンロード",
    "給与計算を追加": "給与計算を追加",
    "支給、本人負担、会社負担を分けて入力": "支給・本人負担・会社負担を分けて入力します",
    "默认按刘的最新5月工资记录带出": "劉さんの最新5月給与記録を初期値にします",
    "保存记录": "記録を保存",
    "保存修改": "変更を保存",
    "删除工资记录": "給与記録削除",
    "删除时间：": "削除日時：",
    "默认会按选择的角色生成权限": "選択した役割に応じて標準権限を作成します",
    "名称": "名称",
    "未记录位置": "拠点未記録",
    "已过期": "期限切れ",
    "天后到期": "日後に期限",
    "无库存": "在庫なし",
    "临期": "期限間近",
    "证件文件总量不能超过 100MB。": "証明書ファイルの合計容量は100MBまでです。",
    "默认分类": "標準分類",
    "库存不足，仅自动出库": "在庫不足のため、自動出庫数は",
    "员工": "社員",
  },
  en: {
    "经营库存后台": "Business Inventory Admin",
    "开发版后台": "Development Admin",
    "语言": "Language",
    "总览": "Dashboard",
    "商品": "Products",
    "库存": "Inventory",
    "销售": "Sales",
    "费用成本": "Costs",
    "员工": "Employees",
    "工资": "Payroll",
    "流水": "History",
    "权限": "Permissions",
    "重置示例": "Reset Demo",
    "导出 JSON": "Export JSON",
    "退出": "Log out",
    "登录": "Login",
    "唯一账本登录": "Unique Ledger Login",
    "开发版默认社長ID：boss / 123456": "Dev president ID: boss / 123456",
    "登录ID": "Login ID",
    "密码": "Password",
    "ID 或密码不正确。": "Incorrect ID or password.",
    "周期总费用": "Period Costs",
    "销售-费用差额": "Sales - Costs",
    "销售额": "Sales",
    "商品数量": "Products",
    "库存总件数": "Stock Units",
    "低库存商品": "Low Stock",
    "最近流水": "Recent History",
    "各位置库存": "Stock by Location",
    "临期批次": "Expiring Batches",
    "新增销售": "Add Sale",
    "销售记录": "Sales Records",
    "销售日期": "Sale Date",
    "客户": "Customer",
    "平台/店铺": "Platform/Store",
    "销售数量": "Quantity",
    "剩余库存": "Remaining Stock",
    "税率": "Tax",
    "金额": "Amount",
    "保存销售": "Save Sale",
    "新增费用项目": "Add Cost Item",
    "项目名": "Item",
    "新项目名": "New Item",
    "发生日期": "Date",
    "金额（税込）": "Amount (Tax incl.)",
    "备注": "Note",
    "保存费用": "Save Cost",
    "记账周期设置": "Period Settings",
    "开始日期": "Start Date",
    "结束日期": "End Date",
    "更新": "Update",
    "12个月费用成本表": "12-Month Cost Table",
    "合计": "Total",
    "月合计": "Monthly Total",
    "明细": "Details",
    "删除": "Delete",
    "新增商品": "Add Product",
    "商品列表": "Product List",
    "商品名": "Product Name",
    "条码": "Barcode",
    "分类": "Category",
    "品牌": "Brand",
    "规格": "Spec",
    "销售价": "Price",
    "保存商品": "Save Product",
    "编辑": "Edit",
    "库存动作": "Inventory Action",
    "批次库存": "Batch Stock",
    "保存库存动作": "Save Inventory Action",
    "新增账号": "Add Account",
    "账号权限管理": "Account Permissions",
    "查看": "View",
    "新增/修改": "Add/Edit",
    "导出/PDF": "Export/PDF",
    "保存权限": "Save Permissions",
  },
  ko: {
    "语言": "언어", "总览": "대시보드", "商品": "상품", "库存": "재고", "销售": "판매", "费用成本": "비용", "员工": "직원", "工资": "급여", "流水": "기록", "权限": "권한", "登录": "로그인", "退出": "로그아웃", "销售额": "매출", "保存销售": "판매 저장", "保存费用": "비용 저장", "删除": "삭제", "编辑": "편집"
  },
  es: {
    "语言": "Idioma", "总览": "Panel", "商品": "Productos", "库存": "Inventario", "销售": "Ventas", "费用成本": "Costos", "员工": "Empleados", "工资": "Nómina", "流水": "Historial", "权限": "Permisos", "登录": "Iniciar sesión", "退出": "Salir", "销售额": "Ventas", "保存销售": "Guardar venta", "保存费用": "Guardar costo", "删除": "Eliminar", "编辑": "Editar"
  },
  fr: {
    "语言": "Langue", "总览": "Tableau de bord", "商品": "Produits", "库存": "Stock", "销售": "Ventes", "费用成本": "Costs", "员工": "Employés", "工资": "Payroll", "流水": "Historique", "权限": "Permissions", "登录": "Connexion", "退出": "Déconnexion", "销售额": "Ventes", "保存销售": "Enregistrer vente", "保存费用": "Enregistrer coût", "删除": "Supprimer", "编辑": "Modifier", "查看": "Voir", "新增/修改": "Ajouter/Modifier", "导出/PDF": "Export/PDF"
  },
  de: {
    "语言": "Sprache", "总览": "Dashboard", "商品": "Produkte", "库存": "Bestand", "销售": "Verkauf", "费用成本": "Costs", "员工": "Mitarbeiter", "工资": "Payroll", "流水": "Historie", "权限": "Berechtigungen", "登录": "Anmelden", "退出": "Abmelden", "销售额": "Umsatz", "保存销售": "Verkauf speichern", "保存费用": "Kosten speichern", "删除": "Löschen", "编辑": "Bearbeiten", "查看": "Ansehen", "新增/修改": "Hinzufügen/Bearbeiten", "导出/PDF": "Export/PDF"
  },
  pt: {
    "语言": "Idioma", "总览": "Painel", "商品": "Produtos", "库存": "Estoque", "销售": "Vendas", "费用成本": "Costs", "员工": "Funcionários", "工资": "Payroll", "流水": "Histórico", "权限": "Permissões", "登录": "Entrar", "退出": "Sair", "销售额": "Vendas", "保存销售": "Salvar venda", "保存费用": "Salvar custo", "删除": "Excluir", "编辑": "Editar", "查看": "Ver", "新增/修改": "Adicionar/Editar", "导出/PDF": "Export/PDF"
  },
  it: {
    "语言": "Lingua", "总览": "Dashboard", "商品": "Prodotti", "库存": "Inventario", "销售": "Vendite", "费用成本": "Costs", "员工": "Dipendenti", "工资": "Payroll", "流水": "Storico", "权限": "Permessi", "登录": "Login", "退出": "Esci", "销售额": "Vendite", "保存销售": "Salva vendita", "保存费用": "Salva costo", "删除": "Elimina", "编辑": "Modifica", "查看": "Visualizza", "新增/修改": "Aggiungi/Modifica", "导出/PDF": "Export/PDF"
  },
  id: {
    "语言": "Bahasa", "总览": "Dashboard", "商品": "Produk", "库存": "Stok", "销售": "Penjualan", "费用成本": "Costs", "员工": "Karyawan", "工资": "Payroll", "流水": "Riwayat", "权限": "Izin", "登录": "Masuk", "退出": "Keluar", "销售额": "Penjualan", "保存销售": "Simpan penjualan", "保存费用": "Simpan biaya", "删除": "Hapus", "编辑": "Edit", "查看": "Lihat", "新增/修改": "Tambah/Edit", "导出/PDF": "Export/PDF"
  },
  th: {
    "语言": "ภาษา", "总览": "Dashboard", "商品": "สินค้า", "库存": "Stock", "销售": "Sales", "费用成本": "Costs", "员工": "พนักงาน", "工资": "Payroll", "流水": "History", "权限": "สิทธิ์", "登录": "เข้าสู่ระบบ", "退出": "ออกจากระบบ", "销售额": "Sales", "保存销售": "Save Sale", "保存费用": "Save Cost", "删除": "ลบ", "编辑": "แก้ไข", "查看": "ดู", "新增/修改": "Add/Edit", "导出/PDF": "Export/PDF"
  },
  vi: {
    "语言": "Ngôn ngữ", "总览": "Dashboard", "商品": "Sản phẩm", "库存": "Tồn kho", "销售": "Bán hàng", "费用成本": "Costs", "员工": "Nhân viên", "工资": "Payroll", "流水": "Lịch sử", "权限": "Quyền", "登录": "Đăng nhập", "退出": "Đăng xuất", "销售额": "Doanh số", "保存销售": "Lưu bán hàng", "保存费用": "Lưu chi phí", "删除": "Xóa", "编辑": "Sửa", "查看": "Xem", "新增/修改": "Thêm/Sửa", "导出/PDF": "Export/PDF"
  },
  ar: {
    "语言": "اللغة", "总览": "Dashboard", "商品": "Products", "库存": "Stock", "销售": "Sales", "费用成本": "Costs", "员工": "Employees", "工资": "Payroll", "流水": "History", "权限": "Permissions", "登录": "تسجيل الدخول", "退出": "تسجيل الخروج", "销售额": "Sales", "保存销售": "Save Sale", "保存费用": "Save Cost", "删除": "حذف", "编辑": "تعديل", "查看": "عرض", "新增/修改": "Add/Edit", "导出/PDF": "Export/PDF"
  },
  hi: {
    "语言": "भाषा", "总览": "Dashboard", "商品": "Products", "库存": "Stock", "销售": "Sales", "费用成本": "Costs", "员工": "Employees", "工资": "Payroll", "流水": "History", "权限": "Permissions", "登录": "लॉगिन", "退出": "लॉगआउट", "销售额": "Sales", "保存销售": "Save Sale", "保存费用": "Save Cost", "删除": "हटाएँ", "编辑": "संपादित करें", "查看": "देखें", "新增/修改": "Add/Edit", "导出/PDF": "Export/PDF"
  },
  ru: {
    "语言": "Язык", "总览": "Dashboard", "商品": "Товары", "库存": "Склад", "销售": "Продажи", "费用成本": "Costs", "员工": "Сотрудники", "工资": "Payroll", "流水": "История", "权限": "Права", "登录": "Вход", "退出": "Выход", "销售额": "Продажи", "保存销售": "Сохранить продажу", "保存费用": "Сохранить Cost", "删除": "Удалить", "编辑": "Редактировать", "查看": "Просмотр", "新增/修改": "Добавить/Изменить", "导出/PDF": "Export/PDF"
  },
};

const seedState = {
  accountUsers: [
    {
      id: "au1",
      phoneNumber: "",
      displayName: "社長ID",
      email: "boss@example.co.jp",
      avatarUrl: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLoginAt: "",
    },
  ],
  companies: [
    {
      id: "company-1",
      companyName: "会社ラク経営株式会社",
      companyType: "法人",
      corporateNumber: "1234567890123",
      address: "東京都千代田区サンプル1-1-1",
      phone: "03-0000-0000",
      email: "info@example.co.jp",
      logoUrl: "",
      ownerUserId: "au1",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  companyMembers: [
    {
      id: "cm1",
      companyId: "company-1",
      userId: "au1",
      phoneNumber: "",
      role: "老板",
      status: "active",
      invitedByUserId: "",
      joinedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      permissions: rolePermissions("老板"),
    },
  ],
  companyInvitations: [],
  emailVerificationCodes: [],
  emailChangeLogs: [],
  activityLogs: [],
  users: [
    { id: "u1", name: "社長ID", role: "老板", active: true, employeeNo: "A001", department: "経営", joinedAt: "", baseSalary: 0, standardSalary: 0, phone: "", documentExpires: "", documents: [], note: "管理者アカウント" },
    { id: "u2", name: "仓库账号", role: "仓库", active: true, employeeNo: "W001", department: "倉庫", joinedAt: "", baseSalary: 0, standardSalary: 0, phone: "", documentExpires: "", documents: [], note: "" },
    { id: "u3", name: "山田太郎", role: "店铺", active: true, employeeNo: "E001", department: "店舗", joinedAt: "2026-04-01", baseSalary: 250000, standardSalary: 260000, phone: "", documentExpires: "", documents: [], note: "給与サンプル：基本給25万、保険基準額26万" },
    { id: "u4", name: "鈴木花子", role: "财务", active: true, employeeNo: "E002", department: "財務", joinedAt: "2026-04-01", baseSalary: 320000, standardSalary: 320000, phone: "", documentExpires: "", documents: [], note: "給与サンプル" },
  ],
  locations: [
    { id: "l1", name: "東京本倉庫", type: "仓库" },
    { id: "l2", name: "大阪店舗", type: "店铺" },
    { id: "l3", name: "ECプラットフォーム", type: "平台" },
  ],
  products: [
    { id: "p1", name: "サンプル商品 A", sku: "SKU-001", barcode: "490000000001", category: "標準分類", brand: "会社ラク経営", spec: "標準規格", warning: 10, cost: 1200, price: 1980 },
    { id: "p2", name: "サンプル商品 B", sku: "SKU-002", barcode: "490000000002", category: "標準分類", brand: "会社ラク経営", spec: "小包装", warning: 8, cost: 800, price: 1480 },
  ],
  batches: [
    { id: "b1", productId: "p1", locationId: "l1", code: "BATCH-202607", produced: "2026-07-01", expires: "2026-12-31", quantity: 36, note: "初期ロット" },
    { id: "b2", productId: "p2", locationId: "l2", code: "BATCH-202608", produced: "2026-07-01", expires: "2026-10-31", quantity: 7, note: "店舗サンプル" },
  ],
  transactions: [
    { id: "t1", action: "入库", productId: "p1", batchId: "b1", from: "", to: "l1", quantity: 36, operatorId: "u1", at: new Date().toISOString(), note: "初期在庫" },
    { id: "t2", action: "入库", productId: "p2", batchId: "b2", from: "", to: "l2", quantity: 7, operatorId: "u1", at: new Date().toISOString(), note: "初期在庫" },
  ],
  customers: [
    {
      id: "c1",
      name: "株式会社サンプル商事",
      kana: "サンプルショウジ",
      contact: "田中様",
      email: "billing@example.co.jp",
      phone: "03-0000-0000",
      postalCode: "100-0001",
      address: "東京都千代田区サンプル1-1-1",
      invoiceTitle: "株式会社サンプル商事 御中",
      closingDay: "月末締め",
      paymentTerm: "翌月末払い",
      deliveryAddress: "同上",
      note: "ToB固定取引先サンプル",
    },
    {
      id: "c2",
      name: "ロッテ免税店",
      kana: "ロッテメンゼイテン",
      contact: "仕入担当者様",
      email: "",
      phone: "",
      postalCode: "",
      address: "",
      invoiceTitle: "ロッテ免税店 御中",
      closingDay: "都度請求",
      paymentTerm: "請求書発行後30日以内",
      deliveryAddress: "",
      note: "販売表参考先",
    },
  ],
  sales: [
    { id: "s1", date: new Date().toISOString().slice(0, 10), customerId: "c2", productId: "p1", locationId: "l3", staffId: "u1", quantity: 2, unitPrice: 15000, platformFee: 1200, shipping: 800, note: "参考销售数据" },
  ],
  expenses: [
    { id: "e1", date: new Date().toISOString().slice(0, 10), category: "物流费", vendor: "ヤマト運輸", amount: 800, taxRate: 10, paymentMethod: "現金", relatedTo: "销售配送", note: "费用成本示例" },
    { id: "e2", date: new Date().toISOString().slice(0, 10), category: "平台手续费", vendor: "EC平台", amount: 1200, taxRate: 10, paymentMethod: "カード", relatedTo: "平台销售", note: "费用成本示例" },
  ],
  marketplaceListings: [],
  marketplaceInquiries: [],
  marketplaceVerifications: [
    {
      id: "mv1",
      userId: "au1",
      companyId: "company-1",
      verificationType: "seller",
      legalName: "会社ラク経営株式会社",
      corporateNumber: "1234567890123",
      representativeName: "社長ID",
      address: "東京都千代田区サンプル1-1-1",
      phone: "03-0000-0000",
      email: "info@example.co.jp",
      identityDocumentUrl: "",
      licenseDocumentUrl: "",
      antiSocialCheck: true,
      status: "approved",
      rejectionReason: "",
      reviewedBy: "u1",
      reviewedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  marketplaceReports: [],
  marketplaceSettings: {
    membershipPlan: "Free",
    listingLimits: { Free: 1, VIP: 10, SVIP: "unlimited" },
    prohibitedCategories: ["医薬品", "処方薬", "無許可医療機器", "偽ブランド", "違法品"],
    sensitiveWords: ["絶対治る", "癌に効く", "医薬品級", "偽物", "コピー品", "永久保証"],
  },
  marketplaceFavorites: [],
  expensePeriod: {
    start: `${new Date().getFullYear()}-01-01`,
    end: `${new Date().getFullYear()}-12-31`,
  },
  wages: [
    {
      id: "w1",
      month: "2026-07",
      employeeId: "u3",
      baseSalary: 250000,
      standardSalary: 260000,
      overtimePay: 0,
      commutingAllowance: 0,
      otherAllowance: 0,
      employeeHealthInsuranceRate: 4.925,
      employeeHealthInsurance: 12805,
      employeeCareInsuranceRate: 0,
      employeeCareInsurance: 0,
      employeePensionRate: 9.15,
      employeePension: 23790,
      employeeEmploymentInsuranceRate: 0.5,
      employeeEmploymentInsurance: 1250,
      incomeTax: 1250,
      residentTax: 3340,
      otherEmployeeDeduction: 0,
      companyHealthInsuranceRate: 4.925,
      companyHealthInsurance: 12805,
      companyCareInsuranceRate: 0,
      companyCareInsurance: 0,
      companyPensionRate: 9.15,
      companyPension: 23790,
      companyEmploymentInsuranceRate: 1.35,
      companyEmploymentInsurance: 3375,
      workersCompInsuranceRate: 0.3,
      workersCompInsurance: 750,
      childCareContributionRate: 0.36,
      childCareContribution: 900,
      childCareSupportRate: 0.23,
      childCareSupport: 598,
      otherCompanyCost: 0,
      note: "25万給与サンプル",
    },
    {
      id: "w2",
      month: "2026-07",
      employeeId: "u4",
      baseSalary: 320000,
      standardSalary: 320000,
      overtimePay: 25000,
      commutingAllowance: 15000,
      otherAllowance: 5000,
      employeeHealthInsuranceRate: 5.125,
      employeeHealthInsurance: 16400,
      employeeCareInsuranceRate: 0,
      employeeCareInsurance: 0,
      employeePensionRate: 9.15,
      employeePension: 29280,
      employeeEmploymentInsuranceRate: 0.5,
      employeeEmploymentInsurance: 1825,
      incomeTax: 4200,
      residentTax: 7600,
      otherEmployeeDeduction: 0,
      companyHealthInsuranceRate: 5.125,
      companyHealthInsurance: 16400,
      companyCareInsuranceRate: 0,
      companyCareInsurance: 0,
      companyPensionRate: 9.15,
      companyPension: 29280,
      companyEmploymentInsuranceRate: 1.35,
      companyEmploymentInsurance: 4928,
      workersCompInsuranceRate: 0.3,
      workersCompInsurance: 1095,
      childCareContributionRate: 0.375,
      childCareContribution: 1200,
      childCareSupportRate: 0.23,
      childCareSupport: 736,
      otherCompanyCost: 0,
      note: "32万給与サンプル",
    },
  ],
};

let rawState = normalizeState(loadState());
let currentView = "dashboard";
let currentUserId = sessionStorage.getItem(sessionKey) || "";
let currentCompanyId = sessionStorage.getItem(sessionCompanyKey) || "";
let currentLanguage = localStorage.getItem(languageKey) || "ja";
let marketplaceDraftProductId = "";
let deferredInstallPrompt = null;
let state = createScopedState(rawState);

function viewFromHash() {
  const view = location.hash.replace(/^#/, "");
  return permissionModules.some(([module]) => module === view) ? view : "";
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || structuredClone(seedState);
  } catch {
    return structuredClone(seedState);
  }
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function itemCompanyId(item = {}) {
  return item.companyId || item.company_id || item.sellerCompanyId || item.seller_company_id || "";
}

function withCurrentCompany(item) {
  if (item && typeof item === "object" && currentCompanyId && !itemCompanyId(item)) {
    item.companyId = currentCompanyId;
  }
  return item;
}

function scopedArray(rawItems, key) {
  const raw = Array.isArray(rawItems) ? rawItems : [];
  const filteredEntries = () => raw
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !currentCompanyId || itemCompanyId(item) === currentCompanyId);
  const filtered = () => filteredEntries().map(({ item }) => item);
  return new Proxy([], {
    get(_target, prop) {
      if (prop === "length") return filteredEntries().length;
      if (prop === Symbol.iterator) return filtered()[Symbol.iterator].bind(filtered());
      if (prop === "toJSON") return () => filtered();
      if (prop === "push") return (...items) => raw.push(...items.map(withCurrentCompany));
      if (prop === "unshift") return (...items) => raw.unshift(...items.map(withCurrentCompany));
      if (prop === "splice") {
        return (start, deleteCount, ...items) => {
          const entries = filteredEntries();
          const rawStart = entries[start]?.index ?? raw.length;
          return raw.splice(rawStart, deleteCount, ...items.map(withCurrentCompany));
        };
      }
      if (prop === "findIndex") return (callback) => filtered().findIndex(callback);
      if (prop === "sort") return (callback) => filtered().sort(callback);
      if (["map", "filter", "reduce", "reduceRight", "find", "some", "every", "forEach", "slice", "includes"].includes(prop)) {
        return (...args) => filtered()[prop](...args);
      }
      if (!Number.isNaN(Number(prop))) return filteredEntries()[Number(prop)]?.item;
      return filtered()[prop];
    },
    set(_target, prop, value) {
      if (!Number.isNaN(Number(prop))) {
        const entry = filteredEntries()[Number(prop)];
        if (entry) raw[entry.index] = withCurrentCompany(value);
        return true;
      }
      raw[prop] = value;
      return true;
    },
    ownKeys() {
      return Reflect.ownKeys(filtered());
    },
    getOwnPropertyDescriptor(_target, prop) {
      return Object.getOwnPropertyDescriptor(filtered(), prop);
    },
  });
}

function createScopedState(raw) {
  return new Proxy(raw, {
    get(target, prop) {
      if (scopedCompanyKeys.includes(prop) && currentCompanyId) return scopedArray(target[prop], prop);
      return target[prop];
    },
    set(target, prop, value) {
      if (scopedCompanyKeys.includes(prop) && currentCompanyId && Array.isArray(value)) {
        const otherCompanyItems = (target[prop] || []).filter((item) => itemCompanyId(item) !== currentCompanyId);
        target[prop] = [...otherCompanyItems, ...value.map(withCurrentCompany)];
        return true;
      }
      target[prop] = value;
      return true;
    },
  });
}

function blankPermissions() {
  return Object.fromEntries(permissionModules.map(([module]) => [
    module,
    Object.fromEntries(permissionActions.map(([action]) => [action, false])),
  ]));
}

function normalizePermissions(value = {}) {
  const normalized = blankPermissions();
  permissionModules.forEach(([module]) => {
    permissionActions.forEach(([action]) => {
      normalized[module][action] = Boolean(value?.[module]?.[action]);
    });
  });
  return normalized;
}

function allowModule(permissions, module, actions = ["view"]) {
  actions.forEach((action) => {
    permissions[module][action] = true;
  });
}

function rolePermissions(role) {
  const permissions = blankPermissions();
  const allActions = permissionActions.map(([action]) => action);
  if (role === "老板") {
    permissionModules.forEach(([module]) => allowModule(permissions, module, allActions));
    return permissions;
  }
  if (role === "管理员") {
    permissionModules.forEach(([module]) => allowModule(permissions, module, ["view", "edit", "export"]));
    ["products", "inventory", "sales", "marketplace", "expenses"].forEach((module) => allowModule(permissions, module, ["delete"]));
    return permissions;
  }
  if (role === "仓库") {
    ["dashboard", "products", "inventory", "marketplace", "transactions"].forEach((module) => allowModule(permissions, module, ["view"]));
    ["inventory", "products"].forEach((module) => allowModule(permissions, module, ["edit"]));
    return permissions;
  }
  if (role === "店铺") {
    ["dashboard", "products", "inventory", "sales", "marketplace"].forEach((module) => allowModule(permissions, module, ["view"]));
    allowModule(permissions, "sales", ["edit", "export"]);
    allowModule(permissions, "marketplace", ["edit"]);
    return permissions;
  }
  if (role === "财务") {
    ["dashboard", "sales", "expenses", "employees", "wages", "marketplace", "transactions"].forEach((module) => allowModule(permissions, module, ["view"]));
    ["sales", "expenses", "wages"].forEach((module) => allowModule(permissions, module, ["edit", "export"]));
    return permissions;
  }
  permissionModules.forEach(([module]) => allowModule(permissions, module, ["view"]));
  return permissions;
}

function normalizeState(value) {
  const normalized = { ...structuredClone(seedState), ...value };
  normalized.accountUsers = (normalized.accountUsers || []).map((item) => ({
    id: item.id || uid("au"),
    phoneNumber: item.phoneNumber || item.phone_number || "",
    displayName: item.displayName || item.display_name || item.name || item.email || "",
    email: normalizeEmail(item.email || item.phoneNumber || item.phone_number || ""),
    avatarUrl: item.avatarUrl || item.avatar_url || "",
    createdAt: item.createdAt || item.created_at || new Date().toISOString(),
    updatedAt: item.updatedAt || item.updated_at || new Date().toISOString(),
    lastLoginAt: item.lastLoginAt || item.last_login_at || "",
  }));
  if (!normalized.accountUsers.length) normalized.accountUsers = structuredClone(seedState.accountUsers || []);
  normalized.companies = (normalized.companies || []).map((item) => ({
    id: item.id || uid("company"),
    companyName: item.companyName || item.company_name || "会社名未設定",
    companyType: item.companyType || item.company_type || "",
    corporateNumber: item.corporateNumber || item.corporate_number || "",
    address: item.address || "",
    phone: item.phone || "",
    email: item.email || "",
    logoUrl: item.logoUrl || item.logo_url || "",
    ownerUserId: item.ownerUserId || item.owner_user_id || normalized.accountUsers[0]?.id || "",
    status: item.status || "active",
    createdAt: item.createdAt || item.created_at || new Date().toISOString(),
    updatedAt: item.updatedAt || item.updated_at || new Date().toISOString(),
  }));
  if (!normalized.companies.length) normalized.companies = structuredClone(seedState.companies || []);
  const defaultCompanyId = normalized.companies[0]?.id || "company-1";
  const defaultAccountUserId = normalized.accountUsers[0]?.id || "au1";
  normalized.companyMembers = (normalized.companyMembers || []).map((item) => {
    const role = item.role || "老板";
    return {
      id: item.id || uid("cm"),
      companyId: item.companyId || item.company_id || defaultCompanyId,
      userId: item.userId || item.user_id || defaultAccountUserId,
      phoneNumber: item.phoneNumber || item.phone_number || "",
      role,
      status: item.status || "active",
      invitedByUserId: item.invitedByUserId || item.invited_by_user_id || "",
      joinedAt: item.joinedAt || item.joined_at || new Date().toISOString(),
      createdAt: item.createdAt || item.created_at || new Date().toISOString(),
      updatedAt: item.updatedAt || item.updated_at || new Date().toISOString(),
      permissions: normalizePermissions(item.permissions || rolePermissions(role)),
    };
  });
  if (!normalized.companyMembers.length) normalized.companyMembers = structuredClone(seedState.companyMembers || []);
  normalized.companyInvitations = normalized.companyInvitations || [];
  normalized.emailVerificationCodes = normalized.emailVerificationCodes || [];
  normalized.emailChangeLogs = normalized.emailChangeLogs || [];
  normalized.activityLogs = normalized.activityLogs || [];
  normalized.users = (normalized.users || []).map((item) => {
    const seedUser = seedState.users.find((user) => user.id === item.id || user.name === item.name) || {};
    const role = item.role || seedUser.role || "只读";
    const basePermissions = normalizePermissions(item.permissions || rolePermissions(role));
    if (!item.permissions?.marketplace) basePermissions.marketplace = rolePermissions(role).marketplace;
    return {
      employeeNo: "",
      department: "",
      joinedAt: "",
      baseSalary: 0,
      standardSalary: Number(item.standardSalary ?? item.baseSalary ?? seedUser.standardSalary ?? seedUser.baseSalary ?? 0),
      phone: "",
      email: "",
      documentExpires: "",
      documents: [],
      note: "",
      active: true,
      companyId: item.companyId || item.company_id || defaultCompanyId,
      ...seedUser,
      ...item,
      loginId: item.loginId || defaultLogins[item.id]?.loginId || "",
      password: item.password || defaultLogins[item.id]?.password || "123456",
      permissions: basePermissions,
      baseSalary: Number(item.baseSalary ?? seedUser.baseSalary ?? 0),
      standardSalary: Number(item.standardSalary ?? item.baseSalary ?? seedUser.standardSalary ?? seedUser.baseSalary ?? 0),
      email: item.email || "",
      documents: Array.isArray(item.documents) ? item.documents : [],
    };
  });
  for (const sampleUser of seedState.users.filter((user) => user.id === "u3" || user.id === "u4")) {
    if (!normalized.users.some((user) => user.id === sampleUser.id || user.name === sampleUser.name)) {
      normalized.users.push({ ...sampleUser, companyId: defaultCompanyId });
    }
  }
  normalized.locations = normalized.locations || [];
  normalized.products = (normalized.products || []).map((item) => ({
    companyId: item.companyId || item.company_id || defaultCompanyId,
    brand: "",
    spec: "",
    warning: 5,
    cost: 0,
    price: 0,
    image: "",
    imageId: "",
    imageName: "",
    imageSize: 0,
    barcodeImage: "",
    barcodeImageId: "",
    barcodeImageName: "",
    barcodeImageSize: 0,
    salesMonth: "",
    features: "",
    ingredients: "",
    manufacturer: "",
    contact: "",
    productType: "",
    contentAmount: "",
    listPriceTaxExcluded: "",
    countryOfOrigin: "",
    bestBefore: "",
    janCode: "",
    salesUnit: "",
    unitSize: "",
    ballSize: "",
    caseSize: "",
    unitWeight: "",
    ballWeight: "",
    caseWeight: "",
    usage: "",
    cautions: "",
    promotionalMaterials: "",
    remarks: "",
    ...item,
  }));
  normalized.batches = (normalized.batches || []).map((item) => ({
    companyId: item.companyId || item.company_id || defaultCompanyId,
    produced: "",
    expires: "2099-12-31",
    note: "",
    ...item,
  }));
  normalized.transactions = (normalized.transactions || []).map((item) => ({ companyId: item.companyId || item.company_id || defaultCompanyId, ...item }));
  normalized.customers = (normalized.customers || []).map((item) => ({
    companyId: item.companyId || item.company_id || defaultCompanyId,
    kana: "",
    contact: "",
    email: "",
    phone: "",
    postalCode: "",
    address: "",
    invoiceTitle: item.name || "",
    closingDay: "月末締め",
    paymentTerm: "翌月末払い",
    deliveryAddress: "",
    note: "",
    ...item,
  }));
  for (const sampleCustomer of seedState.customers) {
    if (!normalized.customers.some((customer) => customer.id === sampleCustomer.id || customer.name === sampleCustomer.name)) {
      normalized.customers.push({ ...sampleCustomer, companyId: defaultCompanyId });
    }
  }
  normalized.sales = (normalized.sales || []).map((item) => ({
    companyId: item.companyId || item.company_id || defaultCompanyId,
    date: new Date().toISOString().slice(0, 10),
    customerId: item.customerId || normalized.customers[0]?.id || "",
    taxRate: 10,
    platformFee: 0,
    shipping: 0,
    note: "",
    ...item,
  }));
  normalized.expenses = (normalized.expenses || []).map((item) => ({
    companyId: item.companyId || item.company_id || defaultCompanyId,
    date: new Date().toISOString().slice(0, 10),
    category: "其他费用",
    vendor: "",
    amount: 0,
    taxRate: 10,
    paymentMethod: "",
    relatedTo: "",
    note: "",
    ...item,
    amount: Number(item.amount || 0),
    taxRate: Number(item.taxRate ?? 10),
  }));
  normalized.marketplaceListings = (normalized.marketplaceListings || []).map((item) => ({
    ownerUserId: item.ownerUserId || normalized.users?.[0]?.id || "u1",
    companyId: item.companyId || item.company_id || defaultCompanyId,
    productId: "",
    title: "",
    description: "",
    categoryId: "",
    images: [],
    priceVisible: false,
    priceText: "",
    wholesalePriceText: "",
    moq: "",
    availableQuantity: "",
    shippingFrom: "",
    companyName: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    companyAddress: "",
    websiteUrl: "",
    snsUrl: "",
    contactVisible: true,
    status: "审核中",
    reviewStatus: "pending",
    reviewReason: "",
    reviewHistory: [],
    isFeatured: false,
    featuredUntil: "",
    priorityScore: 0,
    supplierRank: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: "",
    ...item,
  }));
  normalized.marketplaceInquiries = (normalized.marketplaceInquiries || []).map((item) => ({
    companyId: item.companyId || item.company_id || item.sellerCompanyId || defaultCompanyId,
    buyerUserId: "",
    sellerUserId: "",
    buyerCompanyName: "",
    buyerContactName: "",
    buyerPhone: "",
    buyerEmail: "",
    requestedQuantity: "",
    desiredPrice: "",
    purpose: "",
    deliveryArea: "",
    desiredDeliveryDate: "",
    needsSample: false,
    message: "",
    status: "未返信",
    sellerReply: "",
    sellerUnitPrice: "",
    sellerTotalPrice: "",
    sellerDeliveryTime: "",
    sellerShippingTerms: "",
    sellerTaxIncluded: "未設定",
    sellerContactTime: "",
    sellerContact: "",
    sellerReplyAt: "",
    markedAsContacted: false,
    markedAsClosed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...item,
    userId: item.userId === "u1" ? defaultAccountUserId : (item.userId || item.user_id || defaultAccountUserId),
  }));
  normalized.marketplaceVerifications = (normalized.marketplaceVerifications || []).map((item) => ({
    companyId: item.companyId || item.company_id || defaultCompanyId,
    userId: item.userId === "u1" ? defaultAccountUserId : (item.userId || item.user_id || defaultAccountUserId),
    verificationType: "seller",
    legalName: "",
    corporateNumber: "",
    representativeName: "",
    address: "",
    phone: "",
    email: "",
    identityDocumentUrl: "",
    licenseDocumentUrl: "",
    ownerDocuments: [],
    companyDocuments: [],
    documentDelivery: "admin_email",
    documentStoragePolicy: "metadata_only_local",
    adminEmailQueued: false,
    antiSocialCheck: false,
    status: "draft",
    rejectionReason: "",
    reviewedBy: "",
    reviewedAt: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...item,
  }));
  if (!normalized.marketplaceVerifications.length) {
    normalized.marketplaceVerifications = structuredClone(seedState.marketplaceVerifications || []);
  }
  normalized.marketplaceReports = (normalized.marketplaceReports || []).map((item) => ({ companyId: item.companyId || item.company_id || defaultCompanyId, ...item }));
  normalized.marketplaceSettings = {
    membershipPlan: "Free",
    listingLimits: { Free: 1, VIP: 10, SVIP: "unlimited" },
    prohibitedCategories: ["医薬品", "処方薬", "無許可医療機器", "偽ブランド", "違法品"],
    sensitiveWords: ["絶対治る", "癌に効く", "医薬品級", "偽物", "コピー品", "永久保証"],
    ...(normalized.marketplaceSettings || {}),
  };
  normalized.marketplaceFavorites = normalized.marketplaceFavorites || [];
  normalized.expensePeriod = {
    start: `${new Date().getFullYear()}-01-01`,
    end: `${new Date().getFullYear()}-12-31`,
    ...(normalized.expensePeriod || {}),
  };
  normalized.wages = (normalized.wages || []).map((item) => ({
    companyId: item.companyId || item.company_id || defaultCompanyId,
    month: new Date().toISOString().slice(0, 7),
    baseSalary: 250000,
    standardSalary: Number(item.standardSalary ?? item.baseSalary ?? 250000),
    overtimePay: 0,
    commutingAllowance: 0,
    otherAllowance: Number(item.allowance || 0),
    employeeHealthInsuranceRate: Number(item.employeeHealthInsuranceRate || 0),
    employeeHealthInsurance: Number(item.employeeHealthInsurance ?? item.healthInsurance ?? 0),
    employeeCareInsuranceRate: Number(item.employeeCareInsuranceRate || 0),
    employeeCareInsurance: Number(item.employeeCareInsurance || 0),
    employeePensionRate: Number(item.employeePensionRate || 0),
    employeePension: Number(item.employeePension ?? item.pension ?? 0),
    employeeEmploymentInsuranceRate: Number(item.employeeEmploymentInsuranceRate || 0),
    employeeEmploymentInsurance: Number(item.employeeEmploymentInsurance ?? item.unemploymentInsurance ?? 0),
    residentTax: 0,
    incomeTax: 0,
    otherEmployeeDeduction: Number(item.otherEmployeeDeduction ?? item.deduction ?? 0),
    companyHealthInsuranceRate: Number(item.companyHealthInsuranceRate || 0),
    companyHealthInsurance: Number(item.companyHealthInsurance ?? item.healthInsurance ?? 0),
    companyCareInsuranceRate: Number(item.companyCareInsuranceRate || 0),
    companyCareInsurance: Number(item.companyCareInsurance || 0),
    companyPensionRate: Number(item.companyPensionRate || 0),
    companyPension: Number(item.companyPension ?? item.pension ?? 0),
    companyEmploymentInsuranceRate: Number(item.companyEmploymentInsuranceRate || 0),
    companyEmploymentInsurance: Number(item.companyEmploymentInsurance || 0),
    workersCompInsuranceRate: Number(item.workersCompInsuranceRate || 0),
    workersCompInsurance: Number(item.workersCompInsurance || 0),
    childCareContributionRate: Number(item.childCareContributionRate || 0),
    childCareContribution: Number(item.childCareContribution || 0),
    childCareSupportRate: Number(item.childCareSupportRate || 0),
    childCareSupport: Number(item.childCareSupport || 0),
    otherCompanyCost: Number(item.otherCompanyCost || 0),
    deletedAt: "",
    employeeDeletedAt: "",
    note: "",
    ...item,
  })).map((item) => {
    if (item.id === "w1" && Number(item.baseSalary || 0) === 250000 && Number(item.standardSalary || 0) === 260000 && Number(item.commutingAllowance || 0) === 10000) {
      item.commutingAllowance = 0;
    }
    const oldBaseEmploymentInsurance = amountFromRate(Number(item.baseSalary || 0), 0.6);
    const oldStandardEmploymentInsurance = amountFromRate(Number(item.standardSalary || item.baseSalary || 0), 0.5);
    if (
      (Number(item.employeeEmploymentInsuranceRate || 0) >= 10 && Number(item.employeeEmploymentInsurance || 0) > grossWage(item))
      || (Number(item.employeeEmploymentInsuranceRate || 0) === 0.6 && Number(item.employeeEmploymentInsurance || 0) === oldBaseEmploymentInsurance)
      || (Number(item.employeeEmploymentInsuranceRate || 0) === 0.5 && Number(item.employeeEmploymentInsurance || 0) === oldStandardEmploymentInsurance)
    ) {
      item.employeeEmploymentInsuranceRate = 0.5;
      item.employeeEmploymentInsurance = amountFromRate(grossWage(item), 0.5);
    }
    if (Number(item.companyEmploymentInsuranceRate || 0) === 13.5) {
      item.companyEmploymentInsuranceRate = 1.35;
      item.companyEmploymentInsurance = amountFromRate(grossWage(item), 1.35);
    }
    if (Number(item.workersCompInsuranceRate || 0) === 3) {
      item.workersCompInsuranceRate = 0.3;
      item.workersCompInsurance = amountFromRate(grossWage(item), 0.3);
    }
    return item;
  });
  for (const sampleWage of seedState.wages) {
    if (!normalized.wages.some((wage) => wage.id === sampleWage.id || wage.employeeId === sampleWage.employeeId)) {
      normalized.wages.push({ ...sampleWage, companyId: defaultCompanyId });
    }
  }
  return normalized;
}

let cloudSaveTimer = null;

function queueCloudSave() {
  if (!window.KaishaRakuCloud?.readSession?.()) return;
  clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(() => {
    window.KaishaRakuCloud.pushState(rawState).catch((error) => {
      console.warn("Cloud sync failed", error);
    });
  }, 800);
}

function saveState(options = {}) {
  localStorage.setItem(storageKey, JSON.stringify(rawState));
  if (!options.skipCloud) queueCloudSave();
}

function currentUser() {
  return rawState.accountUsers.find((item) => item.id === currentUserId);
}

function activeMemberships(userId = currentUserId) {
  return rawState.companyMembers.filter((item) => item.userId === userId && item.status === "active");
}

function currentCompany() {
  return rawState.companies.find((item) => item.id === currentCompanyId && item.status !== "removed");
}

function currentMember() {
  return rawState.companyMembers.find((item) => item.userId === currentUserId && item.companyId === currentCompanyId && item.status === "active");
}

function can(module, action = "view") {
  const member = currentMember();
  if (!member) return false;
  return Boolean(member.permissions?.[module]?.[action]);
}

function firstAllowedView() {
  return permissionModules.find(([module]) => can(module, "view"))?.[0] || "dashboard";
}

function ensureAllowedView() {
  const hashView = viewFromHash();
  if (hashView && can(hashView, "view")) currentView = hashView;
  if (!can(currentView, "view")) currentView = firstAllowedView();
}

function updateNavigationAccess() {
  document.querySelectorAll("nav button").forEach((button) => {
    const allowed = can(button.dataset.view, "view");
    button.hidden = !allowed;
    button.classList.toggle("active", button.dataset.view === currentView);
  });
}

function uid(prefix) {
  if (window.crypto?.randomUUID) return crypto.randomUUID();
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fileSizeText(bytes) {
  const value = Number(bytes || 0);
  if (value >= 1024 * 1024) return `${(value / 1024 / 1024).toFixed(1)} MB`;
  if (value >= 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${value} B`;
}

function compressImageFile(file, maxSize = 520, quality = 0.58) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.onerror = () => reject(new Error("图片读取失败"));
      image.src = reader.result;
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function imageFileToBlob(file, maxSize = 520, quality = 0.58, mimeType = "image/jpeg") {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => blob ? resolve(blob) : reject(new Error("图片压缩失败")),
          mimeType,
          quality,
        );
      };
      image.onerror = () => reject(new Error("图片读取失败"));
      image.src = reader.result;
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function storeProductMedia(file, options = {}) {
  if (!file) return null;
  const isBarcode = options.kind === "barcode";
  const blob = await imageFileToBlob(
    file,
    options.maxSize || (isBarcode ? 980 : 420),
    options.quality || (isBarcode ? 0.92 : 0.5),
    options.mimeType || (isBarcode ? "image/png" : "image/jpeg"),
  );
  const id = uid(isBarcode ? "barcode" : "media");
  const uploadedAt = new Date().toISOString();
  await saveDocumentBlob({ id, scope: "product-media", name: file.name, type: blob.type, size: blob.size, uploadedAt, blob });
  return { id, name: file.name, size: blob.size, uploadedAt };
}

function mediaImageMarkup(id, fallbackDataUrl, alt, className = "") {
  if (id) return `<img ${className ? `class="${className}"` : ""} data-product-media-id="${escapeHTML(id)}" alt="${escapeHTML(alt)}" />`;
  if (fallbackDataUrl) return `<img ${className ? `class="${className}"` : ""} src="${fallbackDataUrl}" alt="${escapeHTML(alt)}" />`;
  return "";
}

async function hydrateProductMediaImages() {
  const images = Array.from(document.querySelectorAll("img[data-product-media-id]"));
  for (const image of images) {
    try {
      const record = await getDocumentBlob(image.dataset.productMediaId);
      if (!record?.blob) continue;
      const url = URL.createObjectURL(record.blob);
      image.src = url;
      image.onload = () => URL.revokeObjectURL(url);
    } catch {
      image.removeAttribute("data-product-media-id");
    }
  }
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function productMediaDataUrl(mediaId, fallbackDataUrl = "") {
  if (!mediaId) return fallbackDataUrl || "";
  try {
    const record = await getDocumentBlob(mediaId);
    if (!record?.blob) return fallbackDataUrl || "";
    return await blobToDataUrl(record.blob);
  } catch {
    return fallbackDataUrl || "";
  }
}

function specCell(label, value) {
  return `<tr><th>${escapeHTML(label)}</th><td>${escapeHTML(value || "")}</td></tr>`;
}

function productSpecExportHtml(item, productImageDataUrl, barcodeImageDataUrl) {
  const title = item.salesName || item.name || "製品規格書";
  const rows = [
    ["販売名", item.salesName || item.name],
    ["販売年月", item.salesMonth],
    ["JANコード", item.janCode || item.barcode],
    ["分類/区分", item.category || item.productType],
    ["ブランド", item.brand],
    ["内容量", item.contentAmount],
    ["定価（税抜）", item.listPriceTaxExcluded],
    ["販売単位", item.salesUnit],
    ["生産国", item.countryOfOrigin],
    ["賞味期限", item.bestBefore],
    ["製造者", item.manufacturer],
    ["連絡先", item.contact],
    ["単品サイズ", item.unitSize],
    ["ボールサイズ", item.ballSize],
    ["ケースサイズ", item.caseSize],
    ["単品重量", item.unitWeight],
    ["ボール重量", item.ballWeight],
    ["ケース重量", item.caseWeight],
    ["販促物", item.promotionalMaterials],
    ["規格/備考", item.spec],
  ].map(([label, value]) => specCell(label, value)).join("");
  const textBlocks = [
    ["製品特徴", item.features],
    ["原材料名（全成分）", item.ingredients],
    ["使用方法", item.usage],
    ["使用上の注意", item.cautions],
    ["備考欄", item.remarks],
  ].map(([label, value]) => `
    <section class="block">
      <h2>${escapeHTML(label)}</h2>
      <p>${escapeHTML(value || "")}</p>
    </section>
  `).join("");

  return `
    <!doctype html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <title>${escapeHTML(title)} 製品規格書</title>
        <style>
          body { margin: 0; padding: 28px; color: #172033; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", "Yu Gothic", sans-serif; }
          h1, h2, p { margin: 0; }
          h1 { font-size: 24px; margin-bottom: 18px; letter-spacing: 0; }
          .top { display: grid; grid-template-columns: 170px 1fr 190px; gap: 16px; align-items: start; margin-bottom: 18px; }
          .photo, .barcode { min-height: 130px; border: 1px solid #dfe5ef; display: grid; place-items: center; color: #768398; font-size: 12px; background: #fbfcff; }
          .photo img { max-width: 100%; max-height: 180px; object-fit: contain; }
          .barcode img { max-width: 100%; max-height: 120px; object-fit: contain; image-rendering: crisp-edges; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #dfe5ef; padding: 9px 10px; font-size: 13px; text-align: left; vertical-align: top; }
          th { width: 28%; background: #f5f7fb; color: #5f6d82; }
          .block { margin-top: 14px; border: 1px solid #dfe5ef; }
          .block h2 { font-size: 14px; padding: 8px 10px; background: #f5f7fb; color: #5f6d82; }
          .block p { min-height: 42px; padding: 10px; font-size: 13px; white-space: pre-wrap; line-height: 1.6; }
          @media print { body { padding: 16mm; } .top { grid-template-columns: 150px 1fr 170px; } }
        </style>
      </head>
      <body>
        <h1>製品規格書</h1>
        <div class="top">
          <div class="photo">${productImageDataUrl ? `<img src="${productImageDataUrl}" alt="${escapeHTML(title)}" />` : "商品画像"}</div>
          <table><tbody>${rows}</tbody></table>
          <div class="barcode">${barcodeImageDataUrl ? `<img src="${barcodeImageDataUrl}" alt="JANコード" />` : "バーコード画像"}</div>
        </div>
        ${textBlocks}
      </body>
    </html>
  `;
}

async function exportProductSpecPdf(productId) {
  const item = state.products.find((productItem) => productItem.id === productId);
  if (!item) return;
  const productImageDataUrl = await productMediaDataUrl(item.imageId, item.image);
  const barcodeImageDataUrl = await productMediaDataUrl(item.barcodeImageId, item.barcodeImage);
  const popup = window.open("", "_blank");
  if (!popup) return;
  popup.document.write(productSpecExportHtml(item, productImageDataUrl, barcodeImageDataUrl));
  popup.document.close();
  popup.focus();
  popup.print();
}

function saleDocumentTitle(type) {
  if (type === "invoice") return "請求書";
  if (type === "delivery") return "納品書";
  return "請求書兼納品書";
}

function saleDocumentNumber(sale, type) {
  const prefix = type === "invoice" ? "INV" : type === "delivery" ? "DEL" : "IVD";
  return `${prefix}-${String(sale.date || "").replaceAll("-", "")}-${String(sale.id || "").slice(-6).toUpperCase()}`;
}

function companySealMarkup(companyName) {
  return `
    <div class="company-seal" aria-label="${escapeHTML(companyName)} 印">
      ${String(companyName).split("").map((char) => `<span>${escapeHTML(char)}</span>`).join("")}
    </div>
  `;
}

function saleDocumentExportHtml(sale, type) {
  const title = saleDocumentTitle(type);
  const customerItem = customer(sale.customerId) || {};
  const productItem = product(sale.productId) || {};
  const quantity = Number(sale.quantity || 0);
  const unitPrice = Number(sale.unitPrice || 0);
  const taxRate = Number(sale.taxRate ?? 10);
  const subtotal = quantity * unitPrice;
  const total = saleAmount(sale);
  const tax = total - subtotal;
  const showBilling = type !== "delivery";
  const showDelivery = type !== "invoice";
  const companyName = "会社ラク経営";
  const recipient = customerItem.invoiceTitle || customerItem.name || "御中";
  const productName = productItem.salesName || productItem.name || "商品";
  const specText = [productItem.sku, productItem.janCode || productItem.barcode, productItem.contentAmount || productItem.spec]
    .filter(Boolean)
    .join(" / ");

  return `
    <!doctype html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <title>${escapeHTML(title)} ${escapeHTML(recipient)}</title>
        <style>
          body { margin: 0; padding: 28px; color: #172033; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", "Yu Gothic", sans-serif; }
          h1, h2, p { margin: 0; }
          h1 { text-align: center; font-size: 28px; letter-spacing: 0; margin-bottom: 22px; }
          .top { display: grid; grid-template-columns: 1fr 270px; gap: 28px; margin-bottom: 22px; }
          .recipient h2 { font-size: 20px; border-bottom: 1px solid #172033; padding-bottom: 8px; margin-bottom: 10px; }
          .recipient p, .issuer p, .meta td, .note { font-size: 12px; line-height: 1.7; color: #4d5b70; }
          .issuer { text-align: left; }
          .issuer-name { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 8px; }
          .company-seal { width: 58px; height: 58px; border: 3px solid #c42020; color: #c42020; display: grid; grid-template-columns: repeat(2, 1fr); place-items: center; font-weight: 800; font-size: 17px; line-height: 1; transform: rotate(-5deg); }
          .company-seal span { display: grid; place-items: center; }
          .meta { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
          .meta th, .meta td { border: 1px solid #dfe5ef; padding: 6px 8px; font-size: 12px; text-align: left; }
          .meta th { width: 90px; background: #f5f7fb; color: #5f6d82; }
          .amount-box { margin: 18px 0; border: 2px solid #172033; padding: 12px 14px; display: flex; justify-content: space-between; align-items: baseline; }
          .amount-box span { font-size: 14px; font-weight: 700; }
          .amount-box strong { font-size: 24px; }
          table.detail { width: 100%; border-collapse: collapse; margin-top: 14px; }
          .detail th, .detail td { border: 1px solid #dfe5ef; padding: 9px 10px; font-size: 13px; text-align: left; vertical-align: top; }
          .detail th { background: #f5f7fb; color: #5f6d82; }
          .number { text-align: right; white-space: nowrap; }
          .summary { width: 320px; margin-left: auto; margin-top: 14px; border-collapse: collapse; }
          .summary th, .summary td { border: 1px solid #dfe5ef; padding: 8px 10px; font-size: 13px; }
          .summary th { background: #f5f7fb; color: #5f6d82; text-align: left; }
          .summary td { text-align: right; }
          .section { margin-top: 20px; }
          .section h2 { font-size: 14px; margin-bottom: 8px; color: #172033; }
          .box { border: 1px solid #dfe5ef; padding: 10px 12px; min-height: 42px; font-size: 12px; line-height: 1.7; color: #4d5b70; white-space: pre-wrap; }
          @media print { body { padding: 16mm; } button { display: none; } }
        </style>
      </head>
      <body>
        <h1>${escapeHTML(title)}</h1>
        <div class="top">
          <div class="recipient">
            <h2>${escapeHTML(recipient)}</h2>
            <p>${escapeHTML(customerItem.postalCode || "")}</p>
            <p>${escapeHTML(customerItem.address || "")}</p>
            <p>${customerItem.contact ? `${escapeHTML(customerItem.contact)} 様` : ""}</p>
            ${showBilling ? `<div class="amount-box"><span>ご請求金額</span><strong>${money(total)}</strong></div>` : ""}
          </div>
          <div class="issuer">
            <table class="meta">
              <tbody>
                <tr><th>発行日</th><td>${escapeHTML(new Date().toISOString().slice(0, 10))}</td></tr>
                <tr><th>番号</th><td>${escapeHTML(saleDocumentNumber(sale, type))}</td></tr>
                <tr><th>${showDelivery ? "納品日" : "取引日"}</th><td>${escapeHTML(sale.date || "")}</td></tr>
                <tr><th>担当</th><td>${escapeHTML(operatorName(sale.staffId))}</td></tr>
              </tbody>
            </table>
            <div class="issuer-name">
              <p><strong>${escapeHTML(companyName)}</strong></p>
              ${showBilling ? companySealMarkup(companyName) : ""}
            </div>
            <p>〒</p>
            <p>住所：</p>
            <p>TEL：</p>
          </div>
        </div>

        <table class="detail">
          <thead>
            <tr>
              <th>品名</th>
              <th>規格 / JAN</th>
              <th class="number">数量</th>
              ${showBilling ? `<th class="number">単価</th><th class="number">税率</th><th class="number">金額</th>` : `<th>備考</th>`}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${escapeHTML(productName)}</td>
              <td>${escapeHTML(specText)}</td>
              <td class="number">${quantity}</td>
              ${showBilling ? `<td class="number">${money(unitPrice)}</td><td class="number">${taxRate}%</td><td class="number">${money(subtotal)}</td>` : `<td>${escapeHTML(sale.note || "")}</td>`}
            </tr>
          </tbody>
        </table>

        ${showBilling ? `
          <table class="summary">
            <tbody>
              <tr><th>小計（税抜）</th><td>${money(subtotal)}</td></tr>
              <tr><th>消費税（${taxRate}%）</th><td>${money(tax)}</td></tr>
              <tr><th>合計（税込）</th><td><strong>${money(total)}</strong></td></tr>
            </tbody>
          </table>
        ` : ""}

        ${showDelivery ? `
          <section class="section">
            <h2>納品場所</h2>
            <div class="box">${escapeHTML(customerItem.deliveryAddress || customerItem.address || locationName(sale.locationId))}</div>
          </section>
        ` : ""}

        ${showBilling ? `
          <section class="section">
            <h2>お支払条件</h2>
            <div class="box">${escapeHTML(customerItem.paymentTerm || "請求書発行後、指定期日までにお支払いください。")}</div>
          </section>
          <section class="section">
            <h2>振込先</h2>
            <div class="box">銀行名：\n支店名：\n口座種別：\n口座番号：\n口座名義：</div>
          </section>
        ` : ""}

        ${sale.note ? `
          <section class="section">
            <h2>備考</h2>
            <div class="box">${escapeHTML(sale.note)}</div>
          </section>
        ` : ""}
      </body>
    </html>
  `;
}

function exportSaleDocumentPdf(saleId, type) {
  const sale = state.sales.find((item) => item.id === saleId);
  if (!sale) return;
  const popup = window.open("", "_blank");
  if (!popup) return;
  popup.document.write(saleDocumentExportHtml(sale, type));
  popup.document.close();
  popup.focus();
  popup.print();
}

function employeeDocumentTotal(employee) {
  return (employee.documents || []).reduce((sum, item) => sum + Number(item.size || 0), 0);
}

function product(id) {
  return state.products.find((item) => item.id === id);
}

function batch(id) {
  return state.batches.find((item) => item.id === id);
}

function locationName(id) {
  return state.locations.find((item) => item.id === id)?.name || "未记录";
}

function operatorName(id) {
  return state.users.find((item) => item.id === id)?.name || "未记录";
}

function hasOwnerPermission() {
  return state.users.some((item) => item.active && item.role === "老板");
}

function canDeleteEmployee(employee) {
  if (!hasOwnerPermission()) return false;
  if (employee.role !== "老板") return true;
  return state.users.filter((item) => item.active && item.role === "老板").length > 1;
}

function employeeOptions(selectedId = "") {
  const activeUsers = state.users.filter((item) => item.active);
  const users = activeUsers.length ? activeUsers : state.users;
  return users.map((item) => `
    <option
      value="${item.id}"
      data-base-salary="${Number(item.baseSalary || 0)}"
      data-standard-salary="${Number(item.standardSalary || item.baseSalary || 0)}"
      ${item.id === selectedId ? "selected" : ""}
    >${escapeHTML(item.name)} · ${escapeHTML(t(item.role))}</option>
  `).join("");
}

function wagesForEmployee(employeeId) {
  return state.wages
    .filter((item) => item.employeeId === employeeId && !item.employeeDeletedAt)
    .sort((a, b) => String(b.month).localeCompare(String(a.month)));
}

function activeWages() {
  return state.wages.filter((item) => !item.deletedAt);
}

function recoverableWages() {
  const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000;
  return state.wages
    .filter((item) => item.deletedAt && new Date(item.deletedAt).getTime() >= oneYearAgo)
    .sort((a, b) => new Date(b.deletedAt) - new Date(a.deletedAt));
}

function latestMayWageForLiu() {
  const liuIds = new Set(state.users
    .filter((item) => /[刘劉]/.test(String(item.name || "")))
    .map((item) => item.id));
  return activeWages()
    .filter((item) => liuIds.has(item.employeeId) && String(item.month || "").endsWith("-05"))
    .sort((a, b) => String(b.month).localeCompare(String(a.month)) || String(b.id).localeCompare(String(a.id)))[0];
}

function wageDefaultValue(template, key, fallback = 0) {
  return Number(template?.[key] ?? fallback);
}

function customerName(id) {
  return state.customers.find((item) => item.id === id)?.name || "未指定";
}

function customer(id) {
  return state.customers.find((item) => item.id === id);
}

function stockFor(productId) {
  return state.batches.filter((item) => item.productId === productId).reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}

function stockByLocation(locationId) {
  return state.batches.filter((item) => item.locationId === locationId).reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}

function stockForProductAtLocation(productId, locationId) {
  return state.batches
    .filter((item) => item.productId === productId && item.locationId === locationId)
    .reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}

function money(value) {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(value || 0);
}

function t(text) {
  if (currentLanguage === "zh") return text;
  return uiTranslations[currentLanguage]?.[text] || text;
}

function viewTitle(view) {
  const titles = { dashboard: "总览", products: "商品", inventory: "库存", sales: "销售", marketplace: "会社ラク市場", expenses: "费用成本", employees: "员工", wages: "工资", transactions: "流水", users: "权限" };
  return t(titles[view] || view);
}

function translateElementText(root = document.body) {
  const dictionary = uiTranslations[currentLanguage] || {};
  if (currentLanguage === "zh") return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    if (!trimmed || !dictionary[trimmed]) return;
    node.nodeValue = raw.replace(trimmed, dictionary[trimmed]);
  });
  root.querySelectorAll?.("input[placeholder], textarea[placeholder]").forEach((item) => {
    const value = item.getAttribute("placeholder");
    if (dictionary[value]) item.setAttribute("placeholder", dictionary[value]);
  });
  root.querySelectorAll?.("[title], [aria-label]").forEach((item) => {
    const title = item.getAttribute("title");
    const aria = item.getAttribute("aria-label");
    if (dictionary[title]) item.setAttribute("title", dictionary[title]);
    if (dictionary[aria]) item.setAttribute("aria-label", dictionary[aria]);
  });
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.title = "会社ラク経営";
  document.querySelector(".brand h1").textContent = "会社ラク経営";
  document.querySelector(".mark").innerHTML = "<span>会社</span><strong>ラク</strong><span>経営</span>";
  document.querySelector(".brand p").textContent = t("经营库存后台");
  document.querySelector(".eyebrow").textContent = t("开发版后台");
  document.getElementById("seed-btn").textContent = t("重置示例");
  document.getElementById("export-btn").textContent = t("导出 JSON");
  document.querySelectorAll("nav button").forEach((button) => {
    button.textContent = viewTitle(button.dataset.view);
  });
  const languageLabel = document.querySelector(".language-switch span");
  if (languageLabel) languageLabel.textContent = t("语言");
  const select = document.getElementById("language-select");
  if (select) select.value = currentLanguage;
  document.getElementById("page-title").textContent = currentUser() ? viewTitle(currentView) : t("登录");
  translateElementText(document.getElementById("app"));
}

function setView(view) {
  if (!can(view, "view")) return;
  currentView = view;
  if (location.hash.replace(/^#/, "") !== view) history.replaceState(null, "", `#${view}`);
  updateNavigationAccess();
  document.getElementById("page-title").textContent = viewTitle(view);
  render();
}

function render() {
  if (!currentUser()) {
    renderLogin();
    return;
  }
  document.body.classList.remove("is-logged-out");
  const memberships = activeMemberships();
  if (!memberships.length) {
    renderCompanyOnboarding();
    return;
  }
  if (!currentMember()) {
    if (memberships.length === 1) {
      currentCompanyId = memberships[0].companyId;
      sessionStorage.setItem(sessionCompanyKey, currentCompanyId);
      logActivity("company_switch", "company", currentCompanyId, `会社を選択: ${currentCompany()?.companyName || ""}`);
    } else {
      renderCompanySelector();
      return;
    }
  }
  ensureAllowedView();
  updateNavigationAccess();
  renderAccountBar();
  const app = document.getElementById("app");
  if (currentView === "dashboard") app.innerHTML = renderDashboard();
  if (currentView === "products") app.innerHTML = renderProducts();
  if (currentView === "inventory") app.innerHTML = renderInventory();
  if (currentView === "sales") app.innerHTML = renderSales();
  if (currentView === "marketplace") app.innerHTML = renderMarketplace();
  if (currentView === "expenses") app.innerHTML = renderExpenses();
  if (currentView === "employees") app.innerHTML = renderEmployees();
  if (currentView === "wages") app.innerHTML = renderWages();
  if (currentView === "transactions") app.innerHTML = renderTransactions();
  if (currentView === "users") app.innerHTML = renderUsers();
  bindForms();
  bindFilters();
  hydrateProductMediaImages();
  applyPermissionState();
  applyLanguage();
}

function renderLogin(message = "") {
  document.body.classList.add("is-logged-out");
  document.querySelectorAll("nav button").forEach((button) => button.hidden = true);
  document.getElementById("page-title").textContent = t("登录");
  document.getElementById("app").innerHTML = `
    <section class="login-panel">
      <div class="form-title">
        <h3>会社ラク経営 ログイン</h3>
        <span>${window.KaishaRakuCloud?.enabled() ? "メールに届く認証コードでログインします。" : "メール認証コードでログインします。開発版では送信後にコードを画面表示します。"}</span>
      </div>
      ${field("语言", `<select id="login-language-select">
        <option value="zh" ${currentLanguage === "zh" ? "selected" : ""}>中文</option>
        <option value="ja" ${currentLanguage === "ja" ? "selected" : ""}>日本語</option>
        <option value="en" ${currentLanguage === "en" ? "selected" : ""}>English</option>
        <option value="ko" ${currentLanguage === "ko" ? "selected" : ""}>한국어</option>
        <option value="es" ${currentLanguage === "es" ? "selected" : ""}>Español</option>
        <option value="fr" ${currentLanguage === "fr" ? "selected" : ""}>Français</option>
        <option value="de" ${currentLanguage === "de" ? "selected" : ""}>Deutsch</option>
        <option value="pt" ${currentLanguage === "pt" ? "selected" : ""}>Português</option>
        <option value="it" ${currentLanguage === "it" ? "selected" : ""}>Italiano</option>
        <option value="id" ${currentLanguage === "id" ? "selected" : ""}>Bahasa Indonesia</option>
        <option value="th" ${currentLanguage === "th" ? "selected" : ""}>ไทย</option>
        <option value="vi" ${currentLanguage === "vi" ? "selected" : ""}>Tiếng Việt</option>
        <option value="ar" ${currentLanguage === "ar" ? "selected" : ""}>العربية</option>
        <option value="hi" ${currentLanguage === "hi" ? "selected" : ""}>हिन्दी</option>
        <option value="ru" ${currentLanguage === "ru" ? "selected" : ""}>Русский</option>
      </select>`)}
      ${message ? `<div class="hint">${escapeHTML(message)}</div>` : ""}
      <form class="form-card compact-form" id="login-form">
        ${field("メールアドレス", `<input name="email" type="email" autocomplete="email" required />`)}
        <button type="button" id="send-email-code">認証コードを送信</button>
        ${field("メール認証コード", `<input name="code" inputmode="numeric" autocomplete="one-time-code" required />`)}
        <button class="primary">ログイン</button>
      </form>
    </section>
  `;
  renderAccountBar();
  bindLoginForm();
  document.getElementById("login-language-select")?.addEventListener("change", (event) => {
    currentLanguage = event.currentTarget.value;
    localStorage.setItem(languageKey, currentLanguage);
    renderLogin(message);
  });
  applyLanguage();
}

function renderCompanyOnboarding() {
  document.querySelectorAll("nav button").forEach((button) => button.hidden = true);
  document.getElementById("page-title").textContent = "会社を作成・参加";
  document.getElementById("app").innerHTML = `
    <section class="login-panel company-gate">
      <div class="form-title">
        <h3>会社ラク経営へようこそ</h3>
        <span>個人アカウントに会社がまだ関連付いていません。</span>
      </div>
      ${renderPendingInvitations()}
      <form class="form-card compact-form" id="company-create-form">
        <div class="form-title"><h3>新しい会社を作成</h3><span>作成者は自動的に社長になります。</span></div>
        ${field("会社名", `<input name="companyName" required />`)}
        <div class="form-row">
          ${field("会社タイプ", `<input name="companyType" placeholder="法人 / 個人事業主 / 店舗" />`)}
          ${field("法人番号", `<input name="corporateNumber" />`)}
          ${field("会社メール", `<input name="email" type="email" value="${escapeHTML(currentUser()?.email || "")}" />`)}
        </div>
        ${field("住所", `<input name="address" />`)}
        ${field("電話", `<input name="phone" />`)}
        <button class="primary">会社を作成する</button>
      </form>
      <form class="form-card compact-form" id="invitation-code-form">
        <div class="form-title"><h3>招待コードで参加</h3><span>会社から共有された招待IDを入力します。</span></div>
        ${field("招待ID", `<input name="invitationId" />`)}
        <button>参加する</button>
      </form>
    </section>
  `;
  renderAccountBar();
  bindCompanyForms();
  applyLanguage();
}

function renderCompanySelector() {
  document.querySelectorAll("nav button").forEach((button) => button.hidden = true);
  document.getElementById("page-title").textContent = "会社を選択";
  const cards = activeMemberships().map((member) => {
    const company = rawState.companies.find((item) => item.id === member.companyId);
    return `
      <button type="button" class="company-select-card" data-company-id="${member.companyId}">
        <span class="company-logo">${escapeHTML((company?.companyName || "?").slice(0, 1))}</span>
        <strong>${escapeHTML(company?.companyName || "会社名未設定")}</strong>
        <small>${escapeHTML(t(member.role))} · ${escapeHTML(company?.status || "active")}</small>
      </button>
    `;
  }).join("");
  document.getElementById("app").innerHTML = `
    <section class="login-panel company-gate">
      <div class="form-title">
        <h3>会社を選択</h3>
        <span>このメールアカウントに複数の会社身份があります。</span>
      </div>
      <div class="company-select-grid">${cards}</div>
      ${renderPendingInvitations()}
      <button type="button" id="company-create-open">新しい会社を作成</button>
    </section>
  `;
  renderAccountBar();
  bindCompanyForms();
  applyLanguage();
}

function renderAccountBar() {
  const actions = document.querySelector(".actions");
  if (!actions) return;
  const user = currentUser();
  actions.querySelector(".account-chip")?.remove();
  actions.querySelector("#logout-btn")?.remove();
  if (!user) return;
  const company = currentCompany();
  const member = currentMember();
  actions.insertAdjacentHTML("afterbegin", `
    <span class="account-chip">${escapeHTML(user.displayName || user.email)}${company ? ` · ${escapeHTML(company.companyName)} · ${escapeHTML(t(member?.role || ""))}` : ""}</span>
    ${activeMemberships().length > 1 ? `<button type="button" id="company-switch-btn">会社を切り替える</button>` : ""}
    <button type="button" id="logout-btn">${t("退出")}</button>
  `);
  document.getElementById("company-switch-btn")?.addEventListener("click", () => {
    currentCompanyId = "";
    sessionStorage.removeItem(sessionCompanyKey);
    render();
  });
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    window.KaishaRakuCloud?.signOut?.();
    currentUserId = "";
    currentCompanyId = "";
    sessionStorage.removeItem(sessionKey);
    sessionStorage.removeItem(sessionCompanyKey);
    render();
  });
}

function renderPendingInvitations() {
  const email = currentUser()?.email || "";
  const invitations = rawState.companyInvitations.filter((item) => item.phoneNumber === email && item.status === "pending");
  if (!invitations.length) return "";
  const rows = invitations.map((item) => {
    const company = rawState.companies.find((companyItem) => companyItem.id === item.companyId);
    return `
      <div class="deleted-record-row">
        <div>
          <strong>${escapeHTML(company?.companyName || "会社名未設定")}</strong>
          <span>${escapeHTML(t(item.role))} · 招待ID ${escapeHTML(item.id)}</span>
        </div>
        <button type="button" class="primary invitation-accept-button" data-invitation-id="${item.id}">招待を承認</button>
      </div>
    `;
  }).join("");
  return `<section class="form-card compact-form"><h3>届いている招待</h3>${rows}</section>`;
}

function bindCompanyForms() {
  document.querySelectorAll(".company-select-card").forEach((button) => {
    button.addEventListener("click", () => {
      currentCompanyId = button.dataset.companyId || "";
      sessionStorage.setItem(sessionCompanyKey, currentCompanyId);
      logActivity("company_switch", "company", currentCompanyId, `会社を選択: ${currentCompany()?.companyName || ""}`);
      saveState();
      currentView = firstAllowedView();
      render();
    });
  });
  document.getElementById("company-create-open")?.addEventListener("click", () => {
    renderCompanyOnboarding();
  });
  document.getElementById("company-create-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createCompanyFromForm(data);
  });
  document.getElementById("invitation-code-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const invitation = rawState.companyInvitations.find((item) => item.id === String(new FormData(event.currentTarget).get("invitationId") || "").trim());
    if (!invitation || invitation.status !== "pending") return;
    invitation.phoneNumber = currentUser().email;
    acceptMatchingInvitations(currentUser().email, currentUserId);
    currentCompanyId = invitation.companyId;
    sessionStorage.setItem(sessionCompanyKey, currentCompanyId);
    saveState();
    render();
  });
  document.querySelectorAll(".invitation-accept-button").forEach((button) => {
    button.addEventListener("click", () => {
      const invitation = rawState.companyInvitations.find((item) => item.id === button.dataset.invitationId);
      if (!invitation) return;
      acceptMatchingInvitations(currentUser().email, currentUserId);
      currentCompanyId = invitation.companyId;
      sessionStorage.setItem(sessionCompanyKey, currentCompanyId);
      saveState();
      render();
    });
  });
}

function createCompanyFromForm(data) {
  const company = {
    id: uid("company"),
    companyName: data.get("companyName") || "会社名未設定",
    companyType: data.get("companyType") || "",
    corporateNumber: data.get("corporateNumber") || "",
    address: data.get("address") || "",
    phone: data.get("phone") || "",
    email: data.get("email") || currentUser()?.email || "",
    logoUrl: "",
    ownerUserId: currentUserId,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  rawState.companies.push(company);
  rawState.companyMembers.push({
    id: uid("cm"),
    companyId: company.id,
    userId: currentUserId,
    phoneNumber: currentUser()?.email || "",
    role: "老板",
    status: "active",
    invitedByUserId: "",
    joinedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    permissions: rolePermissions("老板"),
  });
  currentCompanyId = company.id;
  sessionStorage.setItem(sessionCompanyKey, currentCompanyId);
  logActivity("company_create", "company", company.id, `会社作成: ${company.companyName}`);
  saveState();
  currentView = "dashboard";
  render();
}

function inviteCompanyMember(email, role, options = {}) {
  if (!email || !email.includes("@")) return;
  const existing = rawState.companyMembers.find((item) => item.companyId === currentCompanyId && item.phoneNumber === email && item.status === "active");
  if (existing) return;
  const invitation = {
    id: uid("invite"),
    companyId: currentCompanyId,
    phoneNumber: email,
    role,
    invitedByUserId: currentUserId,
    status: "pending",
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    acceptedAt: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  rawState.companyInvitations.unshift(invitation);
  const account = rawState.accountUsers.find((item) => normalizeEmail(item.email) === email);
  if (account) acceptMatchingInvitations(email, account.id);
  logActivity("member_invite", "company_invitation", invitation.id, `メンバー招待: ${email}`);
  if (options.renderAfter === false) return;
  saveState();
  render();
}

function updateAccountProfile(data) {
  const user = currentUser();
  if (!user) return;
  user.displayName = data.get("displayName") || user.displayName || user.email;
  const newEmail = normalizeEmail(data.get("newEmail"));
  const code = String(data.get("code") || "").trim();
  if (newEmail) {
    if (rawState.accountUsers.some((item) => item.id !== user.id && normalizeEmail(item.email) === newEmail)) {
      alert("このメールアドレスは既に使用されています。管理者へ申請してください。");
      return;
    }
    const result = verifyEmailCode(newEmail, code, "email_change");
    if (!result.ok) {
      alert(result.message);
      return;
    }
    const oldEmail = user.email;
    user.email = newEmail;
    user.updatedAt = new Date().toISOString();
    rawState.companyMembers.forEach((member) => {
      if (member.userId === user.id) member.phoneNumber = newEmail;
    });
    rawState.emailChangeLogs.unshift({
      id: uid("ecl"),
      userId: user.id,
      oldPhoneNumber: oldEmail,
      newPhoneNumber: newEmail,
      changedAt: new Date().toISOString(),
      ipAddress: "local-dev",
      deviceInfo: navigator.userAgent || "",
    });
    logActivity("email_change", "user", user.id, `${oldEmail} -> ${newEmail}`);
  } else {
    user.updatedAt = new Date().toISOString();
  }
  saveState();
  render();
}

function localAccountFromEmail(email, supabaseUser = null) {
  let user = rawState.accountUsers.find((item) => normalizeEmail(item.email) === email || (supabaseUser?.id && item.supabaseUserId === supabaseUser.id));
  if (!user) {
    user = {
      id: supabaseUser?.id ? `sb-${supabaseUser.id}` : uid("au"),
      supabaseUserId: supabaseUser?.id || "",
      phoneNumber: "",
      displayName: email.split("@")[0],
      email,
      avatarUrl: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLoginAt: "",
    };
    rawState.accountUsers.push(user);
  }
  user.supabaseUserId = supabaseUser?.id || user.supabaseUserId || "";
  user.email = email;
  user.lastLoginAt = new Date().toISOString();
  acceptMatchingInvitations(email, user.id);
  return user;
}

async function hydrateFromCloudIfAvailable() {
  const cloudState = await window.KaishaRakuCloud?.pullState?.();
  if (!cloudState) return false;
  rawState = normalizeState(cloudState);
  state = createScopedState(rawState);
  saveState({ skipCloud: true });
  return true;
}

function bindLoginForm() {
  document.getElementById("send-email-code")?.addEventListener("click", async () => {
    const email = normalizeEmail(document.querySelector('#login-form [name="email"]')?.value);
    let result;
    if (window.KaishaRakuCloud?.enabled()) {
      try {
        result = await window.KaishaRakuCloud.sendOtp(email);
      } catch (error) {
        result = { ok: false, message: `メール送信に失敗しました: ${error.message}` };
      }
    } else {
      result = sendEmailVerificationCode(email, "login");
    }
    renderLogin(result.message);
    const emailInput = document.querySelector('#login-form [name="email"]');
    if (emailInput) emailInput.value = email;
  });
  document.getElementById("login-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = normalizeEmail(data.get("email"));
    const code = String(data.get("code") || "").trim();
    let user;
    if (window.KaishaRakuCloud?.enabled()) {
      try {
        const session = await window.KaishaRakuCloud.verifyOtp(email, code);
        await hydrateFromCloudIfAvailable();
        user = localAccountFromEmail(email, session.user);
      } catch (error) {
        renderLogin(`認証に失敗しました: ${error.message}`);
        return;
      }
    } else {
      const result = verifyEmailCode(email, code, "login");
      if (!result.ok) {
        renderLogin(result.message);
        return;
      }
      user = localAccountFromEmail(email);
    }
    currentUserId = user.id;
    sessionStorage.setItem(sessionKey, currentUserId);
    currentCompanyId = "";
    sessionStorage.removeItem(sessionCompanyKey);
    logActivity("login", "user", user.id, `メールログイン: ${email}`);
    saveState();
    currentView = "dashboard";
    render();
  });
}

function emailCodeHash(code) {
  return String(code || "").split("").reverse().join("");
}

function sendEmailVerificationCode(email, purpose = "login") {
  if (!email || !email.includes("@")) return { ok: false, message: "メールアドレスを入力してください。" };
  const now = Date.now();
  const records = rawState.emailVerificationCodes.filter((item) => item.phoneNumber === email && item.purpose === purpose);
  const last = records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  if (last && now - new Date(last.createdAt).getTime() < 60 * 1000) {
    return { ok: false, message: "60秒以内の再送信はできません。" };
  }
  const hourCount = records.filter((item) => now - new Date(item.createdAt).getTime() < 60 * 60 * 1000).length;
  if (hourCount >= 5) return { ok: false, message: "1時間の送信上限に達しました。" };
  const dayCount = records.filter((item) => now - new Date(item.createdAt).getTime() < 24 * 60 * 60 * 1000).length;
  if (dayCount >= 20) return { ok: false, message: "本日の送信上限に達しました。" };
  const code = String(Math.floor(100000 + Math.random() * 900000));
  rawState.emailVerificationCodes.push({
    id: uid("evc"),
    phoneNumber: email,
    codeHash: emailCodeHash(code),
    devCode: code,
    purpose,
    expiresAt: new Date(now + 5 * 60 * 1000).toISOString(),
    verifiedAt: "",
    attemptCount: 0,
    ipAddress: "local-dev",
    deviceInfo: navigator.userAgent || "",
    createdAt: new Date().toISOString(),
  });
  saveState();
  return { ok: true, message: `認証コードを送信しました。開発版コード：${code}` };
}

function verifyEmailCode(email, code, purpose = "login") {
  const record = rawState.emailVerificationCodes
    .filter((item) => item.phoneNumber === email && item.purpose === purpose && !item.verifiedAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  if (!record) return { ok: false, message: "有効な認証コードがありません。" };
  if (new Date(record.expiresAt).getTime() < Date.now()) return { ok: false, message: "認証コードの有効期限が切れました。" };
  if (Number(record.attemptCount || 0) >= 5) return { ok: false, message: "認証コードの試行回数上限に達しました。" };
  record.attemptCount = Number(record.attemptCount || 0) + 1;
  if (record.codeHash !== emailCodeHash(code)) {
    saveState();
    return { ok: false, message: "認証コードが正しくありません。" };
  }
  record.verifiedAt = new Date().toISOString();
  saveState();
  return { ok: true };
}

function acceptMatchingInvitations(email, userId) {
  rawState.companyInvitations
    .filter((item) => item.phoneNumber === email && item.status === "pending")
    .forEach((invitation) => {
      if (new Date(invitation.expiresAt).getTime() < Date.now()) {
        invitation.status = "expired";
        return;
      }
      if (!rawState.companyMembers.some((member) => member.companyId === invitation.companyId && member.userId === userId && member.status === "active")) {
        const role = invitation.role || "只读";
        rawState.companyMembers.push({
          id: uid("cm"),
          companyId: invitation.companyId,
          userId,
          phoneNumber: email,
          role,
          status: "active",
          invitedByUserId: invitation.invitedByUserId || "",
          joinedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          permissions: rolePermissions(role),
        });
      }
      invitation.status = "accepted";
      invitation.acceptedAt = new Date().toISOString();
      invitation.updatedAt = new Date().toISOString();
      logActivity("invitation_accept", "company_invitation", invitation.id, `${email} が招待を承認`);
    });
}

function logActivity(actionType, targetType, targetId, description) {
  rawState.activityLogs.unshift({
    id: uid("log"),
    companyId: currentCompanyId || "",
    userId: currentUserId || "",
    actionType,
    targetType,
    targetId,
    description,
    createdAt: new Date().toISOString(),
  });
}

function applyPermissionState() {
  const canEdit = can(currentView, "edit");
  const canDelete = can(currentView, "delete");
  const canExport = can(currentView, "export");
  document.querySelectorAll("#app form").forEach((form) => {
    if (form.id === "login-form") return;
    const formCanEdit = form.classList.contains("marketplace-inquiry-form") ? can(currentView, "view") : canEdit;
    form.querySelectorAll("input, select, textarea").forEach((control) => {
      control.disabled = !formCanEdit;
    });
    form.querySelectorAll("button").forEach((button) => {
      if (button.classList.contains("danger-button")) {
        button.hidden = !canDelete;
        button.disabled = !canDelete;
      } else if (!button.classList.contains("sale-document-export")) {
        button.disabled = !formCanEdit;
      }
    });
  });
  document.querySelectorAll("#app .danger-button").forEach((button) => {
    button.hidden = !canDelete;
    button.disabled = !canDelete;
  });
  document.querySelectorAll("#app .sale-document-export, #app .product-spec-export, #app .wage-export-button").forEach((button) => {
    button.disabled = !canExport;
    button.hidden = !canExport;
  });
  document.querySelectorAll("#export-btn").forEach((button) => {
    button.disabled = !can(currentView, "export");
  });
}

function renderDashboard() {
  const totalStock = state.batches.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const low = state.products.filter((item) => stockFor(item.id) <= Number(item.warning || 0)).length;
  const totalSales = state.sales.reduce((sum, item) => sum + saleAmount(item), 0);
  const totalExpenses = state.expenses.reduce((sum, item) => sum + expenseAmount(item), 0);
  const salesExpenseDiff = totalSales - totalExpenses;
  const expiring = getExpiringBatches();
  return `
    <section class="grid">
      ${metric("商品数量", state.products.length)}
      ${metric("库存总件数", totalStock)}
      ${metric("销售-费用差额", money(salesExpenseDiff))}
      ${metric("销售额", money(totalSales))}
    </section>
    <section class="content-grid">
      ${tableCard("最近流水", ["动作", "商品", "数量", "位置", "操作人"], state.transactions.slice(0, 8).map(row => [
        actionPill(row.action),
        escapeHTML(product(row.productId)?.name || "未知商品"),
        signedQuantity(row),
        escapeHTML(locationText(row)),
        escapeHTML(operatorName(row.operatorId)),
      ]))}
      ${tableCard("临期批次", ["批次", "商品", "到期", "数量"], expiring.map(item => [
        escapeHTML(item.code),
        escapeHTML(product(item.productId)?.name || "未知商品"),
        expiryText(item.expires),
        item.quantity,
      ]))}
    </section>
    <section class="content-grid">
      ${tableCard("各位置库存", ["位置", "类型", "库存"], state.locations.map(item => [
        escapeHTML(item.name),
        typePill(item.type),
        stockByLocation(item.id),
      ]))}
      ${tableCard("低库存商品", ["商品", "SKU", "库存", "预警线"], state.products.filter(item => stockFor(item.id) <= Number(item.warning || 0)).map(item => [
        escapeHTML(item.name),
        escapeHTML(item.sku),
        `<span class="danger">${stockFor(item.id)}</span>`,
        item.warning,
      ]))}
    </section>
  `;
}

function renderProducts() {
  return `
    ${collapsible("新增商品", "SKU、条码、分类和预警线会用于库存联动", `
    <form class="form-card compact-form" id="product-form">
      <div class="form-title">
        <h3>新增商品</h3>
        <span>SKU、条码、分类和预警线会用于库存联动</span>
      </div>
      <div class="form-row">
        <input name="name" placeholder="商品名" required />
        <input name="sku" placeholder="SKU" required />
        <input name="barcode" placeholder="条码" />
      </div>
      <div class="form-row">
        <input name="category" placeholder="分类" />
        <input name="brand" placeholder="品牌" />
        <input name="spec" placeholder="规格" />
      </div>
      <div class="form-row">
        <input name="salesMonth" placeholder="販売年月 例：2024/10" />
        <input name="janCode" placeholder="JANコード" />
        <input name="contentAmount" placeholder="内容量" />
      </div>
      <div class="form-row">
        <input name="warning" placeholder="库存预警线" type="number" min="0" value="5" />
        <input name="price" placeholder="销售价" type="number" min="0" />
      </div>
      <div class="form-row">
        ${field("商品图片", `<input name="imageFile" type="file" accept="image/*" />`)}
        ${field("条码图片", `<input name="barcodeImageFile" type="file" accept="image/*" />`)}
      </div>
      <button class="primary">保存商品</button>
    </form>
    `)}
    <div class="toolbar-line">
      <input id="product-filter" placeholder="搜索商品、SKU、条码、分类" />
    </div>
    ${renderProductManager()}
  `;
}

function renderProductManager() {
  const rows = state.products.map((item) => {
    const search = escapeHTML(`${item.name} ${item.sku} ${item.barcode} ${item.category} ${item.brand}`.toLowerCase());
    const listImage = mediaImageMarkup(item.imageId, item.image, item.name);
    const editImage = mediaImageMarkup(item.imageId, item.image, item.name);
    const barcodeImage = mediaImageMarkup(item.barcodeImageId, item.barcodeImage, `${item.name} 条码`, "barcode-preview");
    return `
      <tr class="product-row" data-product-id="${item.id}" data-product-search="${search}">
        <td>
          <div class="product-row-main">
            <div class="product-thumb">${listImage || `<span>无图</span>`}</div>
            <div>
              <strong>${escapeHTML(item.name)}</strong>
              <small>${escapeHTML(item.brand || "")} ${escapeHTML(item.spec || "")}</small>
            </div>
          </div>
        </td>
        <td>${escapeHTML(item.sku)}</td>
        <td>${escapeHTML(item.barcode || "")}</td>
        <td>${escapeHTML(item.category || "")}</td>
        <td>${stockFor(item.id)}</td>
        <td>${stockFor(item.id) <= Number(item.warning || 0) ? `<span class="danger">低库存</span>` : `<span class="ok">正常</span>`}</td>
        <td>${money(Number(item.price || 0))}</td>
        <td><button type="button" class="primary table-action product-edit-toggle" data-product-id="${item.id}">编辑</button></td>
      </tr>
      <tr class="product-edit-row" data-product-id="${item.id}" data-product-search="${search}" hidden>
        <td colspan="8">
          <form class="product-edit-form" data-product-id="${item.id}">
            <div class="product-edit-layout">
              <div class="product-media-stack">
                <div class="product-image-box">
                  ${editImage || `<span>暂无图片</span>`}
                </div>
                <div class="product-barcode-box">
                  ${barcodeImage || `<span>暂无条码图片</span>`}
                </div>
              </div>
              <div class="product-edit-fields">
                <div class="form-row">
                  ${field("商品名", `<input name="name" value="${escapeHTML(item.name)}" required />`)}
                  ${field("SKU", `<input name="sku" value="${escapeHTML(item.sku)}" required />`)}
                  ${field("条码", `<input name="barcode" value="${escapeHTML(item.barcode || "")}" />`)}
                </div>
                <h4>製品規格書 基本情報</h4>
                <div class="form-row">
                  ${field("販売名", `<input name="salesName" value="${escapeHTML(item.salesName || item.name || "")}" />`)}
                  ${field("販売年月", `<input name="salesMonth" value="${escapeHTML(item.salesMonth || "")}" placeholder="例：2024/10" />`)}
                  ${field("JANコード", `<input name="janCode" value="${escapeHTML(item.janCode || "")}" />`)}
                </div>
                <div class="form-row">
                  ${field("分類/区分", `<input name="category" value="${escapeHTML(item.category || "")}" />`)}
                  ${field("ブランド", `<input name="brand" value="${escapeHTML(item.brand || "")}" />`)}
                  ${field("内容量", `<input name="contentAmount" value="${escapeHTML(item.contentAmount || "")}" />`)}
                </div>
                <div class="form-row">
                  ${field("製造者", `<input name="manufacturer" value="${escapeHTML(item.manufacturer || "")}" />`)}
                  ${field("連絡先", `<input name="contact" value="${escapeHTML(item.contact || "")}" />`)}
                  ${field("生産国", `<input name="countryOfOrigin" value="${escapeHTML(item.countryOfOrigin || "")}" />`)}
                </div>
                <div class="form-row">
                  ${field("賞味期限", `<input name="bestBefore" value="${escapeHTML(item.bestBefore || "")}" placeholder="例：2027/06" />`)}
                  ${field("定価（税抜）", `<input name="listPriceTaxExcluded" value="${escapeHTML(item.listPriceTaxExcluded || "")}" />`)}
                  ${field("販売単位", `<input name="salesUnit" value="${escapeHTML(item.salesUnit || "")}" />`)}
                </div>
                <h4>サイズ・重量・管理</h4>
                <div class="form-row">
                  ${field("単品サイズ（幅×高×奥）", `<input name="unitSize" value="${escapeHTML(item.unitSize || "")}" />`)}
                  ${field("ボールサイズ（幅×高×奥）", `<input name="ballSize" value="${escapeHTML(item.ballSize || "")}" />`)}
                  ${field("ケースサイズ（幅×高×奥）", `<input name="caseSize" value="${escapeHTML(item.caseSize || "")}" />`)}
                </div>
                <div class="form-row">
                  ${field("単品重量", `<input name="unitWeight" value="${escapeHTML(item.unitWeight || "")}" />`)}
                  ${field("ボール重量", `<input name="ballWeight" value="${escapeHTML(item.ballWeight || "")}" />`)}
                  ${field("ケース重量", `<input name="caseWeight" value="${escapeHTML(item.caseWeight || "")}" />`)}
                </div>
                <div class="form-row">
                  ${field("库存预警线", `<input name="warning" type="number" min="0" value="${Number(item.warning || 0)}" />`)}
                  ${field("销售价", `<input name="price" type="number" min="0" value="${Number(item.price || 0)}" />`)}
                </div>
                <div class="form-row">
                  ${field("更换图片", `<input name="imageFile" type="file" accept="image/*" />`)}
                  ${field("更换条码图片", `<input name="barcodeImageFile" type="file" accept="image/*" />`)}
                  <div class="product-status">
                    <span>当前库存</span>
                    <strong>${stockFor(item.id)}</strong>
                  </div>
                  <div class="product-status">
                    <span>库存状态</span>
                    <strong>${stockFor(item.id) <= Number(item.warning || 0) ? `<span class="danger">低库存</span>` : `<span class="ok">正常</span>`}</strong>
                  </div>
                </div>
                <h4>製品説明</h4>
                ${field("製品特徴", `<textarea name="features" rows="4">${escapeHTML(item.features || "")}</textarea>`)}
                ${field("原材料名（全成分）", `<textarea name="ingredients" rows="3">${escapeHTML(item.ingredients || "")}</textarea>`)}
                ${field("使用方法", `<textarea name="usage" rows="3">${escapeHTML(item.usage || "")}</textarea>`)}
                ${field("使用上の注意", `<textarea name="cautions" rows="3">${escapeHTML(item.cautions || "")}</textarea>`)}
                <div class="form-row">
                  ${field("販促物", `<input name="promotionalMaterials" value="${escapeHTML(item.promotionalMaterials || "")}" />`)}
                  ${field("規格/備考", `<input name="spec" value="${escapeHTML(item.spec || "")}" />`)}
                  ${field("備考欄", `<input name="remarks" value="${escapeHTML(item.remarks || "")}" />`)}
                </div>
                <div class="button-row">
                  <button class="primary">保存商品修改</button>
                  <button type="button" class="marketplace-draft-from-product" data-product-id="${item.id}">この商品を会社ラク市場に掲載する</button>
                  <button type="button" class="product-spec-export" data-product-id="${item.id}">製品規格書PDF</button>
                  <button type="button" class="product-edit-cancel" data-product-id="${item.id}">取消</button>
                  ${(item.image || item.imageId) ? `<button type="button" class="product-image-remove">删除图片</button>` : ""}
                  ${(item.barcodeImage || item.barcodeImageId) ? `<button type="button" class="product-barcode-image-remove">删除条码图片</button>` : ""}
                </div>
              </div>
            </div>
          </form>
        </td>
      </tr>
    `;
  }).join("");

  return `
    <section class="table-card">
      <div class="table-head"><h3>商品列表</h3></div>
      <div class="table-scroll">
        <table id="products-table">
          <thead><tr><th>商品</th><th>SKU</th><th>条码</th><th>分类</th><th>库存</th><th>预警</th><th>售价</th><th>操作</th></tr></thead>
          <tbody>${rows || `<tr><td colspan="8" class="empty">暂无商品</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderInventory() {
  return `
    ${collapsible("库存动作", "入库、出库、退货、调拨、盘点、损耗", `
    <form class="form-card compact-form" id="stock-form">
      <div class="form-title">
        <h3>库存动作</h3>
        <span>所有动作都会写入流水，库存数量自动联动</span>
      </div>
      <div class="form-row">
        <select name="action">${actionTypes.map(item => `<option>${item}</option>`).join("")}</select>
        <select name="productId">${state.products.map(item => `<option value="${item.id}">${escapeHTML(item.name)} · ${escapeHTML(item.sku)}</option>`).join("")}</select>
        <select name="operatorId">${state.users.map(item => `<option value="${item.id}">${escapeHTML(item.name)} · ${escapeHTML(t(item.role))}</option>`).join("")}</select>
      </div>
      <div class="form-row">
        <select name="batchId">
          <option value="">新批次 / 不指定批次</option>
          ${state.batches.filter(item => Number(item.quantity) > 0).map(item => `<option value="${item.id}">${escapeHTML(product(item.productId)?.name || "商品")} · ${escapeHTML(item.code)} · ${locationName(item.locationId)} · ${item.quantity}</option>`).join("")}
        </select>
        <select name="fromLocationId">
          <option value="">来源位置</option>
          ${state.locations.map(item => `<option value="${item.id}">${escapeHTML(item.name)}</option>`).join("")}
        </select>
        <select name="toLocationId">
          <option value="">目标位置</option>
          ${state.locations.map(item => `<option value="${item.id}">${escapeHTML(item.name)}</option>`).join("")}
        </select>
      </div>
      <div class="form-row">
        <input name="quantity" placeholder="数量 / 盘点后数量" type="number" min="0" value="1" />
        <input name="code" placeholder="新批次号" />
        <input name="expires" type="date" />
      </div>
      <input name="note" placeholder="备注：订单号、损耗原因、调拨说明等" />
      <button class="primary">保存库存动作</button>
    </form>
    `, true)}
    <div class="hint">
      入库/退货入库：选择商品和目标位置，可填写新批次。出库/损耗/盘点：优先选择现有批次。调拨：选择现有批次和目标位置。
    </div>
    <section class="content-grid">
      ${collapsible("修改库存批次", "修正批次、位置、到期日和当前数量", `
      <form class="form-card compact-form" id="batch-edit-form">
        <div class="form-title">
          <h3>修改库存批次</h3>
          <span>修正批次、位置、到期日和当前数量</span>
        </div>
        <select name="batchId">${state.batches.map(item => `<option value="${item.id}">${escapeHTML(product(item.productId)?.name || "商品")} · ${escapeHTML(item.code)} · ${item.quantity}</option>`).join("")}</select>
        <div class="form-row">
          <input name="code" placeholder="新批次号（留空不改）" />
          <select name="locationId">
            <option value="">位置不变</option>
            ${state.locations.map(item => `<option value="${item.id}">${escapeHTML(item.name)}</option>`).join("")}
          </select>
          <input name="expires" type="date" />
        </div>
        <div class="form-row">
          <input name="quantity" placeholder="当前数量（留空不改）" type="number" min="0" />
          <input name="note" placeholder="修改备注" />
          <button class="primary">保存修改</button>
        </div>
      </form>
      `)}
      ${collapsible("删除库存批次", "正式版会改成归档；当前开发版会直接移除", `
      <form class="form-card compact-form" id="batch-delete-form">
        <div class="form-title">
          <h3>删除库存批次</h3>
          <span>正式版会改成归档；当前开发版会直接移除</span>
        </div>
        <select name="batchId">${state.batches.map(item => `<option value="${item.id}">${escapeHTML(product(item.productId)?.name || "商品")} · ${escapeHTML(item.code)} · ${item.quantity}</option>`).join("")}</select>
        <input name="note" placeholder="删除原因" />
        <button class="danger-button">删除批次</button>
      </form>
      `)}
    </section>
    ${tableCard("批次库存", ["商品", "批次", "位置", "到期", "批次数量", "商品总库存", "状态"], state.batches.map(item => [
      escapeHTML(product(item.productId)?.name || "未知商品"),
      escapeHTML(item.code),
      escapeHTML(locationName(item.locationId)),
      expiryText(item.expires),
      item.quantity,
      stockFor(item.productId),
      batchStatus(item),
    ]), "batches-table")}
  `;
}

function renderTransactions() {
  return `
    <div class="toolbar-line">
      <input id="transaction-filter" placeholder="搜索动作、商品、位置、备注" />
    </div>
    ${tableCard("库存流水", ["时间", "动作", "商品", "批次", "数量", "位置", "操作人", "备注"], state.transactions.map(row => [
      new Date(row.at).toLocaleString("ja-JP"),
      actionPill(row.action),
      escapeHTML(product(row.productId)?.name || "未知商品"),
      escapeHTML(batch(row.batchId)?.code || ""),
      signedQuantity(row),
      escapeHTML(locationText(row)),
      escapeHTML(operatorName(row.operatorId)),
      escapeHTML(row.note || ""),
    ]), "transactions-table")}
  `;
}

function renderSales() {
  const totalSales = state.sales.reduce((sum, item) => sum + saleAmount(item), 0);
  const defaultProduct = state.products[0];
  return `
    <section class="sales-top-strip">
      ${metric("销售额", money(totalSales))}
      <div class="sales-top-tools">
        ${collapsible("新增固定取引先", "登録", `
        <form class="form-card compact-form" id="customer-form">
          <div class="form-row">
            ${field("会社名", `<input name="name" required />`)}
            ${field("請求書宛名", `<input name="invoiceTitle" placeholder="株式会社〇〇 御中" />`)}
            ${field("担当者", `<input name="contact" />`)}
          </div>
          <div class="form-row">
            ${field("メール", `<input name="email" type="email" />`)}
            ${field("電話", `<input name="phone" />`)}
            ${field("郵便番号", `<input name="postalCode" />`)}
          </div>
          ${field("住所", `<input name="address" />`)}
          <div class="form-row">
            ${field("締め日", `<input name="closingDay" value="月末締め" />`)}
            ${field("支払条件", `<input name="paymentTerm" value="翌月末払い" />`)}
            ${field("納品先", `<input name="deliveryAddress" placeholder="同上 / 別住所" />`)}
          </div>
          ${field("備考", `<input name="note" />`)}
          <button class="primary">取引先を保存</button>
        </form>
        `)}
      ${renderCustomerManager()}
      </div>
    </section>
    ${collapsible("新增销售", "选择客户后，后续可用于請求書・納品書", `
    <form class="form-card compact-form" id="sale-form">
      <div class="form-title">
        <h3>新增销售</h3>
        <span>参考销售表：按商品、平台/店铺、数量和单价记录</span>
      </div>
      <div class="form-row">
        ${field("销售日期", `<input name="date" type="date" value="${new Date().toISOString().slice(0, 10)}" />`)}
        ${field("客户", `<select name="customerId">${state.customers.map(item => `<option value="${item.id}">${escapeHTML(item.name)}</option>`).join("")}</select>`)}
        ${field("商品", `<select name="productId">${state.products.map(item => `<option value="${item.id}" data-price="${Number(item.price || 0)}">${escapeHTML(item.name)} · ${escapeHTML(item.sku)}</option>`).join("")}</select>`)}
      </div>
      <div class="form-row">
        ${field("平台/店铺", `<select name="locationId">${state.locations.map(item => `<option value="${item.id}">${escapeHTML(item.name)} · ${escapeHTML(t(item.type))}</option>`).join("")}</select>`)}
        ${field("员工", `<select name="staffId">${state.users.map(item => `<option value="${item.id}">${escapeHTML(item.name)} · ${escapeHTML(t(item.role))}</option>`).join("")}</select>`)}
        ${field("销售数量", `<input name="quantity" type="number" min="1" value="1" />`)}
      </div>
      <div class="form-row">
        ${field("销售单价（税抜）", `<input name="unitPrice" type="number" min="0" value="${Number(defaultProduct?.price || 0)}" />`)}
        ${field("税率 %", `<input name="taxRate" type="number" min="0" step="0.1" value="10" />`)}
        ${field("平台手续费", `<input name="platformFee" type="number" min="0" />`)}
      </div>
      <div class="form-row">
        ${field("运费", `<input name="shipping" type="number" min="0" />`)}
        ${field("备注/注文番号・納品書番号など", `<input name="note" />`)}
      </div>
      <button class="primary">保存销售</button>
    </form>
    `, true)}
    <div class="toolbar-line">
      <input id="sales-filter" placeholder="搜索日期、客户、商品、平台、员工、备注" />
    </div>
    ${renderSalesTable()}
  `;
}

function renderSalesTable() {
  const rows = state.sales.map((item) => {
    const productItem = product(item.productId) || {};
    const sku = productItem.sku || productItem.name || "未设置SKU";
    const search = escapeHTML([
      item.date,
      customerName(item.customerId),
      productItem.name,
      productItem.sku,
      productItem.barcode,
      locationName(item.locationId),
      operatorName(item.staffId),
      item.note,
    ].join(" ").toLowerCase());
    return `
      <tr class="sale-row" data-sale-id="${item.id}" data-sale-search="${search}">
        <td>
          <button type="button" class="link-button sale-detail-toggle" data-sale-id="${item.id}">
            <strong>${escapeHTML(sku)}</strong>
          </button>
        </td>
        <td>${Number(item.quantity || 0)}</td>
        <td>${stockFor(item.productId)}</td>
        <td>${Number(item.taxRate ?? 10)}%</td>
        <td>${money(saleAmount(item))}</td>
      </tr>
      <tr class="sale-detail-row" data-sale-id="${item.id}" data-sale-search="${search}" hidden>
        <td colspan="5">
          <div class="sale-detail-panel">
            <div class="detail-grid">
              <div><span>日期</span><strong>${escapeHTML(item.date)}</strong></div>
              <div><span>客户</span><strong>${escapeHTML(customerName(item.customerId))}</strong></div>
              <div><span>平台/店铺</span><strong>${escapeHTML(locationName(item.locationId))}</strong></div>
              <div><span>员工</span><strong>${escapeHTML(operatorName(item.staffId))}</strong></div>
              <div><span>商品</span><strong>${escapeHTML(productItem.name || "未知商品")}</strong></div>
              <div><span>单价</span><strong>${money(Number(item.unitPrice || 0))}</strong></div>
              <div><span>费用</span><strong>${money(Number(item.platformFee || 0) + Number(item.shipping || 0))}</strong></div>
              <div><span>毛利</span><strong>${money(saleProfit(item))}</strong></div>
              <div><span>当前库存</span><strong>合計 ${stockFor(item.productId)} / この拠点 ${stockForProductAtLocation(item.productId, item.locationId)}</strong></div>
            </div>
            ${item.note ? `<div class="detail-note"><span>备注</span><strong>${escapeHTML(item.note)}</strong></div>` : ""}
            <div class="button-row compact-buttons sale-document-buttons">
              <button type="button" class="table-action sale-document-export" data-sale-id="${item.id}" data-document-type="combined">請求書兼納品書</button>
              <button type="button" class="table-action sale-document-export" data-sale-id="${item.id}" data-document-type="invoice">請求書</button>
              <button type="button" class="table-action sale-document-export" data-sale-id="${item.id}" data-document-type="delivery">納品書</button>
            </div>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  return `
    <section class="table-card">
      <div class="table-head"><h3>销售记录</h3></div>
      <div class="table-scroll">
        <table id="sales-table">
          <thead><tr><th>SKU</th><th>销售数量</th><th>剩余库存</th><th>税率</th><th>金额</th></tr></thead>
          <tbody>${rows || `<tr><td colspan="5" class="empty">暂无数据</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}

function expenseAmount(item) {
  return Number(item.amount || 0);
}

function expenseTaxAmount(item) {
  const rate = Number(item.taxRate ?? 10);
  return Math.round(expenseAmount(item) * rate / (100 + rate));
}

function monthKey(value) {
  if (value instanceof Date) {
    return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}`;
  }
  return String(value || "").slice(0, 7);
}

function addMonths(date, count) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + count);
  return next;
}

function expensePeriodMonths() {
  const start = new Date(state.expensePeriod?.start || `${new Date().getFullYear()}-01-01`);
  const end = new Date(state.expensePeriod?.end || `${new Date().getFullYear()}-12-31`);
  const months = [];
  let cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
  while (cursor <= endMonth && months.length < 12) {
    months.push(monthKey(cursor));
    cursor = addMonths(cursor, 1);
  }
  return months.length ? months : [monthKey(new Date())];
}

function expenseProjectNames() {
  const defaults = ["产品进价", "物流费", "办公室费用", "人工费", "广告费", "平台手续费", "仓储费", "其他费用"];
  return [...new Set([...defaults, ...state.expenses.map((item) => item.category).filter(Boolean)])];
}

function expenseProjectMonthTotal(projectName, month) {
  return state.expenses
    .filter((item) => item.category === projectName && monthKey(item.date) === month)
    .reduce((sum, item) => sum + expenseAmount(item), 0);
}

function expensesForProjectMonth(projectName, month) {
  return state.expenses
    .filter((item) => item.category === projectName && monthKey(item.date) === month)
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));
}

function expenseDetailPanel(projectName, month) {
  const items = expensesForProjectMonth(projectName, month);
  const total = items.reduce((sum, item) => sum + expenseAmount(item), 0);
  return `
    <section class="expense-detail-panel" data-expense-detail="${escapeHTML(`${projectName}|${month}`)}" hidden>
      <div class="table-head">
        <h3>${escapeHTML(projectName)} · ${escapeHTML(month)} 明细</h3>
        <span class="permission-note">合計 ${money(total)}</span>
      </div>
      <div class="record-list">
        ${items.map((item) => `
          <div class="deleted-record-row">
            <div>
              <strong>${escapeHTML(item.category)} · ${escapeHTML(item.date)} · ${money(expenseAmount(item))}</strong>
              <span>税率 ${Number(item.taxRate ?? 10)}% · 備考：${escapeHTML(item.note || "なし")}</span>
            </div>
            <button type="button" class="danger-button table-action expense-delete-button" data-expense-id="${item.id}">删除</button>
          </div>
        `).join("") || `<div class="empty compact-empty">暂无明细</div>`}
      </div>
    </section>
  `;
}

function marketplaceRuleText() {
  return "会社ラク市場は、事業者間の商品情報掲載および商談機会の提供を目的としたB2Bマッチングサービスです。売買契約、決済、配送、返品、品質保証等は、売主と買主の間で直接確認・実施してください。当社は取引の当事者ではなく、決済代行・保証・仲介手数料の徴収は行いません。";
}

function marketplaceListingRuleText() {
  return "禁止商品、虚偽表示、誇大広告、第三者の権利を侵害する商品、法令に違反する商品は掲載できません。掲載内容に問題がある場合、当社は事前通知なく掲載停止またはアカウント停止を行うことがあります。";
}

function marketplacePlanLimit() {
  const plan = state.marketplaceSettings.membershipPlan || "Free";
  const value = state.marketplaceSettings.listingLimits?.[plan];
  return value === "unlimited" ? Infinity : Number(value || 1);
}

function marketplacePublishedCount(userId = currentUserId) {
  return state.marketplaceListings.filter((item) => item.ownerUserId === userId && item.status !== "已下架").length;
}

function marketplaceDailyInquiryLimit() {
  const plan = state.marketplaceSettings.membershipPlan || "Free";
  if (plan === "SVIP") return 200;
  if (plan === "VIP") return 50;
  return 10;
}

function marketplaceTodayInquiryCount(userId = currentUserId) {
  const today = new Date().toISOString().slice(0, 10);
  return state.marketplaceInquiries.filter((item) => item.buyerUserId === userId && String(item.createdAt || "").slice(0, 10) === today).length;
}

function sellerVerification(userId = currentUserId) {
  return state.marketplaceVerifications.find((item) => item.userId === userId && item.verificationType === "seller");
}

function sellerVerified(userId = currentUserId) {
  return sellerVerification(userId)?.status === "approved";
}

function marketplaceStatusPill(status) {
  const map = { "已掲載": "pill", "审核中": "pill blue", "审核不通过": "pill red", "已下架": "pill muted", "草稿": "pill muted", "暂停掲載": "pill blue" };
  const label = { "已掲載": "掲載中", "审核中": "審査中", "审核不通过": "審査不通過", "已下架": "掲載終了", "草稿": "下書き", "暂停掲載": "掲載停止" }[status] || status;
  return `<span class="${map[status] || "pill muted"}">${escapeHTML(label)}</span>`;
}

function listingProductText(productItem) {
  return [
    productItem.salesName || productItem.name,
    productItem.spec,
    productItem.features,
    productItem.ingredients,
    productItem.usage,
    productItem.cautions,
    productItem.remarks,
  ].filter(Boolean).join("\n");
}

function listingRiskReasons(input) {
  const text = `${input.title || ""} ${input.description || ""} ${input.categoryId || ""}`.toLowerCase();
  const sensitive = (state.marketplaceSettings.sensitiveWords || []).filter((word) => text.includes(String(word).toLowerCase()));
  const prohibited = (state.marketplaceSettings.prohibitedCategories || []).filter((word) => text.includes(String(word).toLowerCase()));
  return [...sensitive.map((word) => `敏感詞: ${word}`), ...prohibited.map((word) => `禁止カテゴリ: ${word}`)];
}

function renderMarketplace() {
  const publishedListings = state.marketplaceListings.filter((item) => item.status === "已掲載");
  const categories = Array.from(new Set(state.marketplaceListings.map((item) => item.categoryId).filter(Boolean)));
  const myListings = state.marketplaceListings.filter((item) => item.ownerUserId === currentUserId);
  const myInquiries = state.marketplaceInquiries.filter((item) => item.buyerUserId === currentUserId);
  const receivedInquiries = state.marketplaceInquiries.filter((item) => item.sellerUserId === currentUserId);
  const verification = sellerVerification();
  const plan = state.marketplaceSettings.membershipPlan || "Free";
  const limit = marketplacePlanLimit();
  const limitText = limit === Infinity ? "無制限" : `${limit}件`;

  return `
    <section class="market-hero">
      <div>
        <p class="eyebrow">B2B商品掲載・卸相談・商談マッチング</p>
        <h3>会社ラク市場</h3>
        <p>${marketplaceRuleText()}</p>
      </div>
      <div class="market-plan-box">
        <span>現在のプラン</span>
        <strong>${escapeHTML(plan)}</strong>
        <small>掲載上限 ${limitText} / 現在 ${marketplacePublishedCount()}件</small>
      </div>
    </section>

    <section class="grid market-grid">
      ${metric("掲載商品", state.marketplaceListings.length)}
      ${metric("公開中", publishedListings.length)}
      ${metric("受信した問い合わせ", receivedInquiries.length)}
      ${metric("会社認証", verificationStatusText(verification?.status))}
    </section>

    <section class="market-toolbar">
      <input id="marketplace-filter" placeholder="商品名、カテゴリ、会社名で検索" />
      <select id="marketplace-category-filter">
        <option value="">すべてのカテゴリ</option>
        ${categories.map((item) => `<option value="${escapeHTML(item)}">${escapeHTML(item)}</option>`).join("")}
      </select>
    </section>

    ${renderMarketplaceListingForm()}
    ${renderMarketplacePublicListings(publishedListings)}
    ${renderMarketplaceMyListings(myListings)}
    ${renderMarketplaceInquiryPanels(myInquiries, receivedInquiries)}
    ${renderMarketplaceVerification(verification)}
    ${renderMarketplaceAdmin()}
    ${renderMarketplaceRules()}
  `;
}

function verificationStatusText(status = "") {
  const map = { approved: "認証済み", pending: "審査中", rejected: "差戻し", draft: "未申請" };
  return map[status] || "未申請";
}

function renderMarketplaceListingForm() {
  const productItem = product(marketplaceDraftProductId) || state.products[0] || {};
  const listingCount = marketplacePublishedCount();
  const limit = marketplacePlanLimit();
  const disabled = !sellerVerified();
  return collapsible("会社ラク市場に掲載する", "既存の商品情報を使ってB2B市場に掲載します", `
    <form class="form-card compact-form" id="marketplace-listing-form">
      <div class="form-title">
        <h3>この商品を会社ラク市場に掲載する</h3>
        <span>${marketplaceListingRuleText()}</span>
      </div>
      ${!sellerVerified() ? `<div class="hint">掲載には売主の会社認証が必要です。下の「会社認証」から申請してください。</div>` : ""}
      ${listingCount >= limit ? `<div class="hint">現在のプランでは掲載可能数の上限に達しました。プランをアップグレードすると、さらに多くの商品を掲載できます。</div>` : ""}
      <div class="form-row">
        ${field("掲載元商品", `<select name="productId">${state.products.map((item) => `<option value="${item.id}" ${item.id === productItem.id ? "selected" : ""}>${escapeHTML(item.name)} · ${escapeHTML(item.sku)}</option>`).join("")}</select>`)}
        ${field("市場展示タイトル", `<input name="title" value="${escapeHTML(productItem.salesName || productItem.name || "")}" required />`)}
        ${field("カテゴリ", `<input name="categoryId" value="${escapeHTML(productItem.category || "")}" />`)}
      </div>
      ${field("商品規格書の内容", `<textarea name="description" rows="5">${escapeHTML(listingProductText(productItem))}</textarea>`)}
      <div class="form-row">
        ${field("価格公開", `<select name="priceVisible"><option value="false">価格は個別相談</option><option value="true">価格を公開</option></select>`)}
        ${field("卸価格説明", `<input name="wholesalePriceText" placeholder="例：100個以上 850円/個、数量により相談" />`)}
        ${field("MOQ", `<input name="moq" placeholder="例：24個 / 1ケース" />`)}
      </div>
      <div class="form-row">
        ${field("供給可能数量", `<input name="availableQuantity" value="${stockFor(productItem.id)}" />`)}
        ${field("発送地", `<input name="shippingFrom" placeholder="例：東京都 / 大阪府" />`)}
        ${field("連絡先公開", `<select name="contactVisible"><option value="true">公開する</option><option value="false">問い合わせ後に公開</option></select>`)}
      </div>
      <div class="form-row">
        ${field("会社名", `<input name="companyName" value="${escapeHTML(sellerVerification()?.legalName || "会社ラク経営株式会社")}" required />`)}
        ${field("担当者", `<input name="contactPerson" value="${escapeHTML(currentUser()?.name || "")}" />`)}
        ${field("電話", `<input name="contactPhone" value="${escapeHTML(sellerVerification()?.phone || "")}" />`)}
      </div>
      <div class="form-row">
        ${field("メール", `<input name="contactEmail" value="${escapeHTML(sellerVerification()?.email || "")}" />`)}
        ${field("会社住所", `<input name="companyAddress" value="${escapeHTML(sellerVerification()?.address || "")}" />`)}
        ${field("Web/SNS", `<input name="websiteUrl" placeholder="https://..." />`)}
      </div>
      <label class="check-line"><input name="ruleAccepted" type="checkbox" required /> 市場掲載ルールに同意します</label>
      <button class="primary" ${disabled || listingCount >= limit ? "disabled" : ""}>審査へ提出</button>
    </form>
  `, Boolean(marketplaceDraftProductId));
}

function renderMarketplacePublicListings(listings) {
  const cards = listings.map((item) => {
    const productItem = product(item.productId) || {};
    const search = `${item.title} ${item.categoryId} ${item.companyName}`.toLowerCase();
    const image = mediaImageMarkup(productItem.imageId, productItem.image, item.title);
    return `
      <details class="record-panel marketplace-card" data-marketplace-card data-marketplace-search="${escapeHTML(search)}" data-marketplace-category="${escapeHTML(item.categoryId || "")}">
        <summary>
          <span>
            <strong>${escapeHTML(item.title)}</strong>
            <small>${escapeHTML(item.companyName)} · ${escapeHTML(item.categoryId || "カテゴリ未設定")} · MOQ ${escapeHTML(item.moq || "相談")}</small>
          </span>
        </summary>
        <div class="collapse-body market-detail">
          <div class="product-edit-layout">
            <div class="product-image-box">${image || `<span>画像なし</span>`}</div>
            <div class="product-edit-fields">
              <div class="detail-grid">
                <div><span>卸価格</span><strong>${item.priceVisible ? escapeHTML(item.wholesalePriceText || item.priceText || "相談") : "個別相談"}</strong></div>
                <div><span>可供給数</span><strong>${escapeHTML(item.availableQuantity || "相談")}</strong></div>
                <div><span>発送地</span><strong>${escapeHTML(item.shippingFrom || "-")}</strong></div>
              </div>
              <p class="market-description">${escapeHTML(item.description || "")}</p>
              <div class="detail-grid">
                <div><span>会社名</span><strong>${escapeHTML(item.companyName || "-")}</strong></div>
                <div><span>担当者</span><strong>${item.contactVisible ? escapeHTML(item.contactPerson || "-") : "問い合わせ後に公開"}</strong></div>
                <div><span>連絡先</span><strong>${item.contactVisible ? escapeHTML(`${item.contactPhone || ""} ${item.contactEmail || ""}`.trim() || "-") : "非公開"}</strong></div>
              </div>
              <div class="button-row">
                <button type="button" class="primary marketplace-inquiry-open" data-listing-id="${item.id}">卸価格を相談する</button>
                <button type="button" class="marketplace-talk-open" data-listing-id="${item.id}">商談を申し込む</button>
                <button type="button" class="marketplace-favorite-button" data-listing-id="${item.id}">お気に入りに追加</button>
                <button type="button" class="marketplace-report-button" data-listing-id="${item.id}">通報する</button>
              </div>
              ${renderMarketplaceInquiryForm(item)}
            </div>
          </div>
        </div>
      </details>
    `;
  }).join("");
  return `
    <section class="table-card market-section">
      <div class="table-head"><h3>市場商品一覧</h3><span class="permission-note">事業者間の商品掲載と商談入口</span></div>
      <div class="record-list">${cards || `<div class="empty">公開中の商品はまだありません</div>`}</div>
    </section>
  `;
}

function renderMarketplaceInquiryForm(listing) {
  return `
    <form class="form-card compact-form marketplace-inquiry-form" data-listing-id="${listing.id}" hidden>
      <div class="form-title">
        <h3>お問い合わせ</h3>
        <span>お問い合わせ内容は売主に送信されます。取引条件、支払い方法、配送方法、返品条件等は、売主と直接確認してください。</span>
      </div>
      <input type="hidden" name="purpose" value="卸価格相談" />
      <div class="form-row">
        ${field("希望数量", `<input name="requestedQuantity" required />`)}
        ${field("希望価格", `<input name="desiredPrice" />`)}
        ${field("希望納期", `<input name="desiredDeliveryDate" type="date" />`)}
      </div>
      <div class="form-row">
        ${field("納品先地域", `<input name="deliveryArea" />`)}
        ${field("会社名", `<input name="buyerCompanyName" required />`)}
        ${field("担当者名", `<input name="buyerContactName" required />`)}
      </div>
      <div class="form-row">
        ${field("電話", `<input name="buyerPhone" required />`)}
        ${field("メール", `<input name="buyerEmail" type="email" required />`)}
        ${field("サンプル希望", `<select name="needsSample"><option value="false">不要</option><option value="true">希望する</option></select>`)}
      </div>
      ${field("その他希望", `<textarea name="message" rows="3"></textarea>`)}
      <button class="primary">送信する</button>
    </form>
  `;
}

function renderMarketplaceMyListings(listings) {
  const rows = listings.map((item) => [
    escapeHTML(item.title),
    marketplaceStatusPill(item.status),
    escapeHTML(item.reviewReason || "-"),
    escapeHTML(new Date(item.updatedAt || item.createdAt).toLocaleString("ja-JP")),
    `<button type="button" class="table-action marketplace-unpublish-button" data-listing-id="${item.id}">掲載終了</button>`,
  ]);
  return tableCard("自社掲載商品", ["商品", "状態", "審査理由", "更新日", "操作"], rows);
}

function renderMarketplaceInquiryPanels(myInquiries, receivedInquiries) {
  const myRows = myInquiries.map((item) => {
    const listing = state.marketplaceListings.find((listingItem) => listingItem.id === item.listingId);
    return [
      escapeHTML(listing?.title || "-"),
      escapeHTML(item.requestedQuantity || "-"),
      escapeHTML(item.status),
      escapeHTML(item.sellerReply || "-"),
    ];
  });
  const receivedRows = receivedInquiries.map((item) => {
    const listing = state.marketplaceListings.find((listingItem) => listingItem.id === item.listingId);
    return [
      escapeHTML(listing?.title || "-"),
      escapeHTML(item.buyerCompanyName || "-"),
      escapeHTML(item.requestedQuantity || "-"),
      escapeHTML(item.status),
      `<button type="button" class="table-action marketplace-reply-toggle" data-inquiry-id="${item.id}">返信</button>`,
    ];
  });
  const replyForms = receivedInquiries.map((item) => `
    <form class="form-card compact-form marketplace-reply-form" data-inquiry-id="${item.id}" hidden>
      <div class="form-title"><h3>問い合わせ返信</h3><span>「成約」表示は売主の管理記録であり、当サービスが取引を確認するものではありません。</span></div>
      <div class="form-row">
        ${field("卸単価", `<input name="sellerUnitPrice" value="${escapeHTML(item.sellerUnitPrice || "")}" />`)}
        ${field("参考総額", `<input name="sellerTotalPrice" value="${escapeHTML(item.sellerTotalPrice || "")}" />`)}
        ${field("納期", `<input name="sellerDeliveryTime" value="${escapeHTML(item.sellerDeliveryTime || "")}" />`)}
      </div>
      <div class="form-row">
        ${field("送料条件", `<input name="sellerShippingTerms" value="${escapeHTML(item.sellerShippingTerms || "")}" />`)}
        ${field("税込/税別", `<select name="sellerTaxIncluded"><option ${item.sellerTaxIncluded === "税別" ? "selected" : ""}>税別</option><option ${item.sellerTaxIncluded === "税込" ? "selected" : ""}>税込</option><option ${item.sellerTaxIncluded === "未設定" ? "selected" : ""}>未設定</option></select>`)}
        ${field("連絡可能時間", `<input name="sellerContactTime" value="${escapeHTML(item.sellerContactTime || "")}" />`)}
      </div>
      ${field("連絡先", `<input name="sellerContact" value="${escapeHTML(item.sellerContact || "")}" />`)}
      ${field("返信内容", `<textarea name="sellerReply" rows="3">${escapeHTML(item.sellerReply || "")}</textarea>`)}
      <div class="button-row">
        <button class="primary" name="replyAction" value="reply">情報のみ返信</button>
        <button name="replyAction" value="price">卸価格を返信</button>
        <button name="replyAction" value="reject">問い合わせを辞退</button>
        <button name="replyAction" value="offline">直接連絡を案内</button>
        <button name="replyAction" value="contacted">連絡済みにする</button>
        <button name="replyAction" value="closed">成約済みにする</button>
      </div>
    </form>
  `).join("");
  return `
    <section class="content-grid">
      ${tableCard("自分の問い合わせ", ["商品", "数量", "状態", "売主返信"], myRows)}
      <section>
        ${tableCard("受信した問い合わせ", ["商品", "買主会社", "数量", "状態", "操作"], receivedRows)}
        <div class="expense-detail-stack">${replyForms}</div>
      </section>
    </section>
  `;
}

function renderMarketplaceVerification(verification) {
  const ownerDocs = verification?.ownerDocuments || [];
  const companyDocs = verification?.companyDocuments || [];
  const totalDocs = ownerDocs.length + companyDocs.length;
  const totalSize = [...ownerDocs, ...companyDocs].reduce((sum, item) => sum + Number(item.size || 0), 0);
  return collapsible("会社認証状態", verificationStatusText(verification?.status), `
    <form class="form-card compact-form" id="marketplace-verification-form">
      <div class="form-title"><h3>売主会社認証</h3><span>詐欺、違法商品、偽物、取引トラブル防止のための基礎認証です。</span></div>
      <div class="hint">認証資料は最大5ファイル、合計500MBまで。正式版では提出後に管理者メールへ送信し、サーバーには長期保存しない軽量運用を前提にします。開発版ではファイル名と容量のみ本機に記録します。</div>
      <div class="form-row">
        ${field("法人番号", `<input name="corporateNumber" value="${escapeHTML(verification?.corporateNumber || "")}" required />`)}
        ${field("会社名", `<input name="legalName" value="${escapeHTML(verification?.legalName || "")}" required />`)}
        ${field("代表者名", `<input name="representativeName" value="${escapeHTML(verification?.representativeName || "")}" required />`)}
      </div>
      <div class="form-row">
        ${field("登記住所", `<input name="address" value="${escapeHTML(verification?.address || "")}" required />`)}
        ${field("電話番号", `<input name="phone" value="${escapeHTML(verification?.phone || "")}" required />`)}
        ${field("メール", `<input name="email" type="email" value="${escapeHTML(verification?.email || "")}" required />`)}
      </div>
      <div class="market-verification-upload">
        <div class="document-head">
          <strong>社長本人資料</strong>
          <span>運転免許証、マイナンバーカード等</span>
        </div>
        <input name="ownerDocuments" type="file" accept="image/*,.pdf,application/pdf" multiple />
      </div>
      <div class="market-verification-upload">
        <div class="document-head">
          <strong>会社資料</strong>
          <span>登記簿謄本、必要許可証、公共料金支払証明等</span>
        </div>
        <input name="companyDocuments" type="file" accept="image/*,.pdf,application/pdf" multiple />
      </div>
      <div class="detail-grid compact-detail-grid">
        <div><span>提出済み資料</span><strong>${totalDocs} / 5 ファイル</strong></div>
        <div><span>資料容量</span><strong>${fileSizeText(totalSize)} / 500 MB</strong></div>
        <div><span>送信先</span><strong>管理者メール</strong></div>
        <div><span>現在状態</span><strong>${verificationStatusText(verification?.status)}</strong></div>
      </div>
      ${marketplaceVerificationDocumentList("社長本人資料", ownerDocs)}
      ${marketplaceVerificationDocumentList("会社資料", companyDocs)}
      <label class="check-line"><input name="antiSocialCheck" type="checkbox" ${verification?.antiSocialCheck ? "checked" : ""} required /> 反社会勢力ではないことを確認しました</label>
      <button class="primary">認証を申請する</button>
    </form>
  `);
}

function marketplaceVerificationDocumentList(title, documents) {
  if (!documents?.length) return "";
  return `
    <div class="verification-file-list">
      <strong>${escapeHTML(title)}</strong>
      ${documents.map((item) => `<span>${escapeHTML(item.name || "document")} · ${fileSizeText(item.size || 0)}</span>`).join("")}
    </div>
  `;
}

function renderMarketplaceAdmin() {
  if (!can("marketplace", "delete")) return "";
  const listingRows = state.marketplaceListings.map((item) => [
    escapeHTML(item.title),
    escapeHTML(item.companyName || "-"),
    marketplaceStatusPill(item.status),
    escapeHTML(item.reviewReason || "-"),
    `<button type="button" class="table-action marketplace-approve-button" data-listing-id="${item.id}">承認</button>
     <button type="button" class="table-action marketplace-reject-button" data-listing-id="${item.id}">否認</button>
     <button type="button" class="danger-button table-action marketplace-force-stop-button" data-listing-id="${item.id}">強制掲載終了</button>`,
  ]);
  const verificationRows = state.marketplaceVerifications.map((item) => [
    (() => {
      const count = (item.ownerDocuments || []).length + (item.companyDocuments || []).length;
      const size = [...(item.ownerDocuments || []), ...(item.companyDocuments || [])].reduce((sum, doc) => sum + Number(doc.size || 0), 0);
      return `${count}件 / ${fileSizeText(size)}`;
    })(),
    escapeHTML(item.legalName || "-"),
    escapeHTML(item.corporateNumber || "-"),
    escapeHTML(verificationStatusText(item.status)),
    item.documentDelivery === "admin_email" ? "管理者メール" : "未設定",
    `<button type="button" class="table-action marketplace-verification-approve" data-verification-id="${item.id}">認証承認</button>
     <button type="button" class="table-action marketplace-verification-reject" data-verification-id="${item.id}">差戻し</button>`,
  ]);
  const reportRows = state.marketplaceReports.map((item) => [
    escapeHTML(item.reportType || "通報"),
    escapeHTML(item.reportMessage || ""),
    escapeHTML(item.status || "未対応"),
    `<button type="button" class="table-action marketplace-report-close" data-report-id="${item.id}">対応済み</button>`,
  ]);
  return collapsible("市場管理", "商品審査、会社認証、敏感詞、掲載上限を管理します", `
    <form class="form-card compact-form" id="marketplace-settings-form">
      <div class="form-title"><h3>会員掲載数制限 / 敏感詞設定</h3><span>初期敏感詞は一般的なネットサービス審査基準を参考にした簡易設定です。</span></div>
      <div class="form-row">
        ${field("会員ランク", `<select name="membershipPlan"><option ${state.marketplaceSettings.membershipPlan === "Free" ? "selected" : ""}>Free</option><option ${state.marketplaceSettings.membershipPlan === "VIP" ? "selected" : ""}>VIP</option><option ${state.marketplaceSettings.membershipPlan === "SVIP" ? "selected" : ""}>SVIP</option></select>`)}
        ${field("禁止商品カテゴリ", `<input name="prohibitedCategories" value="${escapeHTML((state.marketplaceSettings.prohibitedCategories || []).join("、"))}" />`)}
        ${field("敏感詞", `<input name="sensitiveWords" value="${escapeHTML((state.marketplaceSettings.sensitiveWords || []).join("、"))}" />`)}
      </div>
      <button class="primary">設定を保存</button>
    </form>
    ${tableCard("全市場掲載商品", ["商品", "会社", "状態", "理由", "操作"], listingRows)}
    ${tableCard("売主認証審査", ["資料", "会社", "法人番号", "状態", "提出先", "操作"], verificationRows)}
    ${tableCard("通報管理", ["種類", "内容", "状態", "操作"], reportRows)}
  `);
}

function renderMarketplaceRules() {
  return collapsible("市場ルール/禁止商品説明", "第一版はオンライン取引・決済を行いません", `
    <div class="form-card compact-form">
      <h3>取引方式</h3>
      <p>${marketplaceRuleText()}</p>
      <h3>掲載禁止・審査重点</h3>
      <p>${marketplaceListingRuleText()}</p>
      <ul class="market-rule-list">
        <li>禁止商品、医薬品、処方薬、無許可医療機器は掲載できません。</li>
        <li>化粧品・健康食品の誇大効能、虚偽表示、権利侵害、偽ブランドを禁止します。</li>
        <li>当サービスは決済代行、担保取引、仲介手数料徴収、返品・品質保証対応を行いません。</li>
        <li>将来拡張用に is_featured、featured_until、priority_score、supplier_rank を保持します。</li>
      </ul>
    </div>
  `);
}

function renderExpenses() {
  const months = expensePeriodMonths();
  const projects = expenseProjectNames();
  const periodTotal = projects.reduce((sum, projectName) => (
    sum + months.reduce((monthSum, month) => monthSum + expenseProjectMonthTotal(projectName, month), 0)
  ), 0);
  return `
    <section class="expense-summary-strip">
      ${metric("周期总费用", money(periodTotal))}
      <details class="collapse-card expense-period-compact">
        <summary>
          <span>
            <strong>记账周期设置</strong>
            <small>${escapeHTML(state.expensePeriod.start)} / ${escapeHTML(state.expensePeriod.end)}</small>
          </span>
        </summary>
        <div class="collapse-body">
          <form class="compact-form" id="expense-period-form">
            <div class="form-row">
              ${field("开始日期", `<input name="start" type="date" value="${escapeHTML(state.expensePeriod.start)}" />`)}
              ${field("结束日期", `<input name="end" type="date" value="${escapeHTML(state.expensePeriod.end)}" />`)}
              <button class="primary table-action">更新</button>
            </div>
          </form>
        </div>
      </details>
    </section>
    <section class="expense-control-panel">
      <form class="form-card compact-form" id="expense-form">
        <div class="form-title">
          <h3>新增费用项目</h3>
          <span>项目名可自定义，例如产品进价、物流费、办公室费用、人工费</span>
        </div>
        <div class="form-row">
          ${field("发生日期", `<input name="date" type="date" value="${new Date().toISOString().slice(0, 10)}" />`)}
          ${field("项目名", `<select name="category">${projects.map((item) => `<option value="${escapeHTML(item)}">${escapeHTML(item)}</option>`).join("")}</select>`)}
          ${field("新项目名", `<input name="customCategory" placeholder="没有时填写，会自动加入表格" />`)}
        </div>
        <div class="form-row">
          ${field("金额（税込）", `<input name="amount" type="number" min="0" required />`)}
          ${field("税率 %", `<input name="taxRate" type="number" min="0" step="0.1" value="10" />`)}
          ${field("备注", `<input name="note" />`)}
        </div>
        <button class="primary">保存费用</button>
      </form>
    </section>
    <section class="table-card expense-matrix-card">
      <div class="table-head">
        <h3>12个月费用成本表</h3>
        <span class="permission-note">按项目名汇总，每个月一目了然</span>
      </div>
      <div class="table-scroll">
        <table id="expenses-table" class="expense-matrix">
          <thead>
            <tr>
              <th>项目名</th>
              ${months.map((month) => `<th>${escapeHTML(month)}</th>`).join("")}
              <th>合计</th>
            </tr>
          </thead>
          <tbody>
            ${projects.map((projectName) => {
              const rowTotal = months.reduce((sum, month) => sum + expenseProjectMonthTotal(projectName, month), 0);
              return `
                <tr>
                  <th>${escapeHTML(projectName)}</th>
                  ${months.map((month) => {
                    const value = expenseProjectMonthTotal(projectName, month);
                    return `<td>${value ? `<button type="button" class="amount-link expense-detail-toggle" data-expense-key="${escapeHTML(`${projectName}|${month}`)}">${money(value)}</button>` : `<span class="muted-text">-</span>`}</td>`;
                  }).join("")}
                  <td><strong>${rowTotal ? money(rowTotal) : "-"}</strong></td>
                </tr>
              `;
            }).join("")}
            <tr class="expense-total-row">
              <th>月合计</th>
              ${months.map((month) => {
                const value = projects.reduce((sum, projectName) => sum + expenseProjectMonthTotal(projectName, month), 0);
                return `<td><strong>${value ? money(value) : "-"}</strong></td>`;
              }).join("")}
              <td><strong>${money(periodTotal)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div class="expense-detail-stack">
      ${projects.flatMap((projectName) => months.map((month) => expenseDetailPanel(projectName, month))).join("")}
    </div>
  `;
}

function renderCustomerManager() {
  const cards = state.customers.map((item) => `
    <details class="record-panel">
      <summary>
        <span>
          <strong>${escapeHTML(item.name)}</strong>
          <small>${escapeHTML(item.invoiceTitle || item.name)} · ${escapeHTML(item.paymentTerm || "支払条件未設定")}</small>
        </span>
      </summary>
      <form class="customer-edit-form record-form" data-customer-id="${item.id}">
        <div class="form-row">
          ${field("会社名", `<input name="name" value="${escapeHTML(item.name)}" required />`)}
          ${field("請求書宛名", `<input name="invoiceTitle" value="${escapeHTML(item.invoiceTitle || "")}" />`)}
          ${field("担当者", `<input name="contact" value="${escapeHTML(item.contact || "")}" />`)}
        </div>
        <div class="form-row">
          ${field("メール", `<input name="email" type="email" value="${escapeHTML(item.email || "")}" />`)}
          ${field("電話", `<input name="phone" value="${escapeHTML(item.phone || "")}" />`)}
          ${field("郵便番号", `<input name="postalCode" value="${escapeHTML(item.postalCode || "")}" />`)}
        </div>
        ${field("住所", `<input name="address" value="${escapeHTML(item.address || "")}" />`)}
        <div class="form-row">
          ${field("締め日", `<input name="closingDay" value="${escapeHTML(item.closingDay || "")}" />`)}
          ${field("支払条件", `<input name="paymentTerm" value="${escapeHTML(item.paymentTerm || "")}" />`)}
          ${field("納品先", `<input name="deliveryAddress" value="${escapeHTML(item.deliveryAddress || "")}" />`)}
        </div>
        ${field("備考", `<input name="note" value="${escapeHTML(item.note || "")}" />`)}
        <div class="button-row">
          <button class="primary">保存</button>
          <button type="button" class="danger-button customer-delete-button" data-customer-id="${item.id}">削除</button>
        </div>
      </form>
    </details>
  `).join("");

  return `
    <details class="collapse-card customer-compact-panel">
      <summary>
        <span>
          <strong>ToB固定取引先</strong>
          <small>${state.customers.length} 件</small>
        </span>
      </summary>
      <div class="collapse-body">
        <div class="record-list">${cards || `<div class="empty">暂无客户</div>`}</div>
      </div>
    </details>
  `;
}

function renderEmployees() {
  const activeEmployees = state.users.filter((item) => item.active);
  return `
    <section class="grid">
      ${metric("员工人数", state.users.length)}
      ${metric("在职员工", activeEmployees.length)}
      ${metric("默认基本給合計", money(activeEmployees.reduce((sum, item) => sum + Number(item.baseSalary || 0), 0)))}
      ${metric("工资记录", state.wages.length)}
    </section>
    ${collapsible("新增员工", "员工资料会作为工资计算的默认数据", `
    <form class="form-card compact-form" id="employee-form">
      <div class="form-title">
        <h3>员工资料</h3>
        <span>基本給是实际工资，保険基準額只用于保险计算</span>
      </div>
      <div class="form-row">
        ${field("姓名", `<input name="name" required />`)}
        ${field("员工编号", `<input name="employeeNo" />`)}
        ${field("社員メール", `<input name="email" type="email" placeholder="staff@example.co.jp" />`)}
      </div>
      <div class="form-row">
        ${field("会社内の役割", `<select name="memberRole">${roles.map((role) => `<option value="${role}">${escapeHTML(t(role))}</option>`).join("")}</select>`)}
        ${field("自定义角色", `<input name="role" placeholder="例：正社員 / アルバイト / 店長" />`)}
        ${field("部门", `<input name="department" />`)}
      </div>
      <div class="form-row">
        ${field("入社日", `<input name="joinedAt" type="date" />`)}
        ${field("电话", `<input name="phone" />`)}
        ${field("默认基本給", `<input name="baseSalary" type="number" min="0" value="250000" />`)}
      </div>
      <div class="form-row">
        ${field("默认保険基準額", `<input name="standardSalary" type="number" min="0" value="260000" />`)}
        ${field("证件截止日期", `<input name="documentExpires" type="date" />`)}
        <span></span>
      </div>
      ${field("备注", `<input name="note" />`)}
      <button class="primary">员工を保存</button>
    </form>
    `)}
    ${renderEmployeeManager()}
  `;
}

function employeeLoginAccessPanel(employee) {
  const email = normalizeEmail(employee.email || "");
  const account = email ? rawState.accountUsers.find((item) => normalizeEmail(item.email) === email) : null;
  const member = email ? rawState.companyMembers.find((item) => (
    item.companyId === currentCompanyId
    && item.status !== "removed"
    && (normalizeEmail(item.phoneNumber || "") === email || (account && item.userId === account.id))
  )) : null;
  const invitation = email ? rawState.companyInvitations.find((item) => (
    item.companyId === currentCompanyId
    && item.status === "pending"
    && normalizeEmail(item.phoneNumber || "") === email
  )) : null;
  const ownerCanManage = hasOwnerPermission();
  const accessRole = member?.role || invitation?.role || "只读";
  const accessStatus = member ? "有効" : invitation ? "招待中" : "未設定";
  const expiresAt = invitation ? new Date(invitation.expiresAt).toLocaleDateString("ja-JP") : "-";
  const roleOptions = roles.map((role) => `<option value="${role}" ${role === accessRole ? "selected" : ""}>${escapeHTML(t(role))}</option>`).join("");
  const roleControl = ownerCanManage && member && member.role !== "老板" ? `
    <form class="inline-permission-form employee-member-role-form" data-member-id="${member.id}">
      <select name="role">${roleOptions}</select>
      <button type="submit" class="primary small-button">権限を保存</button>
      <button type="button" class="danger-button small-button company-member-remove" data-member-id="${member.id}">会社アクセス削除</button>
    </form>
  ` : "";
  const inviteButton = ownerCanManage && email && !member && !invitation
    ? `<button type="button" class="primary small-button employee-invite-button" data-employee-id="${employee.id}">ログイン招待を送信</button>`
    : "";
  const hint = email
    ? "社員メールがログインIDになります。"
    : "社員メールを登録するとログイン招待を送信できます。";

  return `
    <div class="employee-documents employee-access-panel">
      <div class="document-head">
        <strong>ログイン権限</strong>
        <span>${hint}</span>
      </div>
      <div class="detail-grid compact-detail-grid">
        <div><span>ログインメール</span><strong>${escapeHTML(email || "-")}</strong></div>
        <div><span>会社内の役割</span><strong>${escapeHTML(t(accessRole))}</strong></div>
        <div><span>状態</span><strong>${escapeHTML(accessStatus)}</strong></div>
        <div><span>招待期限</span><strong>${escapeHTML(expiresAt)}</strong></div>
      </div>
      <div class="button-row">
        ${inviteButton}
        ${roleControl}
      </div>
    </div>
  `;
}

function renderEmployeeManager() {
  const ownerCanManage = hasOwnerPermission();
  const cards = state.users.map((item) => {
    const wages = wagesForEmployee(item.id);
    const documentTotal = employeeDocumentTotal(item);
    const deleteButton = canDeleteEmployee(item)
      ? `<button type="button" class="danger-button employee-delete-button" data-employee-id="${item.id}">删除员工</button>`
      : "";
    return `
      <details class="record-panel employee-panel">
        <summary>
          <span>
            <strong>${escapeHTML(item.name)}</strong>
            <small>${escapeHTML(item.employeeNo || "社員番号未設定")} · ${escapeHTML(item.department || "部署未設定")} · 基本給 ${money(Number(item.baseSalary || 0))} · 保険基準額 ${money(Number(item.standardSalary || item.baseSalary || 0))}</small>
          </span>
        </summary>
        <div class="employee-detail-view record-form">
          <div class="detail-grid">
            <div><span>姓名</span><strong>${escapeHTML(item.name)}</strong></div>
            <div><span>员工编号</span><strong>${escapeHTML(item.employeeNo || "-")}</strong></div>
            <div><span>社員メール</span><strong>${escapeHTML(item.email || "-")}</strong></div>
            <div><span>状态</span><strong>${item.active ? "在籍/有効" : "無効"}</strong></div>
            <div><span>自定义角色</span><strong>${escapeHTML(t(item.role || "员工"))}</strong></div>
            <div><span>部门</span><strong>${escapeHTML(item.department || "-")}</strong></div>
            <div><span>入社日</span><strong>${escapeHTML(item.joinedAt || "-")}</strong></div>
            <div><span>默认基本給</span><strong>${money(Number(item.baseSalary || 0))}</strong></div>
            <div><span>默认保険基準額</span><strong>${money(Number(item.standardSalary || item.baseSalary || 0))}</strong></div>
            <div><span>电话</span><strong>${escapeHTML(item.phone || "-")}</strong></div>
            <div><span>证件截止日期</span><strong>${documentExpiryText(item.documentExpires)}</strong></div>
            <div><span>证件文件</span><strong>${item.documents.length} 件</strong></div>
            <div><span>证件容量</span><strong>${fileSizeText(documentTotal)} / 100 MB</strong></div>
          </div>
          <div class="detail-note">
            <span>备注</span>
            <strong>${escapeHTML(item.note || "-")}</strong>
          </div>
          ${employeeLoginAccessPanel(item)}
          <div class="employee-documents">
            <div class="document-head">
              <strong>证件信息</strong>
              <span>支持图片和 PDF，多文件总量不超过 100MB</span>
            </div>
            <div class="document-upload-row">
              <input class="employee-document-input" data-employee-id="${item.id}" type="file" accept="image/*,.pdf,application/pdf" multiple />
            </div>
            ${employeeDocumentList(item)}
          </div>
          <div class="button-row">
            <button type="button" class="primary employee-edit-toggle">编辑</button>
            ${deleteButton}
          </div>
        </div>
        <form class="employee-edit-form record-form" data-employee-id="${item.id}">
          <div class="form-row">
            ${field("姓名", `<input name="name" value="${escapeHTML(item.name)}" required />`)}
            ${field("员工编号", `<input name="employeeNo" value="${escapeHTML(item.employeeNo || "")}" />`)}
            ${field("社員メール", `<input name="email" type="email" value="${escapeHTML(item.email || "")}" />`)}
          </div>
          <div class="form-row">
            ${field("状态", `<select name="active"><option value="true" ${item.active ? "selected" : ""}>在籍/有効</option><option value="false" ${!item.active ? "selected" : ""}>無効</option></select>`)}
            ${field("自定义角色", `<input name="role" value="${escapeHTML(item.role || "")}" placeholder="例：正社員 / アルバイト / 店長" />`)}
            ${field("部门", `<input name="department" value="${escapeHTML(item.department || "")}" />`)}
          </div>
          <div class="form-row">
            ${field("入社日", `<input name="joinedAt" type="date" value="${escapeHTML(item.joinedAt || "")}" />`)}
            ${field("默认基本給", `<input name="baseSalary" type="number" min="0" value="${Number(item.baseSalary || 0)}" />`)}
            ${field("默认保険基準額", `<input name="standardSalary" type="number" min="0" value="${Number(item.standardSalary || item.baseSalary || 0)}" />`)}
          </div>
          <div class="form-row">
            ${field("电话", `<input name="phone" value="${escapeHTML(item.phone || "")}" />`)}
            ${field("证件截止日期", `<input name="documentExpires" type="date" value="${escapeHTML(item.documentExpires || "")}" />`)}
            <span></span>
          </div>
          ${field("备注", `<input name="note" value="${escapeHTML(item.note || "")}" />`)}
          <div class="button-row">
            <button class="primary">保存</button>
            <button type="button" class="employee-edit-cancel">取消</button>
            ${deleteButton}
          </div>
        </form>
        <div class="employee-wage-block">
          <div class="table-head compact-head"><h3>个人工资记录</h3></div>
          ${employeeWageTable(wages, item)}
        </div>
      </details>
    `;
  }).join("");

  return `
    <section class="table-card employee-manager">
      <div class="table-head">
        <h3>员工管理</h3>
        <span class="permission-note">${ownerCanManage ? "老板权限：可删除员工" : "只有老板可以删除员工"}</span>
      </div>
      <div class="record-list">${cards || `<div class="empty">暂无员工</div>`}</div>
    </section>
  `;
}

function employeeWageTable(wages, employee) {
  if (!wages.length) return `<div class="empty">暂无工资记录</div>`;
  const ownerCanManage = hasOwnerPermission();
  return `
    <div class="wage-export-panel" data-employee-id="${employee.id}">
      <div class="wage-month-list">
        ${wages.map((item, index) => `
          <label>
            <input type="checkbox" name="wageMonth" value="${item.id}" ${index === 0 ? "checked" : ""} />
            <span>${escapeHTML(item.month)}</span>
          </label>
        `).join("")}
      </div>
      <button type="button" class="primary export-employee-wage-pdf" data-employee-id="${employee.id}">选择月份导出PDF</button>
    </div>
    <div class="table-scroll">
      <table class="mini-table">
        <thead>
          <tr><th>月</th><th>基本給</th><th>保険基準額</th><th>支給総額</th><th>本人負担</th><th>差引支給額</th><th>操作</th></tr>
        </thead>
        <tbody>
          ${wages.map((item) => `
            <tr>
              <td>${escapeHTML(item.month)}</td>
              <td>${money(Number(item.baseSalary || 0))}</td>
              <td>${money(Number(item.standardSalary || item.baseSalary || 0))}</td>
              <td>${money(grossWage(item))}</td>
              <td>${money(employeeDeductions(item))}</td>
              <td><strong>${money(netWage(item))}</strong></td>
              <td>${ownerCanManage ? `<button type="button" class="danger-button table-action employee-wage-delete-button" data-wage-id="${item.id}">删除记录</button>` : `<span class="muted-text">-</span>`}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function employeeDocumentList(employee) {
  if (!employee.documents.length) return `<div class="empty compact-empty">暂无证件文件</div>`;
  return `
    <div class="document-list">
      ${employee.documents.map((item) => `
        <div class="document-item">
          <div>
            <strong>${escapeHTML(item.name)}</strong>
            <span>${escapeHTML(t(item.type || "文件"))} · ${fileSizeText(item.size)} · ${new Date(item.uploadedAt).toLocaleString("ja-JP")}</span>
          </div>
          <div class="button-row">
            <button type="button" class="document-download-button" data-document-id="${item.id}">下载</button>
            <button type="button" class="danger-button document-delete-button" data-employee-id="${employee.id}" data-document-id="${item.id}">删除</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderWages() {
  const visibleWages = activeWages();
  const liuMayTemplate = latestMayWageForLiu();
  const defaultEmployee = state.users.find((item) => item.id === liuMayTemplate?.employeeId)
    || state.users.find((item) => item.active && Number(item.baseSalary || 0) > 0)
    || state.users.find((item) => item.active)
    || state.users[0];
  const defaultBaseSalary = wageDefaultValue(liuMayTemplate, "baseSalary", Number(defaultEmployee?.baseSalary || 250000));
  const defaultStandardSalary = wageDefaultValue(liuMayTemplate, "standardSalary", Number(defaultEmployee?.standardSalary || defaultBaseSalary || 260000));
  return `
    ${collapsible("給与計算を追加", "支給、本人負担、会社負担を分けて入力", `
    <form class="form-card compact-form wage-calculator-form" id="wage-form">
      <div class="form-title">
        <h3>給与計算</h3>
        <span>${liuMayTemplate ? "默认按刘的最新5月工资记录带出" : "日本企業向け：支給、本人負担、会社負担を分けて管理"}</span>
      </div>
      <div class="form-row">
        ${field("対象月", `<input name="month" type="month" value="${new Date().toISOString().slice(0, 7)}" />`)}
        ${field("社員", `<select name="employeeId">${employeeOptions(defaultEmployee?.id)}</select>`)}
        ${field("基本給", `<input name="baseSalary" type="number" min="0" value="${defaultBaseSalary}" />`)}
      </div>
      <div class="form-row">
        ${field("標準報酬月額（保険基準額）", `<input name="standardSalary" type="number" min="0" value="${defaultStandardSalary}" />`)}
        ${field("残業手当", `<input name="overtimePay" type="number" min="0" value="${wageDefaultValue(liuMayTemplate, "overtimePay", 0)}" />`)}
        ${field("通勤手当", `<input name="commutingAllowance" type="number" min="0" value="${wageDefaultValue(liuMayTemplate, "commutingAllowance", 0)}" />`)}
      </div>
      <div class="form-row">
        ${field("その他手当", `<input name="otherAllowance" type="number" min="0" value="${wageDefaultValue(liuMayTemplate, "otherAllowance", 0)}" />`)}
        <span></span>
        <span></span>
      </div>
      <h4>本人負担（給与から控除）</h4>
      <div class="form-row">
        ${rateField("健康保険", "employeeHealthInsuranceRate", "employeeHealthInsurance", wageDefaultValue(liuMayTemplate, "employeeHealthInsuranceRate", 4.925))}
        ${rateField("介護保険", "employeeCareInsuranceRate", "employeeCareInsurance", wageDefaultValue(liuMayTemplate, "employeeCareInsuranceRate", 0))}
        ${rateField("厚生年金", "employeePensionRate", "employeePension", wageDefaultValue(liuMayTemplate, "employeePensionRate", 9.15))}
      </div>
      <div class="form-row">
        ${rateField("雇用保険（本人・実給与基準）", "employeeEmploymentInsuranceRate", "employeeEmploymentInsurance", wageDefaultValue(liuMayTemplate, "employeeEmploymentInsuranceRate", 0.5), "gross")}
        ${field("源泉所得税", `<input name="incomeTax" type="number" min="0" value="${wageDefaultValue(liuMayTemplate, "incomeTax", 1250)}" />`)}
        ${field("住民税", `<input name="residentTax" type="number" min="0" value="${wageDefaultValue(liuMayTemplate, "residentTax", 3340)}" />`)}
      </div>
      <div class="form-row">
        ${field("その他控除", `<input name="otherEmployeeDeduction" type="number" min="0" value="${wageDefaultValue(liuMayTemplate, "otherEmployeeDeduction", 0)}" />`)}
        ${field("備考", `<input name="note" />`)}
        <span></span>
      </div>
      <h4>会社負担（会社の追加コスト）</h4>
      <div class="form-row">
        ${rateField("健康保険 会社負担", "companyHealthInsuranceRate", "companyHealthInsurance", wageDefaultValue(liuMayTemplate, "companyHealthInsuranceRate", 4.925))}
        ${rateField("介護保険 会社負担", "companyCareInsuranceRate", "companyCareInsurance", wageDefaultValue(liuMayTemplate, "companyCareInsuranceRate", 0))}
        ${rateField("厚生年金 会社負担", "companyPensionRate", "companyPension", wageDefaultValue(liuMayTemplate, "companyPensionRate", 9.15))}
      </div>
      <div class="form-row">
        ${rateField("雇用保険 会社負担（実給与基準）", "companyEmploymentInsuranceRate", "companyEmploymentInsurance", wageDefaultValue(liuMayTemplate, "companyEmploymentInsuranceRate", 1.35), "gross")}
        ${rateField("労災保険 会社負担（実給与基準）", "workersCompInsuranceRate", "workersCompInsurance", wageDefaultValue(liuMayTemplate, "workersCompInsuranceRate", 0.3), "gross")}
        ${rateField("子ども・子育て拠出金", "childCareContributionRate", "childCareContribution", wageDefaultValue(liuMayTemplate, "childCareContributionRate", 0.36))}
      </div>
      <div class="form-row">
        ${rateField("子育て支援金", "childCareSupportRate", "childCareSupport", wageDefaultValue(liuMayTemplate, "childCareSupportRate", 0.23))}
        ${field("その他会社負担", `<input name="otherCompanyCost" type="number" min="0" value="${wageDefaultValue(liuMayTemplate, "otherCompanyCost", 0)}" />`)}
        <span></span>
      </div>
      <button class="primary">保存记录</button>
    </form>
    `)}
    <section class="grid">
      ${metric("給与記録", visibleWages.length)}
      ${metric("支給総額", money(visibleWages.reduce((sum, item) => sum + grossWage(item), 0)))}
      ${metric("本人控除合計", money(visibleWages.reduce((sum, item) => sum + employeeDeductions(item), 0)))}
      ${metric("会社総支出", money(visibleWages.reduce((sum, item) => sum + companyTotalCost(item), 0)))}
    </section>
    ${renderWageManager()}
  `;
}

function renderWageManager() {
  const cards = activeWages().map((item) => `
    <details class="record-panel wage-record-panel">
      <summary>
        <span>
          <strong>${escapeHTML(item.month)} · ${escapeHTML(operatorName(item.employeeId))}</strong>
          <small>基本給 ${money(Number(item.baseSalary || 0))} · 差引支給額 ${money(netWage(item))} · 会社総支出 ${money(companyTotalCost(item))}</small>
        </span>
      </summary>
      <form class="wage-edit-form wage-calculator-form record-form" data-wage-id="${item.id}">
        <div class="form-row">
          ${field("対象月", `<input name="month" type="month" value="${escapeHTML(item.month)}" />`)}
          ${field("社員", `<select name="employeeId">${employeeOptions(item.employeeId)}</select>`)}
          ${field("基本給", `<input name="baseSalary" type="number" min="0" value="${Number(item.baseSalary || 0)}" />`)}
        </div>
        <div class="form-row">
          ${field("標準報酬月額（保険基準額）", `<input name="standardSalary" type="number" min="0" value="${Number(item.standardSalary || item.baseSalary || 0)}" />`)}
          ${field("残業手当", `<input name="overtimePay" type="number" min="0" value="${Number(item.overtimePay || 0)}" />`)}
          ${field("通勤手当", `<input name="commutingAllowance" type="number" min="0" value="${Number(item.commutingAllowance || 0)}" />`)}
        </div>
        <div class="form-row">
          ${field("その他手当", `<input name="otherAllowance" type="number" min="0" value="${Number(item.otherAllowance || 0)}" />`)}
          <span></span>
          <span></span>
        </div>
        <h4>本人負担（給与から控除）</h4>
        <div class="form-row">
          ${rateField("健康保険", "employeeHealthInsuranceRate", "employeeHealthInsurance", Number(item.employeeHealthInsuranceRate || 0), "monthly", Number(item.employeeHealthInsurance || 0))}
          ${rateField("介護保険", "employeeCareInsuranceRate", "employeeCareInsurance", Number(item.employeeCareInsuranceRate || 0), "monthly", Number(item.employeeCareInsurance || 0))}
          ${rateField("厚生年金", "employeePensionRate", "employeePension", Number(item.employeePensionRate || 0), "monthly", Number(item.employeePension || 0))}
        </div>
        <div class="form-row">
          ${rateField("雇用保険（本人・実給与基準）", "employeeEmploymentInsuranceRate", "employeeEmploymentInsurance", Number(item.employeeEmploymentInsuranceRate || 0), "gross", Number(item.employeeEmploymentInsurance || 0))}
          ${field("源泉所得税", `<input name="incomeTax" type="number" min="0" value="${Number(item.incomeTax || 0)}" />`)}
          ${field("住民税", `<input name="residentTax" type="number" min="0" value="${Number(item.residentTax || 0)}" />`)}
        </div>
        <div class="form-row">
          ${field("その他控除", `<input name="otherEmployeeDeduction" type="number" min="0" value="${Number(item.otherEmployeeDeduction || 0)}" />`)}
          <span></span>
          <span></span>
        </div>
        <h4>会社負担（会社の追加コスト）</h4>
        <div class="form-row">
          ${rateField("健康保険 会社負担", "companyHealthInsuranceRate", "companyHealthInsurance", Number(item.companyHealthInsuranceRate || 0), "monthly", Number(item.companyHealthInsurance || 0))}
          ${rateField("介護保険 会社負担", "companyCareInsuranceRate", "companyCareInsurance", Number(item.companyCareInsuranceRate || 0), "monthly", Number(item.companyCareInsurance || 0))}
          ${rateField("厚生年金 会社負担", "companyPensionRate", "companyPension", Number(item.companyPensionRate || 0), "monthly", Number(item.companyPension || 0))}
        </div>
        <div class="form-row">
          ${rateField("雇用保険 会社負担（実給与基準）", "companyEmploymentInsuranceRate", "companyEmploymentInsurance", Number(item.companyEmploymentInsuranceRate || 0), "gross", Number(item.companyEmploymentInsurance || 0))}
          ${rateField("労災保険 会社負担（実給与基準）", "workersCompInsuranceRate", "workersCompInsurance", Number(item.workersCompInsuranceRate || 0), "gross", Number(item.workersCompInsurance || 0))}
          ${rateField("子ども・子育て拠出金", "childCareContributionRate", "childCareContribution", Number(item.childCareContributionRate || 0), "monthly", Number(item.childCareContribution || 0))}
        </div>
        <div class="form-row">
          ${rateField("子育て支援金", "childCareSupportRate", "childCareSupport", Number(item.childCareSupportRate || 0), "monthly", Number(item.childCareSupport || 0))}
          ${field("その他会社負担", `<input name="otherCompanyCost" type="number" min="0" value="${Number(item.otherCompanyCost || 0)}" />`)}
          ${field("備考", `<input name="note" value="${escapeHTML(item.note || "")}" />`)}
        </div>
        <div class="wage-totals">
          <span>支給総額 <strong data-wage-total="gross">${money(grossWage(item))}</strong></span>
          <span>本人負担 <strong data-wage-total="deductions">${money(employeeDeductions(item))}</strong></span>
          <span>差引支給額 <strong data-wage-total="net">${money(netWage(item))}</strong></span>
          <span>会社総支出 <strong data-wage-total="companyTotal">${money(companyTotalCost(item))}</strong></span>
        </div>
        <div class="button-row">
          <button class="primary">保存修改</button>
          <button type="button" class="danger-button wage-delete-button" data-wage-id="${item.id}">删除工资记录</button>
        </div>
      </form>
    </details>
  `).join("");

  return `
    <section class="table-card wage-manager">
      <div class="table-head"><h3>給与记录管理</h3></div>
      <div class="record-list">${cards || `<div class="empty">暂无工资记录</div>`}</div>
    </section>
    ${renderDeletedWageManager()}
  `;
}

function renderDeletedWageManager() {
  const deleted = recoverableWages();
  if (!deleted.length) return "";
  return `
    <section class="table-card wage-manager">
      <div class="table-head">
        <h3>已删除工资记录</h3>
        <span class="permission-note">1年内可恢复</span>
      </div>
      <div class="record-list">
        ${deleted.map((item) => `
          <div class="deleted-record-row">
            <div>
              <strong>${escapeHTML(item.month)} · ${escapeHTML(operatorName(item.employeeId))}</strong>
              <span>削除日時：${new Date(item.deletedAt).toLocaleString("ja-JP")} · 差引支給額 ${money(netWage(item))}</span>
            </div>
            <button type="button" class="primary wage-restore-button" data-wage-id="${item.id}">恢复</button>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderUsers() {
  const permissionHeader = permissionActions.map(([, label]) => `<th>${escapeHTML(label)}</th>`).join("");
  const userPanels = state.users.map((user) => `
    <details class="record-panel">
      <summary>
        <span>
          <strong>${escapeHTML(user.name)}</strong>
          <small>${escapeHTML(t(user.role))} · ${user.active ? "有効" : "無効"}</small>
        </span>
      </summary>
      <form class="user-permission-form record-form" data-user-id="${user.id}">
        <div class="form-row">
          ${field("姓名 / ID 名称", `<input name="name" value="${escapeHTML(user.name)}" required />`)}
          <input name="loginId" type="hidden" value="${escapeHTML(user.loginId || "")}" />
          <input name="password" type="hidden" value="${escapeHTML(user.password || "")}" />
        </div>
        <div class="form-row">
          ${field("角色", `<select name="role">${roles.map((role) => `<option value="${role}" ${user.role === role ? "selected" : ""}>${escapeHTML(t(role))}</option>`).join("")}</select>`)}
          ${field("状态", `<select name="active"><option value="true" ${user.active ? "selected" : ""}>有効</option><option value="false" ${!user.active ? "selected" : ""}>無効</option></select>`)}
          <button type="button" class="table-action apply-role-permissions" data-user-id="${user.id}">按角色重置权限</button>
        </div>
        <div class="table-scroll">
          <table class="permission-table">
            <thead><tr><th>栏目</th>${permissionHeader}</tr></thead>
            <tbody>
              ${permissionModules.map(([module, label]) => `
                <tr>
                  <th>${escapeHTML(label)}</th>
                  ${permissionActions.map(([action]) => `
                    <td>
                      <input type="checkbox" name="permission:${module}:${action}" ${user.permissions?.[module]?.[action] ? "checked" : ""} />
                    </td>
                  `).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div class="button-row">
          <button class="primary">保存权限</button>
        </div>
      </form>
    </details>
  `).join("");

  return `
    ${renderAccountCompanySettings()}
    <section class="content-grid">
      ${collapsible("新增会社内資料", "登录は邮箱验证码。这里仅保留公司内人员资料和权限模板。", `
      <form class="form-card compact-form" id="user-form">
        <div class="form-title">
          <h3>新增会社内資料</h3>
          <span>默认会按选择的角色生成权限</span>
        </div>
        ${field("姓名 / ID 名称", `<input name="name" required />`)}
        <input name="loginId" type="hidden" value="" />
        <input name="password" type="hidden" value="" />
        ${field("角色", `<select name="role">${roles.map(role => `<option value="${role}">${escapeHTML(t(role))}</option>`).join("")}</select>`)}
        <button class="primary">保存账号</button>
      </form>
      `)}
      ${collapsible("新增位置", "仓库、店铺、平台都统一管理", `
      <form class="form-card compact-form" id="location-form">
        <div class="form-title">
          <h3>新增位置</h3>
          <span>仓库、店铺、平台都统一管理</span>
        </div>
        <input name="name" placeholder="位置名称" required />
        <select name="type">${locationTypes.map(type => `<option>${type}</option>`).join("")}</select>
        <button class="primary">保存位置</button>
      </form>
      `)}
    </section>
    <section class="table-card">
      <div class="table-head">
        <h3>账号权限管理</h3>
        <span class="permission-note">开发版密码保存在本机浏览器数据里</span>
      </div>
      <div class="record-list">${userPanels}</div>
    </section>
    <section class="content-grid">
      ${tableCard("仓库 / 店铺 / 平台", ["名称", "类型", "库存"], state.locations.map(item => [
        escapeHTML(item.name),
        typePill(item.type),
        stockByLocation(item.id),
      ]))}
    </section>
  `;
}

function renderAccountCompanySettings() {
  const user = currentUser();
  const memberships = activeMemberships().map((member) => {
    const company = rawState.companies.find((item) => item.id === member.companyId);
    return [
      escapeHTML(company?.companyName || "-"),
      escapeHTML(t(member.role)),
      escapeHTML(member.status),
      member.companyId === currentCompanyId ? `<span class="pill">選択中</span>` : `<button type="button" class="table-action account-company-switch" data-company-id="${member.companyId}">切替</button>`,
    ];
  });
  return `
    <section class="content-grid">
      <form class="form-card compact-form" id="account-profile-form">
        <div class="form-title">
          <h3>個人アカウント</h3>
          <span>メールアドレスがログインIDです。パスワードは使用しません。</span>
        </div>
        ${field("表示名", `<input name="displayName" value="${escapeHTML(user?.displayName || "")}" />`)}
        ${field("現在のメール", `<input value="${escapeHTML(user?.email || "")}" disabled />`)}
        <div class="form-row">
          ${field("新しいメール", `<input name="newEmail" type="email" />`)}
          ${field("メール認証コード", `<input name="code" inputmode="numeric" />`)}
          <button type="button" id="send-email-change-code">変更コード送信</button>
        </div>
        <button class="primary">個人情報を保存</button>
      </form>
      ${tableCard("自分の会社一覧", ["会社", "役割", "状態", "操作"], memberships)}
    </section>
  `;
}

function metric(label, value) {
  return `<div class="card"><div class="label">${label}</div><div class="value">${value}</div></div>`;
}

function collapsible(title, description, content, open = false) {
  return `
    <details class="collapse-card" ${open ? "open" : ""}>
      <summary>
        <span>
          <strong>${escapeHTML(title)}</strong>
          <small>${escapeHTML(description)}</small>
        </span>
      </summary>
      <div class="collapse-body">${content}</div>
    </details>
  `;
}

function field(label, control) {
  return `
    <label class="form-field">
      <span>${escapeHTML(label)}</span>
      ${control}
    </label>
  `;
}

function rateField(label, rateName, amountName, defaultRate, base = "monthly", amountValue = "") {
  return `
    <label class="form-field rate-field">
      <span class="rate-label">
        ${escapeHTML(label)}
        <input class="rate-input" name="${rateName}" data-rate-for="${amountName}" data-rate-base="${base}" type="number" min="0" step="0.001" value="${defaultRate}" />
        <em>%</em>
      </span>
      <input name="${amountName}" data-amount-for="${rateName}" type="number" min="0" value="${amountValue}" />
    </label>
  `;
}

function tableCard(title, headers, rows, id = "") {
  const body = rows.length
    ? rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")
    : `<tr><td colspan="${headers.length}" class="empty">暂无数据</td></tr>`;
  return `
    <section class="table-card">
      <div class="table-head"><h3>${title}</h3></div>
      <div class="table-scroll">
        <table ${id ? `id="${id}"` : ""}>
          <thead><tr>${headers.map(item => `<th>${item}</th>`).join("")}</tr></thead>
          <tbody>${body}</tbody>
        </table>
      </div>
    </section>
  `;
}

function actionPill(action) {
  const className = action === "损耗" ? "pill red" : action === "出库" ? "pill blue" : "pill";
  return `<span class="${className}">${escapeHTML(t(action))}</span>`;
}

function rolePill(role) {
  return `<span class="pill">${escapeHTML(t(role))}</span>`;
}

function typePill(type) {
  return `<span class="pill muted">${escapeHTML(t(type))}</span>`;
}

function signedQuantity(row) {
  const quantity = Number(row.quantity || 0);
  if (row.action === "出库" || row.action === "损耗") return `<span class="danger">-${Math.abs(quantity)}</span>`;
  if (row.action === "盘点") return quantity > 0 ? `<span class="ok">+${quantity}</span>` : `<span class="danger">${quantity}</span>`;
  return `<span class="ok">+${quantity}</span>`;
}

function locationText(row) {
  if (row.from && row.to && row.from !== row.to) return `${locationName(row.from)} -> ${locationName(row.to)}`;
  if (row.to) return `到 ${locationName(row.to)}`;
  if (row.from) return `从 ${locationName(row.from)}`;
  return "未记录位置";
}

function expiryText(value) {
  if (!value) return "";
  const days = daysUntil(value);
  const text = escapeHTML(value);
  if (days < 0) return `<span class="danger">${text}</span>`;
  if (days <= 60) return `<span class="warn">${text}</span>`;
  return text;
}

function documentExpiryText(value) {
  if (!value) return `<span class="muted-text">未设置</span>`;
  const days = daysUntil(value);
  const text = escapeHTML(value);
  if (days < 0) return `<span class="danger">${text} · 已过期</span>`;
  if (days <= 30) return `<span class="warn">${text} · ${days}天后到期</span>`;
  return `<span class="ok">${text}</span>`;
}

function batchStatus(item) {
  const days = daysUntil(item.expires);
  if (Number(item.quantity || 0) <= 0) return `<span class="danger">无库存</span>`;
  if (days < 0) return `<span class="danger">已过期</span>`;
  if (days <= 60) return `<span class="warn">临期</span>`;
  return `<span class="ok">正常</span>`;
}

function daysUntil(value) {
  const now = new Date();
  const date = new Date(value);
  return Math.ceil((date - now) / 86400000);
}

function getExpiringBatches() {
  return state.batches
    .filter(item => Number(item.quantity || 0) > 0 && daysUntil(item.expires) <= 60)
    .sort((a, b) => new Date(a.expires) - new Date(b.expires));
}

function saleAmount(item) {
  const subtotal = Number(item.quantity || 0) * Number(item.unitPrice || 0);
  return Math.round(subtotal * (1 + Number(item.taxRate ?? 10) / 100));
}

function saleCost(item) {
  return Number(item.quantity || 0) * Number(product(item.productId)?.cost || 0);
}

function saleProfit(item) {
  return saleAmount(item) - saleCost(item) - Number(item.platformFee || 0) - Number(item.shipping || 0);
}

function grossWage(item) {
  return Number(item.baseSalary || 0)
    + Number(item.overtimePay || 0)
    + Number(item.commutingAllowance || 0)
    + Number(item.otherAllowance || 0);
}

function employeeDeductions(item) {
  return Number(item.employeeHealthInsurance || 0)
    + Number(item.employeeCareInsurance || 0)
    + Number(item.employeePension || 0)
    + Number(item.employeeEmploymentInsurance || 0)
    + Number(item.residentTax || 0)
    + Number(item.incomeTax || 0)
    + Number(item.otherEmployeeDeduction || 0);
}

function netWage(item) {
  return grossWage(item) - employeeDeductions(item);
}

function companyBurden(item) {
  return Number(item.companyHealthInsurance || 0)
    + Number(item.companyCareInsurance || 0)
    + Number(item.companyPension || 0)
    + Number(item.companyEmploymentInsurance || 0)
    + Number(item.workersCompInsurance || 0)
    + Number(item.childCareContribution || 0)
    + Number(item.childCareSupport || 0)
    + Number(item.otherCompanyCost || 0);
}

function companyTotalCost(item) {
  return netWage(item) + companyBurden(item);
}

function employeeWageExportHtml(employee, wages) {
  const rows = wages.map((item) => `
    <section class="payslip">
      <h2>${escapeHTML(item.month)} 給与明細</h2>
      <table>
        <tbody>
          <tr><th>社員</th><td>${escapeHTML(employee.name)}</td><th>社員番号</th><td>${escapeHTML(employee.employeeNo || "")}</td></tr>
          <tr><th>部署</th><td>${escapeHTML(employee.department || "")}</td><th>対象月</th><td>${escapeHTML(item.month)}</td></tr>
        </tbody>
      </table>
      <h3>支給</h3>
      <table>
        <tbody>
          <tr><th>基本給</th><td>${money(Number(item.baseSalary || 0))}</td></tr>
          <tr><th>残業手当</th><td>${money(Number(item.overtimePay || 0))}</td></tr>
          <tr><th>通勤手当</th><td>${money(Number(item.commutingAllowance || 0))}</td></tr>
          <tr><th>その他手当</th><td>${money(Number(item.otherAllowance || 0))}</td></tr>
          <tr class="total"><th>支給総額</th><td>${money(grossWage(item))}</td></tr>
        </tbody>
      </table>
      <h3>本人負担（控除）</h3>
      <table>
        <tbody>
          <tr><th>健康保険</th><td>${money(Number(item.employeeHealthInsurance || 0))}</td></tr>
          <tr><th>介護保険</th><td>${money(Number(item.employeeCareInsurance || 0))}</td></tr>
          <tr><th>厚生年金</th><td>${money(Number(item.employeePension || 0))}</td></tr>
          <tr><th>雇用保険</th><td>${money(Number(item.employeeEmploymentInsurance || 0))}</td></tr>
          <tr><th>源泉所得税</th><td>${money(Number(item.incomeTax || 0))}</td></tr>
          <tr><th>住民税</th><td>${money(Number(item.residentTax || 0))}</td></tr>
          <tr><th>その他控除</th><td>${money(Number(item.otherEmployeeDeduction || 0))}</td></tr>
          <tr class="total"><th>本人負担合計</th><td>${money(employeeDeductions(item))}</td></tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr class="net"><th>差引支給額</th><td>${money(netWage(item))}</td></tr>
        </tbody>
      </table>
      ${item.note ? `<p class="note">備考：${escapeHTML(item.note)}</p>` : ""}
    </section>
  `).join("");

  return `
    <!doctype html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <title>${escapeHTML(employee.name)} 給与明細</title>
        <style>
          body { margin: 0; padding: 28px; color: #152033; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", "Yu Gothic", sans-serif; }
          .payslip { page-break-after: always; }
          .payslip:last-child { page-break-after: auto; }
          h1, h2, h3, p { margin: 0; }
          h2 { font-size: 22px; margin-bottom: 16px; }
          h3 { font-size: 15px; margin: 18px 0 8px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
          th, td { border: 1px solid #dfe5ef; padding: 9px 10px; font-size: 13px; text-align: left; }
          th { width: 26%; background: #f5f7fb; color: #657184; }
          td { text-align: right; }
          tr.total th, tr.total td { font-weight: 700; background: #fbfcff; }
          tr.net th, tr.net td { font-size: 16px; font-weight: 800; background: #eef6ff; }
          .note { margin-top: 12px; font-size: 13px; color: #657184; }
          @media print { body { padding: 18mm; } }
        </style>
      </head>
      <body>${rows}</body>
    </html>
  `;
}

function openDocumentDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(documentDbName, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(documentStoreName)) db.createObjectStore(documentStoreName, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function documentStore(mode, callback) {
  const db = await openDocumentDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(documentStoreName, mode);
    const store = transaction.objectStore(documentStoreName);
    const result = callback(store);
    transaction.oncomplete = () => {
      db.close();
      resolve(result);
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

function getDocumentBlob(documentId) {
  return documentStore("readonly", (store) => new Promise((resolve, reject) => {
    const request = store.get(documentId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  }));
}

function saveDocumentBlob(record) {
  return documentStore("readwrite", (store) => store.put(record));
}

function deleteDocumentBlob(documentId) {
  return documentStore("readwrite", (store) => store.delete(documentId));
}

async function uploadEmployeeDocuments(employeeId, files) {
  const employee = state.users.find((item) => item.id === employeeId);
  if (!employee || !files.length) return;
  const newSize = files.reduce((sum, file) => sum + file.size, 0);
  if (employeeDocumentTotal(employee) + newSize > employeeDocumentLimit) {
    alert(t("证件文件总量不能超过 100MB。"));
    return;
  }
  for (const file of files) {
    const id = uid("doc");
    const uploadedAt = new Date().toISOString();
    await saveDocumentBlob({ id, employeeId, name: file.name, type: file.type, size: file.size, uploadedAt, blob: file });
    employee.documents.push({ id, name: file.name, type: file.type, size: file.size, uploadedAt });
  }
  saveState();
  render();
}

async function downloadEmployeeDocument(documentId) {
  const record = await getDocumentBlob(documentId);
  if (!record?.blob) return;
  const url = URL.createObjectURL(record.blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = record.name || "document";
  link.click();
  URL.revokeObjectURL(url);
}

async function deleteEmployeeDocument(employeeId, documentId) {
  const employee = state.users.find((item) => item.id === employeeId);
  if (!employee) return;
  await deleteDocumentBlob(documentId);
  employee.documents = employee.documents.filter((item) => item.id !== documentId);
  saveState();
  render();
}

async function deleteAllEmployeeDocuments(employeeId) {
  const employee = state.users.find((item) => item.id === employeeId);
  if (!employee) return;
  for (const documentItem of employee.documents || []) {
    await deleteDocumentBlob(documentItem.id);
  }
}

function exportEmployeeWagePdf(employeeId, wageIds) {
  const employee = state.users.find((item) => item.id === employeeId);
  if (!employee) return;
  const wages = wagesForEmployee(employeeId).filter((item) => wageIds.includes(item.id));
  if (!wages.length) return;
  const popup = window.open("", "_blank");
  if (!popup) return;
  popup.document.write(employeeWageExportHtml(employee, wages));
  popup.document.close();
  popup.focus();
  popup.print();
}

function amountFromRate(standardSalary, rate) {
  return Math.round(Number(standardSalary || 0) * Number(rate || 0) / 100);
}

function annualSalaryBase(baseSalary) {
  return Number(baseSalary || 0) * 12;
}

function rateAmount(data, standardSalary, rateName, amountName) {
  const rate = data.get(rateName);
  if (rate !== null && rate !== "") return amountFromRate(standardSalary, rate);
  return Number(data.get(amountName) || 0);
}

function wageRecordFromForm(data, id = uid("w")) {
  const standardSalary = Number(data.get("standardSalary") || 0);
  const baseSalary = Number(data.get("baseSalary") || 0);
  const overtimePay = Number(data.get("overtimePay") || 0);
  const commutingAllowance = Number(data.get("commutingAllowance") || 0);
  const otherAllowance = Number(data.get("otherAllowance") || 0);
  const grossSalary = baseSalary + overtimePay + commutingAllowance + otherAllowance;
  return {
    id,
    month: data.get("month") || new Date().toISOString().slice(0, 7),
    employeeId: data.get("employeeId"),
    baseSalary,
    standardSalary,
    overtimePay,
    commutingAllowance,
    otherAllowance,
    employeeHealthInsuranceRate: Number(data.get("employeeHealthInsuranceRate") || 0),
    employeeHealthInsurance: rateAmount(data, standardSalary, "employeeHealthInsuranceRate", "employeeHealthInsurance"),
    employeeCareInsuranceRate: Number(data.get("employeeCareInsuranceRate") || 0),
    employeeCareInsurance: rateAmount(data, standardSalary, "employeeCareInsuranceRate", "employeeCareInsurance"),
    employeePensionRate: Number(data.get("employeePensionRate") || 0),
    employeePension: rateAmount(data, standardSalary, "employeePensionRate", "employeePension"),
    employeeEmploymentInsuranceRate: Number(data.get("employeeEmploymentInsuranceRate") || 0),
    employeeEmploymentInsurance: rateAmount(data, grossSalary, "employeeEmploymentInsuranceRate", "employeeEmploymentInsurance"),
    residentTax: Number(data.get("residentTax") || 0),
    incomeTax: Number(data.get("incomeTax") || 0),
    otherEmployeeDeduction: Number(data.get("otherEmployeeDeduction") || 0),
    companyHealthInsuranceRate: Number(data.get("companyHealthInsuranceRate") || 0),
    companyHealthInsurance: rateAmount(data, standardSalary, "companyHealthInsuranceRate", "companyHealthInsurance"),
    companyCareInsuranceRate: Number(data.get("companyCareInsuranceRate") || 0),
    companyCareInsurance: rateAmount(data, standardSalary, "companyCareInsuranceRate", "companyCareInsurance"),
    companyPensionRate: Number(data.get("companyPensionRate") || 0),
    companyPension: rateAmount(data, standardSalary, "companyPensionRate", "companyPension"),
    companyEmploymentInsuranceRate: Number(data.get("companyEmploymentInsuranceRate") || 0),
    companyEmploymentInsurance: rateAmount(data, grossSalary, "companyEmploymentInsuranceRate", "companyEmploymentInsurance"),
    workersCompInsuranceRate: Number(data.get("workersCompInsuranceRate") || 0),
    workersCompInsurance: rateAmount(data, grossSalary, "workersCompInsuranceRate", "workersCompInsurance"),
    childCareContributionRate: Number(data.get("childCareContributionRate") || 0),
    childCareContribution: rateAmount(data, standardSalary, "childCareContributionRate", "childCareContribution"),
    childCareSupportRate: Number(data.get("childCareSupportRate") || 0),
    childCareSupport: rateAmount(data, standardSalary, "childCareSupportRate", "childCareSupport"),
    otherCompanyCost: Number(data.get("otherCompanyCost") || 0),
    deletedAt: "",
    employeeDeletedAt: "",
    note: data.get("note") || "",
  };
}

function bindForms() {
  document.getElementById("product-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const imageFile = event.currentTarget.querySelector('[name="imageFile"]')?.files?.[0];
    const barcodeImageFile = event.currentTarget.querySelector('[name="barcodeImageFile"]')?.files?.[0];
    const imageMedia = imageFile ? await storeProductMedia(imageFile, { kind: "product" }) : null;
    const barcodeMedia = barcodeImageFile ? await storeProductMedia(barcodeImageFile, { kind: "barcode" }) : null;
    state.products.unshift({
      id: uid("p"),
      name: data.get("name"),
      sku: data.get("sku"),
      barcode: data.get("barcode") || "",
      category: data.get("category") || "默认分类",
      brand: data.get("brand") || "",
      spec: data.get("spec") || "",
      warning: Number(data.get("warning") || 5),
      cost: 0,
      price: Number(data.get("price") || 0),
      salesName: data.get("name") || "",
      salesMonth: data.get("salesMonth") || "",
      janCode: data.get("janCode") || "",
      contentAmount: data.get("contentAmount") || "",
      image: "",
      imageId: imageMedia?.id || "",
      imageName: imageMedia?.name || "",
      imageSize: imageMedia?.size || 0,
      barcodeImage: "",
      barcodeImageId: barcodeMedia?.id || "",
      barcodeImageName: barcodeMedia?.name || "",
      barcodeImageSize: barcodeMedia?.size || 0,
    });
    saveState();
    render();
  });

  document.querySelectorAll(".product-edit-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const item = state.products.find((productItem) => productItem.id === form.dataset.productId);
      if (!item) return;
      const data = new FormData(form);
      const imageFile = form.querySelector('[name="imageFile"]')?.files?.[0];
      const barcodeImageFile = form.querySelector('[name="barcodeImageFile"]')?.files?.[0];
      item.name = data.get("name") || item.name;
      item.sku = data.get("sku") || item.sku;
      item.barcode = data.get("barcode") || "";
      item.category = data.get("category") || "默认分类";
      item.brand = data.get("brand") || "";
      item.spec = data.get("spec") || "";
      item.warning = Number(data.get("warning") || 0);
      item.price = Number(data.get("price") || 0);
      item.salesName = data.get("salesName") || "";
      item.salesMonth = data.get("salesMonth") || "";
      item.janCode = data.get("janCode") || "";
      item.contentAmount = data.get("contentAmount") || "";
      item.manufacturer = data.get("manufacturer") || "";
      item.contact = data.get("contact") || "";
      item.countryOfOrigin = data.get("countryOfOrigin") || "";
      item.bestBefore = data.get("bestBefore") || "";
      item.listPriceTaxExcluded = data.get("listPriceTaxExcluded") || "";
      item.salesUnit = data.get("salesUnit") || "";
      item.unitSize = data.get("unitSize") || "";
      item.ballSize = data.get("ballSize") || "";
      item.caseSize = data.get("caseSize") || "";
      item.unitWeight = data.get("unitWeight") || "";
      item.ballWeight = data.get("ballWeight") || "";
      item.caseWeight = data.get("caseWeight") || "";
      item.features = data.get("features") || "";
      item.ingredients = data.get("ingredients") || "";
      item.usage = data.get("usage") || "";
      item.cautions = data.get("cautions") || "";
      item.promotionalMaterials = data.get("promotionalMaterials") || "";
      item.remarks = data.get("remarks") || "";
      if (imageFile) {
        if (item.imageId) await deleteDocumentBlob(item.imageId);
        const imageMedia = await storeProductMedia(imageFile, { kind: "product" });
        item.image = "";
        item.imageId = imageMedia?.id || "";
        item.imageName = imageMedia?.name || "";
        item.imageSize = imageMedia?.size || 0;
      }
      if (barcodeImageFile) {
        if (item.barcodeImageId) await deleteDocumentBlob(item.barcodeImageId);
        const barcodeMedia = await storeProductMedia(barcodeImageFile, { kind: "barcode" });
        item.barcodeImage = "";
        item.barcodeImageId = barcodeMedia?.id || "";
        item.barcodeImageName = barcodeMedia?.name || "";
        item.barcodeImageSize = barcodeMedia?.size || 0;
      }
      saveState();
      render();
    });
  });

  document.querySelectorAll(".product-edit-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      const row = document.querySelector(`.product-edit-row[data-product-id="${productId}"]`);
      if (row) row.hidden = !row.hidden;
    });
  });

  document.querySelectorAll(".product-edit-cancel").forEach((button) => {
    button.addEventListener("click", () => {
      const row = document.querySelector(`.product-edit-row[data-product-id="${button.dataset.productId}"]`);
      if (row) row.hidden = true;
    });
  });

  document.querySelectorAll(".product-image-remove").forEach((button) => {
    button.addEventListener("click", async () => {
      const form = button.closest(".product-edit-form");
      const item = state.products.find((productItem) => productItem.id === form?.dataset.productId);
      if (!item) return;
      if (item.imageId) await deleteDocumentBlob(item.imageId);
      item.image = "";
      item.imageId = "";
      item.imageName = "";
      item.imageSize = 0;
      saveState();
      render();
    });
  });

  document.querySelectorAll(".product-barcode-image-remove").forEach((button) => {
    button.addEventListener("click", async () => {
      const form = button.closest(".product-edit-form");
      const item = state.products.find((productItem) => productItem.id === form?.dataset.productId);
      if (!item) return;
      if (item.barcodeImageId) await deleteDocumentBlob(item.barcodeImageId);
      item.barcodeImage = "";
      item.barcodeImageId = "";
      item.barcodeImageName = "";
      item.barcodeImageSize = 0;
      saveState();
      render();
    });
  });

  document.querySelectorAll(".product-spec-export").forEach((button) => {
    button.addEventListener("click", () => exportProductSpecPdf(button.dataset.productId));
  });

  document.querySelectorAll(".marketplace-draft-from-product").forEach((button) => {
    button.addEventListener("click", () => {
      marketplaceDraftProductId = button.dataset.productId || "";
      currentView = "marketplace";
      render();
    });
  });

  document.getElementById("marketplace-listing-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitMarketplaceListing(new FormData(event.currentTarget));
  });

  document.querySelectorAll(".marketplace-inquiry-open, .marketplace-talk-open").forEach((button) => {
    button.addEventListener("click", () => {
      const form = document.querySelector(`.marketplace-inquiry-form[data-listing-id="${button.dataset.listingId}"]`);
      if (!form) return;
      form.hidden = !form.hidden;
      const purpose = form.querySelector('[name="purpose"]');
      if (purpose) purpose.value = button.classList.contains("marketplace-talk-open") ? "商談申込" : "卸価格相談";
    });
  });

  document.querySelectorAll(".marketplace-inquiry-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      submitMarketplaceInquiry(form.dataset.listingId, new FormData(form));
    });
  });

  document.querySelectorAll(".marketplace-favorite-button").forEach((button) => {
    button.addEventListener("click", () => {
      const key = `${currentUserId}:${button.dataset.listingId}`;
      if (!state.marketplaceFavorites.includes(key)) state.marketplaceFavorites.push(key);
      saveState();
      alert("お気に入りに追加しました。");
    });
  });

  document.querySelectorAll(".marketplace-report-button").forEach((button) => {
    button.addEventListener("click", () => {
      const message = prompt("举报/投诉内容を入力してください。");
      if (!message) return;
      state.marketplaceReports.unshift({
        id: uid("mr"),
        reporterUserId: currentUserId,
        reportedUserId: state.marketplaceListings.find((item) => item.id === button.dataset.listingId)?.ownerUserId || "",
        listingId: button.dataset.listingId,
        inquiryId: "",
        reportType: "listing",
        reportMessage: message,
        status: "未対応",
        adminNote: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      saveState();
      render();
    });
  });

  document.querySelectorAll(".marketplace-reply-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const form = document.querySelector(`.marketplace-reply-form[data-inquiry-id="${button.dataset.inquiryId}"]`);
      if (form) form.hidden = !form.hidden;
    });
  });

  document.querySelectorAll(".marketplace-reply-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      submitMarketplaceReply(form.dataset.inquiryId, new FormData(form), event.submitter?.value || "reply");
    });
  });

  document.querySelectorAll(".marketplace-unpublish-button").forEach((button) => {
    button.addEventListener("click", () => {
      const listing = state.marketplaceListings.find((item) => item.id === button.dataset.listingId);
      if (!listing) return;
      listing.status = "已下架";
      listing.updatedAt = new Date().toISOString();
      saveState();
      render();
    });
  });

  document.getElementById("marketplace-verification-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitMarketplaceVerification(new FormData(event.currentTarget));
  });

  document.getElementById("marketplace-settings-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    state.marketplaceSettings.membershipPlan = data.get("membershipPlan") || "Free";
    state.marketplaceSettings.prohibitedCategories = splitSettingWords(data.get("prohibitedCategories"));
    state.marketplaceSettings.sensitiveWords = splitSettingWords(data.get("sensitiveWords"));
    saveState();
    render();
  });

  document.querySelectorAll(".marketplace-approve-button").forEach((button) => {
    button.addEventListener("click", () => reviewMarketplaceListing(button.dataset.listingId, "approved"));
  });

  document.querySelectorAll(".marketplace-reject-button").forEach((button) => {
    button.addEventListener("click", () => reviewMarketplaceListing(button.dataset.listingId, "rejected", prompt("否認理由を入力してください。") || "掲載基準を満たしていません。"));
  });

  document.querySelectorAll(".marketplace-force-stop-button").forEach((button) => {
    button.addEventListener("click", () => reviewMarketplaceListing(button.dataset.listingId, "stopped", "管理者により掲載停止"));
  });

  document.querySelectorAll(".marketplace-verification-approve").forEach((button) => {
    button.addEventListener("click", () => reviewMarketplaceVerification(button.dataset.verificationId, "approved"));
  });

  document.querySelectorAll(".marketplace-verification-reject").forEach((button) => {
    button.addEventListener("click", () => reviewMarketplaceVerification(button.dataset.verificationId, "rejected", prompt("差戻し理由を入力してください。") || "確認資料が不足しています。"));
  });

  document.querySelectorAll(".marketplace-report-close").forEach((button) => {
    button.addEventListener("click", () => {
      const report = state.marketplaceReports.find((item) => item.id === button.dataset.reportId);
      if (report) {
        report.status = "対応済み";
        report.updatedAt = new Date().toISOString();
      }
      saveState();
      render();
    });
  });

  const saleForm = document.getElementById("sale-form");
  if (saleForm) {
    const productSelect = saleForm.querySelector('[name="productId"]');
    const unitPriceInput = saleForm.querySelector('[name="unitPrice"]');
    productSelect?.addEventListener("change", () => {
      const price = productSelect.selectedOptions[0]?.dataset.price || "0";
      if (unitPriceInput) unitPriceInput.value = price;
    });
  }

  document.querySelectorAll(".sale-document-export").forEach((button) => {
    button.addEventListener("click", () => exportSaleDocumentPdf(button.dataset.saleId, button.dataset.documentType));
  });

  document.querySelectorAll(".sale-detail-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const row = document.querySelector(`.sale-detail-row[data-sale-id="${button.dataset.saleId}"]`);
      if (row) row.hidden = !row.hidden;
    });
  });

  document.getElementById("stock-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    applyStockAction({
      action: data.get("action"),
      productId: data.get("productId"),
      batchId: data.get("batchId"),
      fromLocationId: data.get("fromLocationId"),
      toLocationId: data.get("toLocationId"),
      quantity: Number(data.get("quantity") || 0),
      code: data.get("code"),
      expires: data.get("expires"),
      operatorId: data.get("operatorId"),
      note: data.get("note"),
    });
    saveState();
    render();
  });

  document.getElementById("batch-edit-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    updateBatch({
      batchId: data.get("batchId"),
      code: data.get("code"),
      locationId: data.get("locationId"),
      expires: data.get("expires"),
      quantity: data.get("quantity"),
      note: data.get("note"),
    });
    saveState();
    render();
  });

  document.getElementById("batch-delete-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    deleteBatch(data.get("batchId"), data.get("note"));
    saveState();
    render();
  });

  document.getElementById("sale-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const sale = {
      id: uid("s"),
      date: data.get("date") || new Date().toISOString().slice(0, 10),
      customerId: data.get("customerId") || "",
      productId: data.get("productId"),
      locationId: data.get("locationId"),
      staffId: data.get("staffId"),
      quantity: Number(data.get("quantity") || 1),
      unitPrice: Number(data.get("unitPrice") || product(data.get("productId"))?.price || 0),
      taxRate: Number(data.get("taxRate") || 10),
      platformFee: Number(data.get("platformFee") || 0),
      shipping: Number(data.get("shipping") || 0),
      note: data.get("note") || "",
    };
    const stockBefore = stockFor(sale.productId);
    const locationStockBefore = stockForProductAtLocation(sale.productId, sale.locationId);
    const shippedQuantity = applySaleStockOut(sale);
    sale.stockBefore = stockBefore;
    sale.stockAfter = stockFor(sale.productId);
    sale.locationStockBefore = locationStockBefore;
    sale.locationStockAfter = stockForProductAtLocation(sale.productId, sale.locationId);
    sale.shippedQuantity = shippedQuantity;
    if (shippedQuantity < sale.quantity) {
      sale.note = `${sale.note ? `${sale.note} / ` : ""}在庫不足のため、自動出庫数は ${shippedQuantity}`;
    }
    state.sales.unshift(sale);
    saveState();
    render();
  });

  document.getElementById("expense-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const category = String(data.get("customCategory") || data.get("category") || "产品进价").trim();
    state.expenses.unshift({
      id: uid("e"),
      date: data.get("date") || new Date().toISOString().slice(0, 10),
      category,
      vendor: "",
      amount: Number(data.get("amount") || 0),
      taxRate: Number(data.get("taxRate") || 10),
      paymentMethod: "",
      relatedTo: "",
      note: data.get("note") || "",
    });
    saveState();
    render();
  });

  document.getElementById("expense-period-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    state.expensePeriod = {
      start: data.get("start") || state.expensePeriod.start,
      end: data.get("end") || state.expensePeriod.end,
    };
    saveState();
    render();
  });

  document.querySelectorAll(".expense-detail-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".expense-detail-panel").forEach((panel) => {
        panel.hidden = panel.dataset.expenseDetail !== button.dataset.expenseKey || !panel.hidden;
      });
    });
  });

  document.querySelectorAll(".expense-delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.expenses = state.expenses.filter((item) => item.id !== button.dataset.expenseId);
      saveState();
      render();
    });
  });

  document.getElementById("customer-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    state.customers.unshift({
      id: uid("c"),
      name: data.get("name"),
      kana: "",
      contact: data.get("contact") || "",
      email: data.get("email") || "",
      phone: data.get("phone") || "",
      postalCode: data.get("postalCode") || "",
      address: data.get("address") || "",
      invoiceTitle: data.get("invoiceTitle") || data.get("name"),
      closingDay: data.get("closingDay") || "",
      paymentTerm: data.get("paymentTerm") || "",
      deliveryAddress: data.get("deliveryAddress") || "",
      note: data.get("note") || "",
    });
    saveState();
    render();
  });

  document.querySelectorAll(".customer-edit-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const customer = state.customers.find((item) => item.id === form.dataset.customerId);
      if (!customer) return;
      const data = new FormData(form);
      customer.name = data.get("name") || customer.name;
      customer.contact = data.get("contact") || "";
      customer.email = data.get("email") || "";
      customer.phone = data.get("phone") || "";
      customer.postalCode = data.get("postalCode") || "";
      customer.address = data.get("address") || "";
      customer.invoiceTitle = data.get("invoiceTitle") || customer.name;
      customer.closingDay = data.get("closingDay") || "";
      customer.paymentTerm = data.get("paymentTerm") || "";
      customer.deliveryAddress = data.get("deliveryAddress") || "";
      customer.note = data.get("note") || "";
      saveState();
      render();
    });
  });

  document.querySelectorAll(".customer-delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      const customerId = button.dataset.customerId;
      state.customers = state.customers.filter((item) => item.id !== customerId);
      state.sales = state.sales.map((sale) => sale.customerId === customerId ? { ...sale, customerId: "" } : sale);
      saveState();
      render();
    });
  });

  document.getElementById("employee-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const baseSalary = Number(data.get("baseSalary") || 0);
    const email = normalizeEmail(data.get("email"));
    state.users.push({
      id: uid("u"),
      name: data.get("name"),
      employeeNo: data.get("employeeNo") || "",
      email,
      role: data.get("role") || "员工",
      department: data.get("department") || "",
      joinedAt: data.get("joinedAt") || "",
      baseSalary,
      standardSalary: Number(data.get("standardSalary") || baseSalary),
      phone: data.get("phone") || "",
      documentExpires: data.get("documentExpires") || "",
      documents: [],
      note: data.get("note") || "",
      active: true,
    });
    if (email) inviteCompanyMember(email, data.get("memberRole") || "只读", { renderAfter: false });
    saveState();
    render();
  });

  document.querySelectorAll(".company-member-remove").forEach((button) => {
    button.addEventListener("click", () => {
      const member = rawState.companyMembers.find((item) => item.id === button.dataset.memberId && item.companyId === currentCompanyId);
      if (!member || member.role === "老板" || !hasOwnerPermission()) return;
      member.status = "removed";
      member.updatedAt = new Date().toISOString();
      logActivity("member_remove", "company_member", member.id, `メンバー削除: ${member.phoneNumber}`);
      saveState();
      render();
    });
  });

  document.querySelectorAll(".employee-invite-button").forEach((button) => {
    button.addEventListener("click", () => {
      const employee = state.users.find((item) => item.id === button.dataset.employeeId);
      const email = normalizeEmail(employee?.email || "");
      if (!email || !hasOwnerPermission()) return;
      inviteCompanyMember(email, "只读");
    });
  });

  document.querySelectorAll(".employee-member-role-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const member = rawState.companyMembers.find((item) => item.id === form.dataset.memberId && item.companyId === currentCompanyId);
      if (!member || member.role === "老板" || !hasOwnerPermission()) return;
      const data = new FormData(form);
      const role = data.get("role") || "只读";
      member.role = role;
      member.permissions = rolePermissions(role);
      member.updatedAt = new Date().toISOString();
      logActivity("member_role_update", "company_member", member.id, `メンバー権限変更: ${member.phoneNumber}`);
      saveState();
      render();
    });
  });

  document.querySelectorAll(".employee-edit-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const employee = state.users.find((item) => item.id === form.dataset.employeeId);
      if (!employee) return;
      const data = new FormData(form);
      const baseSalary = Number(data.get("baseSalary") || 0);
      const email = normalizeEmail(data.get("email"));
      employee.name = data.get("name") || employee.name;
      employee.employeeNo = data.get("employeeNo") || "";
      employee.email = email;
      employee.role = data.get("role") || "员工";
      employee.department = data.get("department") || "";
      employee.joinedAt = data.get("joinedAt") || "";
      employee.baseSalary = baseSalary;
      employee.standardSalary = Number(data.get("standardSalary") || baseSalary);
      employee.phone = data.get("phone") || "";
      employee.documentExpires = data.get("documentExpires") || "";
      employee.note = data.get("note") || "";
      employee.active = data.get("active") === "true";
      if (email) inviteCompanyMember(email, "只读", { renderAfter: false });
      saveState();
      render();
    });
  });

  document.querySelectorAll(".employee-edit-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".employee-panel")?.classList.add("is-editing");
    });
  });

  document.querySelectorAll(".employee-edit-cancel").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".employee-panel")?.classList.remove("is-editing");
    });
  });

  document.querySelectorAll(".employee-delete-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const employeeId = button.dataset.employeeId;
      const employee = state.users.find((item) => item.id === employeeId);
      if (!employee || !canDeleteEmployee(employee)) return;
      await deleteAllEmployeeDocuments(employeeId);
      state.users = state.users.filter((item) => item.id !== employeeId);
      state.wages = state.wages.filter((item) => item.employeeId !== employeeId);
      state.sales = state.sales.map((sale) => sale.staffId === employeeId ? { ...sale, staffId: "" } : sale);
      state.transactions = state.transactions.map((transaction) => transaction.operatorId === employeeId ? { ...transaction, operatorId: "" } : transaction);
      saveState();
      render();
    });
  });

  document.querySelectorAll(".employee-document-input").forEach((input) => {
    input.addEventListener("change", async () => {
      await uploadEmployeeDocuments(input.dataset.employeeId, Array.from(input.files || []));
    });
  });

  document.querySelectorAll(".document-download-button").forEach((button) => {
    button.addEventListener("click", async () => {
      await downloadEmployeeDocument(button.dataset.documentId);
    });
  });

  document.querySelectorAll(".document-delete-button").forEach((button) => {
    button.addEventListener("click", async () => {
      await deleteEmployeeDocument(button.dataset.employeeId, button.dataset.documentId);
    });
  });

  document.querySelectorAll(".export-employee-wage-pdf").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.closest(".wage-export-panel");
      const wageIds = Array.from(panel?.querySelectorAll('input[name="wageMonth"]:checked') || []).map((input) => input.value);
      exportEmployeeWagePdf(button.dataset.employeeId, wageIds);
    });
  });

  document.getElementById("wage-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    state.wages.unshift(wageRecordFromForm(data));
    saveState();
    render();
  });

  document.querySelectorAll(".wage-edit-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const index = state.wages.findIndex((item) => item.id === form.dataset.wageId);
      if (index < 0) return;
      state.wages[index] = wageRecordFromForm(new FormData(form), form.dataset.wageId);
      saveState();
      render();
    });
  });

  document.querySelectorAll(".wage-delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      const wage = state.wages.find((item) => item.id === button.dataset.wageId);
      if (wage) wage.deletedAt = new Date().toISOString();
      saveState();
      render();
    });
  });

  document.querySelectorAll(".employee-wage-delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      const wage = state.wages.find((item) => item.id === button.dataset.wageId);
      if (wage) wage.employeeDeletedAt = new Date().toISOString();
      saveState();
      render();
    });
  });

  document.querySelectorAll(".wage-restore-button").forEach((button) => {
    button.addEventListener("click", () => {
      const wage = state.wages.find((item) => item.id === button.dataset.wageId);
      if (wage) wage.deletedAt = "";
      saveState();
      render();
    });
  });

  bindWageRateCalculators();

  document.getElementById("user-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const role = data.get("role") || "只读";
    state.users.push({
      id: uid("u"),
      name: data.get("name"),
      loginId: data.get("loginId"),
      password: data.get("password") || "123456",
      role,
      permissions: rolePermissions(role),
      active: true,
    });
    saveState();
    render();
  });

  document.getElementById("send-email-change-code")?.addEventListener("click", () => {
    const email = normalizeEmail(document.querySelector('#account-profile-form [name="newEmail"]')?.value);
    const result = sendEmailVerificationCode(email, "email_change");
    alert(result.message);
  });

  document.getElementById("account-profile-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    updateAccountProfile(data);
  });

  document.querySelectorAll(".account-company-switch").forEach((button) => {
    button.addEventListener("click", () => {
      currentCompanyId = button.dataset.companyId || "";
      sessionStorage.setItem(sessionCompanyKey, currentCompanyId);
      logActivity("company_switch", "company", currentCompanyId, `会社を切替: ${currentCompany()?.companyName || ""}`);
      saveState();
      render();
    });
  });

  document.querySelectorAll(".user-permission-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const user = state.users.find((item) => item.id === form.dataset.userId);
      if (!user) return;
      const data = new FormData(form);
      user.name = data.get("name") || user.name;
      user.loginId = data.get("loginId") || "";
      user.password = data.get("password") || "";
      user.role = data.get("role") || "只读";
      user.active = data.get("active") === "true";
      user.permissions = blankPermissions();
      permissionModules.forEach(([module]) => {
        permissionActions.forEach(([action]) => {
          user.permissions[module][action] = data.get(`permission:${module}:${action}`) === "on";
        });
      });
      if (user.id === currentUserId && !user.active) {
        currentUserId = "";
        sessionStorage.removeItem(sessionKey);
      }
      saveState();
      render();
    });
  });

  document.querySelectorAll(".apply-role-permissions").forEach((button) => {
    button.addEventListener("click", () => {
      const user = state.users.find((item) => item.id === button.dataset.userId);
      if (!user) return;
      const form = button.closest(".user-permission-form");
      const role = form?.querySelector('[name="role"]')?.value || user.role || "只读";
      user.role = role;
      user.permissions = rolePermissions(role);
      saveState();
      render();
    });
  });

  document.getElementById("location-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    state.locations.push({ id: uid("l"), name: data.get("name"), type: data.get("type") });
    saveState();
    render();
  });
}

function splitSettingWords(value) {
  return String(value || "")
    .split(/[、,，\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function submitMarketplaceListing(data) {
  if (!sellerVerified()) {
    alert("掲載には売主の会社認証が必要です。");
    return;
  }
  if (marketplacePublishedCount() >= marketplacePlanLimit()) {
    alert("現在のプランでは掲載可能数の上限に達しました。プランをアップグレードすると、さらに多くの商品を掲載できます。");
    return;
  }
  const productItem = product(data.get("productId"));
  const draft = {
    title: data.get("title") || productItem?.name || "",
    description: data.get("description") || "",
    categoryId: data.get("categoryId") || productItem?.category || "",
  };
  const risks = listingRiskReasons(draft);
  state.marketplaceListings.unshift({
    id: uid("ml"),
    ownerUserId: currentUserId,
    companyId: currentCompanyId,
    productId: data.get("productId") || "",
    title: draft.title,
    description: draft.description,
    categoryId: draft.categoryId,
    images: [productItem?.imageId || productItem?.image || ""].filter(Boolean),
    priceVisible: data.get("priceVisible") === "true",
    priceText: data.get("priceText") || "",
    wholesalePriceText: data.get("wholesalePriceText") || "",
    moq: data.get("moq") || "",
    availableQuantity: data.get("availableQuantity") || "",
    shippingFrom: data.get("shippingFrom") || "",
    companyName: data.get("companyName") || "",
    contactPerson: data.get("contactPerson") || "",
    contactPhone: data.get("contactPhone") || "",
    contactEmail: data.get("contactEmail") || "",
    companyAddress: data.get("companyAddress") || "",
    websiteUrl: data.get("websiteUrl") || "",
    snsUrl: data.get("snsUrl") || "",
    contactVisible: data.get("contactVisible") === "true",
    status: "审核中",
    reviewStatus: "pending",
    reviewReason: risks.length ? `自動チェック: ${risks.join(" / ")}` : "管理者審査待ち",
    reviewHistory: [{ at: new Date().toISOString(), by: currentUserId, action: "submit", note: risks.join(" / ") }],
    isFeatured: false,
    featuredUntil: "",
    priorityScore: 0,
    supplierRank: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: "",
  });
  marketplaceDraftProductId = "";
  saveState();
  render();
}

function marketplaceVerificationFiles(form) {
  const ownerFiles = Array.from(form.querySelector('[name="ownerDocuments"]')?.files || []);
  const companyFiles = Array.from(form.querySelector('[name="companyDocuments"]')?.files || []);
  const files = [...ownerFiles, ...companyFiles];
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (files.length > 5) {
    alert("認証資料は合計5ファイルまでです。");
    return null;
  }
  if (totalSize > 500 * 1024 * 1024) {
    alert("認証資料の合計容量は500MBまでです。");
    return null;
  }
  const mapFile = (file) => ({
    name: file.name,
    size: file.size,
    type: file.type || "",
    preparedAt: new Date().toISOString(),
  });
  return {
    ownerDocuments: ownerFiles.map(mapFile),
    companyDocuments: companyFiles.map(mapFile),
  };
}

function submitMarketplaceInquiry(listingId, data) {
  const listing = state.marketplaceListings.find((item) => item.id === listingId);
  if (!listing) return;
  if (marketplaceTodayInquiryCount() >= marketplaceDailyInquiryLimit()) {
    alert("本日の問い合わせ上限に達しました。プランをアップグレードすると、さらに多くの問い合わせを送信できます。");
    return;
  }
  state.marketplaceInquiries.unshift({
    id: uid("mi"),
    listingId,
    buyerUserId: currentUserId,
    sellerUserId: listing.ownerUserId,
    buyerCompanyName: data.get("buyerCompanyName") || "",
    buyerContactName: data.get("buyerContactName") || "",
    buyerPhone: data.get("buyerPhone") || "",
    buyerEmail: data.get("buyerEmail") || "",
    requestedQuantity: data.get("requestedQuantity") || "",
    desiredPrice: data.get("desiredPrice") || "",
    purpose: data.get("purpose") || "卸価格相談",
    deliveryArea: data.get("deliveryArea") || "",
    desiredDeliveryDate: data.get("desiredDeliveryDate") || "",
    needsSample: data.get("needsSample") === "true",
    message: data.get("message") || "",
    status: "未返信",
    sellerReply: "",
    sellerReplyAt: "",
    markedAsContacted: false,
    markedAsClosed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  saveState();
  render();
}

function submitMarketplaceReply(inquiryId, data, action) {
  const inquiry = state.marketplaceInquiries.find((item) => item.id === inquiryId);
  if (!inquiry) return;
  inquiry.sellerUnitPrice = data.get("sellerUnitPrice") || "";
  inquiry.sellerTotalPrice = data.get("sellerTotalPrice") || "";
  inquiry.sellerDeliveryTime = data.get("sellerDeliveryTime") || "";
  inquiry.sellerShippingTerms = data.get("sellerShippingTerms") || "";
  inquiry.sellerTaxIncluded = data.get("sellerTaxIncluded") || "未設定";
  inquiry.sellerContactTime = data.get("sellerContactTime") || "";
  inquiry.sellerContact = data.get("sellerContact") || "";
  inquiry.sellerReply = data.get("sellerReply") || "";
  inquiry.sellerReplyAt = new Date().toISOString();
  inquiry.updatedAt = new Date().toISOString();
  const statusMap = {
    reply: "返信済み",
    price: "価格返信済み",
    reject: "辞退",
    offline: "直接連絡依頼",
    contacted: "連絡済み",
    closed: "成約済み",
  };
  inquiry.status = statusMap[action] || "返信済み";
  if (action === "contacted") inquiry.markedAsContacted = true;
  if (action === "closed") inquiry.markedAsClosed = true;
  saveState();
  render();
}

function submitMarketplaceVerification(data) {
  const files = marketplaceVerificationFiles(document.getElementById("marketplace-verification-form"));
  if (!files) return;
  let verification = sellerVerification();
  if (!verification) {
    verification = { id: uid("mv"), userId: currentUserId, companyId: currentCompanyId, verificationType: "seller", createdAt: new Date().toISOString() };
    state.marketplaceVerifications.unshift(verification);
  }
  verification.legalName = data.get("legalName") || "";
  verification.corporateNumber = data.get("corporateNumber") || "";
  verification.representativeName = data.get("representativeName") || "";
  verification.address = data.get("address") || "";
  verification.phone = data.get("phone") || "";
  verification.email = data.get("email") || "";
  if (files.ownerDocuments.length || !verification.ownerDocuments) verification.ownerDocuments = files.ownerDocuments;
  if (files.companyDocuments.length || !verification.companyDocuments) verification.companyDocuments = files.companyDocuments;
  verification.identityDocumentUrl = (verification.ownerDocuments || []).map((item) => item.name).join("、");
  verification.licenseDocumentUrl = (verification.companyDocuments || []).map((item) => item.name).join("、");
  verification.documentDelivery = "admin_email";
  verification.documentStoragePolicy = "metadata_only_local";
  verification.adminEmailQueued = Boolean((verification.ownerDocuments || []).length || (verification.companyDocuments || []).length);
  verification.antiSocialCheck = data.get("antiSocialCheck") === "on";
  verification.status = "pending";
  verification.rejectionReason = "";
  verification.updatedAt = new Date().toISOString();
  saveState();
  render();
}

function reviewMarketplaceListing(listingId, reviewStatus, reason = "") {
  const listing = state.marketplaceListings.find((item) => item.id === listingId);
  if (!listing) return;
  if (reviewStatus === "approved") {
    listing.status = "已掲載";
    listing.reviewStatus = "approved";
    listing.reviewReason = "";
    listing.publishedAt = new Date().toISOString();
  }
  if (reviewStatus === "rejected") {
    listing.status = "审核不通过";
    listing.reviewStatus = "rejected";
    listing.reviewReason = reason;
  }
  if (reviewStatus === "stopped") {
    listing.status = "已下架";
    listing.reviewStatus = "stopped";
    listing.reviewReason = reason;
  }
  listing.updatedAt = new Date().toISOString();
  listing.reviewHistory = [...(listing.reviewHistory || []), { at: new Date().toISOString(), by: currentUserId, action: reviewStatus, note: reason }];
  saveState();
  render();
}

function reviewMarketplaceVerification(verificationId, status, reason = "") {
  const verification = state.marketplaceVerifications.find((item) => item.id === verificationId);
  if (!verification) return;
  verification.status = status;
  verification.rejectionReason = reason;
  verification.reviewedBy = currentUserId;
  verification.reviewedAt = new Date().toISOString();
  verification.updatedAt = new Date().toISOString();
  saveState();
  render();
}

function updateBatch(input) {
  const item = batch(input.batchId);
  if (!item) return;
  const beforeQuantity = Number(item.quantity || 0);
  if (input.code) item.code = input.code;
  if (input.locationId) item.locationId = input.locationId;
  if (input.expires) item.expires = input.expires;
  if (input.quantity !== "" && input.quantity !== null) item.quantity = Number(input.quantity || 0);
  if (input.note) item.note = input.note;
  const diff = Number(item.quantity || 0) - beforeQuantity;
  addTransaction({
    action: "盘点",
    productId: item.productId,
    batchId: item.id,
    from: item.locationId,
    to: item.locationId,
    quantity: diff,
    operatorId: state.users[0]?.id || "",
    note: input.note || `在庫修正：${beforeQuantity} -> ${item.quantity}`,
  });
}

function deleteBatch(batchId, note) {
  const item = batch(batchId);
  if (!item) return;
  state.batches = state.batches.filter((batchItem) => batchItem.id !== batchId);
  addTransaction({
    action: "损耗",
    productId: item.productId,
    batchId: item.id,
    from: item.locationId,
    to: "",
    quantity: Number(item.quantity || 0),
    operatorId: state.users[0]?.id || "",
    note: note || `ロット削除 ${item.code}`,
  });
}

function applyStockAction(input) {
  const action = input.action;
  const quantity = Math.max(0, Number(input.quantity || 0));
  if (!action || quantity < 0) return;

  if (action === "入库" || action === "退货入库") {
    const to = input.toLocationId || state.locations[0]?.id;
    if (!input.productId || !to || quantity <= 0) return;
    const newBatch = {
      id: uid("b"),
      productId: input.productId,
      locationId: to,
      code: input.code || (action === "退货入库" ? "返品ロット" : "標準ロット"),
      produced: new Date().toISOString().slice(0, 10),
      expires: input.expires || "2099-12-31",
      quantity,
      note: input.note || "",
    };
    state.batches.unshift(newBatch);
    addTransaction({ ...input, batchId: newBatch.id, from: "", to, quantity });
    return;
  }

  const sourceBatch = batch(input.batchId);
  if (!sourceBatch) return;

  if (action === "出库" || action === "损耗") {
    const actual = Math.min(quantity, Number(sourceBatch.quantity || 0));
    sourceBatch.quantity -= actual;
    addTransaction({ ...input, productId: sourceBatch.productId, from: sourceBatch.locationId, to: "", quantity: actual });
    return;
  }

  if (action === "调拨") {
    const to = input.toLocationId;
    if (!to || to === sourceBatch.locationId) return;
    const actual = Math.min(quantity, Number(sourceBatch.quantity || 0));
    sourceBatch.quantity -= actual;
    const movedBatch = {
      id: uid("b"),
      productId: sourceBatch.productId,
      locationId: to,
      code: sourceBatch.code,
      produced: sourceBatch.produced,
      expires: sourceBatch.expires,
      quantity: actual,
      note: input.note || "移動により自動作成",
    };
    state.batches.unshift(movedBatch);
    addTransaction({ ...input, productId: sourceBatch.productId, from: sourceBatch.locationId, to, quantity: actual });
    return;
  }

  if (action === "盘点") {
    const before = Number(sourceBatch.quantity || 0);
    sourceBatch.quantity = quantity;
    addTransaction({ ...input, productId: sourceBatch.productId, from: sourceBatch.locationId, to: sourceBatch.locationId, quantity: quantity - before, note: input.note || `棚卸前 ${before}、棚卸後 ${quantity}` });
  }
}

function applySaleStockOut(sale) {
  const quantity = Math.max(0, Number(sale.quantity || 0));
  if (!sale.productId || quantity <= 0) return 0;
  let remaining = quantity;
  const candidates = state.batches
    .filter((item) => item.productId === sale.productId && Number(item.quantity || 0) > 0)
    .sort((a, b) => {
      const locationScore = (b.locationId === sale.locationId ? 1 : 0) - (a.locationId === sale.locationId ? 1 : 0);
      if (locationScore) return locationScore;
      return new Date(a.expires || "2099-12-31") - new Date(b.expires || "2099-12-31");
    });

  for (const item of candidates) {
    if (remaining <= 0) break;
    const actual = Math.min(remaining, Number(item.quantity || 0));
    item.quantity = Number(item.quantity || 0) - actual;
    remaining -= actual;
    addTransaction({
      action: "出库",
      productId: item.productId,
      batchId: item.id,
      from: item.locationId,
      to: "",
      quantity: actual,
      operatorId: sale.staffId,
      note: `販売出庫：${customerName(sale.customerId)}${sale.note ? ` / ${sale.note}` : ""}`,
    });
  }

  return quantity - remaining;
}

function addTransaction(input) {
  state.transactions.unshift({
    id: uid("t"),
    action: input.action,
    productId: input.productId,
    batchId: input.batchId || "",
    from: input.from ?? input.fromLocationId ?? "",
    to: input.to ?? input.toLocationId ?? "",
    quantity: Number(input.quantity || 0),
    operatorId: input.operatorId || state.users[0]?.id || "",
    at: new Date().toISOString(),
    note: input.note || "",
  });
}

function bindFilters() {
  bindProductFilter();
  bindSalesFilter();
  bindMarketplaceFilter();
  bindTableFilter("expenses-filter", "expenses-table");
  bindTableFilter("transaction-filter", "transactions-table");
}

function bindMarketplaceFilter() {
  const input = document.getElementById("marketplace-filter");
  const category = document.getElementById("marketplace-category-filter");
  if (!input && !category) return;
  const update = () => {
    const query = input?.value.trim().toLowerCase() || "";
    const categoryValue = category?.value || "";
    document.querySelectorAll("[data-marketplace-card]").forEach((card) => {
      const matchesText = !query || String(card.dataset.marketplaceSearch || "").includes(query);
      const matchesCategory = !categoryValue || card.dataset.marketplaceCategory === categoryValue;
      card.hidden = !(matchesText && matchesCategory);
    });
  };
  input?.addEventListener("input", update);
  category?.addEventListener("change", update);
}

function bindProductFilter() {
  const input = document.getElementById("product-filter");
  if (!input) return;
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    document.querySelectorAll(".product-row").forEach((row) => {
      const match = !query || String(row.dataset.productSearch || "").includes(query);
      row.hidden = !match;
      const editRow = document.querySelector(`.product-edit-row[data-product-id="${row.dataset.productId}"]`);
      if (editRow) {
        editRow.hidden = !match || editRow.hidden;
      }
    });
  });
}

function bindSalesFilter() {
  const input = document.getElementById("sales-filter");
  if (!input) return;
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    document.querySelectorAll(".sale-row").forEach((row) => {
      const match = !query || String(row.dataset.saleSearch || "").includes(query);
      row.hidden = !match;
      const detailRow = document.querySelector(`.sale-detail-row[data-sale-id="${row.dataset.saleId}"]`);
      if (detailRow && !match) detailRow.hidden = true;
    });
  });
}

function bindTableFilter(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    table.querySelectorAll("tbody tr").forEach((row) => {
      row.hidden = query && !row.textContent.toLowerCase().includes(query);
    });
  });
}

function bindWageRateCalculators() {
  document.querySelectorAll(".wage-calculator-form").forEach(bindWageRateCalculator);
}

function bindWageRateCalculator(form) {
  if (!form) return;

  const numberValue = (name) => Number(form.querySelector(`[name="${name}"]`)?.value || 0);
  const updateTotals = () => {
    const draft = {
      baseSalary: numberValue("baseSalary"),
      overtimePay: numberValue("overtimePay"),
      commutingAllowance: numberValue("commutingAllowance"),
      otherAllowance: numberValue("otherAllowance"),
      employeeHealthInsurance: numberValue("employeeHealthInsurance"),
      employeeCareInsurance: numberValue("employeeCareInsurance"),
      employeePension: numberValue("employeePension"),
      employeeEmploymentInsurance: numberValue("employeeEmploymentInsurance"),
      residentTax: numberValue("residentTax"),
      incomeTax: numberValue("incomeTax"),
      otherEmployeeDeduction: numberValue("otherEmployeeDeduction"),
      companyHealthInsurance: numberValue("companyHealthInsurance"),
      companyCareInsurance: numberValue("companyCareInsurance"),
      companyPension: numberValue("companyPension"),
      companyEmploymentInsurance: numberValue("companyEmploymentInsurance"),
      workersCompInsurance: numberValue("workersCompInsurance"),
      childCareContribution: numberValue("childCareContribution"),
      childCareSupport: numberValue("childCareSupport"),
      otherCompanyCost: numberValue("otherCompanyCost"),
    };
    const totals = {
      gross: grossWage(draft),
      deductions: employeeDeductions(draft),
      net: netWage(draft),
      companyTotal: companyTotalCost(draft),
    };
    Object.entries(totals).forEach(([key, value]) => {
      const target = form.querySelector(`[data-wage-total="${key}"]`);
      if (target) target.textContent = money(value);
    });
  };

  const update = () => {
    const standardInput = form.querySelector('[name="standardSalary"]');
    const baseInput = form.querySelector('[name="baseSalary"]');
    const overtimeInput = form.querySelector('[name="overtimePay"]');
    const commutingInput = form.querySelector('[name="commutingAllowance"]');
    const otherAllowanceInput = form.querySelector('[name="otherAllowance"]');
    const standardSalary = Number(standardInput?.value || 0);
    const baseSalary = Number(baseInput?.value || 0);
    const grossSalary = baseSalary
      + Number(overtimeInput?.value || 0)
      + Number(commutingInput?.value || 0)
      + Number(otherAllowanceInput?.value || 0);
    const annualBaseSalary = annualSalaryBase(baseSalary);
    form.querySelectorAll("[data-rate-for]").forEach((rateInput) => {
      const amountName = rateInput.dataset.rateFor;
      const amountInput = form.querySelector(`[name="${amountName}"]`);
      if (!amountInput) return;
      const calculationBase = rateInput.dataset.rateBase === "annual"
        ? annualBaseSalary
        : rateInput.dataset.rateBase === "gross"
          ? grossSalary
        : rateInput.dataset.rateBase === "base"
          ? baseSalary
          : standardSalary;
      amountInput.value = amountFromRate(calculationBase, rateInput.value);
    });
    updateTotals();
  };

  form.querySelector('[name="employeeId"]')?.addEventListener("change", (event) => {
    const option = event.currentTarget.selectedOptions[0];
    const baseInput = form.querySelector('[name="baseSalary"]');
    const standardInput = form.querySelector('[name="standardSalary"]');
    if (baseInput && Number(option?.dataset.baseSalary || 0) > 0) {
      baseInput.value = option.dataset.baseSalary;
    }
    if (standardInput && Number(option?.dataset.standardSalary || 0) > 0) {
      standardInput.value = option.dataset.standardSalary;
    }
    update();
  });
  form.querySelector('[name="baseSalary"]')?.addEventListener("input", update);
  form.querySelector('[name="overtimePay"]')?.addEventListener("input", update);
  form.querySelector('[name="commutingAllowance"]')?.addEventListener("input", update);
  form.querySelector('[name="otherAllowance"]')?.addEventListener("input", update);
  form.querySelector('[name="standardSalary"]')?.addEventListener("input", update);
  form.querySelectorAll("[data-rate-for]").forEach((input) => input.addEventListener("input", update));
  form.querySelectorAll("input").forEach((input) => input.addEventListener("input", updateTotals));
  update();
}

document.querySelectorAll("nav button").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.getElementById("language-select")?.addEventListener("change", (event) => {
  currentLanguage = event.currentTarget.value;
  localStorage.setItem(languageKey, currentLanguage);
  render();
});

document.getElementById("seed-btn").addEventListener("click", () => {
  state = normalizeState(structuredClone(seedState));
  currentUserId = "u1";
  sessionStorage.setItem(sessionKey, currentUserId);
  saveState();
  render();
});

document.getElementById("export-btn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `unique-ledger-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

function isStandalonePwa() {
  return window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone;
}

function updateInstallButton() {
  const button = document.getElementById("install-pwa-btn");
  if (!button) return;
  button.hidden = isStandalonePwa();
  button.textContent = deferredInstallPrompt ? "インストール" : "ホーム画面に追加";
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  updateInstallButton();
});

document.getElementById("install-pwa-btn")?.addEventListener("click", async () => {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    updateInstallButton();
    return;
  }
  alert("iPhoneではSafariの共有ボタンから「ホーム画面に追加」を選ぶと、アプリのように起動できます。PCではChrome/Edgeのインストールボタンを利用できます。");
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  updateInstallButton();
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

saveState();
render();
updateInstallButton();
