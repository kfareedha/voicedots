const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserModel = require('../Models/userModel');
// const accountSid = "AC59d5f04d351ff8916e6ede90bd445557"
// const authToken = "6df098f756065c5e551a3ca939b35e30"
const accountSid = process.env.accountSID
const authToken = process.env.authToken
const servicesid = process.env.serviceID
const client = require('twilio')(accountSid, authToken);
const env = require('dotenv').config()


module.exports={
    userCheck:(email)=>{
        console.log(email);
        return new Promise(async(resolve,reject)=>{
            let user = await UserModel.findOne({email})
            let status = {
                check:false
            }
            if(user){
                status.check=true
                status.user=user
                resolve(status)
            }else{
                resolve(status)
            }
        })

    },
    checkMobile:(mobile)=>{
        return new Promise(async(resolve,reject)=>{
            let user = await UserModel.findOne({mobile})
            console.log(user)
            let status = {
                check:false
            }
            if(user){
                status.check=true
                status.user=user
                resolve(status)
            }else{
                resolve(status)
            }
        })
    },  
sendOtp: (mobile) => {
                    console.log(mobile)
                    return new Promise((resolve, reject) => {
                        client.verify.v2.services(servicesid )
                            .verifications
                            .create({ to: '+91' + mobile, channel: 'sms' })
                            .then(verification => {
                                console.log(mobile);
                                console.log(verification.status)
                                resolve(verification)
                            });
                    })
            
                },
                verifyOtp: (otp, mobile) => {
                    return new Promise((resolve, reject) => {
                        client.verify.v2.services(servicesid )
                            .verificationChecks
                            .create({ to: '+91' + mobile, code: otp })
                            .then((verification_check) => {
                                console.log(verification_check.status)
                                resolve(verification_check.status)
                            });
                    })
                }
            }