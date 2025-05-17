function getRandomRecipe(){
    loadPage();
    const img= document.getElementById("recipeimg");
    const title= document.getElementById("recipeTitle");
    const description= document.getElementById("description");
    const instructions= document.getElementById("instructions");

    //fetch("https://api.spoonacular.com/recipes/random?apiKey=376ec4f30d804001815a9949ee0d8cff") //REMOVE before final submission
    fetch('http://localhost:3000/randomData')
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

function loadPage(){
    const onButton = document.getElementById("audioOn");
      onButton.addEventListener("click", function () {
        AudioCommands();
      });

      const offButton = document.getElementById("audioOff");
      offButton.addEventListener("click", function () {
        turnOffLibrary();
      });
    
}

function AudioCommands() {
    if (annyang) {
      const commands = {
        "change the color to :color": function (color) {
          document.body.style.background = color;
        },
        "navigate to :page": function (page) {
          window.location.href = page + "Page.html";
        },
      };
  
      annyang.addCommands(commands);
  
      annyang.start();
    }
}

function turnOffLibrary() {
    if (annyang) {
      annyang.abort();
    }
}

    
window.onload = getRandomRecipe;

