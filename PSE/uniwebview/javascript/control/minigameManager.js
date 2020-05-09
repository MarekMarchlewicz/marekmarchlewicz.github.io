/**
 * ...
 * @author Milbert Cale@Playware Studios
 */
var totalGameScore=0;
var minigameManager = new function(){   
    this.populate=function(){
        winText = minigameXMLManager.getWinText();
        console.log("winText:"+winText);
        loseText = minigameXMLManager.getLoseText();
        score = minigameXMLManager.getScore();
        winReward = minigameXMLManager.getWinReward();
        loseReward = minigameXMLManager.getLoseReward();
        showFeedback = minigameXMLManager.getShowFeedBack();
        showAnswer = minigameXMLManager.getShowAnswer();
        showRetry = minigameXMLManager.getShowRetry();
        hideBtn = minigameXMLManager.getHideBtn();
        totalScorableItem = minigameXMLManager.getTotalMinigame();
        totalItem = minigameXMLManager.getTotal();
        bgColor = minigameXMLManager.getBGColor();
        background = minigameXMLManager.getBackground();
        if(background=="")background="none"
        else background = "url("+background+")";
        htmlTxt = '<div id="headerBarID" class="minigame-class">'
                            +'<img id="instructionIcon" src="images/minigames/instruction.png"/>'
                            +'<span id="headerTotalID">0 of 0</span>'
                            +'<span id="headerScoreID">Score: 0</span>'
                    +'</div>'
                    + '<iframe src="" id="contentWrapper" frameborder="0" onload="showContentWrapper()" scrolling="no" class="minigame-class"></iframe>'
                    +'<div id="footerWrapper" class="minigame-class">'
                        +'<div id="showAnswerBtnID">SHOW ANSWER</div>'
                        +'<div id="retryBtnID">RETRY</div>'
                       + '<div id="submitBtnID">SUBMIT</div>'
                    +'</div>'
                    + '<div id="feedbackParentID"></div>'
            + '<iframe src="" id="slideShowWrapper" frameborder="0" scrolling="no"></iframe>'
            
            +'<img id="closeBtnImg" src="images/minigames/exit_common.png" alt=""/>'
            
        $("#minigameWrapper").html(htmlTxt);
        
        $(".minigame-class").css("pointer-events","none");
        
        if(hideBtn)$("#closeBtnImg").hide();
        else $("#closeBtnImg").show();
        $("#instructionIcon").css({
            left: (($("#mainContentWindow").height()*scaleY)*.05)*.1
        });
        
        $("#contentWrapper").css({
            backgroundColor: bgColor,
            backgroundImage:background
        });
        
        $("#headerScoreID").css({
            left: (($("#mainContentWindow").height()*scaleY)*.05)*.1 + (($("#mainContentWindow").height()*scaleY)*.05)*.8 + 10
        });
        
        $("#headerTotalID").css({
            right: (($("#mainContentWindow").height()*scaleY)*.05)*.1 + (($("#mainContentWindow").height()*scaleY)*.05)*.8 + 10
        });

        minigameControl.init();
        resetMinigameVariables();
    };
    this.startGame=function(_ctr,_retried){
        ctr = _ctr;
        retried = _retried
        mainToCtr=0;
        soundFile="";
        $("#contentWrapper").attr("src","");
        $("#slideShowWrapper").attr("src","");
        if(strFuncs.debug)$("#contentWrapper").hide();
        setTimeout(function(){
            $("#slideShowWrapper").hide();
        },1);
        $("#feedbackParentID").hide();
        $("#showAnswerBtnID").hide();
        $("#retryBtnID").hide();
        $("#instructionIcon").hide();
        $("#submitBtnID").css("visibility","visible");
        var winBool;
        correctAnswers=[];
        currentAnswers=[];
        
        UniwebviewManager.StopMinigameAudio("minigameManager.proceedToMinigameStart");
    };
    this.proceedToMinigameStart=function(){
        if(ctr>=minigameXMLManager.getTotal()){
            
            winBool=false;
            var msg="";
            var reward="";
            var persistentreward="";
            var multiplayerreward="";
            minigameControl.Object.totalScoredGame=totalGameScore;
            minigameControl.Object.score=curGameScore;
            console.log("curGameScore:"+curGameScore+"==minigameXMLManager.getTotalMinigame():"+totalGameScore+"==minigameXMLManager.getScore():"+minigameXMLManager.getScore())
           
            minigameControl.Object.passed=true;
            winBool=true;
            msg = minigameXMLManager.getWinText();
            reward = minigameXMLManager.getWinReward();
            persistentreward = minigameXMLManager.getWinPersistentReward();
            multiplayerreward = minigameXMLManager.getWinMultiplayerReward();
            if(totalGameScore != 0)
            {
                var percentScore = (curGameScore/totalGameScore)*100;
                if(percentScore >= minigameXMLManager.getScore()){
                    triggerQueueManager.setResultMinigame("1");
                  
                }else {
                    minigameControl.Object.passed=false;
                    triggerQueueManager.setResultMinigame("2");
                    msg = minigameXMLManager.getLoseText();
                    reward = minigameXMLManager.getLoseReward();
                    persistentreward = minigameXMLManager.getLosePersistentReward();
                    multiplayerreward = minigameXMLManager.getLoseMultiplayerReward();
                    winBool=false;
                }
            }else{
                //this is scenario in case the minigame set was all slideshow.
                triggerQueueManager.setResultMinigame("1");
            }
            
            minigameControl.Object.reward=reward;
            minigameControl.Object.persistentreward=persistentreward;
            minigameControl.Object.multiplayerreward=multiplayerreward;
            if(persistentreward!=""){
               getMinigamePersistentReward(persistentreward,1, msg);
            }
            else if(reward!=""){
                getMinigameReward(reward,1, msg);
            }
            else if(multiplayerreward!=""){
                getMinigameMultiplayerReward(multiplayerreward,1, msg);
            }
            if(msg!="" && msg!="undefined" ){
                if(winBool)$("#feedbackParentID").css("background-image","url(images/minigames/mgs_pass.png)");
                else $("#feedbackParentID").css("background-image","url(images/minigames/mgs_fail.png)");
                
                if(totalGameScore !=0){
					$("#feedbackParentID").html("<div id='feedbackPercent'>"+parseInt(percentScore)+"%</div><div id='feedbackText'>"+msg+"</div>");
				}else{
					$("#feedbackParentID").html("<div id='feedbackText'>"+msg+"</div>");
				}
                
                tapDiv ="<div id='feedbackTapMsg'></div>";  
                $("#feedbackParentID").append(tapDiv);
                FontUtils.resize("#feedbackTapMsg");
                
                FontUtils.resize("#feedbackPercent");
                FontUtils.resize("#feedbackText");
                if(strFuncs.debug)$("#contentWrapper").hide();
                $("#feedbackParentID").fadeIn();
            }  
            if(reward==""&&(msg=="" || msg =="undefined")){
                $("#closeBtnImg").mousedown();
            }
            
            $("#feedbackContentID").css({
                top:($("#contentWrapper").height()-$("#feedbackContentID").height())/2,
                left:($("#contentWrapper").width()-$("#feedbackContentID").width())/2
            });
            
            if(showRetry&&!winBool){$("#submitBtnID").text("RETRY"); bindFeedbackScreen("Tap to Retry","#submitBtnID");}
            else {
                $("#submitBtnID").text("CLOSE");bindFeedbackScreen("Tap to Continue","#submitBtnID");
            }
            return;
        }
        xmlList = minigameXMLManager.getXMLBlock(ctr);
        currentXMLList = xmlList;
        gameType = $(xmlList).find("Type").text();
        
        instantRetry = ($(xmlList).find("InstantRetry").text()=="true")?true:false;
        if(!retried){
            triesAttempted=1;
            tries = ($(xmlList).find("Tries").text()=="")?0:$(xmlList).find("Tries").text();
            if(gameType!="SLIDESHOW")totalOverrollScore++;
        }
        else{
            triesAttempted++;
        }
        $("#contentWrapper").attr("src","");
        
        if(gameType!="SLIDESHOW"&&!retried)scoredMiniCtr++;
        $("#headerTotalID").html(scoredMiniCtr+" of "+minigameXMLManager.getTotalMinigame());
        minigameControl.GameObject={};
        if(minigameControl.Object.Games){
            minigameControl.Object.Games.push(minigameControl.GameObject);
        }
        minigameControl.GameObject.index=ctr;
        minigameControl.GameObject.gameType=gameType;
        if(gameType!="SLIDESHOW"){
            minigameControl.GameObject.answerShown=false;
            minigameControl.GameObject.instantRetried=false;
        }
        mainTo = setTimeout(showTimer, 1000);
        instructionsCloseCallback = undefined;
        minigameReward = [];
        $(".minigame-class").show();
        minigameManager.showMinigameHtml();   
    }
    this.showMinigameHtml=function(){
        switch(gameType){
            case "SLIDESHOW":
                $(".minigame-class").hide();
                minigameControl.checkCorrectReward("minigameManager.showSlideShow",true);
                break;
            case "COMIC STRIP":
                $(".minigame-class").hide();
                strGameLoadedForSlide("contents/ComicStrip.html");
                break;
            
            case "MCQ":
                console.log("wrapper size:"+$("#contentWrapper").width()+","+$("#contentWrapper").height());
                //$("#contentWrapper").load("contents/mcq.html");
                strGameLoaded("contents/mcq.html");
                break;
            case "HIDDEN OBJECTS":
                //$("#contentWrapper").load("contents/hiddenobject.html");
               strGameLoaded("contents/hiddenobject.html");
                break;
            case "SORTING":
                //$("#contentWrapper").load("contents/sorting.html");
               strGameLoaded("contents/sorting.html");
                break;
            case "FILL IN THE BLANK(S)":
                 //$("#contentWrapper").load("contents/fillintheblanks.html");
                 strGameLoaded("contents/fillintheblanks.html");
                break;
            case "MISSING PIECES":
                //$("#contentWrapper").load("contents/missingpieces.html");
                 strGameLoaded("contents/missingpieces.html");
                break;
            case "STICKERS":
                //$("#contentWrapper").load("contents/stickers.html");
                strGameLoaded("contents/stickers.html");
                break;
            case "NAME IT":
                //$("#contentWrapper").load("contents/nameit.html");
                strGameLoaded("contents/nameit.html");
                break;
            case "MATCHING TYPE":
                //$("#contentWrapper").load("contents/matchingtype.html");
                strGameLoaded("contents/matchingtype.html");
                break;
            case "BLANK PARTS":
                //$("#contentWrapper").load("contents/blankparts.html");
                strGameLoaded("contents/blankparts.html");
                break;
            case "SEQUENCE":
                //$("#contentWrapper").load("contents/sequence.html");
                strGameLoaded("contents/sequence.html");
                break;
            case "GROUPING":
                strGameLoaded("contents/grouping.html");
                break;
				
            case "PICTURE ANALYSIS":
                strGameLoaded("contents/pictureanalysis.html");
                break;
                
            case "JIGSAW PUZZLE":
                strGameLoaded("contents/jigsawPuzzle.html");
                break;
                            
            case "SPOT THE DIFFERENCE":
                strGameLoaded("contents/spotTheDiff.html");
                break;
				
            case "MEMORY GAME":
                strGameLoaded("contents/memorygame.html");
                break;
				
			case "MENU MINI GAME":
                strGameLoaded("contents/menuminigame.html");
                break;
				
            case "BRANCHING TREE GAME":
                strGameLoaded("contents/branchingtree.html");
                break;

            case "TUMBLER":
                strGameLoaded("contents/tumbler.html");
                break;
            
            case "EXPERIMENT":
                strGameLoaded("contents/Experiment.html");
                break;
				
            case "GROUPING ANALYSIS":
                strGameLoaded("contents/groupingAnalysis.html");
                break;
                
            case "RESULT PAGE":
                strGameLoaded("contents/Results.html");
                break;
            
			case "HTML PAGE":
                $(".minigame-class").hide()
                htmlFolderName =$(currentXMLList).find("folderName").text();
                fileToload = "Html/"+htmlFolderName+"/index.html";
                strGameLoadedForSlide(fileToload);
                break;
        }
        $("#contentWrapper").show();
    }
    this.showSlideShow=function(){
        strGameLoadedForSlide("contents/slideshow.html");
    }
    this.resetDisplay=function(){
        $("#slideShowWrapper").attr("src","");
        $("#slideShowWrapper").hide();
        $("#feedbackParentID").hide();
        $("#showAnswerBtnID").hide();
        $("#retryBtnID").hide();
        $("#minigameWrapper").show();
    }
};

function strGameLoadedForSlide(str){
    $("#slideShowWrapper").show();
    $("#slideShowWrapper").attr("src",str);
    $("#minigameWrapper").show();
    $("#submitBtnID").show();
}

function showContentWrapper(){
//	$(".minigame-class").show();
     $(".minigame-class").css("pointer-events","initial");
	setTimeout(function(){$("#contentWrapper").show();},250);
	
}
function strGameLoaded(str){
    $("#contentWrapper").attr("src",str);
    $("#minigameWrapper").show();
    $("#submitBtnID").show();
}

function showTimer(){
    mainToCtr++;
    //$("#headerTimerIconID").html(mainToCtr);
    mainTo = setTimeout(showTimer, 1000);
}

//This is th minigame reward.
function getMinigameReward(id,num,message)
{
    ItemManager.message=message;
    ItemManager.AwardReward(id,num,"minigameRewarded");
}

function getMinigamePersistentReward(id,num, message)
{
    ItemManager.AwardPersistentReward(id,num, message,"minigameRewarded");
}

function getMinigameMultiplayertReward(id,num, message)
{
    ItemManager.AwardMultiplayerReward(id,num, message,"minigameRewarded");
}

function minigameRewarded(){
    if(ItemManager.message=="" || ItemManager.message.toString()=="undefined")$("#closeBtnImg").mousedown();   
}