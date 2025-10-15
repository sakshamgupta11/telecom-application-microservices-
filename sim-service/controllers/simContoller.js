import express from 'express';


const simController = (req,res)=>{
    try {
        res.status(200).json({msg:"welcome to sim service bro"})
    } catch (error) {
        console.log(error);
        
    }
}
export default simController