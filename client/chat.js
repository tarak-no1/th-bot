(function () {
    // Load the script
    var root_url = 'https://www.prodx.in';
    var message = '';
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function () {
        var $ = window.jQuery;
        $.ajax({
            type: "POST",
            url: root_url+"/tata_housing/welcome_message",
            cache: true,
            success: function (data) {
                console.log("ChatBot Config data : " + data);
                if (data.chat_icon_status) {
                    message = data.welcome_message;
                    $("<link/>", {
                        rel: "stylesheet",
                        type: "text/css",
                        href: root_url+"/tata_housing/css/fab.css"
                    }).appendTo("head");
                    initChatIconContainer();
                }
            }
        });

        function initChatIconContainer() {
            $("<div>", {
                class: "chat-icon-container"
            }, "</div>").appendTo("body");
            $("<div>", {
                class: "chat-container"
            }, "</div>").appendTo("body");
            $("<div id='chat-icon-launcher'>" + "<div id='launcher-container'>"
                + "<div class='chat-launcher chat-launcher-mobile'>"
                + "<div class='chat-launcher-open-icon'></div>"
                + "</div>"
                + "</div>"
            ).appendTo(".chat-icon-container");
            $("<iframe>", {
                id: "chat-body-frame",
                src: root_url+"/tata_housing/client/chat.html"
            }, "</iframe>").appendTo(".chat-container");
        }

        function closeIframe() {
            $('#chat-body-frame').removeClass('selekt_animation-bouncein');
            $('#chat-body-frame').addClass('selekt_animation-bounceout');
            $('#chat-body-frame').hide();
        }

        function bindEvent(element, eventName, eventHandler) {
            if (element.addEventListener) {
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
        }

        bindEvent(window, 'message', function (e) {
            console.log("Event from iframe " + e);
            if(e.data=='close'){
                closeIframe();
            }
        });

        function initWelcomeBoxContainer() {
            $("<div id='welcome-body-frame'>"
                + "<div id='welcome-container'>"
                + "<div id='welcome' style='display: inline-flex;vertical-align: middle;'>"
                + "<span style='height: 12px;width: 12px;background: #00ff00; top: 24px;left: 16px;border-radius: 20px;position: absolute;'></span>"
                + "<p id='message' style='margin-left: 40px; margin-top: 5%; font-size: 14px;font-weight: 600;color: #133984;'>" + message + "</p>"
                + "</div>"
                + "</div>"
                + "</div>").appendTo("body");
            $("<audio></audio>").attr({
                'id': 'audio-frame',
                'src': root_url+'/tata_housing/assets/ting.mp3',
                'volume': 1.0,
                'autoplay': 'autoplay'
            }).appendTo(".welcome-container");
        }

        setTimeout(function () {
            if (localStorage.getItem("chat_content") == undefined || localStorage.getItem("chat_content") == "" || localStorage.getItem("chat_content") == null) {
                if ($("#chat-body-frame").is(':visible') == false)
                    initWelcomeBoxContainer();
            }
        }, 3000);

        $('body').on("mousedown, mouseup, click", "#chat-icon-launcher,#welcome-body-frame", function () {
            $("#welcome-body-frame").hide(100);
            $('#chat-body-frame').removeClass('selekt_animation-bounceout');
            $('#chat-body-frame').addClass('selekt_animation-bouncein');
            $("#chat-body-frame").show();
        });
    };
    if (window.jQuery) {
        var $ = window.jQuery;
        $.ajax({
            type: "POST",
            url: root_url+"/tata-admin/get-configuration",
            cache: true,
            success: function (data) {
                console.log("ChatBot Config data : " + data);
                if (data.chat_icon_status) {
                    message = data.welcome_message;
                    $("<link/>", {
                        rel: "stylesheet",
                        type: "text/css",
                        href: root_url+"/tata_housing/css/fab.css"
                    }).appendTo("head");
                    initChatIconContainer();
                }
            }
        });

        function initChatIconContainer() {
            $("<div>", {
                class: "chat-icon-container"
            }, "</div>").appendTo("body");
            $("<div>", {
                class: "chat-container"
            }, "</div>").appendTo("body");
            $("<div id='chat-icon-launcher'>" + "<div id='launcher-container'>"
                + "<div class='chat-launcher chat-launcher-mobile'>"
                + "<div class='chat-launcher-open-icon'></div>"
                + "</div>"
                + "</div>"
            ).appendTo(".chat-icon-container");
            $("<iframe>", {
                id: "chat-body-frame",
                src: root_url+"/tata_housing/client/chat.html"
            }, "</iframe>").appendTo(".chat-container");
        }

        function closeIframe() {
            $('#chat-body-frame').removeClass('selekt_animation-bouncein');
            $('#chat-body-frame').addClass('selekt_animation-bounceout');
            $('#chat-body-frame').hide();
        }

        function bindEvent(element, eventName, eventHandler) {
            if (element.addEventListener) {
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
        }

        bindEvent(window, 'message', function (e) {
            console.log("Event from iframe " + e);
            if(e.data=='close'){
                closeIframe();
            }
        });

        function initWelcomeBoxContainer() {
            $("<div id='welcome-body-frame'>"
                + "<div id='welcome-container'>"
                + "<div id='welcome' style='display: inline-flex;vertical-align: middle;'>"
                + "<span style='height: 12px;width: 12px;background: #00ff00; top: 24px;left: 6px;border-radius: 20px;position: absolute;'></span>"
                + "<p id='message' style='margin-left: 25px; margin-top: 5%; font-size: 12px;font-weight: 600;color: #133984;'>" + message + "</p>"
                + "</div>"
                + "</div>"
                + "</div>").appendTo("body");
            $("<audio></audio>").attr({
                'id': 'audio-frame',
                'src': root_url+'/tata_housing/assets/ting.mp3',
                'volume': 1.0,
                'autoplay': 'autoplay'
            }).appendTo(".welcome-container");
        }

        setTimeout(function () {
            if (localStorage.getItem("chat_content") == undefined || localStorage.getItem("chat_content") == "") {
                initWelcomeBoxContainer();
            }
        }, 3000);

        $('body').on("mousedown, mouseup, click", "#chat-icon-launcher,#welcome-body-frame", function () {
            $("#welcome-body-frame").hide(100);
            $('#chat-body-frame').removeClass('selekt_animation-bounceout');
            $('#chat-body-frame').addClass('selekt_animation-bouncein');
            $("#chat-body-frame").show();
        });
    } else {
        document.getElementsByTagName("head")[0].appendChild(script);
    }
})();