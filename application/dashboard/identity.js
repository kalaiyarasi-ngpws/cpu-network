'use strict';
const fs = require('fs');
const {Wallets} = require('fabric-network');
async function main(org){
    try {
        // const filePath = process.env.WALLET_PATH;
        // checking for wallet path
        // errorHandler(filePath,"File path not defined");
        const certPath = process.env.CERTPATH;
        // checking cert path
        errorHandler(certPath,"Certificate path not defined");
        const keyPath = process.env.KEYPATH;
        // checking key path
        errorHandler(keyPath,"Key path not defined");
        //Getting cert
        const cert = fs.readFileSync(certPath);
        //Getting key
        const key = fs.readFileSync(keyPath);
        //Creating wallet
        let createIdentity = process.env.IDENTITYPATH;
        const wallet = await Wallets.newFileSystemWallet(`${createIdentity}_${org}`);
        console.log("Plain wallet created!!")
        //Creating identity
        const identity = {
            credentials:{
                certificate: Buffer.from(cert).toString(),
                privateKey: Buffer.from(key).toString(),
            },
            mspId: org+"MSP",
            type: 'X.509',
        }
        // storing the identity
        await wallet.put(org,identity)
        console.log("Identity Created!!")
    } catch (error) {
        console.error(error)
        return error
    }
}
function errorHandler(value,message){
    if (value == undefined ){
        throw new Error(message);
    }
}
main("ngp").then(()=> console.log("Done!")).catch(e => console.error(e));