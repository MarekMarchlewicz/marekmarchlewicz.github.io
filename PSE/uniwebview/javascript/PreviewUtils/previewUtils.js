/*var mainTo = setTimeout(showTimer, 1000);
var HOto;*/
var previewUtils = new function() {
    
    //To check if the page is being loaded as Iframe or not.
    this.inIframe=function() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    };
    
    //to dynamically load a JS file
    this.loadJS=function(file) {
        // DOM: Create the script element
        var jsElm = document.createElement("script");
        // set the type attribute
        jsElm.type = "application/javascript";
        // make the script element load file
        jsElm.src = file;
        // finally insert the element to the body element in order to load the script
        document.head.appendChild(jsElm);
        
        jsElm.onLoad=function(){
            alert("js loaded");
        }
        
    };
    
   
};

var FontUtils = new function(){
    this.resize = function(id){
        var curfontsize = $(id).css("font-size");
        curfontsize = parseInt(curfontsize);
        var fontscale = $(document).height()/480;
        var newfontsize = Math.round(curfontsize*fontscale);
        $(id).css("font-size",newfontsize);
    }
};

function playSoundMedia(file,delay){
   /* //console.log(file+":"+delay)
    _file=file;
    if(file=="")return;
    _delay=delay;
    if(parseFloat(delay)==0){
        playSoundNow();
    }
    else{
        setTimeout(function(){
            playSoundNow();
        },delay);
    }*/
}

function stopSoundMedia(){
   /* SoundPlayer.StopAudio();*/
}

function playSoundNow(){
    /*SoundPlayer.PlayAudio(_file);*/
}
