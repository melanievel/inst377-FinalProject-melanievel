async function filterRecipes() {
  let dietCheckboxes = document.getElementsByName("diet");
  let checkedDiets = "";
  for (var i = 0; i < dietCheckboxes.length; i++) {
    if (dietCheckboxes[i].checked) {
      checkedDiets += dietCheckboxes[i].value + ",";
    }
  }
  console.log(checkedDiets);

  let intoleranceCheckboxes = document.getElementsByName("intolerance");
  let checkedIntolerances = "";
  for (var i = 0; i < intoleranceCheckboxes.length; i++) {
    if (intoleranceCheckboxes[i].checked) {
      checkedIntolerances += intoleranceCheckboxes[i].value + ",";
    }
  }
  console.log(checkedIntolerances);

  const dropdown = document.getElementById("cuisines");
  const cuisine = dropdown.value;
  console.log(cuisine);
  

 //fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&diet=${checkedDiets}&intolerances=${checkedIntolerances}&apiKey=376ec4f30d804001815a9949ee0d8cff` // HIDE apiKey before submission
  //)
   fetch('http://localhost:3000/data', {
    method: 'POST',
    // body: JSON.stringify({
      cuisine: cuisine,
      checkedDiets: checkedDiets,
      checkedIntolerances: checkedIntolerances,

    // })

   })
   
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
       const results = data.results;
       const allRecipes = document.getElementById('recipeResults');
       results.forEach((recipe) => {
        const list = document.createElement('ul');
        const items = document.createElement('li');
        const title = document.createElement("h2");
        title.innerHTML = recipe["title"];
        const id = document.createElement("h3");
        id.innerHTML= recipe["id"];
        const img = document.createElement("img");
        img.src = recipe["image"];
        const space = document.createElement('br');
        
        items.appendChild(title);
        items.appendChild(id);
        items.appendChild(img);
        list.appendChild(items);
        allRecipes.appendChild(list); 
        allRecipes.style.display = "block";
      });
    });
}


async function lookupRecipe(){
  let paragraph = document.getElementById("container");
  let priceImg = document.getElementById('pricePic');
  paragraph.innerHTML = "";
  const id = document.getElementById("search").value;
  console.log(id);

  //fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=376ec4f30d804001815a9949ee0d8cff`) // HIDE apiKey before submission
  await fetch('http://localhost:3000/search')
    .then((result) => result.json())
    .then((resultJson) => {
    console.log(resultJson);
      
    //for (var key in resultJson) {
      const image = document.createElement("img");
      const recipeTitle = document.createElement("h2");
      recipeTitle.innerHTML = "Title: " + resultJson["title"];
      paragraph.appendChild(recipeTitle);
      const descriptions = document.createElement("h5");
      const url = document.createElement("h5");
      url.innerHTML = "Link: " + resultJson["spoonacularSourceUrl"];
      paragraph.appendChild(url);
      const priceVar = resultJson["pricePerServing"].value;
      const total = priceVar/100;
      descriptions.innerHTML = "Time: " + resultJson["readyInMinutes"] + ",  Servings: " + resultJson["servings"];
      paragraph.appendChild(descriptions);
      const allInstructions = document.createElement("p");
      allInstructions.innerHTML = resultJson["instructions"]; 
      paragraph.appendChild(allInstructions);
      fetch(`https://api.spoonacular.com/recipes/${id}/priceBreakdownWidget.json?apiKey=376ec4f30d804001815a9949ee0d8cff`)
      .then((result) => result.json())
      .then((resultJson) => {
        const price = document.createElement('h3');
        price.innerHTML= "Total cost per serving $" + resultJson["totalCostPerServing"];
        paragraph.appendChild(price);
      });
      paragraph.style.display = "block";
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

window.onload = loadPage();












// Add a lookup feature where users can lookup the id of the recipe they like and that will then display the recipe information
