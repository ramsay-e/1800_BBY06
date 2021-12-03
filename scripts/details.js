function showDetails() {
    // create a URL object
    let params = new URL(window.location.href);
    let urlstring = params.searchParams.get("collection"); //parse "collection"
    let patharray = urlstring.split('?');
    db.collection(patharray[0]).doc(patharray[1].replace('id=', '')).get().then(userDoc => {
      let name = userDoc.data().Name;
      let recipe = userDoc.data().Recipe;
      let description = userDoc.data().Description;
      let prep_time = userDoc.data().Prep_time;
      let serves = userDoc.data().Serves;

      //Gets the data fields of the recipe array
      let recipeList = "<ol>";
      let recipes = userDoc.data().Recipe;
      console.log(recipes)
      recipes.forEach(item => recipeList = recipeList + "<li>" + item + "</li>");
      recipeList = recipeList + "</ol>"

      //Gets the data fields of the ingredients array
      let ingredientList = "<ul>";
      let ingredients = userDoc.data().Ingredients;
      console.log(ingredients)
      ingredients.forEach(item => ingredientList = ingredientList + "<li>" + item + "</li>");
      ingredientList = ingredientList + "</ul>"

      //Gets the data fields of the nutrients array
      let nutrientList = "<ul>";
      let nutrients = userDoc.data().Nutrients;
      console.log(nutrients)
      nutrients.forEach(item => nutrientList = nutrientList + "<li>" + item + "</li>");
      nutrientList = nutrientList + "</ul>"

      //Get each element of the document
      document.getElementById("details-name").innerHTML = name;
      document.getElementById("details-recipe").innerHTML = recipeList;
      document.getElementById("details-description").innerHTML = description;
      document.getElementById("details-ingredients").innerHTML = ingredientList;
      document.getElementById("details-serves").innerHTML = serves;
      document.getElementById("details-prep_time").innerHTML = prep_time;
      document.getElementById("details-nutrients").innerHTML = nutrientList;
      document.getElementById('details-img').src = "./images/" + name + ".jpg";
      newcard.querySelector('.details-img').src = "./images/" + name + ".jpg";

    });
  }