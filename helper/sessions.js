const sessions = {};
const timers = {};

module.exports = (function () {
    const SOCKETS = require('./sockets');
    const question_flow = require('../public/json/question-flow.json');

    let getUserQuestions= ()=> {
        let user_questions={};
        Object.keys(question_flow).forEach(function(question){
            user_questions[question] = {
                "priority" : question_flow[question]["priority"],
                "status" : question_flow[question]["status"],
                "question_name" : question_flow[question]["question_name"]
            };
        });
        //console.log(user_questions);
        return user_questions;
    };
    let user_context = {
        chat_id : 0,
        source : undefined,
        user_name : undefined,
        previous_question: undefined,
        previous_question_options : [],
        previous_message: "",
        previous_user_messages: [],
        previous_user_actions: [],
        previous_questions_queue: [],
        user_questions : getUserQuestions(),
        bot_messages : [],
        city : undefined,
        unit : undefined,
        item : undefined,
        property :undefined,
        purpose :[],
        property_status :undefined,
        value: undefined,
        value_number : undefined,
        location_value: undefined,
        location_value_number : undefined,
        visiting_time : undefined,
        visiting_date : undefined,
        location : undefined,
        property_name : undefined,
        price_status : undefined,
        price_start : 0,
        price_end : undefined,
        time_stamp : undefined,
        no_entities_status : false,
        check_list_status : false,
        context_changes : {
            previous_state : {},
            messages : []
        }
    };

    let setTimers = (session_id)=> {
        if(timers.hasOwnProperty(session_id))
        {
            clearTimeout(timers[session_id]);
        }
        timers[session_id] = setTimeout(function(){
            let socket = SOCKETS.getSocket(session_id);
            if(socket){
                console.log("Time Out for this",session_id)
                socket.emit("expired");
            }
        }, 1200000);
    };

    let storeContext = (session_id, user_context)=> {
        user_context['time_stamp'] = new Date().getTime();
        sessions[session_id] = user_context;
    };

    let createSession = (session_id)=>{
        let context  = JSON.parse(JSON.stringify(user_context));
        storeContext(session_id, context);
    };

    let getContext = (session_id)=>{
        if(!sessions.hasOwnProperty(session_id)) {
            createSession(session_id);
        }
        return sessions[session_id];
    };
    let session_functions = {
        isSessionExists : (session_id)=> {
            return sessions.hasOwnProperty(session_id);
        },
        clearContext : (session_id)=>{
            let previous_user_context = getContext(session_id);
            let context = JSON.parse(JSON.stringify(previous_user_context));
            context['chat_id'] = previous_user_context['chat_id']+1;
            context["source"] = previous_user_context["source"];
            context["user_name"] = previous_user_context["user_name"];
            context["previous_questions_queue"] = previous_user_context["previous_questions_queue"];
            storeContext(session_id, context);
        },
        getContext,
        storeContext,
        setTimers
    };
    return session_functions;
})();