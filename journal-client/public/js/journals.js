let userData = "";
let userJournals = "";
document.getElementById('logout').addEventListener('click', LogoutUser);
let navBarImg = document.getElementById("user-image");
let divContainer = document.getElementById("divContainer");






const firebaseConfig = {
      // Add config herre
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

            setJsonData(user.uid)
            //userName.innerText = "Welcome " + userData.displayName;

            
          } else {
            console.log("fetching user info failed");

          }
        })



function setJsonData(userId){
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch("http://localhost:4000/api/userdata/" + userId, requestOptions)
    .then(response => response.text())
    .then(result => addToTable(result))
    .catch(error => console.log('error', error));

    

}

function addCardToDiv(name, content, date){
    let classDiv = document.createElement("div");
    classDiv.className = "card";
    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";
    let titleText = document.createElement("h5");
    titleText.className = "card-title";
    titleText.innerText = date;
    cardBodyDiv.appendChild(titleText)
    let innerContent = document.createElement("h6");
    innerContent.className = "card-subtitle mb-2 text-muted";
    innerContent.innerText = name;
    cardBodyDiv.appendChild(innerContent);
    let journal = document.createElement("p");
    journal.className = "card-text";
    journal.innerText = content;
    cardBodyDiv.appendChild(journal);
    classDiv.appendChild(cardBodyDiv);
    divContainer.appendChild(classDiv);
    
}

function addToTable(results){
    results = JSON.parse(results)
    console.log("RES ", results)
    for (var key in results) {
    addCardToDiv(results[key].JournalName, results[key].JournalContent, results[key].timestamp)
}

}






function myFunction() {
    var input, filter, cards, cardContainer, h5, title, i;
    input = document.getElementById("myFilter");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("myItems");
    cards = cardContainer.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-body h5.card-title");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}


