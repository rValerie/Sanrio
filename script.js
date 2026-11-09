// ---------- Datos (referencia; pueden variar según la ficha oficial) ----------
const characters = [
  { id: "hello-kitty", name: "Hello Kitty", emoji: "🎀", color: "#ffc8dd", debut: 1974,
    birthday: "1 de noviembre", origin: "Las afueras de Londres, Inglaterra",
    height: "5 manzanas", weight: "3 manzanas",
    personality: "Dulce, amable y muy alegre. Le encanta hornear galletas y hacer amigos.",
    friend: "Dear Daniel", food: "La tarta de manzana de mamá" },

  { id: "my-melody", name: "My Melody", emoji: "🐰", color: "#ffd6e7", debut: 1975,
    birthday: "18 de enero", origin: "Bosque de Mariland",
    height: "Pequeña", weight: "Ligera como una pluma",
    personality: "Tierna y bondadosa. Le gusta hornear y ayudar a su mamá.",
    friend: "Flat", food: "Pastel de almendras" },

  { id: "kuromi", name: "Kuromi", emoji: "😈", color: "#d9c4ec", debut: 2005,
    birthday: "31 de octubre", origin: "Mariland",
    height: "Pequeña", weight: "Ligera",
    personality: "Rebelde y traviesa, pero con un corazón más tierno de lo que aparenta.",
    friend: "Baku", food: "Dulces y golosinas" },

  { id: "cinnamoroll", name: "Cinnamoroll", emoji: "☁️", color: "#bde0fe", debut: 2001,
    birthday: "6 de marzo", origin: "Café Cinnamon",
    height: "3 manzanas", weight: "Tan ligero como un algodón",
    personality: "Tímido y dulce. Vuela moviendo sus grandes orejas.",
    friend: "Cappuccino y sus amigos del café", food: "Pastel chiffon" },

  { id: "pompompurin", name: "Pompompurin", emoji: "🍮", color: "#fff3b0", debut: 1996,
    birthday: "16 de abril", origin: "Londres, Inglaterra",
    height: "Unos 22 cm", weight: "Rellenito y esponjoso",
    personality: "Relajado, optimista y muy dormilón. Siempre usa su boina marrón.",
    friend: "Muffin", food: "El pudín de mamá" },

  { id: "pochacco", name: "Pochacco", emoji: "🐶", color: "#c7f2e0", debut: 1989,
    birthday: "29 de febrero", origin: "Una ciudad soleada",
    height: "Unos 25 cm", weight: "Ágil y ligero",
    personality: "Deportista, enérgico y siempre con ganas de jugar.",
    friend: "Sus amigos del barrio", food: "Galletas con forma de hueso" },

  { id: "little-twin-stars", name: "Little Twin Stars", emoji: "⭐", color: "#e2d4f8", debut: 1975,
    birthday: "24 de diciembre", origin: "El cielo, en una nube de estrellas",
    height: "Pequeñas como estrellas", weight: "Livianas",
    personality: "Kiki y Lala son gemelos soñadores que cuidan las estrellas del cielo.",
    friend: "Se tienen el uno al otro", food: "Dulces con forma de estrella" },

  { id: "keroppi", name: "Keroppi", emoji: "🐸", color: "#c9f0d3", debut: 1988,
    birthday: "10 de julio", origin: "Estanque Donut",
    height: "Pequeño", weight: "Ligero",
    personality: "Valiente, optimista y aventurero. Le encanta la vida en el estanque.",
    friend: "Sus amigos ranas del estanque", food: "Comida casera del estanque" },

  { id: "badtz-maru", name: "Badtz-Maru", emoji: "🐧", color: "#cfd8f7", debut: 1993,
    birthday: "1 de abril", origin: "Tierra de pingüinos",
    height: "Pequeño", weight: "Ligero",
    personality: "Travieso y con carácter. Se hace el duro, pero es leal.",
    friend: "Sus amigos pingüinos", food: "Fideos" },

  { id: "tuxedosam", name: "Tuxedosam", emoji: "🎩", color: "#d6e4ff", debut: 1979,
    birthday: "6 de enero", origin: "Una isla helada",
    height: "Pequeño", weight: "Ligero",
    personality: "Un pingüino elegante, amable y siempre bien vestido.",
    friend: "Sus amigos pingüinos", food: "Pescado fresco" },

  { id: "chococat", name: "Chococat", emoji: "🐱", color: "#ead7c3", debut: 1996,
    birthday: "Marzo (dato variable)", origin: "Una ciudad grande",
    height: "Pequeño", weight: "Ligero",
    personality: "Curioso e inteligente. Sabe un poco de todo y le gusta investigar.",
    friend: "Sus amigos del barrio", food: "Chocolate" },

  { id: "gudetama", name: "Gudetama", emoji: "🥚", color: "#ffe9a8", debut: 2013,
    birthday: "No oficial", origin: "La cocina",
    height: "Un huevo", weight: "Un huevo",
    personality: "Perezoso y desganado. Su lema: no hacer nada.",
    friend: "Shakipiyo", food: "Él mismo, como huevo 🥚" }
];

// ---------- Estado ----------
const state = { filter: "all", query: "", favorites: loadFavorites() };

// ---------- Elementos ----------
const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const search = document.getElementById("search");
const filters = document.getElementById("filters");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

// ---------- Favoritos (localStorage) ----------
function loadFavorites() {
  try { return JSON.parse(localStorage.getItem("sanrio-favs")) || []; }
  catch { return []; }
}
function saveFavorites() {
  try { localStorage.setItem("sanrio-favs", JSON.stringify(state.favorites)); }
  catch { /* sin almacenamiento disponible */ }
}
function toggleFavorite(id) {
  const i = state.favorites.indexOf(id);
  if (i === -1) state.favorites.push(id); else state.favorites.splice(i, 1);
  saveFavorites();
  render();
}

// ---------- Render ----------
function matches(c) {
  const text = c.name.toLowerCase().includes(state.query);
  if (!text) return false;
  if (state.filter === "classic") return c.debut < 1990;
  if (state.filter === "modern") return c.debut >= 1990;
  if (state.filter === "favorites") return state.favorites.includes(c.id);
  return true;
}

function render() {
  const list = characters.filter(matches);
  grid.innerHTML = list.map(c => `
    <article class="card" tabindex="0" data-id="${c.id}" style="--card-color:${c.color}">
      <button class="fav" data-fav="${c.id}" aria-label="Marcar como favorito">
        ${state.favorites.includes(c.id) ? "💖" : "🤍"}
      </button>
      <div class="card__avatar">${c.emoji}</div>
      <h2 class="card__name">${c.name}</h2>
      <p class="card__tag">🎂 ${c.birthday}</p>
      <span class="card__meta">Debut ${c.debut}</span>
    </article>
  `).join("");
  empty.hidden = list.length > 0;
}

function openDetail(id) {
  const c = characters.find(x => x.id === id);
  if (!c) return;
  modalContent.innerHTML = `
    <div class="detail__head" style="--card-color:${c.color}">
      <div class="card__avatar">${c.emoji}</div>
      <h2>${c.name}</h2>
    </div>
    <p class="detail__desc">${c.personality}</p>
    <ul class="detail__list">
      <li><span>🎂 Cumpleaños</span>${c.birthday}</li>
      <li><span>⭐ Debut</span>${c.debut}</li>
      <li class="wide"><span>🏠 Origen</span>${c.origin}</li>
      <li><span>📏 Altura</span>${c.height}</li>
      <li><span>⚖️ Peso</span>${c.weight}</li>
      <li><span>👫 Mejor amigo</span>${c.friend}</li>
      <li><span>🍰 Comida favorita</span>${c.food}</li>
    </ul>
  `;
  modal.showModal();
}

// ---------- Eventos ----------
search.addEventListener("input", e => {
  state.query = e.target.value.trim().toLowerCase();
  render();
});

filters.addEventListener("click", e => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  state.filter = btn.dataset.filter;
  filters.querySelectorAll(".chip").forEach(b => b.classList.toggle("is-active", b === btn));
  render();
});

grid.addEventListener("click", e => {
  const favBtn = e.target.closest("[data-fav]");
  if (favBtn) { toggleFavorite(favBtn.dataset.fav); return; }
  const card = e.target.closest(".card");
  if (card) openDetail(card.dataset.id);
});

grid.addEventListener("keydown", e => {
  if (e.key === "Enter" && e.target.classList.contains("card")) openDetail(e.target.dataset.id);
});

closeModal.addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

render();
