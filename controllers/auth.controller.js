const User = require("../models/User");
const bcrypt = require("bcryptjs");
const appError = require("../utiles/errors");
const status = require("../utiles/status");
const GenJWT = require("../utiles/generateJWT");
const asyncWrapper = require("../middlewares/asyncWrapper");

const register = asyncWrapper(async (req, res, next) => {
    try {
        console.log('Request Body:', req.body);
        const { userName, email, password, userCountry, userCity, userAddress,phone ,Gender } = req.body;

        let errors = [];

        if (!userName) 
            {
                console.log("userName is required");

                errors.push("userName is required");
            }
        if (!email){
            console.log("email is required");
            errors.push("email is required");
        }
            
        if (!password) {
            console.log("password is required");
            errors.push("Password is required");
        }

        if (errors.length > 0) {
            throw appError.create(errors.join(", "), 400, status.FAIL);
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            console.log("found user");
            throw appError.create("User already exists", 400, status.FAIL);
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
            email,
            phone,
            password: hashedPass,
            userPic: req.file ? req.file.filename : undefined,
            userCountry,
            userCity,
            userAddress,
            Gender
        });

        const token = await GenJWT({ 
            email: newUser.email,
            id: newUser._id,
            isAdmin: newUser.isAdmin 
        });

        await newUser.save();
        console.log("done user");

        res.status(201).json({ status: status.SUCCESS, data: newUser, token });

    } catch (err) {
        console.log("laghini alatol");
        next(err);
    }
});

const login = asyncWrapper(async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;

        if ((!email && !userName) || !password) {
            throw appError.create("Email or username and password are required", 400, status.FAIL);
        }

        let user;
        if (email) {
            user = await User.findOne({ email: email });
        } else if (userName) {
            user = await User.findOne({ userName: userName });
        }

        if (!user) {
            throw appError.create("User not found", 400, status.FAIL);
        }

        const matchedPassWord = await bcrypt.compare(password, user.password);
        if (matchedPassWord) {
            const token = await GenJWT({ email: user.email, id: user._id, isAdmin: user.isAdmin });
            return res.json({ status: "Success", data: { user }, token });
        } else {
            throw appError.create("Password is wrong", 400, status.FAIL);
        }

    } catch (err) {
        console.log("لو ده ظهر لغيني علطول يعم");
        next(err);
    }
});

module.exports = {
    register,
    login
};
