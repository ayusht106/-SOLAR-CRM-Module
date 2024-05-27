const mongoose =require('mongoose');

const DetailsSchema= new mongoose.Schema({
    finance:String,
    project:String,
    tentative:String,
    companyS:String,
    companyc:String,

    login_email:String,
    changes: [{
        field: String,
        oldValue: String,
        newValue: String,
        updatedAt: Date,
    }]
},{
    versionKey: false
});

module.exports =mongoose.model("Details",DetailsSchema);