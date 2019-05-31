var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  prod_name:{type: String},
  prod_desc: {type: String},
  prod_price: {type: Number},
  updated_at: { type: Date, default: Date.now },
  prod_img: {type: String}
});

module.exports = mongoose.model('Product', ProductSchema,"products");
