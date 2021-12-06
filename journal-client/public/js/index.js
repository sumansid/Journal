const firebaseConfig = {
     // Add config herre
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

      document.getElementById('login').addEventListener('click', GoogleLogin)
      

      let provider = new firebase.auth.GoogleAuthProvider()

      function GoogleLogin() {
        console.log('Login Btn Call')
        firebase.auth().signInWithRedirect(provider);
      }
            
    
    firebase.auth().onAuthStateChanged(user => {
            console.log("user ", user)
          if (user) {

            window.location.assign("/profile")

            //showUserDetails(user)
          } else {
              console.log("not logged in")

          }
        })
      
      
      /*

      function LogoutUser() {
 
        firebase.auth().signOut().then(() => {
        }).catch(e => {
          console.log(e)
        })
      }
     */