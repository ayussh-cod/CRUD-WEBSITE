const mongoose=require('mongoose');
const Product=require('./models/product');
mongoose.connect('mongodb://localhost:27017/farmStand').then(()=>{
    console.log("Database Connected");
})
.catch(err=>{
console.log(err);
})
const seedProducts=[
    {
        name:'Ruby GrapeFruit',
        price:1.99,
        category:'fruit'   
    },
    {
        name:'Oragic Goddess Melon',
        price:4.99,
        category:'fruit'
    },
    {
        name:'Oragnic Celery',
        price:1.50,
        category:'vegetable'

    }
]
Product.insertMany(seedProducts).then(res=>{
    console.log(res);
})
.catch(err=>{
console.log(err);
})