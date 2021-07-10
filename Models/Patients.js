const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const autoIncrement = require("mongoose-auto-increment");

const PatientSchema = new Schema({
	pat_id:{
		type:Number,
		required:true,
		unique:true
	},
	
	fullName: {
		type: String,
		required: [true, 'Please add your fullname'],
	},
    email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
	},
    phoneNumber: {
		type: Number,
		required: [true, 'Please add your number'],
	},
    password: {
		type: String,
		required: [true, 'Please add your number'],
	},
	selectedFile:{
		type:String,
	},
	info:[
		{
			dev_id:{
				type:String,
				required:false
			}
		}
	]
});


autoIncrement.initialize(mongoose.connection);
PatientSchema.plugin(autoIncrement.plugin, {
  model: "patients", // collection or table name in which you want to apply auto increment
  field: "pat_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});
/* 
PatientSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);
});

PatientSchema.methods.matchPassword = async function (enteredPass) {
	return await bcrypt.compare(enteredPass, this.password);
};
 */

module.exports = mongoose.model('patients', PatientSchema);