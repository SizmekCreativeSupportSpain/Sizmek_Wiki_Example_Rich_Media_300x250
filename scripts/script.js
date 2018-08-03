/*******************
VARIABLES
*******************/
var creativeId = "Banner"; //Use anything that uniquely identifies this creative
var creativeVersion = "1.0.18"; //0.0.1 during initial dev, 1.0.0 on release, x.x.x once released and receives updates
var lastModified = "2017-08-02";
var lastUploaded = "2017-08-02";
var templateVersion = "2.0.24";

var bannerDiv;
var userActionButton;
var clickthroughButton;
var video;
var sdkData;
var adId, rnd, uid;
var isMRAID;

/*******************
INITIALIZATION
*******************/
function checkIfAdKitReady(event) {
	adkit.onReady(initializeCreative);
}

function initializeCreative(event) {
	try { //try/catch just in case localPreview.js is not included
		if (window.localPreview) {
			window.initializeLocalPreview(); //in localPreview.js
		}
	}
	catch (e) {}

	//Workaround (from QB6573) for Async EB Load where Modernizr isn't properly initialized
	typeof Modernizr === "object" && (Modernizr.touch = Modernizr.touch || "ontouchstart" in window);

	window.registerInteraction = function() {}; //overwrite rI function because it will never actually be called
	initializeGlobalVariables();
	initializeVideoTracking();
	addEventListeners();
}

function initializeGlobalVariables() {
	adId = EB._adConfig.adId;
	rnd = EB._adConfig.rnd;
	uid = EB._adConfig.uid;

	bannerDiv = document.getElementById("banner");
	clickthroughButton = document.getElementById("clickthroughButton");
	video = document.getElementById("video");

	if (!isMRAID) {
		sdkData = EB.getSDKData();
		isMRAID = sdkData !== null && sdkData.SDKType === "MRAID";
	}
}

function initializeVideoTracking() {
	videoTrackingModule = new EBG.VideoModule(video);
	if (autoPlayVideo && !EB.API.os.ios) {
		video.muted = true;
		videoTrackingModule.playVideo(false);
	}
}

function addEventListeners() {
	clickthroughButton.addEventListener("click", handleClickthroughButtonClick);
}

function registerInteraction() {
	//Register your automatic and user interactions here and the platform will parse them on workspace upload. This function will not be called.
	//Example: 'Left_Gutter_Viewed'

	//EB.automaticEventCounter("interactionName1");
	//EB.automaticEventCounter("interactionName2");

	//EB.userActionCounter("userActionName1");
	//EB.userActionCounter("userActionName2");
}

/*******************
EVENT HANDLERS
*******************/

function handleClickthroughButtonClick() {
	pauseVideo();
	EB.clickthrough();
}

/*******************
UTILITIES
*******************/
function pauseVideo() {
	if (video) {
		video.pause();
	}
}

window.addEventListener("load", checkIfAdKitReady);