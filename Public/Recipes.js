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
  

 fetch(
    `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&diet=${checkedDiets}&intolerances=${checkedIntolerances}&apiKey=${process.env.apiKey}`
  )
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


function lookupRecipe(){
  let paragraph = document.getElementById("container");
  paragraph.innerHTML = "";
  const id = document.getElementById("search").value;
  console.log(id);

  fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.apiKey}`)
  .then((result) => result.json())
  .then((resultJson) => {
    console.log(resultJson);
      
    //for (var key in resultJson) {
      const image = document.createElement("img");
      //image.src = value["image"];
      //paragraph.appendChild(image);
      const recipeTitle = document.createElement("h2");
      recipeTitle.innerHTML = "Title: " + resultJson["title"];
      paragraph.appendChild(recipeTitle);
      const descriptions = document.createElement("h5");
      const url = document.createElement("h5");
      url.innerHTML = "Link: " + resultJson["spoonacularSourceUrl"];
      paragraph.appendChild(url);
      const priceVar = resultJson["pricePerServing"].value;
      const price = priceVar/100;
      descriptions.innerHTML = "Time: " + resultJson["readyInMinutes"] + ",  Servings: " + resultJson["servings"] + ", Price: " + price;
      paragraph.appendChild(descriptions);
      const allInstructions = document.createElement("p");
      allInstructions.innerHTML = resultJson["instructions"]; 
      paragraph.appendChild(allInstructions);
    
      paragraph.style.display = "block";
    //}
    });  
}












// Add a lookup feature where users can lookup the id of the recipe they like and that will then display the recipe information
