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