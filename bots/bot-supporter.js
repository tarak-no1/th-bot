module.exports = (function () {
    const SESSIONS = require('../helper/sessions');
    const SOCKETS = require('../helper/sockets');
    const BOT_QUESTIONS = require("../helper/bot-questions");
    const EVENTS = require('../events/storing');

    let sortByValue= (data, field, order)=>{
        let sorted_data = data.sort((a, b)=>{
            return (b[field] - a[field]) && order;
        });
        return sorted_data;
    };

    let supporter_functions = {
        /*
        * this function is used to send all bot messages to user
        * @params session_id (string)
        */
        sendMessages : (session_id)=>{
            // getting user context
            let user_context = SESSIONS.getContext(session_id);

            // getting user socket
            let socket = SOCKETS.getSocket(session_id);
            /*
            * this function is used to message to particular socket channel
            * @params messages (array), idx (integer)
            */
            let getMessage = (messages, idx)=>{
                let message_data = messages[idx];
                // ================= Storing User Message Event =================
                try {
                    message_data['chat_id'] = user_context['chat_id'];
                    message_data['session_id'] = session_id;
                    message_data['time'] = new Date().getTime();
                    // EVENTS.storeMessageEvent(message_data);
                }catch(e){console.log("Error in Event Storing: ",e);}
                // ==============================================================

                message_data['gif_status'] = false;
                let channel_name = message_data['channel_name'];
                idx++;
                if(messages.length>idx){
                    message_data['gif_status'] = true;
                    setTimeout(()=>{
                        getMessage(messages, idx);
                    }, 1000);
                }
                socket.emit(channel_name, message_data);
            };
            let bot_messages = user_context['messages'].concat();
            // checking bot_messages exists or not
            if(bot_messages.length>0){
                console.log("Bot Message Length : "+bot_messages.length);
                user_context['messages'] = [];

                // sending bot message to user
                getMessage(bot_messages, 0);
            }
            // ============== context storing =================
            EVENTS.storeUserContextInDb(session_id, user_context);
            // ================================================
        },

        previousQuestionActions : {
            resetSuggestion : (session_id)=> {
                let user_context = SESSIONS.getContext(sessionId);
                let entities = user_context['current_entities'];
                let message = user_context['current_message'];

                if((entities.hasOwnProperty("binary_values_positive")&&entities["binary_values_positive"].indexOf("yes")!=-1)||message.toLowerCase()=="ok") {
                    let positive_message = BOT_QUESTIONS.positiveMessage(user_context["source"]);
                    user_context["bot_messages"].push(positive_message);
                    let suggestion_message = BOT_QUESTIONS.sendSuggestionMessage(user_context["source"]);
                    user_context["bot_messages"].push(suggestion_message);
                    user_context["previous_question"] = "suggestion_message";
                }
                else {
                    let positive_message = BOT_QUESTIONS.textMessages("Please click \"Ok\" to proceed",user_context["source"])
                    user_context["bot_messages"].push(positive_message);
                    let okButtonQuestion = BOT_QUESTIONS.okButtonQuestion("Let's find you a perfect home. Ok?",user_context["source"])
                    user_context["bot_messages"].push(okButtonQuestion);
                    user_context["previous_question"] = "reset_suggestion";
                }
                SESSIONS.storeContext(sessionId, user_context);
            }
        }
    };
    return supporter_functions;
})();