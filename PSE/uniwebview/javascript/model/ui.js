/**
 * ...
 * @author Milbert Cale@Playware Studios
 */

var ui = new function(){
    this.previewImg = function(path){
        if(strFuncs.debug)$("#contentWrapper").hide();
        $("#minigameWrapper").append("<div id='imgPreviewID'><img src='"+path+"'/><div>Tap to close</span></div>");
        $("#imgPreviewID").unbind().click(function(){
            $(this).remove();
            if(strFuncs.debug)$("#contentWrapper").fadeIn(250);
        });
        FontUtils.resize("#imgPreviewID div");
        
    };
 };
