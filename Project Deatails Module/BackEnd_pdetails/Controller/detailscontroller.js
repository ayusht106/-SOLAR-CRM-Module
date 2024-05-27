const {response} =require("express");
const  Details =require("../Model/details");
const { citiesByState, statesList } = require('../constants');


const detail_all=async(req,res) =>{
    const userEmail = req.headers.useremail;
    try{
        const Detail= await Details.find({login_email: userEmail});
        res.json(Detail);
        console.log('ok', response.Detail);
    } catch (error){
        res.json({message : error});
    }
};

const detail_d=async(req,res) =>{
    try{
        const Detail= await Details.findById(req.params.detailId);
        res.json(Detail);
    } catch (error){
        res.json({message : error});
    }
};

const detail_create = async (req, res) => {
    const detail = new Details({
      finance: req.body.finance,
      project: req.body.project,
      tentative: req.body.tentative,
      companyS: req.body.companyS,
      companyc: req.body.companyc,
      login_email:req.body.userEmail
    });
    
    try{
        const saveddetail= await detail.save();
        res.json(saveddetail);
    } catch (error){
        res.json({message : error});
    }
};

const detail_update =async(req,res) =>{
  try{
      const detail =({
      finance:req.body.finance,
      project:req.body.project,
      tentative:req.body.tentative,
      companyS:req.body.companyS,
      companyc:req.body.companyc
  });

  const changes = [];
  console.log("hello");

  
  const a = await Details.findById(req.params.detailId);

  Object.keys(detail).forEach(field => {
      console.log(a[field]);
      console.log(req.body[field]);
      if (a[field] !== req.body[field]) {
          console.log("Changes yes");
          changes.push({
              field,
              oldValue: a[field],
              newValue: detail[field],
              updatedAt: new Date()
          });
      }
  });


  if (changes.length !== 0) {
  const updateddetail = await Details.findByIdAndUpdate(
      { _id:req.params.detailId },
      detail
  );
  updateddetail.changes = [...a.changes, ...changes];
            await updateddetail.save();
             res.json(updateddetail);
  }

  else {
    res.json({ message: 'No changes detected' });
}
} catch (err) {
res.json({ message: err });
}
};

const detail_delete= async (req,res) => {
    try{
        const removedetail = await Details.findByIdAndDelete(req.params.detailId)
        res.json(removedetail);
    } catch(err){
        res.json({ message: err});
    }
};  

    const getCitiesByState = (req, res) => {
        const { state } = req.params;
    console.log({state});
        if (citiesByState.hasOwnProperty(state)) {
        res.json({ cities: citiesByState[state] });
        } else {
        res.status(404).json({ error: 'State not found' });
        }
    };

    const getStates = (req, res) => {
        try {
        res.json({ states: statesList });
        } catch (error) {
        console.error('Error fetching states:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
    };



module.exports = {
    detail_all,
   detail_d,
   detail_create,
   detail_update,
   detail_delete,
   getCitiesByState,
   getStates


}