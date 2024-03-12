const jwt  = require("jsonwebtoken")
const profileModel = require("../model/profileModel")

exports.createProfile =(req,res)=>{

        let reqBody  = req.body 
        profileModel.create(reqBody ).then((result)=>{

                res.status(201).json({status:'success', data:result})
        }).catch((err)=>{
            res.status(404).json({status:err})
        })

}

exports.userLogin =(req,res)=>{
    let userName = req.body['userName']
    let password = req.body['password']
    profileModel.find({userName:userName,password:password}).then((result)=>{
        if(result.length>0){
            let payload = {exp:Math.floor(Date.now()/1000)+(24*60*60),data:result[0]}
            let token = jwt.sign(payload , 'abc-xyz-10')
            res.status(201).json({status:'success', token:token,data:result[0]})
        }else{
            res.status(401).json({status:'unauthorized'})
        }

    }).catch((err)=>{
        res.status(404).json({status:err})
    })
}

exports.selectProfile=(req,res)=>{

    let userName = req.headers['username']
    profileModel.find({userName:userName}).then((result)=>{
            res.status(201).json({status:'success',data:result})
    }).catch((err)=>{
        res.status(404).json({status:err})
    })

}

exports.profileUpdate =(req,res)=>{

    let userName = req.headers['username']
    let reqBody = req.body
    profileModel.updateOne({userName:userName},reqBody).then((result)=>{
        res.status(201).json({status:'success',data:result})
    }).catch((err)=>{
        res.status(404).json({status:err})
    })

}

