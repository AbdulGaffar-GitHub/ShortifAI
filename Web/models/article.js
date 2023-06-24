const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 //const autoIncrement = require('mongoose-auto-increment');
//autoIncrement.initialize(mongoose.connection);

const ArticleSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  source_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  top_image: {
    type: String
  },
  description: {
    type: String
  },
  video_url: {
    type: String
  },
  pub_date: {
    type: Date
  },
  category: {
    type: String
  },
  unique_id:{
    type:String,
    required:true
},
  content: {
    type: String
  },
},{ timestamps: true }
);

//articleSchema.plugin(autoIncrement.plugin, { model: 'article', field: 'index' });

module.exports=Article=mongoose.model('Article',ArticleSchema)
