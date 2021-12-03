// Fitmeal's firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAwKw9nxIDn3tfJm3qiI2GJV2d_YuYwn6w",
    authDomain: "fitmeal-df106.firebaseapp.com",
    projectId: "fitmeal-df106",
    storageBucket: "fitmeal-df106.appspot.com",
    messagingSenderId: "717872291044",
    appId: "1:717872291044:web:0aa1649cf10ca9e44a60f1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        var user = authResult.user; // get the user object from the Firebase authentication database
        if (authResult.additionalUserInfo.isNewUser) { //if new user
          db.collection("users").doc(user.uid)
            .set({ //write to firestore. We are using the UID for the ID in users collection
              name: user.displayName, //"users" collection
              email: user.email //with authenticated user's ID (user.uid)
            }).then(function () {
              console.log("New user added to firestore");
              window.location.assign("new_quiz.html");
            })
            .catch(function (error) {
              console.log("Error adding new user: " + error);
            });
        } else {
          return true;
        }
        return false;
      },

      uiShown: function () {
        // The widget is rendered.
        document.getElementById('loader').style.display = 'none';
      }
    },

    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [

      //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

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

  // Displaycards for menu items. Iterates through collection of restriction type (ex. Vegan)
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

  var currentUser;

    function populateInfo() {
      firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

          //go to the correct user document by referencing to the user uid
          currentUser = db.collection("users").doc(user.uid)

          //get the document for current user.
          currentUser.get()
            .then(userDoc => {
              //get the data fields of the user
              var quiz1 = userDoc.data().vegetarian;
              var quiz2 = userDoc.data().vegan;
              var quiz3 = userDoc.data().pescatarian;
              var quiz4 = userDoc.data().gluten_free;
              var quiz5 = userDoc.data().lactose_free;
              var quiz6 = userDoc.data().keto;

              //if the data fields are not empty, then write them in to the form.
              if (quiz1 != null) {
                document.getElementById("flexRadioDefault1").value = quiz1;
              }
              if (quiz2 != null) {
                document.getElementById("flexRadioDefault2").value = quiz2;
              }
              if (quiz3 != null) {
                document.getElementById("flexRadioDefault3").value = quiz3;
              }
              if (quiz4 != null) {
                document.getElementById("flexRadioDefault4").value = quiz4;
              }
              if (quiz5 != null) {
                document.getElementById("flexRadioDefault5").value = quiz5;
              }
              if (quiz6 != null) {
                document.getElementById("flexRadioDefault6").value = quiz6;
              }
            })
        } else {
          // No user is signed in.
          console.log("No user is signed in");
        }
      });
    }

    function editUserInfo() {
        //Enable the form fields
        document.getElementById('quizFields').disabled = false;
    }
  
      function closeUserInfo() {
        //Enable the form fields
        document.getElementById('quizFields').disabled = true;
      }
  
      // Allows user to save form after editing
      function saveUserInfo(name) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
        let values = [];
        // Checks to see what checkboxes were selected
        checkboxes.forEach((checkbox) => {
          values.push(checkbox.value);
        });
        // Updates selected checkboxes
        currentUser.update({
          values
        })
      }

      var currentUser;

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
                document.getElementById("circle_name").innerText = user_Name;
                var user_Email = userDoc.data().email;
                console.log(user_Email);
                document.getElementById("circle_email").innerText = user_Email;
              })
          }
        });
      }

    // Dropdown menu variables
    var coll = document.getElementsByClassName("collapsible");
    var i;
  
    function populateInfo2() {
        firebase.auth().onAuthStateChanged(user => {
          // Check if user is signed in:
          if (user) {
  
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
              .then(userDoc => {
                //get the data fields of the user
                var userName = userDoc.data().name;
                var userEmail = userDoc.data().email;
                var userPhone = userDoc.data().phone;
  
                //if the data fields are not empty, then write them in to the form.
                if (userName != null) {
                  document.getElementById("nameInput").value = userName;
                }
                if (userName != null) {
                  document.getElementById("circle_name").value = userName;
                }
                if (userEmail != null) {
                  document.getElementById("emailInput").value = userEmail;
                }
                if (userName != null) {
                  document.getElementById("circle_email").value = userName;
                }
                if (userPhone != null) {
                  document.getElementById("phoneInput").value = userPhone;
                }
              })
          } else {
            // No user is signed in.
            console.log("No user is signed in");
          }
        });
      }

      function editUserInfo() {
        //Enable the form fields
        document.getElementById('personalInfoFields').disabled = false;
      }
  
      // Saves user info after edit
      function saveUserInfo() {
        userName = document.getElementById('nameInput').value;
        userEmail = document.getElementById('emailInput').value;
        userPhone = document.getElementById('phoneInput').value;
  
        // Updates corresponding fields in document
        currentUser.update({
            name: userName,
            email: userEmail,
            phone: userPhone,
          })
  
          // Completion message
          .then(() => {
            console.log("Document successfully updated!");
          })
  
        document.getElementById('personalInfoFields').disabled = true;
      }

      function editUserInfo() {
        //Enable the form fields
        document.getElementById('quizFields').disabled = false;
      }
  
      function closeUserInfo() {
        //Enable the form fields
        document.getElementById('quizFields').disabled = true;
      }

          // Allows user to save form after editing
    function saveUserInfo(name) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
        let values = [];
        // Checks to see what checkboxes were selected
        checkboxes.forEach((checkbox) => {
          values.push(checkbox.value);
        });
        // Updates selected checkboxes
        currentUser.update({
          values
        })
      }