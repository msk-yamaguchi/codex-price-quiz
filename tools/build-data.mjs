import { mkdir, readFile, writeFile } from "node:fs/promises";

const api = "https://commons.wikimedia.org/w/api.php";

const baseItems = [
  ["道路のカーブミラー", "街の設備", "約4万〜8万円", "住宅街の曲がり角や駐車場の出入口で見かける丸い道路反射鏡です。", "道路反射鏡として使う一面鏡は本体だけで数万円台。支柱や設置工事は別です。", "カーブミラー", "traffic mirror road convex mirror"],
  ["マンホール蓋", "街の設備", "約2万〜6万円", "足元にあるので意識しにくいですが、荷重区分や素材で値段が変わります。", "歩道用や車両荷重対応の鋳鉄カバーは、仕様によって数万円規模になります。", "マンホール 蓋", "manhole cover"],
  ["車止めポール", "街の設備", "約1万〜4万円", "歩道や駐車場の入口で車の進入を止めるポールです。", "ステンレス製や反射材付きなど、屋外で長く使う仕様ほど高くなります。", "車止め ポール", "bollard street"],
  ["道路反射鋲", "街の設備", "約800〜3,000円/個", "車線や歩道境界に埋め込まれて光る小さな反射材です。", "1個単位では安めですが、道路には大量に使われるため総額は積み上がります。", "道路 反射鋲", "road reflector marker"],
  ["駐車場の輪止め", "駐車場", "約2,000〜8,000円/個", "駐車スペースの奥に置かれているタイヤ止めです。", "樹脂やコンクリート製の本体価格で、アンカーや施工は別です。", "駐車場 輪止め", "parking wheel stop"],
  ["ポールコーン", "道路・駐車場", "約8,000〜2万円", "車線分離や駐車場入口に立つ柔らかい赤いポールです。", "踏まれても戻る柔軟素材と反射材があり、単なるカラーコーンより高めです。", "ポールコーン", "flexible traffic bollard"],
  ["カラーコーン", "工事・安全", "約700〜2,000円", "工事現場や駐車場で最もよく見る三角コーンです。", "単体は安い一方、現場ではバーや重りと組み合わせて大量に使われます。", "カラーコーン", "traffic cone"],
  ["単管バリケード", "工事・安全", "約3,000〜8,000円", "道路工事で歩行者と作業区域を分ける柵です。", "軽量でも屋外で倒れにくく、視認性の高い樹脂部品を持つため数千円規模です。", "単管 バリケード", "construction barricade"],
  ["仮設フェンス", "工事・安全", "約5,000〜1.5万円/枚", "工事現場の外周に並ぶ白や緑のフェンスです。", "1枚では数千円台でも、現場全体では何十枚も必要になります。", "仮設 フェンス", "temporary construction fence"],
  ["工事看板", "工事・安全", "約5,000〜2万円", "道路工事の手前に置かれる注意喚起の看板です。", "反射シート、鉄枠、折りたたみ脚などを備えた現場用品です。", "工事 看板", "road works sign"],
  ["交通誘導灯", "工事・安全", "約2,000〜8,000円", "警備員が夜間に振っている赤く光る棒です。", "LED、電池、雨天対応、視認性のための筒構造で価格差があります。", "交通誘導灯", "traffic baton light"],
  ["道路工事用LED矢印板", "工事・安全", "約8万〜11万円", "夜間工事や車線規制で、光る矢印として置かれている安全機材です。", "屋外で視認できるLED、バッテリー、反射材、折りたたみ構造が必要です。", "矢印板 LED", "road work arrow board"],
  ["ソーラー回転灯", "工事・安全", "約1万〜4万円", "工事現場や駐車場で回転しながら注意を促す警告灯です。", "太陽電池とバッテリーを持つため、電源不要の小型機でも数万円になることがあります。", "ソーラー 回転灯", "solar warning beacon"],
  ["工事用投光器", "工事・安全", "約1万〜5万円", "夜間工事や屋外作業で広い範囲を照らす照明です。", "防水性、明るさ、スタンドの有無で家庭用ライトとは価格が変わります。", "投光器 LED", "portable work light construction"],
  ["屋外掲示板", "公共空間", "約8万〜30万円", "自治会や施設入口で案内を貼る、屋外設置の掲示板です。", "雨風に耐えるアルミ枠、鍵、ガラス扉が付くと家具より設備に近い価格になります。", "屋外 掲示板", "outdoor notice board"],
  ["公共施設・公園のベンチ", "公共空間", "約8万〜20万円", "公園やサービスエリアに置かれている屋外用ベンチです。", "再生樹脂や鋳物脚など、雨ざらしで長く使える素材になると高くなります。", "公園 ベンチ", "park bench"],
  ["ベルトパーテーション", "店舗・施設", "約1万〜3万円", "空港や銀行の列整理で見かけるベルト付きポールです。", "重いベースと巻き取り機構があり、倒れにくさが価格に出ます。", "ベルトパーテーション", "stanchion belt barrier"],
  ["傘袋スタンド", "店舗・施設", "約3万〜8万円", "雨の日に店頭で傘をビニール袋へ入れるスタンドです。", "袋を一枚ずつ出す機構と安定した金属筐体が必要な業務用備品です。", "傘袋 スタンド", "umbrella bag stand"],
  ["スーパーのショッピングカート", "店舗", "約1.5万〜3万円", "スーパーで買い物中に押す店舗備品です。", "静音キャスター、子ども用座席、安全設計が入り、家庭用カートより高めです。", "ショッピングカート 店舗用", "shopping cart supermarket"],
  ["買い物かご", "店舗", "約500〜1,200円", "スーパーやドラッグストアで手に取る樹脂製のかごです。", "単体は安いですが、店舗では色分けして大量にそろえる備品です。", "買い物かご", "shopping basket"],
  ["カゴ台車", "店舗・物流", "約2万〜6万円", "スーパーのバックヤードや配送で荷物をまとめて運ぶ金属台車です。", "大きな金属フレームとキャスターを備え、折りたたみ式でも数万円します。", "カゴ台車", "roll cage trolley"],
  ["レジスター", "店舗", "約3万〜10万円", "小売店の会計台に置かれる現金管理付きレジです。", "金銭管理、レシート印字、部門登録などの機能で事務機器としての価格になります。", "レジスター", "cash register"],
  ["バーコードリーダー", "店舗", "約1万〜6万円", "レジで商品コードを読み取るハンディ型スキャナーです。", "読み取り方式、耐落下性、無線対応の有無で価格差が大きくなります。", "バーコードリーダー", "barcode scanner"],
  ["キャッシュドロア", "店舗", "約8,000〜2万円", "レジ下で紙幣と硬貨を分けて入れる引き出しです。", "鍵、仕切り、レジ連動の開閉機構があるため、ただの引き出しより高めです。", "キャッシュドロア", "cash drawer"],
  ["レシートプリンター", "店舗", "約2万〜6万円", "レジ横でレシートを高速印字する小型プリンターです。", "感熱紙を高速で出す機構とPOS連携が必要な店舗機器です。", "レシートプリンター", "receipt printer"],
  ["スタンド付きデジタルサイネージ", "店舗・案内", "約20万〜40万円", "商業施設や受付で案内動画を流す縦型ディスプレイです。", "表示機、スタンド、再生機能をまとめた業務設置向け機器です。", "デジタルサイネージ ディスプレイ", "digital signage display"],
  ["マネキン", "店舗", "約2万〜10万円", "服売り場でコーディネートを見せる人体模型です。", "全身型や可動型は造形と耐久性が必要で、数万円以上になります。", "マネキン", "mannequin clothing store"],
  ["業務用ハンガーラック", "店舗", "約1万〜5万円", "アパレル店で服を大量に掛ける金属ラックです。", "重い衣類を載せてもたわまないフレームとキャスターが価格の中心です。", "ハンガーラック 業務用", "clothing rack store"],
  ["のぼり旗スタンド", "店舗・案内", "約1,000〜5,000円", "店先ののぼり旗を立てる水タンク型の台です。", "安価ですが、店舗では旗とポールを含めて複数本設置します。", "のぼり スタンド", "advertising flag stand"],
  ["店舗用防犯ミラー", "店舗・施設", "約5,000〜2万円", "死角をなくすために店内の天井付近へ付ける丸いミラーです。", "軽量でも視野角と歪みの少なさが必要で、店舗備品として数千円からです。", "防犯ミラー 店舗", "security mirror store"],
  ["業務用製氷機", "厨房", "約12万〜33万円", "カフェや居酒屋のバックヤードで氷を作り続ける機械です。", "小型でも給排水と冷却機構を備え、日産能力や貯氷量が増えるほど上がります。", "業務用 製氷機", "commercial ice machine"],
  ["卓上真空包装機", "食品加工", "約16万〜30万円", "肉や総菜の袋から空気を抜いて密封する箱型機械です。", "真空ポンプと密封ヒーターを備え、家庭用シーラーとは桁が変わります。", "真空包装機 卓上", "vacuum packaging machine"],
  ["業務用炊飯器", "厨房", "約3万〜10万円", "飲食店や給食で大量の米を炊く大型炊飯器です。", "容量、保温性能、ガス式か電気式かで価格が変わります。", "業務用 炊飯器", "commercial rice cooker"],
  ["電気フライヤー", "厨房", "約5万〜20万円", "揚げ物を一定温度で出し続ける飲食店向け機器です。", "油槽、温度制御、安全装置、容量が価格を左右します。", "電気フライヤー 業務用", "commercial deep fryer"],
  ["ホットショーケース", "店舗・厨房", "約5万〜20万円", "コンビニや惣菜店で温かい商品を並べる保温ケースです。", "保温ヒーターと透明ケース、棚構造があり、サイズで大きく変わります。", "ホットショーケース", "heated display case"],
  ["フードウォーマー", "厨房", "約2万〜10万円", "ビュッフェや厨房で料理を保温する機器です。", "温度を一定に保つヒーターとステンレス容器が価格の中心です。", "フードウォーマー", "food warmer buffet"],
  ["スープウォーマー", "厨房", "約1万〜5万円", "スープやカレーを温かく保つ丸い保温器です。", "小型でも温度調整と保温容器があり、業務用は連続使用前提です。", "スープウォーマー", "soup kettle warmer"],
  ["業務用ミキサー", "厨房", "約5万〜25万円", "パン生地や菓子材料を混ぜる大型の卓上ミキサーです。", "強いモーターと金属ボウルを備え、家庭用より連続稼働に耐えます。", "業務用 ミキサー", "commercial stand mixer"],
  ["包丁まな板殺菌庫", "厨房", "約10万〜35万円", "厨房で包丁やまな板を紫外線などで保管・殺菌する箱です。", "衛生管理のための灯具、棚、ステンレス筐体が必要です。", "包丁 まな板 殺菌庫", "knife sterilizer cabinet"],
  ["デジタル台はかり", "厨房・物流", "約1万〜8万円", "荷物や食材を台の上で計量する業務用はかりです。", "秤量、精度、防水、検定付きかどうかで価格が変わります。", "デジタル 台はかり", "digital platform scale"],
  ["中心温度計", "厨房", "約3,000〜2万円", "食品の中心温度を測る細い針付き温度計です。", "衛生管理用の防水性や応答速度が高いものほど高価になります。", "中心温度計", "food thermometer probe"],
  ["製麺機", "食品加工", "約8万〜30万円", "麺の生地を伸ばして切る店舗・製造向け機械です。", "ローラー、切刃、モーターの精度が必要で、小型でも数万円台後半からです。", "製麺機", "noodle making machine"],
  ["ステンレス作業台", "厨房・作業場", "約1万〜6万円", "厨房や実験室でよく見る銀色の作業台です。", "錆びにくく洗いやすいステンレス天板と脚のサイズで価格が決まります。", "ステンレス作業台 厨房", "stainless steel work table"],
  ["食品コンテナ番重", "厨房・物流", "約1,000〜5,000円", "パン屋や惣菜工場で食材を運ぶ浅い樹脂箱です。", "単体は安いですが、同じ規格で大量に積み重ねて使われます。", "番重 コンテナ", "food storage tote"],
  ["ハンドパレットトラック", "物流", "約5万〜12万円", "パレットに載った荷物を少し持ち上げて運ぶ道具です。", "標準型は5万円前後から、低床・高耐荷重タイプは10万円前後になります。", "ハンドパレットトラック", "pallet jack"],
  ["樹脂パレット", "物流", "約4,000〜8,000円", "倉庫で荷物の下に敷く黒や青の樹脂製パレットです。", "1トン積載クラスでも単体は数千円台。大量に使う備品です。", "樹脂 パレット", "plastic pallet"],
  ["スチール台車", "物流・店舗", "約1万〜4万円", "倉庫や店舗で段ボールを積んで運ぶ平台車です。", "耐荷重、静音キャスター、ハンドル折りたたみの有無で価格が変わります。", "スチール 台車", "platform trolley"],
  ["ストレッチフィルム包装機", "物流", "約20万〜80万円", "パレット荷物を透明フィルムでぐるぐる巻く機械です。", "ターンテーブルや制御部があるため、手巻き用フィルムとは桁が違います。", "ストレッチフィルム 包装機", "stretch wrapping machine"],
  ["バンド結束機", "物流", "約8万〜30万円", "段ボールや新聞束をPPバンドで締める機械です。", "締め付け、溶着、カットを自動化するため、事務用品ではなく小型機械です。", "バンド 結束機", "strapping machine"],
  ["ローラーコンベヤ", "物流", "約2万〜10万円", "荷物を滑らせて移動させるローラー付きの搬送台です。", "長さ、幅、ローラー材質、脚付きかどうかで価格が変わります。", "ローラーコンベヤ", "roller conveyor"],
  ["物流作業台", "物流・工場", "約2万〜10万円", "倉庫や工場で検品や梱包に使う頑丈な作業台です。", "耐荷重のある天板と脚、棚や引き出しの有無で価格差が出ます。", "作業台 工場", "industrial workbench"],
  ["ツールワゴン", "工場・整備", "約1万〜6万円", "工具を載せて移動するキャスター付きの棚です。", "金属製で耐荷重があり、引き出し付きだと価格が上がります。", "ツールワゴン", "tool cart"],
  ["折りたたみコンテナ", "物流・店舗", "約800〜3,000円", "使わないときに薄く畳める物流用の樹脂箱です。", "1個は安価ですが、店舗や倉庫では何百個単位で使われます。", "折りたたみ コンテナ", "folding plastic crate"],
  ["荷締めベルト", "物流", "約1,000〜5,000円", "トラックや台車の荷物を固定するベルトです。", "ラチェット付きや高耐荷重タイプになるほど価格が上がります。", "荷締め ベルト", "ratchet tie down strap"],
  ["ラベルプリンター", "物流・店舗", "約3万〜15万円", "商品ラベルや配送ラベルを印刷する専用プリンターです。", "印字方式、幅、耐久性、ネットワーク対応で価格が変わります。", "ラベルプリンター", "label printer"],
  ["台秤", "物流・工場", "約2万〜10万円", "大型荷物や原料を床置きで量るはかりです。", "秤量が大きく、表示器と台部が分かれる業務用は数万円以上になります。", "台秤", "platform weighing scale"],
  ["パレットラック", "倉庫", "約3万〜20万円", "倉庫でパレット荷物を高く積む金属棚です。", "支柱とビームの耐荷重が価格の中心で、列を組むと総額は大きくなります。", "パレットラック", "warehouse pallet rack"],
  ["ハンディターミナル", "物流・店舗", "約5万〜20万円", "在庫管理でバーコードを読み取る携帯端末です。", "耐落下性、無線通信、業務アプリ対応でスマホより高い専用品になります。", "ハンディターミナル", "handheld barcode terminal"],
  ["オフィスシュレッダー", "オフィス", "約3万〜5万円", "コピー用紙をまとめて裁断できる事務所向け機器です。", "A4を十数枚まとめて細断できる中型機は数万円台が中心です。", "シュレッダー オフィス", "office paper shredder"],
  ["ラミネーター", "オフィス・店舗", "約1万〜8万円", "メニューや掲示物を透明フィルムで加工する機械です。", "A3対応や高速・連続加工に強い業務用ほど価格が上がります。", "ラミネーター", "laminator machine"],
  ["脚付きホワイトボード", "オフィス", "約1万〜5万円", "会議室や教室で使う移動式ホワイトボードです。", "両面タイプ、幅、脚とキャスターの安定性で価格が変わります。", "脚付き ホワイトボード", "whiteboard on wheels"],
  ["オフィスパーテーション", "オフィス", "約1万〜6万円/枚", "執務スペースを区切る置き型の間仕切りです。", "吸音性や高さ、連結部材の有無で1枚あたりの価格が変わります。", "オフィス パーテーション", "office partition"],
  ["耐火金庫", "オフィス・店舗", "約5万〜30万円", "書類や現金を火災から守る重い金庫です。", "耐火時間、鍵方式、重量で価格が大きく変わります。", "耐火 金庫", "fireproof safe"],
  ["暗証番号式キーボックス", "施設管理", "約3,000〜2万円", "施設や物件の鍵を一時保管する小型の暗証番号式ボックスです。", "屋外対応、収納本数、ダイヤルやボタンの方式で価格が変わります。", "キーボックス 壁掛け", "key lock box"],
  ["タイムレコーダー", "オフィス・店舗", "約2万〜8万円", "出退勤を打刻する勤怠管理用の機械です。", "カード式からIC対応まであり、勤怠ソフト連携で価格が変わります。", "タイムレコーダー", "time clock machine"],
  ["プロジェクタースクリーン", "会議室", "約2万〜10万円", "会議室や教室で映像を映す巻き上げ式スクリーンです。", "サイズ、電動か手動か、天吊り対応の有無で価格差が出ます。", "プロジェクター スクリーン", "projection screen"],
  ["業務用空気清浄機", "施設設備", "約5万〜25万円", "待合室や店舗に置かれる大風量の空気清浄機です。", "広い部屋向けの風量とフィルター性能が価格に反映されます。", "業務用 空気清浄機", "commercial air purifier"],
  ["大型サーキュレーター", "施設設備", "約1万〜6万円", "工場や体育館で空気を動かす大型の送風機です。", "羽根径、風量、首振り、防塵性で家庭用より高くなります。", "大型 サーキュレーター", "industrial air circulator"],
  ["業務用傘立て", "施設設備", "約1万〜5万円", "オフィスや病院入口に置かれる大人数用の傘立てです。", "収納本数、鍵付きか、水受け構造で価格が変わります。", "業務用 傘立て", "umbrella stand office"],
  ["集合メールボックス", "施設設備", "約2万〜10万円", "マンションやオフィス入口に並ぶ郵便受けです。", "戸数、鍵、前入れ後出し構造、防雨性で価格が変わります。", "集合郵便受け", "apartment mailboxes"],
  ["業務用掃除機", "清掃", "約2万〜10万円", "ホテルや店舗清掃で使う大きめの掃除機です。", "吸引力、タンク容量、連続使用に耐えるモーターで家庭用より高めです。", "業務用掃除機 乾式", "commercial vacuum cleaner"],
  ["床洗浄機", "清掃", "約20万〜80万円", "駅や商業施設の床をブラシで洗いながら吸水する機械です。", "ブラシ、洗剤タンク、汚水回収機構を持つため清掃用の小型車両に近い価格です。", "自動床洗浄機", "floor scrubber machine"],
  ["高圧洗浄機", "清掃・設備", "約2万〜15万円", "水を高圧で噴射して外壁や床を洗う機械です。", "水圧、耐久性、業務用ポンプの性能で価格が変わります。", "高圧洗浄機 業務用", "pressure washer"],
  ["フロアポリッシャー", "清掃", "約8万〜25万円", "ビル清掃で床を磨く丸いブラシ付き機械です。", "大きなモーターとブラシ駆動部があり、清掃会社向けの設備です。", "フロアポリッシャー 12インチ", "floor polisher"],
  ["清掃カート", "清掃", "約1万〜6万円", "ホテルや施設の清掃道具をまとめて運ぶカートです。", "袋、棚、バケツ置き、静音キャスター付きで、単なる台車より高くなります。", "清掃 カート", "janitor cart"],
  ["モップ絞り器", "清掃", "約5,000〜2万円", "モップを足踏みやレバーで絞る黄色い清掃バケツです。", "業務用は水量と耐久性があり、毎日の清掃に耐える作りです。", "モップ 絞り器", "mop bucket wringer"],
  ["乾湿両用掃除機", "清掃・工場", "約1万〜8万円", "水も粉じんも吸える工場・清掃用の掃除機です。", "タンク容量とフィルター、防水性で家庭用とは用途が違います。", "乾湿両用 掃除機", "wet dry vacuum cleaner"],
  ["業務用送風機", "清掃・工事", "約2万〜10万円", "床の乾燥や換気に使う強力な送風機です。", "風量と耐久性が必要で、清掃・工事現場の道具として数万円します。", "業務用 送風機", "industrial blower fan"],
  ["スチームクリーナー", "清掃", "約2万〜15万円", "高温蒸気で床や厨房を洗浄する機械です。", "ヒーター、圧力容器、連続使用性能で価格が変わります。", "スチームクリーナー 業務用", "steam cleaner"],
  ["車椅子", "医療・福祉", "約2万〜10万円", "病院や施設入口で貸し出される標準的な車椅子です。", "軽量素材、折りたたみ、ブレーキ、安全性で価格差があります。", "自走式 車椅子", "wheelchair"],
  ["点滴スタンド", "医療・福祉", "約5,000〜2万円", "病院で点滴バッグを吊るすキャスター付きのスタンドです。", "高さ調整、安定した脚、ステンレス素材が基本価格になります。", "点滴スタンド", "IV pole"],
  ["診察台", "医療・福祉", "約5万〜20万円", "クリニックの診察室に置かれるベッド型の台です。", "幅、昇降機能、張地、耐荷重で価格が変わります。", "診察台", "examination table"],
  ["業務用血圧計", "医療・福祉", "約1万〜8万円", "病院や薬局に置かれる腕を入れるタイプの血圧計です。", "測定精度、印字、施設運用向けの耐久性で価格差があります。", "業務用 血圧計", "blood pressure monitor kiosk"],
  ["医療用ワゴン", "医療・福祉", "約2万〜10万円", "処置道具や薬品を載せて移動するステンレスワゴンです。", "引き出し、棚、キャスター、清掃しやすい素材で価格が上がります。", "医療用 ワゴン", "medical cart"],
  ["ストレッチャー", "医療・福祉", "約10万〜30万円", "病院や救急で患者を寝かせて移動する台車です。", "昇降、柵、ブレーキ、マット、安全機構があり高額になります。", "ストレッチャー", "medical stretcher"],
  ["おむつ交換台", "公共施設", "約5万〜20万円", "商業施設や駅のトイレにある折りたたみ式の交換台です。", "壁固定、安全ベルト、耐荷重、清掃性が必要な公共設備です。", "おむつ 交換台", "baby changing station"],
  ["ベビーキープ", "公共施設", "約5万〜15万円", "トイレ個室で乳幼児を座らせておく壁付け設備です。", "安全基準と壁固定部品があり、小さく見えても公共施設向け価格です。", "ベビーキープ", "baby chair restroom"],
  ["演台", "イベント・施設", "約5万〜20万円", "講演会や式典で、話す人が立って資料を置く台です。", "木製の外装、キャスター、棚、配線穴、サイズで価格が変わります。", "演台", "lectern podium"],
  ["ワイヤレスマイクセット", "イベント", "約1万〜5万円", "小規模イベントや説明会で使う、受信機付きの無線マイク一式です。", "送受信機、マイク本数、周波数方式、収納ケースの有無で価格が変わります。", "ワイヤレスマイクセット", "wireless microphone set"],
  ["スピーカースタンド", "イベント", "約5,000〜2万円", "PAスピーカーを高い位置に立てる三脚スタンドです。", "耐荷重と安定性が必要で、音響現場では安全部品でもあります。", "PA スピーカースタンド", "speaker stand"],
  ["ポータブルPAシステム", "イベント", "約5万〜20万円", "小規模イベントでマイクとスピーカーをまとめて使う音響一式です。", "アンプ、スピーカー、入力端子、バッテリー対応で価格が変わります。", "ポータブル PA システム", "portable PA system"],
  ["ポータブルステージ", "イベント・施設", "約20万〜80万円", "体育館やイベント会場で組み立てる簡易ステージです。", "人が乗るため耐荷重と連結構造が必要で、家具より設備に近い価格です。", "ポータブルステージ", "portable stage platform"],
  ["イベントテント", "イベント", "約3万〜20万円", "屋外イベントや受付で使う白いワンタッチテントです。", "サイズ、フレーム強度、防炎生地で価格が変わります。", "イベント テント", "event tent canopy"],
  ["パイプ椅子", "イベント・施設", "約3,000〜1万円", "会議室や体育館で大量に並ぶ折りたたみ椅子です。", "1脚は安価でも、施設では数十脚単位でそろえます。", "パイプ椅子", "folding chair"],
  ["長机", "イベント・施設", "約5,000〜2万円", "会議や受付で使う折りたたみ式の長い机です。", "天板サイズ、脚の強度、軽量性で価格が変わります。", "折りたたみ 長机", "folding table"],
  ["10型消火器", "防災", "約4,000〜1万円", "オフィスやマンション廊下に置かれる赤い粉末消火器です。", "本体は比較的安価ですが、交換期限や点検管理が運用コストになります。", "10型 消火器", "fire extinguisher"],
  ["消火器ボックス", "防災", "約5,000〜3万円", "消火器を壁や屋外で保管する赤い箱です。", "屋外用やステンレス製、表示板付きになると価格が上がります。", "消火器 ボックス", "fire extinguisher cabinet"],
  ["防災備蓄倉庫", "防災", "約5万〜30万円", "避難所や自治会で水・食料・工具を保管する小型倉庫です。", "屋外耐候性と施錠、防錆性が必要で物置より防災用品寄りの価格になります。", "防災 倉庫", "emergency storage shed"],
  ["非常用発電機", "防災・工事", "約8万〜40万円", "停電時や屋外作業で電源を取る小型発電機です。", "出力、燃料方式、インバーター制御、防音性で大きく価格が変わります。", "非常用 発電機", "portable generator"],
  ["排水ポンプ", "防災・設備", "約1万〜10万円", "水害時や工事現場でたまった水を外へ出すポンプです。", "吐出量、揚程、汚水対応、防水モーターの仕様で価格が変わります。", "排水 ポンプ", "submersible water pump"]
];

function encodePathQuery(value) {
  return encodeURIComponent(value).replace(/%20/g, "%20");
}

function sourceUrl(query) {
  return `https://www.monotaro.com/s/q-${encodePathQuery(query)}/`;
}

function fallbackSvg(title) {
  const text = encodeURIComponent(title);
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'%3E%3Crect width='1200' height='900' fill='%230f766e'/%3E%3Ctext x='64' y='470' fill='white' font-family='sans-serif' font-size='72' font-weight='700'%3E${text}%3C/text%3E%3C/svg%3E`;
}

function pageUrl(title) {
  return `https://commons.wikimedia.org/wiki/${encodeURIComponent(title.replaceAll(" ", "_"))}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchMonotaroImage(url, title) {
  const response = await fetchWithTimeout(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 price-quiz-photo-book"
    }
  });

  if (!response.ok) {
    throw new Error(`MonotaRO failed ${response.status} for ${title}`);
  }

  const html = await response.text();
  const urls = [...html.matchAll(/(?:https:)?\/\/jp\.images-monotaro\.com\/Monotaro3\/pi\/(?:thum|petit|full)\/mono[^"'\\\s<>]+/g)]
    .map((m) => m[0].startsWith("//") ? `https:${m[0]}` : m[0])
    .filter((imageUrl, index, allUrls) => allUrls.indexOf(imageUrl) === index);
  const productImage = urls
    .find((imageUrl) => /Monotaro3\/pi\/(thum|petit|full)\/mono.+\.(jpg|jpeg|png|webp)$/i.test(imageUrl));

  if (!productImage) return null;

  return {
    image: productImage,
    imagePage: url,
    imageTitle: `MonotaRO product image: ${title}`,
    imageCredit: "MonotaRO search result"
  };
}

async function fetchCommonsImage(query) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "8",
    gsrsearch: query,
    prop: "imageinfo",
    iiprop: "url|mime|extmetadata",
    iiurlwidth: "1200",
    format: "json",
    origin: "*"
  });

  let response;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    response = await fetchWithTimeout(`${api}?${params}`, {
      headers: {
        "User-Agent": "price-quiz-photo-book/1.0 (contact: local-build)"
      }
    });

    if (response.ok) break;
    if (response.status !== 429 || attempt === 3) {
      throw new Error(`Commons API failed ${response.status} for ${query}`);
    }

    await sleep(5000 * (attempt + 1));
  }

  const data = await response.json();
  const pages = Object.values(data.query?.pages ?? {})
    .filter((page) => page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url)
    .filter((page) => {
      const mime = page.imageinfo?.[0]?.mime ?? "";
      return mime.startsWith("image/");
    })
    .filter((page) => !/map|logo|icon|diagram|coat of arms/i.test(page.title));

  const page = pages[0];
  if (!page) return null;

  const info = page.imageinfo[0];
  const metadata = info.extmetadata ?? {};
  return {
    image: info.thumburl ?? info.url,
    imagePage: pageUrl(page.title),
    imageTitle: page.title.replace(/^File:/, ""),
    imageCredit: (metadata.Artist?.value ?? metadata.Credit?.value ?? "").replace(/<[^>]*>/g, "").trim()
  };
}

async function main() {
  await mkdir("data", { recursive: true });
  await mkdir("research", { recursive: true });

  let cache = {};
  try {
    cache = JSON.parse(await readFile("data/image-cache-monotaro.json", "utf8"));
  } catch {
    cache = {};
  }

  const items = [];

  for (const [index, item] of baseItems.entries()) {
    const [title, category, price, hint, why, sourceQuery, imageQuery] = item;
    let imageData = null;
    const priceSource = sourceUrl(sourceQuery);
    const cacheKey = `monotaro-thumb:${sourceQuery}`;

    if (cache[cacheKey]) {
      imageData = cache[cacheKey];
    } else {
      try {
        imageData = await fetchMonotaroImage(priceSource, title);
        if (!imageData) {
          imageData = await fetchCommonsImage(imageQuery);
        }
        if (imageData) {
          cache[cacheKey] = imageData;
          await writeFile("data/image-cache-monotaro.json", JSON.stringify(cache, null, 2));
        }
      } catch (error) {
        console.warn(`Image lookup failed: ${title}: ${error.message}`);
      }

      await sleep(550);
    }

    items.push({
      id: String(index + 1).padStart(3, "0"),
      title,
      category,
      question: `Q. この「${title}」はいくらでしょう？`,
      hint,
      price,
      why,
      source: priceSource,
      sourceLabel: "MonotaRO検索",
      image: imageData?.image ?? fallbackSvg(title),
      imagePage: imageData?.imagePage ?? "",
      imageTitle: imageData?.imageTitle ?? "fallback",
      imageCredit: imageData?.imageCredit ?? ""
    });

    await sleep(80);
  }

  const dataFile = `window.priceQuizItems = ${JSON.stringify(items, null, 2)};\n`;
  await writeFile("data/items.js", dataFile);

  const rows = items.map((item) => (
    `| ${item.id} | ${item.title} | ${item.category} | ${item.price} | [価格](${item.source}) | ${item.imagePage ? `[写真](${item.imagePage})` : "代替画像"} |`
  )).join("\n");

  const sources = `# 価格・写真ソース\n\n価格は2026-06-13時点で確認対象にした公開販売ページへの検索リンクを根拠に、単体本体価格の目安として丸めています。設置工事、保守、送料、特別運賃、消耗品は原則として別です。\n\n写真は原則として価格根拠と同じMonotaRO検索ページ内の商品写真を固定URLとして取得しています。MonotaRO側で商品写真が取得できない場合だけWikimedia Commonsを使い、それも失敗した場合は対象名入りの代替画像を使います。\n\n| No. | 対象 | ジャンル | 答え | 価格根拠 | 写真 |\n| --- | --- | --- | --- | --- | --- |\n${rows}\n`;

  await writeFile("research/sources.md", sources);

  console.log(`Generated ${items.length} items`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
