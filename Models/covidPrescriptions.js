const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const PrescriptionSchema = new Schema(
    {
        covpres_id:{
            type: String,
            required: true
        },
        info:[
            {
                medicineName:{
                    type:String,
                    
                },
                time:[
                    {
                    type:String,
                    }                    
                ],
                amount:{
                    type:String,
                    
                },
                quantity:{
                    type:String,
                    
                }
            }],
        patient:[
           {
                copat_id:{
                   type:String,
                   
               },
               pat_name:{
                   type:String,
                   
               }
           }],
        doctor:[
            {
                doc_id:{
                    type:String,
                    
                },
                doc_name:{
                    type:String,
                    
                }
            }]
    }
)

autoIncrement.initialize(mongoose.connection);
PrescriptionSchema.plugin(autoIncrement.plugin, {
  model: "coviprescriptions", // collection or table name in which you want to apply auto increment
  field: "covpres_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model('coviprescriptions', PrescriptionSchema);