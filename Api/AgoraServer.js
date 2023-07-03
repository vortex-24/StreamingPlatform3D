const https = require('https');
const { default: axios, Axios } = require("axios");
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

require("aws-sdk/lib/maintenance_mode_message").suppress = true;


const appID = process.env.APP_ID;



// exports.agoraServer = (req, res) => {
//     console.log("..........///////////......");
// }


// FOR AUTHORIZATION FIELD
// const keyID = process.env.KEY_ID;
// const secretID = process.env.SECRET_ID;

// const plainCredential = keyID + ":" + secretID;

// const encodedCredential = Buffer.from(plainCredential).toString('base64');

// const authorizationField = "Basic " + encodedCredential;

// const options = {
//     hostname: 'api.agora.io',
//     port: 443,
//     path: '/dev/v1/projects',
//     method: 'GET',
//     headers: {
//         'Authorization': authorizationField,
//         'Content-Type': 'application/json'
//     }
// }

// const req = https.request(options, res => {
//     // console.log(res);
//     res.on('data', response => {
//         const jsonData = JSON.parse(response.toString());
//         // console.log("The data from get request", jsonData);
//         // console.log("The data from get request", jsonData.projects[0].vendor_key);
//     });
// });

// req.on('error', (error) => {
//     console.log(error);
// });

// req.end();


exports.authenticationToken = async (req, res) => {
    try {
        const channelName = req.body.channel;
        console.log('channel name ----->>>>', channelName);

        const appCertificate = process.env.APP_CERTIFICATE;
        const uid = req.body.userID;
        const role = RtcRole.PUBLISHER;
        const expireTimeInSeconds = 3600;
        const currentTimeStamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimeStamp + expireTimeInSeconds;
        // generating token using uid --->>>
        const generatedToken = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);

        channelToken = generatedToken;                         // token for cloud recording
        console.log("Generated token is:", generatedToken);
        console.log('channel: ', channelName);
        console.log('userid: ', uid);

        res.status(200).json({
            status: true,
            generatedToken
        });
    } catch (err) {
        console.log(err);
        sendErrorResponse(res, err);

    }
}
