const recipes = [
  { title: "Biscoff Overnight Oats", category: "Breakfast", image: "assets/images/B01 - Biscoff Overnight Oats .jpeg" },
  { title: "Nut Granola", category: "Breakfast", image: "assets/images/B02 - Nut Ganola .jpeg" },
  { title: "Biscoff Pancake Bowl", category: "Breakfast", image: "assets/images/B03 - Biscoff Pancake Bowl.jpeg" },
  { title: "Raspberry Choc Pancake Bowl", category: "Breakfast", image: "assets/images/B04 - Raspberry Choc Pancake Bowl.jpeg" },
  { title: "Peach Cobbler Pancake Bowl", category: "Breakfast", image: "assets/images/B05 - Peach Cobbler Pancake Bowl.jpeg" },
  { title: "Sweetcorn Chicken Salad", category: "Lunch", image: "assets/images/L01 - Sweetcorn Chicken Salad.jpeg" },
  { title: "Taco Bowl", category: "Lunch", image: "assets/images/L02 - Taco Bowl.jpeg" },
  { title: "Salmon Pasta Bake", category: "Dinner", image: "assets/images/D01 - Salmon Pasta Bake.jpeg" },
  { title: "Chicken Tikka Rice Bake", category: "Dinner", image: "assets/images/D02 Chicken Tikka Rice Bake .jpeg" },
  { title: "Pesto Chicken Bake", category: "Dinner", image: "assets/images/D03 - Pesto Chicken Bake.jpeg" },
  { title: "Peanut Butter Energy Bar", category: "Snacks", image: "assets/images/S01 - Peanut butter Energy Bar.jpeg" },
  { title: "Biscoff Bark", category: "Snacks", image: "assets/images/S02 -Biscoff Bark.jpeg" },
  { title: "Lemon Curd Muffins", category: "Cakes", image: "assets/images/C01 - Lemon Curd Muffins.jpeg" },
  { title: "New York Choc Chip Cookies", category: "Cakes", image: "assets/images/C02 - New York Choc Chip Cookies.jpeg" },
  { title: "Cheesy Sloppy Joe", category: "Fakeaway", image: "assets/images/F01 - Cheesy Sloppy Joe.jpeg" }
];

const categories = ["All", ...new Set(recipes.map(recipe => recipe.category))];
let activeCategory = "All";
let searchTerm = "";
let deferredInstallPrompt;

const grid = document.querySelector("#recipeGrid");
const count = document.querySelector("#recipeCount");
const chips = document.querySelector("#categoryChips");
const searchInput = document.querySelector("#searchInput");
const dialog = document.querySelector("#recipeDialog");
const dialogImage = document.querySelector("#dialogImage");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogCategory = document.querySelector("#dialogCategory");
const closeDialog = document.querySelector("#closeDialog");
const installButton = document.querySelector("#installButton");

function renderChips() {
  chips.innerHTML = categories.map(category => `
    <button class="chip ${category === activeCategory ? "active" : ""}" data-category="${category}">${category}</button>
  `).join("");
}

function getFilteredRecipes() {
  return recipes.filter(recipe => {
    const matchesCategory = activeCategory === "All" || recipe.category === activeCategory;
    const haystack = `${recipe.title} ${recipe.category}`.toLowerCase();
    return matchesCategory && haystack.includes(searchTerm.toLowerCase());
  });
}

function renderRecipes() {
  const filtered = getFilteredRecipes();
  count.textContent = `${filtered.length} recipe${filtered.length === 1 ? "" : "s"}`;
  grid.innerHTML = filtered.map((recipe, index) => `
    <button class="recipe-card" data-index="${recipes.indexOf(recipe)}">
      <img src="${recipe.image}" alt="${recipe.title} recipe card" loading="lazy" />
      <div class="recipe-card-content">
        <h2>${recipe.title}</h2>
        <span class="recipe-category">${recipe.category}</span>
      </div>
    </button>
  `).join("") || `<p>No recipes found. Try another search.</p>`;
}

chips.addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderChips();
  renderRecipes();
});

searchInput.addEventListener("input", event => {
  searchTerm = event.target.value;
  renderRecipes();
});

grid.addEventListener("click", event => {
  const card = event.target.closest(".recipe-card");
  if (!card) return;
  const recipe = recipes[Number(card.dataset.index)];
  dialogImage.src = recipe.image;
  dialogImage.alt = `${recipe.title} recipe card`;
  dialogTitle.textContent = recipe.title;
  dialogCategory.textContent = recipe.category;
  dialog.showModal();
});

closeDialog.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installButton.hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js"));
}

renderChips();
renderRecipes();
