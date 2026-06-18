const recipes = [
  {
    "code": "B01",
    "title": "Biscoff Overnight Oats",
    "category": "Breakfast",
    "icon": "\ud83c\udf73",
    "image": "assets/b01-biscoff-overnight-oats.jpeg"
  },
  {
    "code": "B02",
    "title": "Nut Granola",
    "category": "Breakfast",
    "icon": "\ud83c\udf73",
    "image": "assets/b02-nut-granola.jpeg"
  },
  {
    "code": "B03",
    "title": "Biscoff Pancake Bowl",
    "category": "Breakfast",
    "icon": "\ud83c\udf73",
    "image": "assets/b03-biscoff-pancake-bowl.jpeg"
  },
  {
    "code": "B04",
    "title": "Raspberry Chocolate Pancake Bowl",
    "category": "Breakfast",
    "icon": "\ud83c\udf73",
    "image": "assets/b04-raspberry-chocolate-pancake-bowl.jpeg"
  },
  {
    "code": "B05",
    "title": "Peach Cobbler Pancake Bowl",
    "category": "Breakfast",
    "icon": "\ud83c\udf73",
    "image": "assets/b05-peach-cobbler-pancake-bowl.jpeg"
  },
  {
    "code": "L01",
    "title": "Sweetcorn Chicken Salad",
    "category": "Lunch",
    "icon": "\ud83e\udd57",
    "image": "assets/l01-sweetcorn-chicken-salad.jpeg"
  },
  {
    "code": "L02",
    "title": "Taco Bowl",
    "category": "Lunch",
    "icon": "\ud83e\udd57",
    "image": "assets/l02-taco-bowl.jpeg"
  },
  {
    "code": "L03",
    "title": "Chicken Fajita Bowl",
    "category": "Lunch",
    "icon": "\ud83e\udd57",
    "image": "assets/l03-chicken-fajita-bowl.jpeg"
  },
  {
    "code": "D01",
    "title": "Salmon Pasta Bake",
    "category": "Dinner",
    "icon": "\ud83c\udf72",
    "image": "assets/d01-salmon-pasta-bake.jpeg"
  },
  {
    "code": "D02",
    "title": "Chicken Tikka Rice Bake",
    "category": "Dinner",
    "icon": "\ud83c\udf72",
    "image": "assets/d02-chicken-tikka-rice-bake.jpeg"
  },
  {
    "code": "D03",
    "title": "Pesto Chicken Bake",
    "category": "Dinner",
    "icon": "\ud83c\udf72",
    "image": "assets/d03-pesto-chicken-bake.jpeg"
  },
  {
    "code": "D04",
    "title": "Chicken Enchiladas",
    "category": "Dinner",
    "icon": "\ud83c\udf72",
    "image": "assets/d04-chicken-enchiladas.jpeg"
  },
  {
    "code": "F01",
    "title": "Cheesy Sloppy Joe Garlic Bread",
    "category": "Fakeaway",
    "icon": "\ud83c\udf54",
    "image": "assets/f01-cheesy-sloppy-joe-garlic-bread.jpeg"
  },
  {
    "code": "S01",
    "title": "Peanut Butter Energy Bar",
    "category": "Snacks",
    "icon": "\ud83e\udd5c",
    "image": "assets/s01-peanut-butter-energy-bar.jpeg"
  },
  {
    "code": "S02",
    "title": "Biscoff Bark",
    "category": "Snacks",
    "icon": "\ud83e\udd5c",
    "image": "assets/s02-biscoff-bark.jpeg"
  },
  {
    "code": "C01",
    "title": "Lemon Curd Muffins",
    "category": "Sweet Treats",
    "icon": "\ud83e\uddc1",
    "image": "assets/c01-lemon-curd-muffins.jpeg"
  },
  {
    "code": "C02",
    "title": "New York Chocolate Chip Cookies",
    "category": "Sweet Treats",
    "icon": "\ud83e\uddc1",
    "image": "assets/c02-new-york-chocolate-chip-cookies.jpeg"
  }
];
const categoryMeta = {
  "Breakfast": {
    "icon": "\ud83c\udf73",
    "className": "breakfast"
  },
  "Lunch": {
    "icon": "\ud83e\udd57",
    "className": "lunch"
  },
  "Dinner": {
    "icon": "\ud83c\udf72",
    "className": "dinner"
  },
  "Fakeaway": {
    "icon": "\ud83c\udf54",
    "className": "fakeaway"
  },
  "Snacks": {
    "icon": "\ud83e\udd5c",
    "className": "snacks"
  },
  "Sweet Treats": {
    "icon": "\ud83e\uddc1",
    "className": "sweets"
  }
};

const screens={home:document.getElementById("home"),categoryScreen:document.getElementById("categoryScreen"),favouritesScreen:document.getElementById("favouritesScreen"),recentScreen:document.getElementById("recentScreen"),aboutScreen:document.getElementById("aboutScreen")};
const categoriesEl=document.getElementById("categories"),categoryName=document.getElementById("categoryName"),categoryBubble=document.getElementById("categoryBubble"),categoryCount=document.getElementById("categoryCount"),recipeList=document.getElementById("recipeList"),homeFavourites=document.getElementById("homeFavourites"),homeRecent=document.getElementById("homeRecent"),homeFavWrap=document.getElementById("homeFavWrap"),homeRecentWrap=document.getElementById("homeRecentWrap"),favouritesList=document.getElementById("favouritesList"),recentList=document.getElementById("recentList"),recipeModal=document.getElementById("recipeModal"),closeRecipe=document.getElementById("closeRecipe"),modalHeart=document.getElementById("modalHeart"),modalCode=document.getElementById("modalCode"),modalTitle=document.getElementById("modalTitle"),modalCategory=document.getElementById("modalCategory"),modalImage=document.getElementById("modalImage");
let currentRecipe=null;
const store={get favourites(){return JSON.parse(localStorage.getItem("vaultFavourites")||"[]")},set favourites(v){localStorage.setItem("vaultFavourites",JSON.stringify(v))},get recent(){return JSON.parse(localStorage.getItem("vaultRecent")||"[]")},set recent(v){localStorage.setItem("vaultRecent",JSON.stringify(v))}};
const plural=(c,w)=>`${c} ${w}${c===1?"":"s"}`;
const recipeByCode=code=>recipes.find(r=>r.code===code);
const categories=()=>[...new Set(recipes.map(r=>r.category))];
function showScreen(id){Object.entries(screens).forEach(([k,s])=>s.classList.toggle("active",k===id));document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.view===id||(id==="categoryScreen"&&n.id==="navCategories")));window.scrollTo(0,0)}
function renderCategories(){categoriesEl.innerHTML="";categories().forEach(cat=>{const count=recipes.filter(r=>r.category===cat).length,meta=categoryMeta[cat],b=document.createElement("button");b.className=`category-card ${meta.className}`;b.innerHTML=`<span class="cat-icon">${meta.icon}</span><span><h3>${cat}</h3><p>${plural(count,"recipe")}</p></span><span class="arrow">›</span>`;b.onclick=()=>openCategory(cat);categoriesEl.appendChild(b)})}
function openCategory(cat){const meta=categoryMeta[cat],list=recipes.filter(r=>r.category===cat);categoryName.textContent=cat;categoryBubble.textContent=meta.icon;categoryCount.textContent=plural(list.length,"recipe").toUpperCase();renderRecipeList(recipeList,list);showScreen("categoryScreen")}
function renderRecipeList(container,list){container.innerHTML="";if(!list.length){container.innerHTML=`<div class="empty">Nothing saved here yet.</div>`;return}list.forEach(r=>{const b=document.createElement("button");b.className="recipe-row";b.innerHTML=`<img src="${r.image}" alt="${r.title} preview" loading="lazy"><span><p class="code">${r.code}</p><h3>${r.title}</h3><p class="meta">${r.category}</p></span><span class="arrow">›</span>`;b.onclick=()=>openRecipe(r);container.appendChild(b)})}
const isFavourite=code=>store.favourites.includes(code);
function toggleFavourite(code){if(!code)return;store.favourites=isFavourite(code)?store.favourites.filter(x=>x!==code):[code,...store.favourites];updateHeart();renderFavourites();renderHomeShelves()}
function addRecent(code){store.recent=[code,...store.recent.filter(x=>x!==code)].slice(0,10);renderRecent();renderHomeShelves()}
function updateHeart(){if(!currentRecipe)return;const saved=isFavourite(currentRecipe.code);modalHeart.textContent=saved?"♥":"♡";modalHeart.classList.toggle("saved",saved)}
function openRecipe(r){currentRecipe=r;modalCode.textContent=r.code;modalTitle.textContent=r.title;modalCategory.textContent=`• ${r.category} •`;modalImage.src=r.image;modalImage.alt=`${r.title} recipe card`;updateHeart();addRecent(r.code);recipeModal.showModal()}
function renderFavourites(){renderRecipeList(favouritesList,store.favourites.map(recipeByCode).filter(Boolean))}
function renderRecent(){renderRecipeList(recentList,store.recent.map(recipeByCode).filter(Boolean))}
function renderHomeShelves(){const favs=store.favourites.map(recipeByCode).filter(Boolean).slice(0,3),recent=store.recent.map(recipeByCode).filter(Boolean).slice(0,5);homeFavWrap.style.display=favs.length?"block":"none";homeRecentWrap.style.display=recent.length?"block":"none";homeFavourites.innerHTML=favs.map(r=>`<button class="thumb-card" data-code="${r.code}"><img src="${r.image}" alt="${r.title}"><p>${r.title}</p></button>`).join("");homeRecent.innerHTML=recent.map(r=>`<button class="circle-card" data-code="${r.code}"><img src="${r.image}" alt="${r.title}"><p>${r.code}</p></button>`).join("");document.querySelectorAll("[data-code]").forEach(b=>b.onclick=()=>openRecipe(recipeByCode(b.dataset.code)))}
document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>showScreen(b.dataset.view));
document.getElementById("navCategories").onclick=()=>showScreen("home");document.getElementById("aboutBtn").onclick=()=>showScreen("aboutScreen");document.getElementById("topFavBtn").onclick=()=>{renderFavourites();showScreen("favouritesScreen")};closeRecipe.onclick=()=>recipeModal.close();modalHeart.onclick=()=>toggleFavourite(currentRecipe?.code);
if("serviceWorker" in navigator)navigator.serviceWorker.register("service-worker.js").catch(()=>{});
renderCategories();renderFavourites();renderRecent();renderHomeShelves();showScreen("home");