			//some default pre init
			var PB = PB || {};PB.q = PB.q || [];PB.events = PB.events || [];
	
	//********** Update these fields ********
	//PushBots ApplicationId (required)
	PB.app_id = "5b0b4f631db2dc30e75dd45e";
	//Your domain name, must be HTTPS or localhost  (required)
	PB.domain = "https://nkatest.netlify.com";
	//Update and uncomment it if you are using custom safari certificate for your app
	//PB.safari_push_id = "web.com.pushbots.main";
	//****************************************
	
	PB.logging_enabled = false;
	PB.auto_subscribe = true;
	
	//Custom worker and manifest URL
	PB.worker_url = PB.domain + "sw.js";
	PB.manifest_url = PB.domain + "manifest.json";
	
	//Welcome notification message
	PB.welcome = {title:"Welcome ",message:"Thanks for subscribing!", url :PB.domain};
	
	function sendNotification(){
		  PB.register();
		  PB.q.push(["sendNotification", {title:"Hey ",message:"Why not?", url :"https://google.com"}]);
	}