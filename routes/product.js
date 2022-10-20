const Product = require("../models/Product");


const router = require("express").Router();
//CREATE PRODUCT
router.post("/create", async (req, res) => {   
  try {
    
    const newUser = new Product({
    title:req.body.title,
    desc: req.body.desc,
    source: req.body.source,
    destination: req.body.destination,
    despature: req.body.despature,
    arrival: req.body.arrival,
    price: req.body.price,
    img: req.body.img,
    timeinverval:req.body.timeinterval
    
    })

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;