const recipes = [
  {
    "code": "B01",
    "title": "Biscoff Overnight Oats",
    "category": "Breakfast",
    "image": "assets/b01-biscoff-overnight-oats.jpeg"
  },
  {
    "code": "B02",
    "title": "Nut Granola",
    "category": "Breakfast",
    "image": "assets/b02-nut-granola.jpeg"
  },
  {
    "code": "B03",
    "title": "Biscoff Pancake Bowl",
    "category": "Breakfast",
    "image": "assets/b03-biscoff-pancake-bowl.jpeg"
  },
  {
    "code": "B04",
    "title": "Raspberry Choc Pancake Bowl",
    "category": "Breakfast",
    "image": "assets/b04-raspberry-choc-pancake-bowl.jpeg"
  },
  {
    "code": "B05",
    "title": "Peach Cobbler Pancake Bowl",
    "category": "Breakfast",
    "image": "assets/b05-peach-cobbler-pancake-bowl.jpeg"
  },
  {
    "code": "L01",
    "title": "Sweetcorn Chicken Salad",
    "category": "Lunch",
    "image": "assets/l01-sweetcorn-chicken-salad.jpeg"
  },
  {
    "code": "L02",
    "title": "Taco Bowl",
    "category": "Lunch",
    "image": "assets/l02-taco-bowl.jpeg"
  },
  {
    "code": "D01",
    "title": "Salmon Pasta Bake",
    "category": "Dinner",
    "image": "assets/d01-salmon-pasta-bake.jpeg"
  },
  {
    "code": "D02",
    "title": "Chicken Tikka Rice Bake",
    "category": "Dinner",
    "image": "assets/d02-chicken-tikka-rice-bake.jpeg"
  },
  {
    "code": "D03",
    "title": "Pesto Chicken Bake",
    "category": "Dinner",
    "image": "assets/d03-pesto-chicken-bake.jpeg"
  },
  {
    "code": "F01",
    "title": "Cheesy Sloppy Joe",
    "category": "Fakeaway",
    "image": "assets/f01-cheesy-sloppy-joe.jpeg"
  },
  {
    "code": "S01",
    "title": "Peanut Butter Energy Bar",
    "category": "Snacks",
    "image": "assets/s01-peanut-butter-energy-bar.jpeg"
  },
  {
    "code": "S02",
    "title": "Biscoff Bark",
    "category": "Snacks",
    "image": "assets/s02-biscoff-bark.jpeg"
  },
  {
    "code": "C01",
    "title": "Lemon Curd Muffins",
    "category": "Sweet Treats",
    "image": "assets/c01-lemon-curd-muffins.jpeg"
  },
  {
    "code": "C02",
    "title": "New York Choc Chip Cookies",
    "category": "Sweet Treats",
    "image": "assets/c02-new-york-choc-chip-cookies.jpeg"
  }
];

const grid = document.getElementById("recipeGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("categoryFilters");
const dialog = document.getElementById("recipeDialog");
const closeDialog = document.getElementById("closeDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogCategory = document.getElementById("dialogCategory");
const dialogImage = document.getElementById("dialogImage");

let activeCategory = "All";

const categories = ["All", ...new Set(recipes.map(recipe => recipe.category))];

function renderFilters() {
  filters.innerHTML = "";

  categories.forEach(category => {
    const button = document.createElement("button");
    button.className = "chip" + (category === activeCategory ? " active" : "");
    button.textContent = category;

    button.addEventListener("click", () => {
      activeCategory = category;
      renderFilters();
      renderRecipes();
    });

    filters.appendChild(button);
  });
}

function renderRecipes() {
  const search = searchInput.value.trim().toLowerCase();

  const filtered = recipes.filter(recipe => {
    const matchesCategory = activeCategory === "All" || recipe.category === activeCategory;
    const searchText = `${recipe.code} ${recipe.title} ${recipe.category}`.toLowerCase();
    const matchesSearch = searchText.includes(search);
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = "";

  if (!filtered.length) {
    grid.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  filtered.forEach(recipe => {
    const card = document.createElement("button");
    card.className = "recipe";

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title} recipe card" loading="lazy">
      <div>
        <h3>${recipe.code} · ${recipe.title}</h3>
        <p>${recipe.category}</p>
      </div>
    `;

    card.addEventListener("click", () => openRecipe(recipe));
    grid.appendChild(card);
  });
}

function openRecipe(recipe) {
  dialogTitle.textContent = `${recipe.code} · ${recipe.title}`;
  dialogCategory.textContent = recipe.category;
  dialogImage.src = recipe.image;
  dialogImage.alt = `${recipe.title} recipe card`;
  dialog.showModal();
}

closeDialog.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", event => {
  const rect = dialog.getBoundingClientRect();

  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (clickedOutside) dialog.close();
});

searchInput.addEventListener("input", renderRecipes);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").catch(() => {});
}

renderFilters();
renderRecipes();
