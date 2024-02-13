const express = require("express");
const mongoose = require("mongoose");
const BlogDets = require("./models/blog");

const app = express();

const dataBaseURL =
  "mongodb+srv://envy:envy1234@cluster0.xlu81bx.mongodb.net/blogDets";
mongoose
  .connect(dataBaseURL)
  .then((result) => {
    app.listen(4000, () => {
      console.log("Conntected to database and Server running at port 4000....");
    })
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  BlogDets.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", {
        title: "Homepage",
        head: "LetsBlog",
        blogs: "Click to Create  your own Blog",
        details: result,
      });
      // console.log(result);
    });
});

app.post('/', (req,res)=> {
  const blogDets = new BlogDets(req.body);
  blogDets.save()
  .then(result => {
    res.redirect('/');
  })
  .catch(err => {
    console.log(err);
  })
})

app.get("/create-blog", (req, res) => {
  res.render("createBlog", {
    title: "Create Blogs",
    head: "Create Your Own",
    blogs: "Blogs",
  });
});
app.get("/insert", (req, res) => {
  const blogDets = new BlogDets({
    title: "One piece",
    snippet: "About Monkey D luffy",
    body: "One"
  });
  blogDets
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
app.get("/blogs/:id", (req, res) => {
  // console.log(req.params.id);
  const id = req.params.id;
  BlogDets.findById(id)
    .then((result) => {
      res.render("details", {
        title: "Blogs",
        head: "Blog",
        blogs: "Details",
        details: result,
      });
    })
    .catch((err) => console.log(err.message));
});

app.delete('/blogs/:id', (req,res)=> {
  const id = req.params.id;
  BlogDets.findByIdAndDelete(id)
  .then(result => {
    res.json({redirect: '/'});
  })
  .catch(err => {
    console.log(err);
  })
})

app.use((req, res) => {
  res
    .status(404)
    .render("404", { title: "404", head: "404", blogs: "Page Not Found" });
});
