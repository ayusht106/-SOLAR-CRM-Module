const { response } = require("express");
const User = require("../Model/User");

const registers = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ Email: email });

        if (existingUser) {
            return res.status(400).send("User already registered");
        }
        else{
        const newUser = new User({
            Name: req.body.Name,
            Email: req.body.Email,
            Password: req.body.Password
        });

        const savedUser = await newUser.save();
        res.send(savedUser);
    }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logins = async (req, res) => {
    const email=req.body.Email;
    const password= req.body.Password;

    try {
        const user = await User.findOne({ Email: email });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        if (password === user.Password) {
            return res.send({ message: "Login Successful", user: user });
        } else {
            return res.status(401).send({ message: "Incorrect Password" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



module.exports = {
    registers,
    logins
}
