// Remplace les liens de démonstration par tes vraies pages Chariow avant publication.
const products = [
  { id: 1, title: "Comptabilité Générale – Fiches de révision", subject: "Compta", price: "2 000 FCFA", cover: "assets/compta.svg", desc: "Les bases de la comptabilité expliquées avec méthode et exemples.", url: "https://chariow.com" },
  { id: 2, title: "Microéconomie – Fiches de révision", subject: "Micro", price: "2 000 FCFA", cover: "assets/micro.svg", desc: "Les notions clés de microéconomie regroupées pour réviser l’essentiel.", url: "https://chariow.com" },
  { id: 3, title: "Macroéconomie – Fiches de révision", subject: "Macro", price: "2 000 FCFA", cover: "assets/macro.svg", desc: "Un support synthétique pour mieux retenir les fondamentaux de macro.", url: "https://chariow.com" },
  { id: 4, title: "HEFS – Fiches de révision", subject: "HEFS", price: "1 500 FCFA", cover: "assets/hefs.svg", desc: "Retrouve les grands repères du cours dans des fiches structurées.", url: "https://chariow.com" },
  { id: 5, title: "Statistique – Fiches de révision", subject: "Stat", price: "2 000 FCFA", cover: "assets/stat.svg", desc: "Révise les méthodes et notions de statistique à ton rythme.", url: "https://chariow.com" },
  { id: 6, title: "Mathématiques – Fiches de révision", subject: "Maths", price: "2 000 FCFA", cover: "assets/maths.svg", desc: "Les outils mathématiques utiles à ta première année, réunis au même endroit.", url: "https://chariow.com" },
  { id: 7, title: "Pack complet FASEG L1", subject: "Pack", price: "8 000 FCFA", oldPrice: "11 500 FCFA", cover: "assets/pack.svg", desc: "Le pack numérique pour retrouver toutes les matières de première année.", url: "https://chariow.com" }
];

const productGrid = document.querySelector("#product-grid");
const filterButtons = document.querySelectorAll(".filter-chip");
const individualProducts = products.filter((product) => product.subject !== "Pack");

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";

  const image = document.createElement("img");
  image.className = "product-cover";
  image.src = product.cover;
  image.alt = `Couverture de l’ebook ${product.title}`;
  image.loading = "lazy";
  image.width = 600;
  image.height = 390;

  const body = document.createElement("div");
  body.className = "product-body";

  const tag = document.createElement("span");
  tag.className = "product-tag";
  tag.textContent = product.subject;

  const title = document.createElement("h3");
  title.textContent = product.title;

  const description = document.createElement("p");
  description.className = "product-desc";
  description.textContent = product.desc;

  const bottom = document.createElement("div");
  bottom.className = "product-bottom";

  const price = document.createElement("span");
  price.className = "product-price";
  price.textContent = product.price;

  const link = document.createElement("a");
  link.className = "button button-gold product-cta";
  link.href = product.url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Obtenir sur Chariow";
  link.setAttribute("aria-label", `Obtenir ${product.title} sur Chariow (nouvel onglet)`);

  bottom.append(price, link);
  body.append(tag, title, description, bottom);
  article.append(image, body);
  return article;
}

function renderProducts(subject = "Tout") {
  const visibleProducts = subject === "Tout"
    ? individualProducts
    : individualProducts.filter((product) => product.subject === subject);
  productGrid.replaceChildren(...visibleProducts.map(createProductCard));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("is-active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });
    renderProducts(button.dataset.filter);
  });
});

const pack = products.find((product) => product.subject === "Pack");
if (pack) {
  document.querySelector("#pack-price").textContent = pack.price;
  document.querySelector("#pack-old-price").textContent = pack.oldPrice || "";
  const packLink = document.querySelector("#pack-link");
  packLink.href = pack.url;
  packLink.setAttribute("aria-label", `Découvrir ${pack.title} sur Chariow (nouvel onglet)`);
}

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    document.getElementById(button.getAttribute("aria-controls")).hidden = expanded;
  });
});

const menuToggle = document.querySelector("#menu-toggle");
const primaryMenu = document.querySelector("#primary-menu");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
  primaryMenu.classList.toggle("is-open", !isOpen);
});
primaryMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    primaryMenu.classList.remove("is-open");
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
renderProducts();
