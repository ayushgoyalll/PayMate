
const express = require('express');
const zod = require("zod");
const  { authMiddleware } = require("../middlewares");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');

const {User,Account} = require("../root/db");
const signupSchema = zod.object({
    username: zod.string().email(),
    password:zod.string(),
    firstname:zod.string(),
    lastname:zod.string()
})
router.post("/signup",async (req,res) =>
{
    const body = req.body;
    console.log(body);
    const data = signupSchema.safeParse(body);
    console.log(data);
    if(!data.success)
    {
        return res.json({
            message:"email already taken/incorrect inputs"
        })
    }
    console.log("finding the user");
    const user = await User.findOne({
        username:body.username
    })
    console.log("user does not  exist");
    if(user){
        return res.json({
            message:"email already taken"
        })
    }
    console.log("creating the user");
    try{
    const dbUser =await User.create(body);
    const userId =dbUser._id;
    await Account.create({
        userId,
        balance: Math.round(1 + Math.random() * 10000)
    })
    console.log("generating the token");

    const token = jwt.sign({
        userId: dbUser._id
    },JWT_SECRET);
    console.log("output:");

    return     res.json({
            message:"user created successfully",
            token: token
        })

    }
    catch(error){
           console.log(error);
           return res.json({err:error});
    }
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})


// make a get request that will take the token from the frontend, and will send userid and name along

router.get("/getName",authMiddleware,async(req,res)=>{
 try{
   const user = await User.findOne({
        _id:req.userId
    })
    if(!user){
        return res.json({userId:-1});
    }
    return res.json({userId:req.userId,username:user.firstname});

}
catch(e){
    console.log(error);
    return res.json({err:error});
}

})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token,
            name:user.firstname
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})
const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/update", authMiddleware, async (req, res) => {
    console.log(req.body);
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter, "$options": "i"
            }
        }, {
            lastname: {
            "$regex": filter, "$options": "i"
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})


module.exports = router;