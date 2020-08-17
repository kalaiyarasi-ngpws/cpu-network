'use strict';
const fs = require('fs');
const yaml = require('js-yaml')
const {Wallets,Gateway} = require('fabric-network');
let gateway;

async function getChannel(org){
    try {
        console.log("Getting wallet")
        let createIdentity = process.env.IDENTITYPATH;
        const wallet = await Wallets.newFileSystemWallet(`${createIdentity}_${org}`);
        //Getting user
        const identity = await wallet.get(org);
        errorHandler(identity,"IDENTITY not present")
        //Getting ccp
        console.log("Getting ccp")
        const ccpPath = process.env.CCPPATH
        errorHandler(ccpPath,"CCP path not defined")
        const ccp = yaml.safeLoad(fs.readFileSync(ccpPath));
        errorHandler(ccp,"CCP is not defined")
        //Getting gateway
        console.log("Getting gateway")
        gateway = new Gateway();
        await gateway.connect(ccp, { wallet , identity: org, discovery: { enabled: false, asLocalhost: true } });
        //Getting the channel
        console.log("Getting channel")
        const network = await gateway.getNetwork('cpuchannel');
        return network;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function getContract(org){
    try {
        console.log("Getting wallet")
        let createIdentity = process.env.IDENTITYPATH;
        const wallet = await Wallets.newFileSystemWallet(`${createIdentity}_${org}`);        //Getting user
        const identity = await wallet.get(org)
        errorHandler(identity,"IDENTITY not present")
        //Getting ccp
        console.log("Getting ccp")
        const ccpPath = process.env.CCPPATH
        errorHandler(ccpPath,"CCP path not defined")
        const ccp = yaml.safeLoad(fs.readFileSync(ccpPath));
        errorHandler(ccp,"CCP is not defined")
        //Getting gateway
        console.log("Getting gateway")
        gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: org, discovery: { enabled: false, asLocalhost: true } });
        //Getting the channel
        console.log("Getting channel")
        const network = await gateway.getNetwork('cpuchannel');
        //Getting the contract
        console.log("Getting contract")
        const contract = network.getContract('cpu');
        return contract;
    } catch (error) {
        console.error(error);
        return error;
    }
}
function errorHandler(value,message){
    if (value == undefined ){
        throw new Error(message);
    }
}
function disconnect(){
    console.log("Disconnecting...");
    gateway.disconnect();
}

async function getEndorsers(org,mspId){
  try{
  let identity = process.env.IDENTITYPATH
    let connectionProfile = process.env.CCPPATH    
    const wallet = await Wallets.newFileSystemWallet(`${identity}_${org}`);
    const fabricUserName = org;
    const ccp = yaml.safeLoad(fs.readFileSync(connectionProfile));
    let connectionOptions = {
        wallet : wallet,
        identity: fabricUserName,
        discovery: { enabled: true, asLocalhost: true},
      };
    gateway = new Gateway();
    await gateway.connect(ccp,connectionOptions);
    const network = await gateway.getNetwork('cpuchannel');
    const channel = await network.getChannel();
    return channel.getEndorsers(mspId);
  }catch (error) {
    console.error(error);
    return error;
}
}
module.exports.getContract = getContract;
module.exports.getChannel = getChannel;
module.exports.disconnect = disconnect;
module.exports.errorHandler = errorHandler;
module.exports.getEndorsers = getEndorsers;
