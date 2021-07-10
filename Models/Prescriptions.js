const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema(
    {
        pres_id:{
            type: String,
            required: true,
        },
        info:[
            {
                medicineName:{
                    type:String,
                    required:true
                },
                procedure:{
                    type:String,
                    required:true
                },
                amount:{
                    type:String,
                    required:true
                },
                quantity:{
                    type:String,
                    required: true
                }
            }
        ],
        patient:[
           {
               pat_id:{
                   type:String,
                   required: true
               },
               pat_name:{
                   type:String,
                   required:true
               }
           }
        ],
        doctor:[
            {
                doc_id:{
                    type:String,
                    required:true
                },
                doc_name:{
                    type:String,
                    required:true
                }
            }
        ],
        hospital:[
            {
                hos_id:{
                    type:String,
                    required:true
                },
                hos_name:{
                    type:String,
                    required:true
                }
            }
        ]
    }
)

module.exports = mongoose.model('prescriptions', PrescriptionSchema);