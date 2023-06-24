const mongoose = require('mongoose');
 const autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(mongoose.connection);

const sourceSchema = new mongoose.Schema({
  source_id: {
    type: String,
    required: true
  },
  unique_id:{
    type:String,
    required:true
}
},{ 
  timestamps: true 
});

// sourceSchema.plugin(autoIncrement.plugin, { model: 'source', field: 'index' });

const source = mongoose.model('source', sourceSchema);

module.exports = source;
