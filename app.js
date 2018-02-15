var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	methodOverride = require("method-override")

// Mongo Config
mongoose.connect("mongodb://localhost/gurbani_app");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));


// Mongoose/ Model config 

var KirtanSchema = new mongoose.Schema({
	title: String,
	image: String,
	mp3Link: String,
	description: String
});


var Kirtan = mongoose.model("Kirtan", KirtanSchema);

// Kirtan.create({
// 	title: "Waheguru Simran",
// 	image: "https://i.ytimg.com/vi/CH1H5uMFa5o/maxresdefault.jpg",
// 	mp3Link: "https://s3-us-west-1.amazonaws.com/sadhsangatkirtan/20161225+025819.m4a",
// 	description: "Kirtan"
// })

app.get("/", function(req, res){
	res.render("home");
});

app.get("/kirtan", function(req, res){
    Kirtan.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("kirtan", {KirtanFile:blogs});
        }
    })
})

app.get("/nitnem", function(req, res){
	res.render("nitnem")
});


app.listen(3500, function(){
	console.log("Gurbani App is up at port 3500!");
});


