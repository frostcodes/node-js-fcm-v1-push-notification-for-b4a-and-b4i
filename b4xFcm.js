/**
* Send push notifications using NodeJs to FCM for a B4A or B4I app
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

const firebaseAdmin = require('firebase-admin');

// Path to your service account key file
const serviceAccount = require('./service_account.json');

// Initialize the app with a service account, granting admin privileges
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

// Reference to the messaging service
const messaging = firebaseAdmin.messaging();

/**
* Casts all values of an object to strings.
* 
* @param {Object} obj - The object whose values need to be cast to strings.
* @return {Object} - The new object with all values cast to strings.
*/
function castObjectValuesToString(obj) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, String(value)]));
}

/**
* Sends a notification to a FCM topic.
* 
* @param {string} topic - The topic to which the notification is sent.
* @param {string} title - The title of the notification.
* @param {string} message - The body of the notification.
* @param {Object} [extraCustomData={}] - Additional custom data to send with the notification.
* @return {Promise} - A promise that resolves with the message ID string or rejects with an error.
*/
function sendNotificationToTopic(topic, title, message, extraCustomData = {}) {
    let data = castObjectValuesToString({
        ...extraCustomData,
        title: title,
        body: message,
    });
    
    // Define the message payload
    let payloadData = {
        data: data,
        topic: topic,
        android: {
            priority: 'high'
        },
    };
    
    // iOS-specific payload
    if (topic.startsWith('ios_')) {
        payloadData = {
            ...payloadData,
            notification: {
                title: data.title,
                body: data.body
            },
            apns: {
                headers: {
                    'apns-priority': '10'
                },
                payload: {
                    aps: {
                        sound: 'default',
                        badge: 0
                    }
                }
            }
        };
    }
    
    // Send a message to the devices subscribed to the provided topic
    return messaging.send(payloadData);
}

/**
* Sends a notification to a single device using the device token.
* 
* @param {string} deviceToken - The FCM token of the target device.
* @param {string} title - The title of the notification.
* @param {string} message - The body of the notification.
* @param {boolean} [isIosDevice=false] - Indicates if the target device is an iOS device.
* @param {Object} [extraCustomData={}] - Additional custom data to send with the notification.
* @return {Promise} - A promise that resolves with the message ID string or rejects with an error.
*/
function sendNotificationToSingleRecipient(deviceToken, title, message, isIosDevice = false, extraCustomData = {}) {
    let data = castObjectValuesToString({
        ...extraCustomData,
        title: title,
        body: message,
    });
    
    // Define the message payload
    let payloadData = {
        data: data,
        token: deviceToken,
        android: {
            priority: 'high'
        }
    };
    
    // iOS-specific payload
    if (isIosDevice) {
        payloadData = {
            ...payloadData,
            notification: {
                title: data.title,
                body: data.body
            },
            apns: {
                headers: {
                    'apns-priority': '10'
                },
                payload: {
                    aps: {
                        sound: 'default',
                        badge: 0
                    }
                }
            }
        };
    }
    
    // Send message to device with the provided token
    return messaging.send(payloadData);
}

// Export the functions to be used as a module
module.exports = {
    sendNotificationToTopic,
    sendNotificationToSingleRecipient
};
