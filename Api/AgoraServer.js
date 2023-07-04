const https = require('https');
const { default: axios, Axios } = require("axios");
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');


const appID = process.env.APP_ID;

exports.authenticationToken = async (req, res) => {
    try {
        const channelName = req.body.channel;

        console.log('here today');

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
        console.log('here in error');
        console.log(err);
    }
}
