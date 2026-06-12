const items = [
  {
    title: "道路のカーブミラー",
    category: "街の設備",
    question: "Q. この道路のカーブミラーはいくらでしょう？",
    hint: "住宅街の曲がり角や駐車場の出入口で見かける、丸い道路反射鏡です。",
    price: "約4万〜8万円",
    why: "安い小型品もありますが、道路反射鏡として使う一面鏡はミラー本体だけで4万円台から。支柱や設置工事は別です。",
    source: "https://www.monotaro.com/s/q-%E3%82%AB%E3%83%BC%E3%83%96%E3%83%9F%E3%83%A9%E3%83%BC/",
    image: "https://loremflickr.com/1200/900/convex,mirror,road?lock=3101"
  },
  {
    title: "マンホール蓋",
    category: "街の設備",
    question: "Q. このマンホール蓋はいくらでしょう？",
    hint: "足元にあるので意識しにくいですが、荷重区分や素材で値段が大きく変わります。",
    price: "約2万〜6万円",
    why: "歩道用や車両荷重対応の鋳鉄カバーは、仕様によって2万円台から5万円台。道路上の大型品や自治体仕様はさらに上がります。",
    source: "https://www.monotaro.com/s/q-%E3%83%9E%E3%83%B3%E3%83%9B%E3%83%BC%E3%83%AB/",
    image: "https://loremflickr.com/1200/900/manhole,cover?lock=3102"
  },
  {
    title: "道路工事用LED矢印板",
    category: "工事・安全",
    question: "Q. この工事現場のLED矢印板はいくらでしょう？",
    hint: "夜間工事や車線規制で、光る矢印として置かれている安全機材です。",
    price: "約8万〜11万円",
    why: "屋外で視認できるLED、バッテリー、反射材、折りたたみ構造が必要で、単なる看板より一段高くなります。",
    source: "https://www.monotaro.com/s/q-%E7%9F%A2%E5%8D%B0%E6%9D%BF/",
    image: "https://loremflickr.com/1200/900/roadwork,arrow,sign?lock=3103"
  },
  {
    title: "スーパーのショッピングカート",
    category: "店舗",
    question: "Q. スーパーのショッピングカート1台はいくらでしょう？",
    hint: "毎回使うのに、店が何十台もそろえる備品としての値段は意外と知られていません。",
    price: "約1.5万〜3万円",
    why: "業務用カートは静音キャスター、杖・傘置き、安全設計が入り、家庭用の簡易カートより高めです。",
    source: "https://www.monotaro.com/s/q-%E8%B2%B7%E3%81%84%E7%89%A9%E3%82%AB%E3%83%BC%E3%83%88/",
    image: "https://loremflickr.com/1200/900/shopping,cart?lock=3104"
  },
  {
    title: "業務用製氷機",
    category: "厨房",
    question: "Q. 飲食店の業務用製氷機はいくらでしょう？",
    hint: "カフェや居酒屋のバックヤードで、透明なキューブアイスを作り続ける機械です。",
    price: "約12万〜33万円",
    why: "小型でも給排水と冷却機構を備え、日産能力や貯氷量が増えるほど価格が上がります。",
    source: "https://www.monotaro.com/s/q-%E6%A5%AD%E5%8B%99%E7%94%A8%E8%A3%BD%E6%B0%B7%E6%A9%9F/",
    image: "https://loremflickr.com/1200/900/ice,machine,restaurant?lock=3105"
  },
  {
    title: "コインリターン式ロッカー",
    category: "駅・施設",
    question: "Q. このコインリターン式ロッカーはいくらでしょう？",
    hint: "駅や温浴施設、スーパーの入口で見かける、100円が戻るタイプのロッカーです。",
    price: "約16万〜33万円",
    why: "複数マスのスチール筐体にコインリターン錠が付き、単なる棚ではなく不特定多数向けの管理設備になります。",
    source: "https://www.monotaro.com/s/q-%E3%82%B3%E3%82%A4%E3%83%B3%E3%83%AD%E3%83%83%E3%82%AB%E3%83%BC/",
    image: "https://loremflickr.com/1200/900/coin,locker,station?lock=3106"
  },
  {
    title: "ハンドパレットトラック",
    category: "物流",
    question: "Q. 倉庫のハンドパレットトラックはいくらでしょう？",
    hint: "パレットに載った荷物を人力で少し持ち上げ、そのまま運ぶ黄色や赤の道具です。",
    price: "約5万〜12万円",
    why: "標準型は5万円前後からありますが、メーカー品や低床・高耐荷重タイプは10万円前後になります。",
    source: "https://www.monotaro.com/s/q-%E3%83%8F%E3%83%B3%E3%83%89%E3%83%91%E3%83%AC%E3%83%83%E3%83%88/",
    image: "https://loremflickr.com/1200/900/pallet,truck,warehouse?lock=3107"
  },
  {
    title: "オフィスシュレッダー",
    category: "オフィス",
    question: "Q. オフィス用シュレッダーはいくらでしょう？",
    hint: "コピー用紙をまとめて裁断できる、事務所や店舗に置かれている中型クラスです。",
    price: "約3万〜5万円",
    why: "A4を十数枚まとめて細断できる機種や自動給紙付きでも、オフィス向け中型なら数万円台が中心です。",
    source: "https://www.monotaro.com/s/q-%E3%82%B7%E3%83%A5%E3%83%AC%E3%83%83%E3%83%80%E3%83%BC/",
    image: "https://loremflickr.com/1200/900/paper,shredder,office?lock=3108"
  },
  {
    title: "卓上真空包装機",
    category: "食品加工",
    question: "Q. 惣菜店や食品加工で使う卓上真空包装機はいくらでしょう？",
    hint: "袋の中の空気を抜き、肉・魚・総菜を密封するステンレスの箱型機械です。",
    price: "約16万円",
    why: "真空ポンプと密封ヒーターを備えた業務用卓上機で、家庭用フードシーラーとは桁が変わります。",
    source: "https://www.monotaro.com/s/q-%E7%9C%9F%E7%A9%BA%E5%8C%85%E8%A3%85%E6%A9%9F/",
    image: "https://jp.images-monotaro.com/Monotaro3/pi/full/mono40382526-120424-02.jpg"
  },
  {
    title: "公共施設・公園のベンチ",
    category: "公共空間",
    question: "Q. 公園やサービスエリアのベンチ1脚はいくらでしょう？",
    hint: "屋外に置きっぱなしでも壊れにくい、公共施設向けのベンチです。",
    price: "約8万〜20万円",
    why: "再生樹脂や鋳物脚など、雨ざらしでも長く使える素材になると家庭用ベンチよりかなり高くなります。",
    source: "https://www.monotaro.com/s/q-%E5%85%AC%E5%9C%92%E3%83%99%E3%83%B3%E3%83%81/",
    image: "https://jp.images-monotaro.com/Monotaro3/pi/full/mono73706115-171226-02.jpg"
  },
  {
    title: "樹脂パレット",
    category: "物流",
    question: "Q. 倉庫で荷物の下に敷く樹脂パレット1枚はいくらでしょう？",
    hint: "フォークリフトやハンドリフトが差し込む、荷物の土台になる黒や青の板です。",
    price: "約4千〜8千円",
    why: "1トン積載クラスでも単体は数千円台。大量に使う備品なので、1枚あたりは想像より低めです。",
    source: "https://www.monotaro.com/s/q-%E3%83%91%E3%83%AC%E3%83%83%E3%83%88/",
    image: "https://loremflickr.com/1200/900/plastic,pallet,warehouse?lock=3111"
  },
  {
    title: "スタンド付きデジタルサイネージ",
    category: "店舗・案内",
    question: "Q. 店頭のスタンド付きデジタルサイネージはいくらでしょう？",
    hint: "商業施設や受付で、動画や案内を縦画面で流しているディスプレイ一式です。",
    price: "約24万円",
    why: "ディスプレイ本体、スタンド、メディア再生機能をまとめた一式で、家庭用テレビより業務設置向けの価格になります。",
    source: "https://www.monotaro.com/s/q-%E9%9B%BB%E5%85%89%E6%8E%B2%E7%A4%BA%E6%9D%BF/",
    image: "https://loremflickr.com/1200/900/digital,signage,shop?lock=3112"
  }
];

const book = document.querySelector("#book");
const revealedCount = document.querySelector("#revealedCount");

function render() {
  book.innerHTML = items.map((item, index) => `
    <article class="card" data-index="${index + 1}">
      <div class="photo">
        <img src="${item.image}" alt="${item.title}" decoding="async">
        <span class="number">${String(index + 1).padStart(2, "0")}</span>
        <span class="category">${item.category}</span>
      </div>
      <div class="body">
        <h3>${item.title}</h3>
        <p class="question">${item.question}</p>
        <p class="hint">${item.hint}</p>
        <button class="reveal" type="button">価格を見る</button>
        <div class="answer">
          <p class="price">${item.price}</p>
          <p class="why">${item.why}</p>
          <a class="source" href="${item.source}" target="_blank" rel="noreferrer">価格根拠を見る</a>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".reveal").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      card.classList.toggle("is-open");
      button.textContent = card.classList.contains("is-open") ? "価格を隠す" : "価格を見る";
      updateCount();
    });
  });

  document.querySelectorAll("img").forEach((image) => {
    const markBroken = () => {
      if (image.classList.contains("is-broken")) return;
      image.classList.add("is-broken");
      image.closest(".photo").style.setProperty("--fallback-image", `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'%3E%3Crect width='1200' height='900' fill='%230f766e'/%3E%3Ctext x='80' y='470' fill='white' font-family='sans-serif' font-size='72' font-weight='700'%3E${encodeURIComponent(image.alt)}%3C/text%3E%3C/svg%3E")`);
    };

    image.addEventListener("error", markBroken);
    window.setTimeout(() => {
      if (!image.complete || image.naturalWidth === 0) {
        markBroken();
      }
    }, 4500);
  });
}

function updateCount() {
  revealedCount.textContent = document.querySelectorAll(".card.is-open").length;
}

document.querySelector("#showAll").addEventListener("click", () => {
  document.querySelectorAll(".card").forEach((card) => card.classList.add("is-open"));
  document.querySelectorAll(".reveal").forEach((button) => {
    button.textContent = "価格を隠す";
  });
  updateCount();
});

document.querySelector("#hideAll").addEventListener("click", () => {
  document.querySelectorAll(".card").forEach((card) => card.classList.remove("is-open"));
  document.querySelectorAll(".reveal").forEach((button) => {
    button.textContent = "価格を見る";
  });
  updateCount();
});

document.querySelector("#printBook").addEventListener("click", () => {
  window.print();
});

render();
