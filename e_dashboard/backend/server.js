const express = require("express");
require("./db/config");
const User = require("./db/User");
const Product=require("./db/Product");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result=result.toObject();
  delete  result.password
  res.send(result);
});
app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body).select("-password");
  if (req.body.password && req.body.email) {
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "no result" });
    }
  } else {
    res.send({ result: "error" });
  }
});
app.post("/add-product",async (req,res)=>{
  let product=new Product(req.body);
  let result=await product.save();
  res.send(result);
});
app.get("/products",async (req,res)=>{
  let products=await  Product.find();
  if(products.length>0){
    res.send(products)
  }
  else{
    res.send({result:"no products found"})
  }
})

app.delete("/product/:id",async (req,res)=>{
  const result=await Product.deleteOne({_id:req.params.id})
  res.send(result);
})

app.get("/product/:id",async(req,res)=>{
  const result=await Product.findOne({_id:req.params.id});
  if(result)
  {
    res.send(result);
  }
  else{
    res.send({result:"No Record Found."});
  }
})

app.put("/product/:id",async(req,res)=>{
  let result=await Product.updateOne(
    {_id: req.params.id},
    {
      $set:req.body
    }
  )
  res.send(result)
})
app.get("/search/:key",async(req,res)=>{
  let result=await Product.find({
    "$or":[
      {name:{$regex:req.params.key}},
      {company:{$regex:req.params.key}}
      
    ]
  })
  res.send(result);
})
app.listen(5000);