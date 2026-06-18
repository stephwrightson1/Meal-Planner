const recipes=[
  {
    "code": "B01",
    "title": "Biscoff Overnight Oats",
    "category": "Breakfast",
    "icon": "🍳",
    "image": "assets/b01-biscoff-overnight-oats.jpeg"
  },
  {
    "code": "B02",
    "title": "Nut Granola",
    "category": "Breakfast",
    "icon": "🍳",
    "image": "assets/b02-nut-granola.jpeg"
  },
  {
    "code": "B03",
    "title": "Biscoff Pancake Bowl",
    "category": "Breakfast",
    "icon": "🍳",
    "image": "assets/b03-biscoff-pancake-bowl.jpeg"
  },
  {
    "code": "B04",
    "title": "Raspberry Chocolate Pancake Bowl",
    "category": "Breakfast",
    "icon": "🍳",
    "image": "assets/b04-raspberry-chocolate-pancake-bowl.jpeg"
  },
  {
    "code": "B05",
    "title": "Peach Cobbler Pancake Bowl",
    "category": "Breakfast",
    "icon": "🍳",
    "image": "assets/b05-peach-cobbler-pancake-bowl.jpeg"
  },
  {
    "code": "L01",
    "title": "Sweetcorn Chicken Salad",
    "category": "Lunch",
    "icon": "🥗",
    "image": "assets/l01-sweetcorn-chicken-salad.jpeg"
  },
  {
    "code": "L02",
    "title": "Taco Bowl",
    "category": "Lunch",
    "icon": "🥗",
    "image": "assets/l02-taco-bowl.jpeg"
  },
  {
    "code": "L03",
    "title": "Chicken Fajita Bowl",
    "category": "Lunch",
    "icon": "🥗",
    "image": "assets/l03-chicken-fajita-bowl.jpeg"
  },
  {
    "code": "D01",
    "title": "Salmon Pasta Bake",
    "category": "Dinner",
    "icon": "🍝",
    "image": "assets/d01-salmon-pasta-bake.jpeg"
  },
  {
    "code": "D02",
    "title": "Chicken Tikka Rice Bake",
    "category": "Dinner",
    "icon": "🍝",
    "image": "assets/d02-chicken-tikka-rice-bake.jpeg"
  },
  {
    "code": "D03",
    "title": "Pesto Chicken Bake",
    "category": "Dinner",
    "icon": "🍝",
    "image": "assets/d03-pesto-chicken-bake.jpeg"
  },
  {
    "code": "D04",
    "title": "Chicken Enchiladas",
    "category": "Dinner",
    "icon": "🍝",
    "image": "assets/d04-chicken-enchiladas.jpeg"
  },
  {
    "code": "F01",
    "title": "Cheesy Sloppy Joe Garlic Bread",
    "category": "Fakeaway",
    "icon": "🍔",
    "image": "assets/f01-cheesy-sloppy-joe-garlic-bread.jpeg"
  },
  {
    "code": "S01",
    "title": "Peanut Butter Energy Bar",
    "category": "Snacks",
    "icon": "🍫",
    "image": "assets/s01-peanut-butter-energy-bar.jpeg"
  },
  {
    "code": "S02",
    "title": "Biscoff Bark",
    "category": "Snacks",
    "icon": "🍫",
    "image": "assets/s02-biscoff-bark.jpeg"
  },
  {
    "code": "C01",
    "title": "Lemon Curd Muffins",
    "category": "Sweet Treats",
    "icon": "🧁",
    "image": "assets/c01-lemon-curd-muffins.jpeg"
  },
  {
    "code": "C02",
    "title": "New York Chocolate Chip Cookies",
    "category": "Sweet Treats",
    "icon": "🧁",
    "image": "assets/c02-new-york-chocolate-chip-cookies.jpeg"
  }
];
const categoryMeta={
  "Breakfast": {
    "icon": "🍳",
    "class": "breakfast"
  },
  "Lunch": {
    "icon": "🥗",
    "class": "lunch"
  },
  "Dinner": {
    "icon": "🍝",
    "class": "dinner"
  },
  "Fakeaway": {
    "icon": "🍔",
    "class": "fakeaway"
  },
  "Snacks": {
    "icon": "🍫",
    "class": "snacks"
  },
  "Sweet Treats": {
    "icon": "🧁",
    "class": "sweets"
  }
};
const views={home:document.getElementById("homeView"),category:document.getElementById("categoryView"),favourites:document.getElementById("favouritesView"),recent:document.getElementById("recentView"),about:document.getElementById("aboutView")};const categoryTiles=document.getElementById("categoryTiles"),recipeCount=document.getElementById("recipeCount"),homeFavourites=document.getElementById("homeFavourites"),homeFavouritesSection=document.getElementById("homeFavouritesSection"),categoryIcon=document.getElementById("categoryIcon"),categoryTitle=document.getElementById("categoryTitle"),categorySubtitle=document.getElementById("categorySubtitle"),categoryRecipes=document.getElementById("categoryRecipes"),favouriteRecipes=document.getElementById("favouriteRecipes"),recentRecipes=document.getElementById("recentRecipes"),searchInput=document.getElementById("searchInput"),dialog=document.getElementById("recipeDialog"),closeDialog=document.getElementById("closeDialog"),dialogFavourite=document.getElementById("dialogFavourite"),dialogCode=document.getElementById("dialogCode"),dialogTitle=document.getElementById("dialogTitle"),dialogCategory=document.getElementById("dialogCategory"),dialogImage=document.getElementById("dialogImage"),topHeartButton=document.getElementById("topHeartButton"),menuButton=document.getElementById("menuButton");let currentRecipe=null;const store={get favourites(){return JSON.parse(localStorage.getItem("recipeVaultFavourites")||"[]")},set favourites(v){localStorage.setItem("recipeVaultFavourites",JSON.stringify(v))},get recent(){return JSON.parse(localStorage.getItem("recipeVaultRecent")||"[]")},set recent(v){localStorage.setItem("recipeVaultRecent",JSON.stringify(v))}};function recipeByCode(c){return recipes.find(r=>r.code===c)}function categoryNames(){return[...new Set(recipes.map(r=>r.category))]}function countForCategory(c){return recipes.filter(r=>r.category===c).length}function plural(c,w){return `${c} ${w}${c===1?"":"s"}`}function showView(n){Object.entries(views).forEach(([k,v])=>v.classList.toggle("active",k===n));document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.nav===n||(n==="category"&&b.dataset.nav==="categories")));window.scrollTo({top:0,behavior:"smooth"})}function renderHome(){recipeCount.textContent=plural(recipes.length,"recipe");renderCategories();renderHomeFavourites()}function renderCategories(){categoryTiles.innerHTML="";categoryNames().forEach(c=>{const m=categoryMeta[c]||{icon:"📖",class:"breakfast"},count=countForCategory(c),b=document.createElement("button");b.className=`category-tile ${m.class}`;b.innerHTML=`<span class="emoji">${m.icon}</span><span><h3>${c}</h3><p>${plural(count,"recipe")}</p></span><span class="chevron">›</span>`;b.addEventListener("click",()=>openCategory(c));categoryTiles.appendChild(b)})}function openCategory(c){const m=categoryMeta[c]||{icon:"📖"},list=recipes.filter(r=>r.category===c);categoryIcon.textContent=m.icon;categoryTitle.textContent=c;categorySubtitle.textContent=plural(list.length,"recipe");renderRecipeList(categoryRecipes,list);showView("category")}function renderRecipeList(container,list){container.innerHTML="";if(!list.length){container.innerHTML=`<div class="empty-state">No recipes here yet.</div>`;return}list.forEach(r=>{const b=document.createElement("button");b.className="recipe-row";b.innerHTML=`<img src="${r.image}" alt="${r.title} recipe card preview" loading="lazy"><span><p class="code">${r.code}</p><h3>${r.title}</h3><p class="meta">${r.category}</p></span><span class="arrow">›</span>`;b.addEventListener("click",()=>openRecipe(r));container.appendChild(b)})}function renderHomeFavourites(){const favs=store.favourites.map(recipeByCode).filter(Boolean).slice(0,3);if(!favs.length){homeFavouritesSection.style.display="none";return}homeFavouritesSection.style.display="block";homeFavourites.innerHTML="";favs.forEach(r=>{const b=document.createElement("button");b.className="mini-card";b.innerHTML=`<img src="${r.image}" alt="${r.title} recipe card preview" loading="lazy"><p>${r.title}</p>`;b.addEventListener("click",()=>openRecipe(r));homeFavourites.appendChild(b)})}function renderFavourites(){const favs=store.favourites.map(recipeByCode).filter(Boolean);favouriteRecipes.innerHTML="";if(!favs.length){favouriteRecipes.innerHTML=`<div class="empty-state">Tap the heart on a recipe to save it here.</div>`;return}renderRecipeList(favouriteRecipes,favs)}function renderRecent(){const rec=store.recent.map(recipeByCode).filter(Boolean);recentRecipes.innerHTML="";if(!rec.length){recentRecipes.innerHTML=`<div class="empty-state">Recently viewed recipes will appear here.</div>`;return}renderRecipeList(recentRecipes,rec)}function openRecipe(r){currentRecipe=r;dialogCode.textContent=r.code;dialogTitle.textContent=r.title;dialogCategory.textContent=`• ${r.category} •`;dialogImage.src=r.image;dialogImage.alt=`${r.title} recipe card`;addRecent(r.code);updateFavouriteButton();dialog.showModal()}function addRecent(c){store.recent=[c,...store.recent.filter(i=>i!==c)].slice(0,10);renderRecent()}function isFavourite(c){return store.favourites.includes(c)}function toggleFavourite(c){if(!c)return;if(isFavourite(c))store.favourites=store.favourites.filter(i=>i!==c);else store.favourites=[c,...store.favourites];updateFavouriteButton();renderHomeFavourites();renderFavourites()}function updateFavouriteButton(){if(!currentRecipe)return;const saved=isFavourite(currentRecipe.code);dialogFavourite.textContent=saved?"♥":"♡";dialogFavourite.classList.toggle("saved",saved)}function searchRecipes(q){const clean=q.trim().toLowerCase();if(!clean){renderCategories();return}categoryTiles.innerHTML="";const matches=recipes.filter(r=>`${r.code} ${r.title} ${r.category}`.toLowerCase().includes(clean));if(!matches.length){categoryTiles.innerHTML=`<div class="empty-state">No recipes found.</div>`;return}matches.forEach(r=>{const m=categoryMeta[r.category]||{class:"breakfast"},b=document.createElement("button");b.className=`category-tile ${m.class}`;b.innerHTML=`<span class="emoji">${r.icon}</span><span><h3>${r.title}</h3><p>${r.code} · ${r.category}</p></span><span class="chevron">›</span>`;b.addEventListener("click",()=>openRecipe(r));categoryTiles.appendChild(b)})}document.querySelectorAll("[data-nav]").forEach(b=>b.addEventListener("click",()=>{const t=b.dataset.nav;if(t==="home")showView("home");if(t==="categories"){showView("home");document.querySelector(".category-list")?.scrollIntoView({behavior:"smooth",block:"start"})}if(t==="favourites"){renderFavourites();showView("favourites")}if(t==="recent"){renderRecent();showView("recent")}}));topHeartButton.addEventListener("click",()=>{renderFavourites();showView("favourites")});menuButton.addEventListener("click",()=>showView("about"));closeDialog.addEventListener("click",()=>dialog.close());dialogFavourite.addEventListener("click",()=>toggleFavourite(currentRecipe?.code));searchInput.addEventListener("input",e=>searchRecipes(e.target.value));if("serviceWorker" in navigator){navigator.serviceWorker.register("service-worker.js").catch(()=>{})}renderHome();renderFavourites();renderRecent();showView("home");