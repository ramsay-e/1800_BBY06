function insertName() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
      // Do something for the current logged-in user here:
      console.log(user.uid);
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get()
        .then(userDoc => {
          var user_Name = userDoc.data().name;
          console.log(user_Name);
          document.getElementById("name-goes-here").innerText =
            user_Name;
        })
    } else {
      // No user is signed in.
    }
  });
}

// Displays cards of recipes for main
function displayCards(collection) {
  let CardTemplate = document.getElementById("CardTemplate");

  db.collection(collection).orderBy("Name").limit(4).get()
    .then(snap => {
      var i = 1;
      let num = 0;

      snap.forEach(doc => { //iterate thru each doc
        var title = doc.data().Name;
        var details = doc.data().Description;
        let newcard = CardTemplate.content.cloneNode(true);

        //update title and text and image
        newcard.querySelector('.card-title').innerHTML = title;
        newcard.querySelector('.card-text').innerHTML = details;
        newcard.querySelector('.card-image').src = "./images/" + title + ".jpg";


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

//Display cards #2 is the same as the original though for only the randomizer so both card collections dont get intertwinded
function displayCards2(collection) {
  let CardTemplate = document.getElementById("CardTemplate");

  db.collection(collection).orderBy("Name").limit(4).get()
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


        newcard.querySelector('.card-href').href = "details.html?collection=" + collection + "?id=" + doc
          .id; //firestore doc ID

        //give unique ids to all elements for future use
        newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        //attach to gallery
        document.getElementById(collection + "-go-here2").appendChild(newcard);
      })
    })
}