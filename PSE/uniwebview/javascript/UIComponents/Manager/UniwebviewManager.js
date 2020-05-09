var UniwebviewManager = new function(){
    this.IsReady=function(callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://UserUniWebViewBinder.IsReady?callback="+callback;//Calling Uniwebview function
    }
    this.GetXmlString=function(path,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.GetXmlString?0="+path+"&callback="+callback;//Calling Uniwebview function
    }
    this.GetGameDirectory = function(callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.GetGameDirectory?callback="+callback;//Calling Uniwebview function
    }
    this.IsMobilePlatform=function(callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://UserUniWebViewBinder.IsMobilePlatform?callback="+callback;//Calling Uniwebview function
    }
    this.Retrieve=function(callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://UserUniWebViewBinder.Retrieve?callback="+callback;//Calling Uniwebview function
    }
    this.LogCache=function(data,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://LogIOUniWebViewBinder.LogCache?0="+data+"&callback="+callback;
    }
    this.WriteToFile=function(path,data,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://LogIOUniWebViewBinder.WriteToFile?0="+path+"&1="+data+"&callback="+callback;
    }
    this.PlayGesture = function(gesture,char,loop,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.PlayGesture?0="+gesture+"&1="+char+"&2="+loop+"&callback="+callback;//Calling Uniwebview function
    }
    this.ResetGestureNEmotion=function(char,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.ResetGestureNEmotion?0="+char+"&callback="+callback;//Calling Uniwebview function
    }
    this.PlayEmotions = function(emotion,char,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.PlayEmotions?0="+emotion+"&1="+char+"&callback="+callback;//Calling Uniwebview function
    }
    this.setCameraEffects=function(command,params,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        var paramStr="?";
        for(var i=0;i<params.length;i++){
            paramStr+=i+"="+params[i]+"&";
        }
        window.location.href = "uniwebview://"+command+paramStr+"callback="+callback;//Calling Uniwebview function
    }
    this.SwitchToMachinima=function(shotType,panState,char1,char2,position,range,height,duration,offsetX,offsetY,offsetZ,callback){
        var param1 = shotType+"|"+panState;
        var param2 = char1+"|"+char2;
        var param3 = position+"|"+range+"|"+height;
        var param4 = duration+"|"+offsetX+"|"+offsetY+"|"+offsetZ;
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://CameraUniWebViewBinder.SwitchToMachinima?0="+param1+"&1="+param2+"&2="+param3+"&3="+param4+"&callback="+callback;//Calling Uniwebview function
    }
    this.AwardReward=function(reward,qty,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.AwardReward?0="+reward+"&1="+qty+"&callback="+callback;
    }
    this.AwardPersistentReward=function(reward,qty,msg,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        if(!msg)msg = '';
        window.location.href = "uniwebview://EventUniWebViewBinder.AwardPersistentReward?0="+reward+"&1="+qty+"&2="+msg+"&callback="+callback;
    }
    this.AwardMultiplayerReward=function(reward,qty,msg,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        if(!msg)msg = '';
        window.location.href = "uniwebview://EventUniWebViewBinder.AwardMultiplayerReward?0="+reward+"&1="+qty+"&2="+msg+"&callback="+callback;
    }
    this.ResetPersistentReward=function(reward,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.ResetPersistentReward?0="+reward+"&callback="+callback;        
    }
    this.PlayBGM=function(path,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.PlayBGM?0="+path+"&callback="+callback;//Calling Uniwebview function
    }
    this.StopBGM=function(callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.StopBGM?0="+path+"&callback="+callback
    }
    this.PlayDialog=function(path,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.PlayDialog?0="+path+"&callback="+callback;//Calling Uniwebview function
    }
    this.StopDialog=function(callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.StopDialog?callback="+callback;//Calling Uniwebview function
    }
    this.PlayMinigameAudio=function(path,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.PlayMinigameAudio?0="+path+"&callback="+callback;//Calling Uniwebview function
    }
    this.StopMinigameAudio=function(callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.StopMinigameAudio?callback="+callback;//Calling Uniwebview function
    }
    this.EndInteraction=function(callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.EndInteraction?callback="+callback;
    }
    this.GetPlayerInstanceIDAndName=function(callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://CharacterUniWebViewBinder.GetPlayerInstanceIDAndName?callback="+callback;//Calling Uniwebview function
    }
    this.ChangeMode=function(bool,type,callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.ChangeMode?0="+bool+"&1="+type+"&callback="+callback;//Calling Uniwebview function
    }
    this.GetPersistentInventory = function(callback){
       if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.GetPersistentInventory?callback="+callback;
    }
    this.BackToMainMenu=function(callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://UserUniWebViewBinder.BackToMainMenu?callback="+callback;
    }
    this.GetLeaderboardJson=function(callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.GetLeaderboardJson?callback="+callback;//Calling Uniwebview function
    }
    this.GetScoreSystem=function(callback){
        if(!callback)callback = "UniwebviewManager.callback";
        window.location.href = "uniwebview://EventUniWebViewBinder.GetScoreSystem?callback="+callback;//Calling Uniwebview function
    }
    this.callback=function(){
    }
}
