let userData = "";
document.getElementById('logout').addEventListener('click', LogoutUser);
let navBarImg = document.getElementById("user-image");
let userName = document.getElementById("userName");
let journalForm = document.getElementById("journalForm");



journalForm.addEventListener("submit", (e) => {
  //e.preventDefault();
  let journalName = document.getElementById("entryName").value;
  let journalContent = document.getElementById("journalContent").value;

  postFormData(journalName, journalContent, userData.uid, "DECEMBER")
  
})


function postFormData(journalName, journalContent, currentUID, currentDate){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var time = today.getHours() + ":" + today.getMinutes();

var dateTime = date;

var raw = JSON.stringify({"journalName":journalName,"journalContent":journalContent,"currentUserID":currentUID, "currentDate": dateTime, "timestamp" : dateTime});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:4000/api/addjournal", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}




const firebaseConfig = {
     // Add config here
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


function LogoutUser() {
        //console.log('Logout Btn Call')
        firebase.auth().signOut().then(() => {
          console.log("sign out")
          window.location.assign("/home");
          
        }).catch(e => {
          console.log(e)
        })
      }




      
firebase.auth().onAuthStateChanged(user => {
          
          if (user) {

            console.log("user ", user)
            userData = user;
              
            console.log("userDAta ", userData);
            navBarImg.src = userData.photoURL;
            userName.innerText = "Welcome " + userData.displayName;

            //showUserDetails(user)
          } else {
            console.log("fetching user info failed");

          }
        })


/*firebase.auth().getRedirectResult().then(function(result) {
   if (result.credential) {
     // This gives you a Google Access Token. You can use it to access the Google API.
     var token = result.credential.accessToken;
     // ...
   }
   // The signed-in user info.
   var user = result.user;
   console.log("user ", user)
 }).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   // The email of the user's account used.
   var email = error.email;
   // The firebase.auth.AuthCredential type that was used.
   var credential = error.credential;
   // ...
   console.log("error ", error)
 });
*/ 

function showUserDetails(user) {
        document.getElementById('userDetails').innerHTML = `
          <img src="${user.photoURL}" style="width:10%">
          <p>Name: ${user.displayName}</p>
          <p>Email: ${user.email}</p>
        `
      }



      /*

 <nav class="bg-white">
        <div class="">
            <div class="flex justify-between h-16 px-10 shadow items-center">
                <div class="flex items-center space-x-1 cursor-pointer">
                    <img class="flex h-12" src="https://img.icons8.com/pastel-glyph/64/000000/note.png" />
                    <h1 class="text-4xl lg:text-4xl font-bold">Journal</h1>
                    </a>
                </div>
                <div class="flex space-x-4 items-center">

                    <a href="http://localhost:5000/profile.html?" class="hover:text-gray-600 text-gray-900">Add Journal</a>
                    <a href="http://localhost:5000/journals" class="hover:text-gray-600 text-gray-900">My Journals</a>
                    <button id="logout">Logout</button>
                    <img class="flex h-12 rounded-full" id="user-image" />
                   

                </div>
            </div>
        </div>
    </nav>

      */