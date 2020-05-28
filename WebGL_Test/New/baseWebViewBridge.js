
// 	Unity >>>>>>>>>>>> Javascript
var enableBridgeDebug = false;
function UnityBridge_WebView_loadHtml(webViewPtr, input) 
{ // IntPtr, string
	if(enableBridgeDebug)
		console.log("UnityBridge_WebView_loadHtml: " + input);
}

function UnityBridge_WebView_loadUrl(_nativeWebViewPtr, url) { // IntPtr, string
	if(enableBridgeDebug)
		console.log("UnityBridge_WebView_loadUrl: " + url);
	$('#gameMediaIndex').attr('src', url);
}

function UnityBridge_WebView_click(webViewPtr, x, y) { // IntPtr, int, int
	if(enableBridgeDebug)
		console.log("UnityBridge_WebView_click: " + x + "," + y);
}

function UnityBridge_WebView_executeJavaScript(webViewPtr, javaScript, resultCallbackId) { // IntPtr, string, string
	if(enableBridgeDebug)
		console.log("UnityBridge_WebView_executeJavaScript: " + javaScript + " , " + resultCallbackId);
	var parsedMessage = JSON.parse(javaScript);
	document.getElementById('gameMediaIndex').contentWindow.postMessage(parsedMessage);
	//document.getElementById('gameMediaIndex').contentWindow.VuplexManager.OnMessageReceived(parsedMessage);
}

function UnityBridge_WebView_ensureFocus() {
	document.activeElement.blur();
}


//	Javascript >>>>>>>>>>> Unity

var unityInstance;
function UnityPostMessage(message){
	if(enableBridgeDebug)
		console.log("UNITY post message " + JSON.stringify(message));
	unityInstance.SendMessage('WebGLWebView', 'HandleMessageEmitted', JSON.stringify(message));
}


// Logger
// 	Unity jslib >>>>>>>>>>>> Javascript
function pwLogToPage(input) {
	console.log("pwlogger: " + input);
	jsonLog = input;
}


//	Javascript >>>>>>>>>>> Unity
function pwLogToUnity(message) {
	console.log("UNITY post message " + JSON.stringify(message));
	unityInstance.SendMessage('PWLogger', 'UpdateUnityLog', JSON.stringify(message));
}