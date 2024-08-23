const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogpost_schema = new Schema(
    {
        title : {
            type : String,
            required : true
        },
        content : {
            type :String,
            required : true
        },
        sector : {
            type : String,
            required : true
        },
        author : {
            type : String,
            required : true
        }
    }, {timestamps : true}
)

// collection
const collectionName = 'blogpostCollection';
// creating a model
const Blogpost_model = mongoose.model('Blogpost', blogpost_schema, collectionName);

module.exports = Blogpost_model;
