/**
* Example for sending FCM notifications using NodeJs to FCM for a B4A or B4I app.
* 
* @author  Frost Codes ( Oluwaseyi Aderinkomi )
* @license MIT (https://opensource.org/licenses/MIT)
* @link    https://github.com/frostcodes
* @link    https://www.b4x.com/android/forum/members/frostcodes.107647/
* @link    https://punchlinetech.com
*
* Support my work 👇👇
*
* LINK 1: https://flutterwave.com/donate/xua1z1xmabji
*
* LINK 2: https://paystack.com/pay/rbhzwdgozj
* 
* Copyright (c) 2024 Frost Codes ( Oluwaseyi Aderinkomi )
*/

const b4xFcm = require('./b4xFcm');

let currentDate = new Date().toLocaleTimeString();

// Example 1: Send message to a topic

let topic = 'test_topic';
let title = `Fcm title: ${currentDate}`;
let message = `Hello world! This is the FCM message body`;

// Send notification with no custom data
b4xFcm.sendNotificationToTopic(topic, title, message)
.then((response) => {
    console.log('Successfully sent message:', response);
})
.catch((error) => {
    console.log('Error sending message:', error);
});

// Send notification with custom data
b4xFcm.sendNotificationToTopic(topic, title, message, {
    'action': 'no_action',
    'donation_link': 'https://flutterwave.com/donate/xua1z1xmabji',
    'donation_link2': 'https://paystack.com/pay/rbhzwdgozj'
})
.then((response) => {
    console.log('Successfully sent message:', response);
})
.catch((error) => {
    console.log('Error sending message:', error);
});

// Example 2: Send messages using device token

/*

let tokenMsgTitle = `Single token notification: ${currentDate}`;
let tokenMsg = `Message was sent with FCM Token!`;

let sampleFcmUserToken = 'XXXXXXXXX_____REPLACE_THIS____XXXXXXXXX';

// No custom data
b4xFcm.sendNotificationToSingleRecipient(sampleFcmUserToken, tokenMsgTitle, tokenMsg)
.then((response) => {
    console.log('Successfully sent message to single recipient:', response);
})
.catch((error) => {
    console.log('Error sending message to single recipient:', error);
});

// With custom data
b4xFcm.sendNotificationToSingleRecipient(sampleFcmUserToken, tokenMsgTitle, tokenMsg, false, {
    'action': 'no_action',
    'donation_link': 'https://flutterwave.com/donate/xua1z1xmabji',
    'donation_link2': 'https://paystack.com/pay/rbhzwdgozj'
})
.then((response) => {
    console.log('Successfully sent message to single recipient:', response);
})
.catch((error) => {
    console.log('Error sending message to single recipient:', error);
});

*/
