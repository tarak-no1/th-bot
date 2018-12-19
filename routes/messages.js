module.exports = (io)=> {
    const express = require('express');
    const router = express.Router();
    const SOCKETS = require('../helper/sockets');
    const EVENTS = require('../events/storing');
    const SESSIONS = require('../helper/sessions');
    const BOT = require('');

    // starting the socket connection
    io.on('connection', (socket) => {
        console.log("New User Connected");
        /*
        * this channel will emit, when user opens the app
        */
        socket.on('add_user', (data)=>{
            console.log("In Add user channel");
            data = JSON.parse(data);
            console.log(JSON.stringify(data, null, 2));
            let session_id = data["device_id"];
            let username = data["user_name"];

            //storing user socket details
            SOCKETS.storeSocket(session_id, socket);
            EVENTS.getUserContextFromDb(session_id, (new_user_status, user_context)=>{
                console.log(new_user_status, user_context);
                user_context['username'] = username;
                user_context['source'] = 'website';

                if(!new_user_status)
                    user_context['chat_id']++;
                SESSIONS.storeContext(session_id, user_context);

                if(new_user_status){

                }
                else {

                }
            });
        });

        socket.on('reset', (data)=> {
            console.log("In reset channel");
            data = JSON.parse(data);
            console.log(JSON.stringify(data, null, 2));
            let session_id = data['device_id'];
            //storing user socket details
            SOCKETS.storeSocket(session_id, socket);
        });
        socket.on('hello', (data)=> {
            console.log("In hello channel");
            data = JSON.parse(data);
            let session_id = data['device_id'];

            //storing user socket details
            SOCKETS.storeSocket(session_id, socket);
            EVENTS.getUserContextFromDb(session_id, (db_context_status, user_context)=>{
                console.log(db_context_status);
                if(db_context_status)
                    user_context['chat_id']++;
                SESSIONS.storeContext(session_id, user_context);
            });
        });
        socket.on('reconnect', (data)=> {
            console.log("In reconnect channel");
            data = JSON.parse(data);
            let session_id = data['device_id'];

            //storing user socket details
            SOCKETS.storeSocket(session_id, socket);
        });
        /*
        * this channel will emit, when user sends any typed message
        */
        socket.on('user_message', (data)=> {
            console.log("In user message channel");
            data = JSON.parse(data);
            console.log(JSON.stringify(data, null, 2));
            let session_id = data['session_id'];

            //storing user socket details
            SOCKETS.storeSocket(session_id, socket);
            EVENTS.getUserContextFromDb(session_id, (db_context_status, user_context)=>{
                user_context['source'] = 'website';
                SESSIONS.storeContext(session_id, user_context);
            });
        });
    });
    return router;
};