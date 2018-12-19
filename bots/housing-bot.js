module.exports = (function () {
    const ENTITY_BOT = require('./entity-bot');
    const SESSIONS = require('../helper/sessions');
    const SUPPORTER = require('./bot-supporter');
    const BOT_QUESTIONS = require('../helper/bot-questions');

    let bot_functons = {
        /*
        * this function is used to give the welcome message to user
        * @params session_id (string)
        */
        welcomeMessage : (session_id)=> {
            // getting user context
            let user_context = SESSIONS.getContext(session_id);
            let intro_message = BOT_QUESTIONS.introductionMessage(name, user_context["source"]);
            user_context["bot_messages"].push(intro_message);

            let after_intro_message = BOT_QUESTIONS.afterIntroductionMessage(user_context["source"]);
            user_context["bot_messages"].push(after_intro_message);

            let okButtonQuestion = BOT_QUESTIONS.okButtonQuestion("Let's find you that perfect home. Ok?",user_context["source"]);
            user_context["bot_messages"].push(okButtonQuestion);

            user_context["previous_question"] = "resetSuggestion";
            SESSIONS.storeContext(session_id, user_context);
            //sending bot messages to user
            SUPPORTER.sendMessages(session_id);
        },
        welcomeBackMessage : ()=> {

        },

        /*
        * this function is used to process the user message
        * @params session_id (string), message (string)
        */
        processUserMessage : (session_id, message)=> {
            //getting user context
            let user_context = SESSIONS.getContext(session_id);

            // getting message entities
            ENTITY_BOT.getEntities(message, user_context['previous_question'], (entities)=>{
                console.log(JSON.stringify(entities, null, 2));
                user_context['current_entities'] = entities;

                // getting bot function
                let bot_function = BOT_FUNCTIONS.getFunctionName(entities);
                console.log("Bot Function : ", bot_function);

                let previous_question = user_context['previous_question'], is_previous_question_checked = false;
                if(previous_question && SUPPORTER.previousQuestionActions.hasOwnProperty(previous_question)) {
                    is_previous_question_checked = true;
                    SUPPORTER.previousQuestionActions[previous_question](session_id);
                }
                else {
                    user_context['messages'].push(BOT_MESSAGES.textMessage("Bot Function : "+bot_function));
                    SESSIONS.storeContext(session_id, user_context);
                }
                // checking whether bot function is exists or not
                if(bot_function) {
                    // processing the bot function
                    SUPPORTER.botFunctionActions[bot_function](session_id, ()=>{
                        // sending all bot messages to user
                        SUPPORTER.sendMessages(session_id);
                    });
                }
                else if(!is_previous_question_checked){
                    // sending error message to user
                    user_context = SESSIONS.getContext(session_id);
                    let error_message = BOT_MESSAGES.textMessage("Sorry, I didn't understand your message.");
                    user_context['messages'].push(error_message);
                    SESSIONS.storeContext(session_id, user_context);

                    // sending all bot messages to user
                    SUPPORTER.sendMessages(session_id);
                }
                else{
                    // sending all bot messages to user
                    SUPPORTER.sendMessages(session_id);
                }
            });
        }
    };
    return bot_functons;
})();