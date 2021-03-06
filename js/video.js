//grab the room from the URL
var room = location.search.split('&')[0];

// create our webrtc connection
var webrtc = new SimpleWebRTC({
	// the id/element dom element that will hold "our" video
	localVideoEl: 'local',
	// the id/element dom element that will hold remote videos
	remoteVideosEl: 'remote',
	// immediately ask for camera access
	autoRequestMedia: true,
	log: true
});

// when it's ready, join if we got a room from the URL
webrtc.on('readyToCall', function () {
	// you can name it anything
	if (room) webrtc.joinRoom(room);
});

// Since we use this twice we put it here
function setRoom(name) {
	//                $('form').remove();
	//                $('h1').text(name);
	//                $('#subTitle').text('Link to join: ' + location.href);
	$('body').addClass('active');
}

if (room) {
	setRoom(room);
} else {
	/*                $('form').submit(function () {
    var val = $('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
    webrtc.createRoom(val, function (err, name) {
	var newUrl = location.pathname;// + '?' + name;
	if (!err) {
	    history.replaceState({foo: 'bar'}, null, newUrl);
	    setRoom('');
	}
    });
    return false;          
});
	 */            }

/*            var button = $('#screenShareButton'),
setButton = function (bool) {
    button.text(bool ? 'share screen' : 'stop sharing');
};

setButton(true);

if (!webrtc.screenSharingSupport) {
button[0].disabled = true;
} else {
button.click(function () {
    if (webrtc.localScreen) {
	webrtc.stopScreenShare();
	setButton(true);
    } else {
	webrtc.shareScreen();
	setButton(false);
    }
});
}*/
