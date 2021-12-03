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