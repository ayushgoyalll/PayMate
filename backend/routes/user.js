
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
    const user = await User.findOne({
        username:body.username
    })
    if(user){
        return res.json({
            message:"email already taken"
        })
    }
    try{
    const dbUser =await User.create(body);
    const userId =dbUser._id;
    await Account.create({
        userId,
        balance: Math.round(1 + Math.random() * 10000)
    })

    const token = jwt.sign({
        userId: dbUser._id
    },JWT_SECRET);

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
            token: token
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


module.exports = router;