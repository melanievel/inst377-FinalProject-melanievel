function getRandomRecipe(){
    const img= document.getElementById("recipeimg");
    const title= document.getElementById("recipeTitle");
    const description= document.getElementById("description");
    const instructions= document.getElementById("instructions");

    fetch('/data')
    .then((result) => result.json())
    .then((data) => {
        const recipes = data.recipes;
        recipes.forEach((recipe) => {
            //console.log(recipe);
            img.src = recipe["image"];
            title.innerHTML = recipe["title"];
            description.innerHTML = "Time: " + recipe["readyInMinutes"] + ",  Servings: " + recipe["servings"] + ",  Cuisines: " + recipe["cuisines"] + ",  Diets: " + recipe["diets"] + ", Price per serving: $" + recipe["pricePerServing"];
            instructions.innerHTML = recipe["instructions"];
        });
    });

    
}

    
window.onload = getRandomRecipe;

