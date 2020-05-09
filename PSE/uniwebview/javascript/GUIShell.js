$(document).ready(function(){

	
        console.log("document ready")
	//SEND AND INITIALISE PANELS TO WINDOW MANAGER
	engine.on('Ready',function(){
        
        console.log("engine ready")
        //CHECK TO SEE WHETHER MOBILE DEVICE IS MOBILE
        engine.call('UserCoherentUIBinder.IsMobilePlatform').then(function(data){
			Global.isMobilePlatform = data;
		});
        
        //INITIALISE LOG, AUTOMATICALLY ADDS START SESSION TIME STAMP
        LoggingManager.initLoggingManager();

		//INITIALIZE DIALOG
		WindowManager.initPanelToManager("inventory",Inventory,true);
		WindowManager.initPanelToManager("learning",Learning,true);
		WindowManager.initPanelToManager("focus",Focus,true);

		//SETUP OTHER NON PANEL RELATED SYSTEMS
		MenuManager.init();
		
		//SETUP PANEL
		WindowManager.initPanelToManager("dialog",Dialog,true);

		//SETUP INITIAL RUNTIME COMPONENTS
		TriggerManager.init();
        NotificationManager.init();
        ObjectiveManager.init();
        WorldSettings.init();
        
        
        //PREACTIVE FOCUS MODE
        Global.focusModeActivated = true
        engine.trigger("EventCoherentUIBinder.ChangeMode", Global.focusModeActivated, "gameon");
        
        //DISABLE PAUSE MODE
        engine.call("EventCoherentUIBinder.Pause", false);
        
        
        //DISABELD FOR THE TIME BEING
        /*
        engine.on("AuthStatus",function(data){
            
            if(Global.tmpauth != data) console.log("AuthStatus Update:" + data);
            
            Global.tmpauth = data;
            
            if(Global.tmpauth == 2)
            {
                engine.call("OneNote_Bindings.InitMessageStore").then(function(data){
                    
                    
                    
                });
            }
            
            if(Global.tmpauth == 3)
            {
                Notes.updateNotes();
            }

        })
        */
        
        
        //SETUP ENGINE LISTENERS
		engine.on("OnEngineMessage",function(data){
            
            console.log("Engine Message: " + data.MessageContent)
            
			switch(data.TypeString)
			{
                    
                case "ERROR:" :
                    
                    console.log("INTEGRATION MESSAGE: " + data.MessageContent);
                        
                break;
                    
				case "COMMAND" :

					switch(data.MessageContent)
					{
						case "Inventory" :
							Inventory.togglePanel("inventory")
						break;

						case "Escape" :

							if(Global.showLearningBool || Global.showInvBool)
							{
								Global.showLearningBool = false;
								Global.showInvBool = false;
								MenuManager.updateMenuManagerButtonState("inventory","off")
								MenuManager.updateMenuManagerButtonState("learning","off")
								WindowManager.closeAllPanels();
							}
							else
							{
                                if(Global.tmpExitMode != true)
                                {
                                    //RETURN BACK TO THE MAIN MENU
			                         MenuManager.updateMenuManagerButtonState("menu","on");
                                    
                                    //ASSIGN TEMP EXIT MODE
                                    Global.tmpExitMode = true;

                                    //TEMPORARY STORE FOCUS MODE
                                    Global.tmpFocusMode = Global.focusModeActivated;

                                    //PAUSE THE GAME
                                    engine.call("EventCoherentUIBinder.Pause", true)

                                    //SHOW MOUSE
                                    engine.trigger("EventCoherentUIBinder.ChangeMode", false, "gameon");

                                    //RETURN BACK TO THE MAIN MENU
                                    MenuManager.updateMenuManagerButtonState("menu","on");

                                    noty({
                                        theme:'defaultTheme',
                                        text: "Hey, are you sure you are ready to quit?",
                                        buttons: [
                                            {addClass: 'btn btn-primary', text: 'Yes Please', onClick: function($noty) {
                                                    
                                                engine.call("UserCoherentUIBinder.HasArgument","-preview").then(function(data){
                                                    
                                                    console.log("PREVIEW SUPPORTED: " + data)
                                                    if(data)
                                                    {
                                                        //Exit App
                                                        engine.call("UserCoherentUIBinder.QuitApp");
                                                        
                                                    }
                                                    else
                                                    {
                                                        //RETURN BACK TO THE MAIN MENU
                                                        MenuManager.updateMenuManagerButtonState("menu","off");

                                                        Log.addAction("gameexit",{exitstate:"userdefinedexit"});
                                                        LoggingManager.completeAndStoreLog(MenuManager.exitapplication);

                                                        this.buttons = [];
                                                        //this.update();

                                                        Global.tmpExitMode = false;
                                                    }
                                                
                                                });
                                                    
                                                    
                                                }
                                            },
                                            {addClass: 'btn btn-danger', text: 'No Thanks', onClick: function($noty) {
                                                    
                                                    //RETURN BACK TO THE MAIN MENU
                                                    MenuManager.updateMenuManagerButtonState("menu","off");
                                                
                                                    engine.call("EventCoherentUIBinder.Pause", false)
                                                    engine.trigger("EventCoherentUIBinder.ChangeMode", Global.tmpFocusMode, "gameon");
                                                    $noty.close();
                                                
                                                    Global.tmpExitMode = false;
                                                }
                                            }
                                        ],
                                        modal:true,
                                        layout:'center'
                                    });
                                    
                                }
							}

						break;

						case "Objectives" :
							Inventory.togglePanel("objective")
						break;
					}

				break;

				case "INF" :

					var st = data.MessageContent.split("|");

					switch(st[0])
					{
						case "Loot" :

							//DO LOTS OF CRAZY STUFF HERE :D
							//console.log("RECIEVED LOOT MESSAGE: " + JSON.stringify(st));

							//SHOULD HAVE INV AND LOOT
							console.log("STORED ITEM: " + JSON.stringify(Global.currentRecievedItem) + " LOOT: " + JSON.stringify(st))

							var parseScoreAr = Global.currentRecievedItem.desc.split(" ");
							var score = parseInt(parseScoreAr[parseScoreAr.length-1]);


						break;
					}

				break;
			}
		});
        
	})
})