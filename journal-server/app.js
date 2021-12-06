const express = require("express");
const app = express();
const PORT = 4000;
const bodyParser = require("body-parser")
const cors = require("cors");
app.use(cors({
  origin:"*"
}))


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

var admin = require("firebase-admin");

var serviceAccount = require("./planner-e3fb9-firebase-adminsdk-p32qo-42310a0916.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://planner-e3fb9-default-rtdb.firebaseio.com"
});

const database = admin.database();

database.ref("/users" + "suman").child("today").set({
    name: "man",
    note : "Today was a tiring day"
})

database.ref("/users" + "sudarshan").set({
    name: "sudarshan",
    note : "Dear diary"
})


app.listen(PORT, () => {
    console.log("listening on port", PORT);
})


app.post("/api/addjournal", (req,res) => {
    console.log("hit")
    console.log("request ", req.body)
    console.log("current date")
    
    let keysCount = Object.keys(req.body).length;
    if (keysCount == 5 ){
        database.ref("/" + req.body.currentUserID).child(req.body.currentDate).set({
        JournalName: req.body.journalName,
        JournalContent : req.body.journalContent, 
        timestamp : req.body.currentDate, 

        })
        res.sendStatus(200)

    } else{
        res.sendStatus(404)
    }
    

})

app.get("/api/userdata/:id", (req,res) => {

    console.log("user id",req.params.id)
    database.ref(req.params.id).on("value", function(snapshot) {
        res.send(snapshot.val())
 
});





    

})