const express = require ('express')

const router = express.Router()
let pdfFile=('../cri29.pdf')
const test = require ('../parseLaws.js')

const Law = require('../models/Law')

//ROUTES

router.get('/',async (req,res)=>{
    try{
        const laws=await Law.find()

        res.json(laws)
    }catch(err){
        res.json({message:err})

    }
})

router.post('/',async (req,res)=>{
    const law = new Law({
        title:req.body.title,
        participants:req.body.participants,
        sanction:req.body.sanction,
        text:req.body.text,
        date:req.body.date,
    });
    try{
        const saveLaw = await post.save()
        res.json(saveLaw)
    }
    catch(err){
        res.json({message:err})
    }
})

router.get('/:lawId',async (req,res)=>{
    try{const law = await Law.findById(req.params.lawId)
    res.json(law)
    }catch(err){
        res.json({message:err})
    }
})


router.delete('/:lawId', async (req,res)=>{
    try{
        const removedLaw = await Law.remove({_id:req.params.lawId})
        res.json(removedLaw)
    }
    catch(err){
        res.json({message:err})
    }
})
module.exports = router;