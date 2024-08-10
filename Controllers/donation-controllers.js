const Donation = require('../db/Models/Donation');
const User = require('../db/Models/User')

const createDonation = async( req,res,next) =>{


    const {description,condition,imageUrl,donationCategory,quantity} = req.body;
    try {
        const {id} = req.user;

        const {donorId} = req.params;

      if(id !== donorId){
        return next({message:"Unauthenticated User",extraDetails:"User not authorized", status:401})
      }
      
      const donorData = await User.findById(id);
      const {address} = donorData;
    
       const newDonation = new Donation({
          donorId,
          description,
          pickUpAddress: address,
          condition,
          imageUrl,
          quantity,
          donationCategory
       })

       if(!newDonation) return next({message:"Something went wrong",extraDetails:"Please! Try again ",status:400})
      await newDonation.save();

       return res.json({message:"Donation created Successfully",donation: newDonation})

    } catch (error) {
      console.log(error)
      return  next({message:"Failed to create donation",extraDetails:"Error from backend",status:500})
    }
}




const getAllDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });

    if (donations.length === 0) {
      return res.status(404).json({ message: "No donations found" });
    }

    return res.json(donations);
  } catch (error) {
    return next({
      message: "Failed to get the donations",
      extraDetails: "Error From Backend",
      status: 500,
    });
  }
};


const getDonationById = async (req,res,next) =>{

  try {
    
    const {id} = req.params;
    
    const donationData = await Donation.findById(id);

    if(!donationData){
      return next({message:"Donation not found",status:404,})
    }

    return res.json(donationData)
  } catch (error) {
    
    console.log(error);
    return next({message:"Failed to get Donation data",message:500})
  }
}

const updateDonationStatus = async (req,res,next) =>{

 try {

  const {donationId} = req.params

   const getDonationInfo = await Donation.findById(donationId);

   if(!getDonationInfo){
    return next({message:"Donation not found",status:404})
   }

   console.log(getDonationInfo);
  
  return res.json("Hello");
  
 } catch (error) {
  
 }
}
module.exports = { createDonation, getAllDonations, getDonationById, updateDonationStatus}
