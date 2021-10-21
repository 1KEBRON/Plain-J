//jshint esversion:6
const express = require("express");
const mongoose = require("mongoose")
const ejs = require("ejs");
const _ = require('lodash');
const { each } = require("lodash");
const { query } = require("express");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express();

mongoose.connect('mongodb://localhost:27017/PlainJournalDB',{useNewUrlParser:true,useUnifiedTopology:true});

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// TO SAVE with MONGODB
// 2. make a scema composing post
const contentSubmitionSchema = {
  tittle : String,
  content: String
}
const feedPostSchema = {
  name:String,
  posts:[contentSubmitionSchema]
}
// 3. Make a db model from the scema 
const Content = mongoose.model("Content",contentSubmitionSchema);

// 5. Save it


let composePosts = []
app.get('/',(req,res)=>{
  Content.find({},(err,dataFound)=> {
    if(err){
      console.log(err)
    }else{
       res.render("home",{headerTitles:dataFound,contents:dataFound})
    }
  })

})
app.get('/posts/:title',(req,res)=>{
  let requestedTitle = req.params.title
  for(let i = 0; i < composePosts.length; i++){
    if(_.lowerCase(requestedTitle)  ==_.lowerCase(composePosts[i].title)){
      res.render('post',{postTitle:composePosts[i].title, postContent:composePosts[i].content})
  }
  }
  
})

app.get('/about',(req,res)=>{
  res.render("about",{headerTitle:'About',content:aboutContent})

})
app.get('/contact',(req,res)=>{
  res.render("contact",{headerTitle:'Contact',content:contactContent})
})

app.get('/compose',(req,res)=>{
  res.render("compose")
})
app.post('/compose',(req,res)=>{
   let contentTitle = req.body.contentTitle 
   let submitedContent = req.body.submitedContent
   const postNewContent = new Content({
     title:contentTitle,
     content:submitedContent
   })
   postNewContent.save()
   res.redirect('/')
   
})












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
