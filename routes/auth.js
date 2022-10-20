const router = require("express").Router();
const User = require("../models/User");
const bcrypt=require('bcrypt');

//REGISTER
router.post("/register", async (req, res) => {   
  try {
    const emailExist=await User.findOne({email:req.body.email});
 
    if(emailExist)
   
    return res.status(406).send({message:"User with given email already exist"})
    //password hashing
    const hashPassword=await bcrypt.hash(req.body.password,10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword 
    })
  
 
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );
       
        if(!user){
          return res.status(409).json("given username not exist");
          }
          var validPsw = await bcrypt.compare(req.body.password,user.password);
      
        

          if(!validPsw){
            return res.status(409).send({message:"given password not exist"})
        }

        
        const {password,...others} = user._doc;

        res.status(200).json({...others});

    }catch(err){
        res.status(500).json(err);
    }

});


module.exports = router;