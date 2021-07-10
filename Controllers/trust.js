const trust = require('../Models/trust');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const validateRegister2Input = require('../validation/register1');
const validateLoginInput = require('../validation/login');
const validateRestPassword = require('../validation/resetPassword');

const nodemailer = require('nodemailer');
const crypto = require('crypto');

/// Inserting SignUp 
exports.signUp =(req, res) => {

    //Form vaildation
    const { errors, isValid } = validateRegister2Input(req.body)

    ///check vaildation

    if(!isValid) {
        return res.status(400).json(errors)
    }

    trust.findOne({ email: req.body.email }).then(returnedStuff => {
        if(returnedStuff) {
            return res.status(400).json({email: "Email already exist!!!"})
        }
    });

    // saving user with request information to database
	const {trustProof_id, firstName, lastName, department,email,phoneNumber,designation, userName, selectedFile,password } = req.body;

	const signuptrust = new trust({
		firstName : firstName,
        lastName : lastName,
        phoneNumber : phoneNumber,
        email : email,
        trustProof_id : trustProof_id,
		designation:designation,
		department : department,
        userName : userName,
		password : password,
		selectedFile : selectedFile,
	});

    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(signuptrust.password, salt, (err, hash) => {
            if(err) throw err;
            signuptrust.password = hash;
            signuptrust.save().then(trust => res.json(trust)).catch(err => console.log(err));
        });
    });

};


exports.login =(req, res) => {

    //what happens
    const {errors, isValid} = validateLoginInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const email = req.body.email;
    const password = req.body.password;

    trust.findOne({ email: email }).then(trust => {

        //check if user exists
        if(!trust){
            return res.status(404).json({messdepartment: "Email not found"});
        }

        //check password
        bcrypt.compare(password, trust.password).then(isMatch => {
            if(isMatch){
                //user matched
                //create JWT payload

                const payload ={ id: trust.trust_id, date: trust.date_time, firstName: trust.firstName, email: trust.email, phone: trust.phoneNumber, department: trust.department, designation: trust.designation, username: trust.userName};

                //sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey2,
                    {expiresIn: 3600},
                    (err, token) => {
                    res.json({ success: true, token: "Bearer" + token, payload});
                });

                
            } else {
                return res
                .status(400)
                .json({ message: "Password Incorrect"})
            }
        });
    });
};

exports.forgotPassword = async (req, res) => {
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        trust.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                const transporter = nodemailer.createTransport( {
                      service: 'gmail',
                      auth: {
                        user: 'gantalaavinash2001@gmail.com',
                        pass: 'Hackers@2001'
                      }
                    });
                    var mailOptions = {
                    to: req.body.email,
                    from:"gantalaavinash2001@gmail.com",
                    subject:"password reset",
                    html:`
                    <h2>'You are receiving this because you (or someone else) have requested the reset of the password for your account.</br> Please click on the following link, or paste this into your browser to complete the process'</h2>
                    <a style="background-color: #f44336; color: white; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block;" href=https://www.docbot.in/covidPatChangePassword/${token}>Reset Password</a>
                    `
                    };
                    transporter.sendMail(mailOptions, function(error, info) {
                        if(error) {
                            console.log(error);
                        }
                        else {
                            console.log('Email sent:' + info.response)
                        }
                      });
                res.json({message:"check your email"})
            })

        })
    })
}

exports.resetpassword = (req,res)=>{
    //form validation
    const { errors, isValid } = validateRestPassword(req.body)

    const newPassword = req.body.password
    const sentToken = req.body.token
    trust.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newPassword,salt).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = ''
           user.expireToken = ''
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
        })
    }).catch(err=>{
        console.log(err)
    })
}




