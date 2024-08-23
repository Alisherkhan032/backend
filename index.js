const express = require('express');
const mongoose  = require('mongoose');
// const Blogpost = require('./models/blogModel');
const blogController = require('./Controller/blogController');

const USER_NAME = 'alisherkhan';
const PASSWORD = 'ali123';
const DB_NAME = 'ReactBlogpost';
const DB_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.gdx5cap.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

// creating an app
const app = express();
let port = 3000;

//* creating a mongoDB connection and then only starting our app
mongoose.connect(DB_URI)
    .then(()=>{
        console.log("connected to database");
        app.listen(port, (req,res)=>{
            console.log(`server started on port ${port}`);
        })
    })
    .catch((err)=>{
        console.error('Failed to connect to database', err);
        process.exit(1); // Exit the process with a failure code
    })

app.get('/', (req, res)=>{
    res.send("hello this is index page");
})

// getting all the blogs
app.get('/blogs', blogController.get_all_blogs)

// getting a particular blog
app.get('/blogs/:id', blogController.get_blog_by_id)


//* POST request
app.use(express.json());
app.post('/blogs', blogController.post_blog)

//* DELETE request
app.delete('/blogs/:id', blogController.delete_blog);


//* handle Error
app.use((req,res)=>{
    res.status(404).send("error occured")
})