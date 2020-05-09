var LeaderBoard = new function()
{
    this.callback=null;
	this.GetData = function(callback)
	{
        LeaderBoard.callback = callback;
		UniwebviewManager.GetLeaderboardJson("LeaderBoard.dataCallback");
		
	};
    this.dataCallback = function(data){
        Global.LeaderBoardJson = $.parseJSON(data) ;
        LeaderBoard.callback(Global.LeaderBoardJson);
    }
    
    this.GetScoreSystem= function(callback)
    {
        UniwebviewManager.GetScoreSystem(callback);
        
    };

}