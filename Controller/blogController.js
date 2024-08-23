const Blogpost = require('../models/blogModel');

function get_all_blogs(req, res){
    Blogpost.find().sort({ createdAt: -1 })
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.status(500).send("Error fetching blog posts");
    })
}

function get_blog_by_id(req, res){
    const blogId = req.params.id;
    console.log(blogId);
    
    Blogpost.findById(blogId)
        .then((blog)=>{
            if (blog) {
                res.send(blog);
            } else {
                res.status(404).send("Blog post not found");
            }
        })
        .catch((err)=>{
            res.status(404).send(err.message)
        })
}

function post_blog(req,res){
    const data = req.body;
    console.log("data is ", data);
    // making a newBlog using model and data
    const newBlog = new Blogpost(data);

    // storing our data in db
    newBlog.save()
        .then(()=>{
            res.send("blog is saved")
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).send("Error in creating blog")
        })
}

function delete_blog(req,res){
    const blogId = req.params.id;
    Blogpost.findByIdAndDelete(blogId)
        .then((result) => {
            if (result) {
                res.send(`Deleted blog post with ID: ${blogId}`);
            } else {
                res.status(404).send("Blog post not found");
            }
        })
        .catch((err) => {
            console.error('Error deleting blog post:', err);
            res.status(500).send("Error deleting blog post");
        });
}


module.exports = {get_all_blogs, get_blog_by_id, post_blog, delete_blog}