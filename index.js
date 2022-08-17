const express =require('express');
const app=express();
const path=require('path')
const mongoose=require('mongoose');
const methodOverride=require('method-override')
app.use(methodOverride('_method'))
const Product=require('./models/product');
const { Console } = require('console');
mongoose.connect('mongodb://localhost:27017/farmStand').then(()=>{
    console.log("Database Connected");
})
.catch(err=>{
console.log(err);
})
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
res.render('products/home.ejs')
})
app.get('/products',async (req,res)=>{
    const products=await Product.find({})
   
    res.render('products/index.ejs',{products});
})
app.get('/products/new',(req,res)=>{
    res.render('products/new.ejs')
 })
 app.get('/products/:id/edit',async (req,res)=>{
    const {id}=req.params;
    const product=await Product.findById(id)
    res.render('products/edit.ejs',{product})
 })
 app.get('/products/:id/delete',async (req,res)=>{
    const {id}=req.params;
    const product=await Product.findByIdAndDelete(id)
    res.redirect('/products') 
 })
app.get('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const prod=await Product.findById(id)
    res.render('products/show.ejs',{prod})
})
app.post('/products',async (req,res)=>{
const newprod=new Product(req.body);
await newprod.save();
res.redirect(`/products/${newprod._id}`)
})
app.put('/products/:id',async (req,res)=>{
const {id}=req.params;
const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
res.redirect(`/products/${id}`)
})
app.listen(3000,()=>{
    console.log("Listing...")
})
