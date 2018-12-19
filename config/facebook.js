module.exports = (function () {
    const request = require('request');
    const FB_PAGE_TOKEN = "EAAEwfupsasABAEhepxyfJzefL3rrBnbJC8cZAaWSO5huZCCY3km7g3ZBXQUrI859oztXULXQGAJnWtDMAkkcgm0glPwZAa0JGQb4X9iq3WTsxsvTisvqNNLvVODI2nZBnZCLZAB8oVH2f6bSYZBxFNsKVZB6zKO28Fiaf0TzG2Qdf5qMZAu2YfACGZC";
    const FB_VERIFY_TOKEN = "tata_housing";

    const fb_config_details = {
        FB_PAGE_TOKEN,
        FB_VERIFY_TOKEN,
        sendRequest : (sender, message_data, callback)=> {
            request({
                url: 'https://graph.facebook.com/v2.6/me/messages',
                qs: {access_token: FB_PAGE_TOKEN},
                method: 'POST',
                json: {
                    recipient: {id: sender},
                    message: message_data
                }
            }, function (error, response) {
                if (error) {
                    console.log('Error sending message: ', error);
                    callback(error);
                } else if (response.body.error) {
                    console.log('Error: ', response.body.error);
                    callback(response)
                }
                else
                {
                    callback(response)
                }
            });
        },
        sendBubble : (sender) => {
            request({
                url: 'https://graph.facebook.com/v2.6/me/messages',
                qs: {access_token: FB_PAGE_TOKEN},
                method: 'POST',
                json: {
                    recipient: {id: sender},
                    "sender_action": "typing_on"
                }
            }, function (error, response) {
                if (error) {
                    console.log('Error sending message: ', error);
                } else if (response.body.error) {
                    console.log('Error: ', response.body.error);
                }
            });
        },
        getName : (sender,callback)=>{
            request({
                url: "https://graph.facebook.com/v2.6/" + sender,
                qs: {
                    access_token : FB_PAGE_TOKEN,
                    fields: "first_name"
                },
                method: "GET",

            }, function(error, response, body) {
                if(error){
                    console.log("error getting username")
                } else{
                    var bodyObj = JSON.parse(body)
                    let name = bodyObj.first_name
                    console.log("first_name",name)
                    callback(name)
                }
            });
        }
    };
    return fb_config_details;
})();