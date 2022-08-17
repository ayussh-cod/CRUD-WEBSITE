const mongoose=require('mongoose');
const productschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        lowercase:true,
        enum:['fruit','vegetable','diary']
    }
   
})
const Product=mongoose.model('Product',productschema)
module.exports=Product;