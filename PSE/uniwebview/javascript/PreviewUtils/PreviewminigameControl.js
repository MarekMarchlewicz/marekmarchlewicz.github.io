/**
 * ...
 * @author Milbert Cale@Playware Studios
 */

var mainTo;
var HOto;
var gameType="minigame";
var mainToCtr="";
var overrollScore=0;

var tries=3;
var currentInstructions="";
var showCorrectAnswer;
var instructionsCloseCallback;
var CorrectFeedback="";
var WrongFeedback="";
var triesAttempted=0;

var instrImgPath="";
var info="";
var curGameScore=0;
var showFeedback=true;
 

var minigameControl = new function(){
    this.showInstruction = function(str){
        var imgPath = minigameXMLManager.getInstructionImage();
        if((str==undefined||str=="")&&(imgPath==undefined||imgPath==""))return;
        if(minigameXMLManager.getShowOnload()){
            currentInstructions = str;
            $("#instructionWrapper").remove();
            if(strFuncs.debug)$("#contentWrapper").hide();
            $("body").append("<div id='instructionWrapper'></div>");
           $("#instructionWrapper").css({
               width: "100%",
               height:"100%"
            });
            if(imgPath!=""&&imgPath!=undefined){
                $("#instructionWrapper").css({
                   backgroundImage:"url("+imgPath+")" 
                });
                $("#instructionWrapper").append("<div id='instructionTextWithImg'>"+str+"</div>");
            }
            else{
                 $("#instructionWrapper").css({
                   backgroundImage:"url(../images/minigames/mgs_instruction.png)" 
                });
                $("#instructionWrapper").append("<div id='instructionText'>"+str+"</div>");
                
                tapDiv ="<div id='instructionTap'>Tap to Continue</div>";  
                $("#instructionWrapper").append(tapDiv);
            }
            FontUtils.resize("#instructionText");

           /* var lft =$("#instructionIcon").offset().left + $("#instructionIcon").outerWidth() + 2;
            $("#headerScoreID").css({
                left:lft
            });*/

            $("#instructionWrapper").css({
               width: "100%",
               height:"100%"
            });
            
            
            $('#instructionWrapper').unbind().click(function(e){
                if(strFuncs.debug)$("#instructionWrapper").fadeIn(250);
                $(this).fadeOut(250,function(){
                    $(this).remove();
                });
                if(instructionsCloseCallback!= undefined)instructionsCloseCallback();
            });
        }
        $("#instructionIcon").show();

        /*var lft =$("#instructionIcon").offset().left + $("#instructionIcon").outerWidth() + 2;
        $("#headerScoreID").css({
            left:lft
        });*/
    };
    this.Array=[];
    this.Object={};
    this.GameObject={};
    this.MenuObject={};
    this.init=function(){
        $("#closeBtnImg").mousedown(function(){
            closeWindow();
        });
        $("#prevsubmitBtnID").mousedown(function(){
            verifyAnswer();
        });

        $("#showAnswerBtnID").mousedown(function(){
            $("#showAnswerBtnID").hide();
            showTheCorrectAnswer();
        });
  
        $("#retryBtnID").mousedown(function(){
            triesAttempted++;
            retryInstantly();
        });

        $("#instructionIcon").mousedown(function(){
           instructionIconClick();
        });

       // tries++;
        minigameControl.Array=[];
        minigameControl.Object={};
        minigameControl.Object.minigameClass="minigame";
        minigameControl.Object.name = minigameXmlName;
        minigameControl.Object.retry=tries;
        minigameControl.Object.Games=[];
        minigameControl.Array.push(minigameControl.Object);
        PlayedMiniGameList.push(minigameControl.Object);
    }
};

function instructionIconClick(){
    $("#instructionIcon").unbind();
    //strFuncs.log("Text:"+$("#instructionWrapper").length);
    if($("#instructionWrapper").length==0){
        if(strFuncs.debug)$("#contentWrapper").fadeOut();
        minigameControl.showInstruction(currentInstructions);
    }
    else{
        $("#instructionWrapper").remove();
        if(strFuncs.debug)$("#contentWrapper").fadeIn();
    } 
    setTimeout(function(){
        $("#instructionIcon").unbind().click(instructionIconClick);
    },250);
}


function retryInstantly(){
    triesAttempted++;
     minigameControl.GameObject.instantRetried=true;
     $("#retryBtnID").off("mousedown");
     $("#feedbackParentID").hide();
     $("#submitBtnID").text("SUBMIT");
   //  minigameManager.startGame(ctr,true);
     
     setTimeout(function(){			
        $("#retryBtnID").on("mousedown",function(){
            retryInstantly();
        });
    },500);
    
}
function showTheCorrectAnswer(){
    minigameControl.GameObject.answerShown=true;
    $("#showAnswerBtnID").off("mousedown");
    $("#showAnswerBtnID").hide();
    if(strFuncs.debug)$("#contentWrapper").show();
    $("#feedbackParentID").hide();
    try{
        showCorrectAnswer();
    }
    catch(e){}
    setTimeout(function(){			
        $("#showAnswerBtnID").on("mousedown",function(){
            showTheCorrectAnswer();
        });
    },500);
}

function resetVars(){
    ctr=0;
    curGameScore=0;
    timeCounter=0;
    currentSlideNum=0;
    scoredMiniCtr=0;
}

function verifyAnswer(){
    
 //   $("#submitBtnID").off("mousedown");
    correctBool=false;
    
    $('#instructionWrapper').remove();
    
        var correctFeedBackNotEmpty=true;
        if(correctAnswers.toString()==currentAnswers.toString()){
           // overrollScore++;
            correctBool=true;
        }
        
        if(correctBool){
            curGameScore+=1;
            
            if(minigameXMLManager.getCorrectFeedback()=="")correctFeedBackNotEmpty=false;//This is to not show feedback when the correct feedback is empty
        }
    
    //    if(minigameControl.GameObject)minigameControl.GameObject.correctAnswer = correctBool;
      //  $("#headerScoreID").text("Score: "+curGameScore);
        if(showFeedback){
            if(correctFeedBackNotEmpty){
                $("#submitBtnID").text("NEXT");
                showCheckMark(correctBool);

              //  if(minigameXMLManager.getShowAnswer()){
                    if(!correctBool){
                        if(tries==0||triesAttempted>=tries){
                           /* $("#showAnswerBtnID").css({
                                display:"inline-block"
                            });*/
                            bindFeedbackScreen("Tap to View Answer","#showAnswerBtnID");
                        }
                        else{
                            $("#showAnswerBtnID").hide();
                        }
                    }
             //   }
                else{
                    $("#showAnswerBtnID").hide();
                }
            //    if(instantRetry){
                    if(!correctBool){
                        console.log(tries+":"+triesAttempted);
                        if(tries==0||triesAttempted<tries){
                            /*$("#retryBtnID").css({
                                display:"inline-block"
                            });*/
                            bindFeedbackScreen("Tap to Retry","#retryBtnID");
                            $("#submitBtnID").hide();
                        }
                        else {
                            $("#submitBtnID").show();
                        }
                    }
              //  }
            }
            else{
                ctr++;
               // minigameManager.startGame(ctr);
            }
        }
        else{
            ctr++;
           // minigameManager.startGame(ctr);
        }
   // }
    
    window.setTimeout(function(){			
        $("#submitBtnID").on("mousedown",function(){
            verifyAnswer();
        });
    },500);
}

function bindFeedbackScreen(msg,buttonToBind)
{
     $("#feedbackParentID").unbind();
     $("#feedbackTapMsg").text(msg);
     $("#feedbackParentID").on("mousedown",function()
     {$(buttonToBind).mousedown();});
    
}

function showCheckMark(bool){
    $("#feedbackParentID").css({
        top:"0px",
       height:$("body").height()
        
    });
    
    var feedbackText = "";
    if(bool){
        feedbackText = minigameXMLManager.getCorrectFeedback();
        $("#feedbackParentID").css("background-image","url(../images/minigames/mgs_correct.png)");
    }
    else {
        feedbackText = minigameXMLManager.getWrongFeedback();
        $("#feedbackParentID").css("background-image","url(../images/minigames/mgs_wrong.png)");
    }

    if(feedbackText=="") {
        //verifyAnswer();
        //alert("no feedback:"+bool)
        ctr++;
        minigameManager.startGame(ctr);
        $("#submitBtnID").text("SUBMIT");
    }
    else {
        $("#feedbackParentID").html("<div id='feedbackText'>"+feedbackText+"</div>");
        FontUtils.resize("#feedbackText");
        
        tapDiv ="<div id='feedbackTapMsg'></div>";  
        $("#feedbackParentID").append(tapDiv);
        FontUtils.resize("#feedbackTapMsg");
        bindFeedbackScreen("Tap to Continue","#retryBtnID");
        
        $("#headerScoreID").html("Score : "+curGameScore);
        if(strFuncs.debug)$("#contentWrapper").hide();
        $("#feedbackParentID").fadeIn();
    }
}
