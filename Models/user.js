const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const autoIncrement = require("mongoose-auto-increment");

const UserSchema = new Schema({
	user_id:{
		type: Number,
		required:true
	},
	
	firstName: {
		type: String,
		required: [true, 'Please add your firstname'],
	},
	lastName: {
		type: String,
		required: [false, 'Please add your lastname'],
	},
	phoneNumber: {
		type: Number,
		required: [false, 'Please add your Phone'],
	},
	email: {
		type: String,
		required: [true],
		unique: true,
	},
	userName: {
		type: String,
		required: [true],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please add a password']
	},
	accntStatus: {
		type: String,
		default: "verified"
	},
	selectedFile:{
		type:String,
	},
	date_time: {
		type: Date, default: Date.now
	},
	is_active: {
		type: Boolean,
		default: false
	},
	resetToken:String,
    expireToken:Date,
});

autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, {
  model: "users", // collection or table name in which you want to apply auto increment
  field: "user_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});


module.exports = mongoose.model('users', UserSchema);