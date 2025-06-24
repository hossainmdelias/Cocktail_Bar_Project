let group = [];

async function fetchDrink(search = "margarita") {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
    const data = await res.json();
    displayDrinks(data.drinks);
}

function displayDrinks(drinks) {
    const container = document.getElementById("drinks");
    container.innerHTML = "";
    if (!drinks) {
        container.innerHTML = "<p>Drink not found.</p>";
        return;
    }
    drinks.forEach(drink => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
        <h4>${drink.strDrink}</h4>
        <p><strong>Category:</strong> ${drink.strCategory}</p>
        <p><strong>Instructions:</strong> ${drink.strInstructions.slice(0, 15)}...</p>
        <button onclick='addToGroup("${drink.strDrink}")'>Add to Group</button>
        <button onclick='showDetails(${JSON.stringify(drink).replace(/'/g, "&apos;")})'>Details</button>
        `;
        container.appendChild(card);
    });
}

function addToGroup(name) {
    if (group.length >= 7) {
        alert("⚠️ You cannot add more than 7 drinks to the group!");
        return;
    }
    group.push(name);
    updateGroupUI();
}

function updateGroupUI() {
    const list = document.getElementById("groupList");
    const count = document.getElementById("groupCount");
    list.innerHTML = "";
    group.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        list.appendChild(li);
    });
    count.textContent = group.length;
}

function searchDrinks() {
    const query = document.getElementById("searchInput").value;
    fetchDrink(query);
}

function showDetails(drink) {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");
    const content = document.getElementById("modalContent");
    content.innerHTML = `
        <h2>${drink.strDrink}</h2>
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" style="width: 100%; max-width: 300px;"/>
        <p><strong>Category:</strong> ${drink.strCategory}</p>
        <p><strong>Alcoholic:</strong> ${drink.strAlcoholic}</p>
        <p><strong>Glass:</strong> ${drink.strGlass}</p>
        <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
        <p><strong>Ingredients:</strong> 
        ${[drink.strIngredient1, drink.strIngredient2, drink.strIngredient3].filter(Boolean).join(", ")}
        </p>
    `;
    overlay.style.display = modal.style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

fetchDrink();