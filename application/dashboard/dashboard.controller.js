'use strict';
const gateway = require('./gateway');
const os =  require('os');

const history = async(req,res)=>{
    let org = req.body.org;
    let assetName = req.body.assetName;
    try {
        let cpus = os.cpus()
        console.log("getting contract");
        let contract = await gateway.getContract(org);
        console.log('submitting tx');
        let asset = await contract.submitTransaction('GetHistory',assetName);
        return res.send(JSON.parse(asset.toString()));
    } catch(err){
        console.log(err);
        return res.send(err);
    } finally {
        gateway.disconnect();
    }
    
}

const addcpu = async(req,res)=>{
    let org = req.body.org;
    let assetName = req.body.assetName;
    try {
        let contract = await gateway.getContract(org);
        console.log("Submitting the TX");
        let buffer = await contract.submitTransaction('AddCPU',assetName);
        let asset =JSON.parse(buffer.toString());
        return res.send(asset);
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }finally{
        gateway.disconnect();
    }
}

const getusage = async(req,res)=>{
    let org = req.body.org;
    let assetName = req.body.assetName;
    try {
        console.log("getting contract");
        let contract = await gateway.getContract(org);
        console.log('submitting tx');
        let asset = await contract.submitTransaction('GetUsage',assetName);
        console.log(JSON.parse(asset.toString()));
        return res.send(JSON.parse(asset.toString()));
    } catch(err){
        console.log(err);
        return res.send(err);
    } finally {
        gateway.disconnect();
    }
}

const addusage = async(req,res)=>{
    let org = req.body.org;
    let assetName = req.body.assetName;
    let val1 = req.body.val1;
    let val2 = req.body.val2;
    try {
        console.log("getting contract");
        let contract = await gateway.getContract(org);
        console.log('submitting tx');
        let asset = await contract.submitTransaction('AddUsage',assetName,val1,val2);
        // console.log(JSON.parse(asset.toString()));
        return res.send(JSON.parse(asset.toString()));
    } catch(err){
        console.log(err);
        return  res.send(err);
    } finally {
        gateway.disconnect();
    }
}

const getendorsers = async(req,res)=>{
    let org = req.body.org;
    let mspId = req.body.mspId;
    try{
        console.log('getting endorser');
        let endorsers = await gateway.getEndorsers(org,mspId);
        return res.send(endorsers);
    }catch(err){
        console.log(err);
        return  res.send(err);
    } finally {
        gateway.disconnect();
    }
}

export{
    history,
    addcpu,
    addusage,
    getusage,
    getendorsers
}