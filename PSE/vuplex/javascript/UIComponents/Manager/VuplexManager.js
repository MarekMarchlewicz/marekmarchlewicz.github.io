var VuplexManager = new function() {

    this.OnMessageReceived=function(message){
        //console.log("Message is:" + message.data);
        var callbackObject = JSON.parse(message.data)[0].callback;
        var func = window[callbackObject];

        if(!func){
            func = callbackObject;
        }
        
        var funcParams = JSON.parse(message.data)[1].arg;
        funcParams = JSON.stringify(funcParams);
        if (callbackObject.indexOf('.') > -1)
        {
            eval(func + "(" + funcParams + ")");
        } else {
            if(typeof func == "function"){
                func.call(null, funcParams);
            }
        }
    }

    this.Initialize = function(callback){

        if(window.vuplex){
            this.OnVuplexReady(callback);
        } else {
           // The window.vuplex object hasn't been initialized yet because the page is still
           // loading, so add an event listener to send the message once it's initialized.
           window.addEventListener('vuplexready', this.OnVuplexReady);
        }
    }

    this.OnVuplexReady=function(callback){
        this.OnInitialize();

        // after initialize lets gets the gamedirectory
        this.GetGameDirectory(callback);
    }

    this.OnInitialize=function(){
        window.vuplex.addEventListener('message', this.OnMessageReceived);
    }

    this.StartTheSetup=function(data){
        Global.gamedirectory = data + "/";
        LoggingManager.initLoggingManager(initLoggingManagerIsSetup); 
    }

    this.IsReady=function(){
        window.vuplex.postMessage({type:'UserVuplexWebViewBinder', value:'IsReady'});        
    }

    this.GetXmlString=function(path,callback){
        // the way callback is used here is different from the other functions due to the WebGL requirements
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'GetXMLString|' + path + '|' + callback });
    }

    this.GetGameDirectory = function(callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'GetGameDirectory|{\"callback\" : \"' + callback + '\"}'});        
    }

    this.IsMobilePlatform=function(){
    }

    this.Retrieve=function(callback){
        window.vuplex.postMessage({type:'UserVuplexWebViewBinder', value:'Retrieve|{\"callback\" : \"' + callback + '\"}'}); 
    }

    this.LogCache=function(data, callback){
        window.vuplex.postMessage({type:'LogIOVuplexWebViewBinder', value:'LogCache|' + data + '|{\"callback\" : \"' + callback + '\"}'});
    }

    this.WriteToFile=function(){
    }

    this.PlayGesture = function(gesture,char,loop,callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'PlayGesture|' + gesture + '|' + char + '|' + loop + '|{\"callback\" : \"' + callback + '\"}'}); 
    }

    this.ResetGestureNEmotion=function(char,callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'ResetGestureNEmotion|' + char + '|{\"callback\" : \"' + callback + '\"}'});
    }

    this.PlayEmotions = function(emotion,char,callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'PlayEmotions|' + emotion + '|' + char + '|{\"callback\" : \"' + callback + '\"}'});
    }

    this.SetCameraEffects=function(command,params,callback){
        var typeAndFunction = command.split('.');
        var paramStr='';
        for(var i=0;i<params.length;i++){
            paramStr+='|'+params[i];
        }
        window.vuplex.postMessage({type: + typeAndFunction[0], value: + typeAndFunction[1] + paramStr + '|{\"callback\" : \"' + callback + '\"}'});
    }

    this.SwitchToMachinima=function(shotType,panState,char1,char2,position,range,height,duration,offsetX,offsetY,offsetZ,callback){
        var param1 = shotType+"&"+panState;
        var param2 = char1+"&"+char2;
        var param3 = position+"&"+range+"&"+height;
        var param4 = duration+"&"+offsetX+"&"+offsetY+"&"+offsetZ;

        window.vuplex.postMessage({type:'CameraVuplexWebViewBinder', value:'SwitchToMachinima|' + param1 + '|' + param2 + '|' + param3 + '|' + param4 + '|{\"callback\" : \"' + callback + '\"}'}); 
    }

    this.AwardReward=function(reward,qty,callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'AwardReward|' + reward + '|' + qty + '|{\"callback\" : \"' + callback + '\"}'}); 
    }

    this.AwardPersistentReward=function(reward,qty,msg,callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'AwardPersistentReward|' + reward + '|' + qty + '|' + msg + ', {\"callback\" : \"' + callback + '\"}'});
    }

    this.AwardMultiplayerReward=function(reward,qty,msg,callback){
    }

    this.ResetPersistentReward=function(reward,callback){   
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'ResetPersistentReward|' + reward + '|{\"callback\" : \"' + callback + '\"}'});
    }

    this.PlayBGM=function(path,callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'PlayBGM|' + path + '|{\"callback\" : \"' + callback + '\"}'});
    }

    this.StopBGM=function(callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'StopBGM|' + '{\"callback\" : \"' + callback + '\"}'});
    }

    this.PlayDialog=function(path,callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'PlayDialog|' + path + '|{\"callback\" : \"' + callback + '\"}'});
    }

    this.StopDialog=function(callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'StopDialog|' + '{\"callback\" : \"' + callback + '\"}'});
    }

    this.PlayMinigameAudio=function(file,callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'PlayMinigameAudio|' + path + '|{\"callback\" : \"' + callback + '\"}'})
    }

    this.StopMinigameAudio=function(callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'StopMinigameAudio|{\"callback\" : \"' + callback + '\"}'});
    }

    this.EndInteraction=function(callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'EndInteraction|{\"callback\" : \"' + callback + '\"}'});
    }

    this.GetPlayerInstanceIDAndName=function(callback){
        window.vuplex.postMessage({type:'PlayerVuplexWebViewBinder', value:'GetPlayerInstanceIDAndName|{\"callback\" : \"' + callback + '\"}'});
    }

    this.ChangeMode=function(bool,type,callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value: 'ChangeMode|' + bool + "|" + type + '|{\"callback\" : \"' + callback + '\"}'});
    }

    this.GetPersistentInventory = function(callback){
    }

    this.BackToMainMenu=function(callback){
        window.vuplex.postMessage({type:'UserVuplexWebViewBinder', value:'BackToMainMenu|{\"callback\" : \"' + callback + '\"}'});
    }

    this.GetLeaderboardJson=function(callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'GetLeaderboardJson|{\"callback\" : \"' + callback + '\"}'});
    }

    this.GetScoreSystem=function(callback){
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'GetScoreSystem|{\"callback\" : \"' + callback + '\"}'});
    }

    this.GetStringFromFile=function(filePath, callback){
        // this function also follows the similar pattern as the GetXmlString
        window.vuplex.postMessage({type:'EventVuplexWebViewBinder', value:'GetFileString|' + filePath + '|' + callback});
    }

    this.callback=function(){
    }
}