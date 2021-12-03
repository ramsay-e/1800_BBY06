// Displaycards for menu items. Iterates through collection of restriction type (eg. Vegan)
function displayCards3(collection) {
  let CardTemplate = document.getElementById("CardTemplate");

  db.collection(collection).orderBy("Name").get()
    .then(snap => {
      var i = 1;
      snap.forEach(doc => { //iterate thru each doc
        var title = doc.data().Name;
        var details = doc.data().Description;
        let newcard = CardTemplate.content.cloneNode(true);

        //update title and text and image
        newcard.querySelector('.card-title').innerHTML = title;
        newcard.querySelector('.card-text').innerHTML = details;
        newcard.querySelector('.card-image').src = "./images/" + title + ".jpg";

        // Gets and formats gallery name (ex. "Your Vegan Menu")
        let gallery = collection;
        document.getElementById("gallery").innerHTML = gallery.replace("_", " ").replace("-", " ");

        newcard.querySelector('.card-href').href = "details.html?collection=" + collection + "?id=" + doc
          .id; //firestore doc ID

        //give unique ids to all elements for future use
        newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        //attach to gallery
        document.getElementById(collection + "-go-here").appendChild(newcard);
      })
    })
}

// Gets restriction values in user document to display all menu items.
firebase.auth().onAuthStateChanged(user => {
  // Check if user is signed in:
  if (user) {

    currentUser = db.collection("users").doc(user.uid)

    currentUser.get()
      .then(userDoc => {

        // Displays menu cards based on quiz selections in user document
        let values = userDoc.data().values;
        console.log(values)
        values.forEach(item => displayCards3(item));
        if (values.length == 0) {
          displayCards3("Gluten-Free");
          displayCards3("Vegan");
          displayCards3("Vegetarian");
          displayCards3("Lactose-Free");
          displayCards3("Keto");
          displayCards3("Pescatarian");
        }
      })
  }
})