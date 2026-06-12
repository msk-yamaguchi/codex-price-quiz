const items = window.priceQuizItems ?? [];
const book = document.querySelector("#book");
const revealedCount = document.querySelector("#revealedCount");
const totalCount = document.querySelector("#totalCount");
const visibleCount = document.querySelector("#visibleCount");
const renderedCount = document.querySelector("#renderedCount");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const loadMoreButton = document.querySelector("#loadMore");
const openIds = new Set();
let renderLimit = 24;

totalCount.textContent = String(items.length);

const categories = [...new Set(items.map((item) => item.category))].sort((a, b) => a.localeCompare(b, "ja"));
categoryFilter.insertAdjacentHTML(
  "beforeend",
  categories.map((category) => `<option value="${escapeAttribute(category)}">${escapeHTML(category)}</option>`).join("")
);

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHTML(value).replaceAll("`", "&#096;");
}

function filteredItems() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  return items.filter((item) => {
    const matchesCategory = !category || item.category === category;
    const haystack = `${item.title} ${item.category} ${item.hint} ${item.price}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesCategory && matchesQuery;
  });
}

function render() {
  const currentItems = filteredItems();
  const renderedItems = currentItems.slice(0, renderLimit);
  visibleCount.textContent = String(currentItems.length);
  renderedCount.textContent = String(renderedItems.length);
  loadMoreButton.hidden = renderedItems.length >= currentItems.length;
  if (!loadMoreButton.hidden) {
    const remaining = currentItems.length - renderedItems.length;
    loadMoreButton.textContent = `さらに${Math.min(24, remaining)}件表示`;
  }

  book.innerHTML = renderedItems.map((item) => {
    const isOpen = openIds.has(item.id);
    const imageSourceLink = item.imagePage
      ? `<a class="source muted-link" href="${escapeAttribute(item.imagePage)}" target="_blank" rel="noreferrer">写真元</a>`
      : "";

    return `
      <article class="card ${isOpen ? "is-open" : ""}" data-id="${escapeAttribute(item.id)}">
        <div class="photo">
          <img src="${escapeAttribute(item.image)}" alt="${escapeAttribute(item.title)}" loading="lazy" decoding="async">
          <span class="number">${escapeHTML(item.id)}</span>
          <span class="category">${escapeHTML(item.category)}</span>
        </div>
        <div class="body">
          <h3>${escapeHTML(item.title)}</h3>
          <p class="question">${escapeHTML(item.question)}</p>
          <p class="hint">${escapeHTML(item.hint)}</p>
          <button class="reveal" type="button">${isOpen ? "価格を隠す" : "価格を見る"}</button>
          <div class="answer">
            <p class="price">${escapeHTML(item.price)}</p>
            <p class="why">${escapeHTML(item.why)}</p>
            <div class="links">
              <a class="source" href="${escapeAttribute(item.source)}" target="_blank" rel="noreferrer">価格根拠</a>
              ${imageSourceLink}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");

  if (currentItems.length === 0) {
    book.innerHTML = `<p class="empty">該当するお題がありません。</p>`;
  }

  wireCards();
  updateCount();
}

function wireCards() {
  document.querySelectorAll(".reveal").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const id = card.dataset.id;
      if (openIds.has(id)) {
        openIds.delete(id);
      } else {
        openIds.add(id);
      }
      card.classList.toggle("is-open", openIds.has(id));
      button.textContent = openIds.has(id) ? "価格を隠す" : "価格を見る";
      updateCount();
    });
  });

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("is-broken");
      image.closest(".photo").style.setProperty("--fallback-image", fallbackImage(image.alt));
    });
  });
}

function fallbackImage(title) {
  const text = encodeURIComponent(title);
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'%3E%3Crect width='1200' height='900' fill='%230f766e'/%3E%3Ctext x='64' y='470' fill='white' font-family='sans-serif' font-size='72' font-weight='700'%3E${text}%3C/text%3E%3C/svg%3E")`;
}

function updateCount() {
  revealedCount.textContent = String(openIds.size);
}

function showVisible() {
  filteredItems().slice(0, renderLimit).forEach((item) => openIds.add(item.id));
  render();
}

function hideAll() {
  openIds.clear();
  render();
}

document.querySelector("#showAll").addEventListener("click", showVisible);
document.querySelector("#hideAll").addEventListener("click", hideAll);
document.querySelector("#printBook").addEventListener("click", () => window.print());
loadMoreButton.addEventListener("click", () => {
  renderLimit += 24;
  render();
});
searchInput.addEventListener("input", () => {
  renderLimit = 24;
  render();
});
categoryFilter.addEventListener("change", () => {
  renderLimit = 24;
  render();
});

render();
