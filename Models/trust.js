const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

const TrustSchema = new Schema({
	trust_id:{
		type: Number,
		required:true,
		unique:true
	},
	firstName: {
		type: String,
		required: [true, 'Please add your firstname'],
	},
	lastName: {
		type: String,
		required: [true, 'Please add your lastname'],
	},
	phoneNumber: {
		type: Number,
		required: [false, 'Please add your number'],
	},
	email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
	},
	trustProof_id: {
		type: Number,
		required: true,
	},
	designation:{
		type: String,
		required : false,
	},
	department:{
		type: String,
		required : false,
	},
	userName: {
		type: String,
		required: [true, 'Please add an username'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
	},
	selectedFile:{
		type:String,
	},
	date_time: {
		type: Date, default: Date.now
	},
	resetToken:String,
    expireToken:Date,
});


autoIncrement.initialize(mongoose.connection);
TrustSchema.plugin(autoIncrement.plugin, {
  model: "trust", // collection or table name in which you want to apply auto increment
  field: "trust_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});



module.exports = mongoose.model('trust', TrustSchema);