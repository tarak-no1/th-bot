module.exports = {
	textMessages: function(txt, source){
		let message;
		if(source=="facebook")
		{
			message =
			{
				text: txt
			};
		}
		else
		{
			message = 
			{
				type : "text",
				message : txt,
				channel_name : "chat",
				api_call : "text"
			}
		}
		return message;
	},
	welcomeBackMessage :function(name,source)
	{
		let greet_message;
		if(name)
			greet_message =this.textMessages("Hey welcome back "+name+". I\'m Sara. Your Property Assistant",source);	
		else
			greet_message =this.textMessages("Hey welcome back. I\'m Sara. Your Property Assistant",source);	
		return greet_message;
	},
	introductionMessage: function(name,source)
	{
		let message;
		if(name)
			message = this.textMessages("Hi "+name+". Greetings from Tata Housing!",source);
		else
			message = this.textMessages("Hi. Greetings from Tata Housing",source)
		return message;
	},
	afterIntroductionMessage: function(source)
	{
		let message = this.textMessages("I am Sara.",source);
		return message;
	},
	greetMessage : function(source)
	{
		let greet_message = this.textMessages("Hello",source);
	    return greet_message;
	},
	positiveMessage : function(source)
	{
		let positive_messages = "Tell me what do you have in your mind";
		
		 message = this.textMessages(positive_messages,source)
		return message;
	},
	refreshChatMessage : function(source)
	{
		let sentence;
		if(source=="facebook")
			sentence = "At any point, in case you want to refresh the chat. Type \'Reset\'.\n\nSo shall we begin?"
		else
			sentence = "At any point, in case you want to refresh the chat. Click the Refresh Icon.\n\nSo shall we begin?"
		let message = this.okButtonQuestion(sentence,source)
		return message;
	},
	sendSuggestionMessage : function(source)
	{
		let sentence = "What are you looking for?  You can ask me questions like:\n- 3 BHKs in Mumbai\n- properties in Gurgaon\n- properties within 1 crore\n- properties with swimming pool\n- flats near Railway station in Mumbai";
		let message = this.textMessages(sentence,source);
		return message;
	},
	noEntitiesMessage: function(source)
	{
		let sorry_messages = [
			"I am Sorry. I didn't understand a bit. Please ask a relevant question",
			// "Oops, I didn't understand a bit. Please ask a relevant question",
			// "Sorry, I didn't understand a bit. Please ask a relevant question"
		];
		let sentence = sorry_messages[random(0,sorry_messages.length-1)];
		let message = this.textMessages(sentence,source)
		return message;
	},
	noPropertyFoundMessage: function(source)
	{
		let no_product_message = "I didn't find anything suiting your request";
		let message = this.textMessages(no_product_message,source)
		return message;
	},
	askNameMessage : function(message_status)
	{
		let ask_name = {
	      text : "May I know your name?"
	    };
	    return ask_name;
	},
	notAvailableMessage : function(source)
	{
		let sentence = "Oops! I can't help you with that.\n\nYou can Buy Apartments & Plots from us. We have properties in Gurugram and Bhubaneswar.\n\nLet's try again"
		let message = this.textMessages(sentence,source)
		return message;
	},
	intentMessage : function(output,source)
	{
		let messageData;
		let facebook_elements_array = [];
		let web_elements_array = [];
		let options = Object.keys(output);
		let channel_name = "";
		options.forEach(function(value){
			if(output[value].hasOwnProperty("subtitle"))
			{
				channel_name = "carousel_subtitle_with_out_options";
				let object = {
					"title":output[value]["title"],
		            "subtitle":output[value]["subtitle"]
				}
				web_elements_array.push(object);
			}
			else
			{
				channel_name = "carousel_images_with_out_options";
				let object = {
					"title":output[value]["title"],
		            "gallery":output[value]["gallery"]
				}
				web_elements_array.push(object);
			}
		});
		if(source=="facebook")
		{
			messageData = {
				"attachment":{
			      "type":"template",
			      "payload":{
			        "template_type":"generic",
			        "image_aspect_ratio":"square",
			        "elements":facebook_elements_array
			      }
			    }
			}
		}
		else
		{
			messageData = 
			{
				type: "single_select",
				multi_select: false,
				belongs : "unit",
				options: web_elements_array,
				channel_name : channel_name,
				api_call : "single-select"
			}
		}
		return messageData;

	},
	imagesMessage : function(options,source)
	{
		console.log("options",options);
		let messageData;
		let channel_name = "carousal_images";
		let urls = options;
		if(source=="facebook")
		{
			messageData = {
				"attachment":{
			      "type":"template",
			      "payload":{
			        "template_type":"generic",
			        "image_aspect_ratio":"square",
			        "elements":facebook_elements_array
			      }
			    }
			}
		}
		else
		{
			messageData = 
			{
				type: "display_only",
				multi_select: false,
				belongs : "unit",
				options: urls,
				channel_name : channel_name,
				api_call : "display-only"
			}
		}
		return messageData;
	},
	floorMessage : function(options,source)
	{
		let messageData;
		let channel_name = "carousal_images";
		let urls = options;
		if(source=="facebook")
		{
			messageData = {
				"attachment":{
			      "type":"template",
			      "payload":{
			        "template_type":"generic",
			        "image_aspect_ratio":"square",
			        "elements":facebook_elements_array
			      }
			    }
			}
		}
		else
		{
			messageData = 
			{
				type: "single_select",
				multi_select: false,
				belongs : "unit",
				options: urls,
				channel_name : channel_name,
				api_call : "single-select"
			}
		}
		return messageData;
	},
	locationMessage : function(options,source,location)
	{
		let messageData;
		let text = location;
		let values = [
			{
				"type" : "web_url",
				"title": "View on Google Map",
				"url":options
				//"url" : "https://www.selekt.in/tata_value_home/download?property_name="+"simple",	  
			}
		]
		if(source=="facebook")
		{
			messageData = {
				"attachment":
				{
					"type":"template",
					"payload":{
					"template_type":"button",
					"text":text,
					"buttons":values
					}
			    }
			}
		}
		else
		{
			messageData = 
			{
				type: "single_select",
				multi_select: false,
				text: text,
				belongs : "map_link",
				options: values,
				channel_name : "external_resource",
				api_call :"single-select"
			}
		}
		return messageData;
	},
	confuseMessage : function(source)
	{
		let sentence = "Sorry. I am Confused. Let's try again"
		let message = this.textMessages(sentence,source)
		return message;
	},
	errorMessage: function(source)
	{
		let sentence = "Sorry, I did not get that. Let's try again";
		let message = this.textMessages(sentence,source)
		return message;
	},	
	locationQuestionText : function(city,source,count,status)
	{
		let sentence = "We have property(s) in the following location(s). Which one are you comfortable with?";
		// if(!status)
		// {
		// 	if(count!=1)
		// 		sentence = "Found "+count+" Properties in "+titleCase(city)+" matching your needs. Choose the one that suits you."
		// 	else
		// 		sentence = "Found "+count+" Property in "+titleCase(city)+" matching your needs."
		// }
		// else
		// 	sentence = 	"Showing you all Properties in "+titleCase(city)+". Select the one that suits you"
		let message = this.textMessages(sentence,source)
		return message;
	},
	locationQuestionPositiveText : function(source)
	{
		let sentence = "Alright!";
		let message = this.textMessages(sentence,source)
		return message;
	},
	unitQuestionPositiveText : function(source)
	{
		let sentence = "Great Choice!";
		let message = this.textMessages(sentence,source)
		return message;
	},
	unitQuestionText : function(unit,source,count)
	{
		let sentence ;
		if(count==1)
			sentence = "I have got 1 result as per your requirement. Choose from below";
		else if(count>1)
			sentence = "I have got "+count+" results as per your requirement. Choose one";
		else
			sentence = "Look at these options. Pick the one that suits you";
		let message = this.textMessages(sentence,source)
		return message;
	},
	propertyQuestionText : function(unit,source,count,status)
	{
		let sentence = "Here you go!";
		if(count==1)
			sentence ="I have found one great option for you"
		if(count>1)
		{
			sentence = "I have found some great options"
		}
		let message = this.textMessages(sentence,source)
		return message;
	},
	visitMessage : function(source)
	{
		let sentence ="Sure. I will help you with that\n\nFor Future Correspondence. Please share your 10 digit mobile number";
		let message = this.textMessages(sentence,source)
		return message;
	},
	makeWebOptions : function(values)
	{
		let options = [];
		options = values.map(function(val){

			if(!val.key)
			{
				return {
					"key": val,
					"value": val
				}
			}
			else
			{
				return {
					"value": val.value,
					"key": val.key
				}
			}
		});
		return options;
	},
	sendButtonMessage : function(text,values,source)
	{
		let messageData;
		messageData = {
		    "attachment":{
		      "type":"template",
		      "payload":{
		        "template_type":"button",
		        "text":text,
		        "buttons": this.makeButtonOptions(values)
		      }
		    }
		}
	 return messageData;
	},
	exploreAnotherProperty : function(text,source)
	{
		let values = [
		{
			"key":"reset",
			"value":"Start Again"
		}
		]
		let messageData;
		if(source=="facebook")
			messageData = this.sendButtonMessage(text,values)
		else
		{
			messageData = 
			{
				type: "single_select",
				multi_select: false,
				text: text,
				belongs : "reset",
				options: this.makeWebOptions(values),
				channel_name : "bot_questions",
				api_call :"single-select"
			}
		}
		return messageData;
	},
	sendBrochureLink : function(source,brochure_link)
	{
		let messageData ;
		let text = "Here is the link!";
		let values = [
			{
				"type" : "web_url",
				"title": "Download",
				"url":brochure_link
				//"url" : "https://www.selekt.in/tata_value_home/download?property_name="+"simple",	  
			}
		]
		if(source=="facebook")
		{
			messageData = {
				"attachment":
				{
					"type":"template",
					"payload":{
					"template_type":"button",
					"text":text,
					"buttons":values
					}
			    }
			}
		}
		else
		{
			messageData = 
			{
				type: "single_select",
				multi_select: false,
				text: text,
				belongs : "send_brochure_link",
				options: values,
				channel_name : "external_resource",
				api_call :"single-select"
			}
		}
		return messageData;
	},
	sendPdf:function(url)
	{
		let messageData = {
			"attachment":{
		      "type":"file",
		      "payload":{
		        "url":"https://www.selekt.in/tata_value_home/static/pdf/simple.pdf",
		      }
		    }
		}
		return messageData;
	},
	okButtonQuestion : function(text,source)
	{
		let values = [{
			key :"ok",
			value : "Ok"
		}]
		let messageData;
		if(source=="facebook")
			messageData = this.sendButtonMessage(text,values)
		else
		{
			messageData = 
			{
				type: "single_select",
				multi_select: false,
				text: text,
				belongs : "reset",
				options: values,
				channel_name : "bot_questions",
				api_call : "single-select"
			}
		}
		return messageData;
	},
	proceedFurtherQuestion : function(result,source)
	{
		let text = "How do you want proceed further?"
		let values ;
		if(source=="facebook")
		{
			values=[
				{
					"type" : "web_url",
					"title": "Book Online",
					"url":result[0]["landingPageUrlForDesktop"]
				},
				{
					"type" : "postback",
					"title": "Visit the Location",
					"payload":"Visit the Location"
				}
			]
		}
		else
		{
			values=[
				{
					"type" : "web_url",
					"title": "Book Online",
					"mobile_url":result[0]["landingPageUrlForMobile"],
					"desktop_url" : result[0]["landingPageUrlForDesktop"]
				},
				{
					"type" : "postback",
					"title": "Visit the Location",
					"payload":"Visit the Location"
				}
			]	
		}
		if(result[0]["e_brochure"]!="na")
		{
			values.push({
				"type" : "postback",
				"title": "Download Brochure",
				"payload":"Download Brochure"
			})
		}
		let messageData;
		if(source=="facebook")
		{
			messageData = 
			{
				"attachment":
				{
					"type":"template",
					"payload":{
					"template_type":"button",
					"text":text,
					"buttons":values
					}
			    }
			}
		}
		else
		{
			messageData = 
			{
				type: "single_select",
				multi_select: false,
				text: text,
				belongs : "proceed_further_question",
				options: values,
				channel_name : "web_url_buttons",
				api_call : "single-select"
			}
		}
		return messageData;
	},
	cityQuestion : function (question_details,source)
	{
		let messageData;
		let text;
		let values;
		if(question_details["question_text"])
			text = question_details["question_text"];
		if(question_details["question_options"])
			values = question_details["question_options"]
		if(text && values)
		{
			if(source=="facebook")
			{
				messageData=this.sendQuickRepliesMessage(text,values);
			}
			else
			{
				messageData = 
				{
					type: "single_select",
					multi_select: false,
					text: text,
					belongs : "city",
					options: this.makeWebOptions(values),
					channel_name : "bot_questions",
					api_call : "single-select"
				}
			}
		}
		else
		{
			console.log("format is wrong")
		}
		return messageData;		
	},
	locationQuestion : function(question_details,source)
	{
		let messageData;
		let options=Object.keys(question_details["question_options"]);
		let text = question_details["question_text"]
		let facebook_elements_array=[];
		let web_elements_array=[];
		options.forEach(function(value){
			let location_name = question_details["question_options"][value]["title"].split(',');
			facebook_elements_array.push({
	            "title":question_details["question_options"][value]["title"],
	            "buttons":[
	            	{
	               		"type" : "postback",
						"title": "Choose This",
						"payload": location_name[0]
	               },    
	               {
						"type" : "web_url",
						"title": "Explore Location",
						"url" : question_details["question_options"][value]["locationUrlForDesktop"],
	               }
	                 
	            ]      
			});
			
		});
		options.forEach(function(value){
			let buttons=[];
			let payload = question_details["question_options"][value]["index"];	
			let object = {
				"title":question_details["question_options"][value]["title"],
	            "subtitle":question_details["question_options"][value]["subtitle"],
	            "buttons":[
	            	{
	               		"type" : "postback",
						"title": "Buy in this property",
						"payload": payload
	                }                 
	            ]   
			}
			if(question_details["question_options"][value]["images"].length>0)
			{
				buttons.push({
					"type" : "postback",
					"title": "Property Images",
					"payload": payload+" images"
				});

			}
			if(question_details["question_options"][value]["youtubeVideoUrl"]!="na")
			{
				buttons.push({
					"type" : "web_url",
					"title": " Property Video",
					"mobile_url" : question_details["question_options"][value]["youtubeVideoUrl"],
					"desktop_url" : question_details["question_options"][value]["youtubeVideoUrl"]
				})
			}
			if(question_details["question_options"][value]["google_map_url"]!="na")
			{
				buttons.push({
					"type" : "postback",
					"title": "Location",
					"payload": payload + " map"
				});
			}
			for(x in buttons)
				object.buttons.push(buttons[x]);
			web_elements_array.push(object);	
		});
		if(source=="facebook")
		{
			messageData = {
				"attachment":{
			      "type":"template",
			      "payload":{
			        "template_type":"generic",
			        "image_aspect_ratio":"square",
			        "elements":facebook_elements_array
			      }
			    }
			}
		}
		else
		{
			messageData = 
			{
				type: "single_select",
				multi_select: false,
				belongs : "location",
				options: web_elements_array,
				channel_name : "carousel",
				api_call : "single-select"
			}
		}
		return messageData;
	},
	unitQuestion :function(question_details,source)
	{
		let messageData;
		let options=Object.keys(question_details["question_options"]);
		console.log(options);
		console.log(question_details);
		let facebook_elements_array=[];
		let web_elements_array = [];
		let channel_name = "carousel";
		options.forEach(function(value){
			let buttons = [];
		
			let object = {
	            "title":question_details["question_options"][value]["title"],
	            "subtitle":question_details["question_options"][value]["subtitle"],
	            "buttons":[
	            	{
	               		"type" : "postback",
						"title": "Buy This",
						"payload": question_details["question_options"][value]["unit_detail"]
	                }                 
	            ]   
			}
			/*if(question_details["question_options"][value]["youtubeVideoUrl"]!="na")
			{
				buttons.push(
				{
					"type" : "web_url",
					"title": "Property Video",
					"url" : question_details["question_options"][value]["youtubeVideoUrl"]
     			})
			}*/
			for(x in buttons)
				object.buttons.push(buttons[x]);
			facebook_elements_array.push(object);	
		});
		options.forEach(function(value){
			let buttons=[];
			let object = {
				"title":question_details["question_options"][value]["title"],
	            "subtitle":question_details["question_options"][value]["subtitle"],
	            "buttons":[
	            	{
	               		"type" : "postback",
						"title": "Buy This",
						"payload": question_details["question_options"][value]["unit_detail"]
	                }                 
	            ]   
			}
			for(x in buttons)
				object.buttons.push(buttons[x]);
			web_elements_array.push(object);	
		});
		if(source=="facebook")
		{
			messageData = {
				"attachment":{
			      "type":"template",
			      "payload":{
			        "template_type":"generic",
			        "image_aspect_ratio":"square",
			        "elements":facebook_elements_array
			      }
			    }
			}
		}
		else
		{
			messageData = 
			{
				type: "single_select",
				multi_select: false,
				belongs : "unit",
				options: web_elements_array,
				channel_name : channel_name,
				api_call : "single-select"
			}
		}
		return messageData;
	},
	propertyQuestion : 	function(question_details,source)
	{
		let messageData;
		let options=Object.keys(question_details["question_options"]);
		console.log(options);
		console.log(question_details);
		let facebook_elements_array=[];
		let web_elements_array = [];
		let channel_name = "carousel";
		options.forEach(function(value){
			let buttons = [];
			buttons = [
               /*	{
					"type" : "web_url",
					"title": "Property Details",
					"url" : question_details["question_options"][value]["landingPageUrl"]
					
     			},*/
			]
			if(question_details["question_options"][value]["galleryUrlForDesktop"]!="na")
			{
				buttons.push({
               		"type" : "web_url",
					"title": "Property Images",
					"url" : question_details["question_options"][value]["galleryUrlForDesktop"]
               	})
			}
			let object = {
	            "title":question_details["question_options"][value]["title"],
	            "buttons":[
	            	{
	               		"type" : "postback",
						"title": "Buy in this property",
						"payload": question_details["question_options"][value]["payload"]
	                }                 
	            ]   
			}
			for(x in buttons)
				object.buttons.push(buttons[x]);
			facebook_elements_array.push(object);	
		});
		options.forEach(function(value){
			let buttons=[];
			let payload = question_details["question_options"][value]["index"];	
			let object = {
				"title":question_details["question_options"][value]["title"],
	            "buttons":[
	            	{
	               		"type" : "postback",
						"title": "Buy in this property",
						"payload": question_details["question_options"][value]["payload"]
	                }                 
	            ]   
			}
			if(question_details["question_options"][value].hasOwnProperty("images")&&question_details["question_options"][value]["images"]&&question_details["question_options"][value]["images"].length>0)
			{
				buttons.push({
					"type" : "postback",
					"title": "Property Images",
					"payload": payload+" images"
				});

			}
			if(question_details["question_options"][value].hasOwnProperty("amenities")&&question_details["question_options"][value]["amenities"]&&question_details["question_options"][value]["amenities"].length>0)
			{
				buttons.push({
					"type" : "postback",
					"title": "Property Amenities",
					"payload": payload+" amenities"
				});

			}
			if(question_details["question_options"][value]["youtubeVideoUrl"]!="na")
			{
				buttons.push({
					"type" : "web_url",
					"title": " Property Video",
					"mobile_url" : question_details["question_options"][value]["youtubeVideoUrl"],
					"desktop_url" : question_details["question_options"][value]["youtubeVideoUrl"]
				})
			}
			if(question_details["question_options"][value]["google_map_url"]!="na")
			{
				buttons.push({
					"type" : "postback",
					"title": "Location",
					"payload": payload + " map"
				});
			}
			for(x in buttons)
				object.buttons.push(buttons[x]);
			web_elements_array.push(object);	
		});
		if(source=="facebook")
		{
			messageData = {
				"attachment":{
			      "type":"template",
			      "payload":{
			        "template_type":"generic",
			        "image_aspect_ratio":"square",
			        "elements":facebook_elements_array
			      }
			    }
			}
		}
		else
		{
			messageData = 
			{
				type: "single_select",
				multi_select: false,
				belongs : "unit",
				options: web_elements_array,
				channel_name : "carousel_image",
				api_call : "single-select"
			}
		}
		return messageData;
	},
	budgetQuestion : function(question_details,source)
	{
		let text = question_details["question_text"];
		let values = question_details["question_options"];
		if(source=="facebook")
			messageData = this.sendQuickRepliesMessage(text,values)
		else
		{
			messageData = 
			{
				type: "single_select",
				multi_select: false,
				text: text,
				belongs : "budget",
				options: this.makeWebOptions(values),
				channel_name : "bot_questions",
				api_call : "single-select"
			}
		}
		return messageData;

	},
	adjectiveQuestion : function(question_details,source)
	{
		let text = question_details["question_text"];
		let values = question_details["question_options"];
		if(source=="facebook")
			messageData = this.sendButtonMessage(text,values)
		else
		{
			messageData = 
			{
				type: "single_select",
				multi_select: false,
				text: text,
				belongs : "adjective",
				options: this.makeWebOptions(values),
				channel_name : "bot_questions",
				api_call : "single-select"
			}
		}
		return messageData;

	},
	property_statusQuestion : function(question_details,source)
	{
		let text = question_details["question_text"];
		let values = question_details["question_options"];
		if(source=="facebook")
			messageData = this.sendButtonMessage(text,values)
		else
		{
			messageData = 
			{
				type: "single_select",
				multi_select: false,
				text: text,
				belongs : "property_status",
				options: this.makeWebOptions(values),
				channel_name : "bot_questions",
				api_call : "single-select"
			}
		}
		return messageData;

	},
	makeQuickRepliesOptions : function (values)
	{
		let options = [];
		options = values.map(function(val){

			if(!val.key)
			{
				return {
					"content_type" : "text", 
					"title": val,
					"payload": val
				}
			}
			else
			{
				return {
					"content_type" : "text", 
					"title": val.value,
					"payload": val.key
				}
			}
		});
		return options;
	},
	sendQuickRepliesMessage : function(text,values)
	{

		let messageData ={
		    "text": text,
		    "quick_replies": this.makeQuickRepliesOptions(values)
		  }
		return messageData;
	},
	makeButtonOptions : function(values)
	{
		let options = [];
		for (x in values)
		{
			var option ;
			if(values[x])
			{
				if(!values[x].key)
				{
					option = {
						"type" : "postback", 
						"title": values[x],
						"payload": values[x]
					}
				}
				else
				{
					option = {
						"type" : "postback", 
						"title": values[x].value,
						"payload": values[x].key
					}
				}
			}
			if(option!=undefined)
			{
				options.push(option)
			}
			console.log("option",option)
		}
		return options;
	},
	random : random,
};
function random(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}