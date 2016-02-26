
var faceParts = [];
var Allimages = [];
var audioSamples = [];
var thresh = 10;
var triggerDing = true;
var totalFound = 0;
var lookingtoAdd = true;
function Ding()
{
    
    var envAmplitude = new Tone.AmplitudeEnvelope({
    "attack": 0.001,
    "decay": 2,
    "sustain": 0,
    "release": 0.8,
}).toMaster();

var targetFoundDing = new Tone.Oscillator({
    "type" : "sine5",
    "frequency" : 1200
}).connect(envAmplitude);



var envPitch = new Tone.FrequencyEnvelope({
    "baseFrequency": 300,
    "octaves" : 2,
    "sustain" : 0,
    "attack" : 0.1,
    "decay" : 1

}).connect(targetFoundDing.frequency);
if (triggerDing==true){
targetFoundDing.start();
triggerDing=false;
}

envAmplitude.triggerAttack("+0.5");
envPitch.triggerAttack("+0.5");}


var facePartsTarget = [
    [346,388], //0
    [160,527], //1
    [381,502], //2
    [302,46], //3
    [173,235], //4
    [287,195], //5
    [183,261], //6
    [330,268], //7
    [317,262], //8
    [429,298], //9
    [387,411], //10
    [408,235], //11
    [300,185], //12
    [161,175], //13
    [191,423], //14
    [197,448], //15
    [196,447], //16
    [294,283], //17
    [297,383], //18
    [301,233], //19
    [0, 0],
    [0, 0]
];

Tone.Buffer.on("load", function(){
    // console.log("all songs loaded");
    var startTime = Tone.context.currentTime + 0.1;
    for (var j = 0; j < faceParts.length; j++){
        faceParts[j].audio.start(startTime)
    }
});


for (var i = 0; i < 20; i++) {
    //create a player from each file
    var player = new Tone.Player({
        "url": "http://evejweinberg.github.io/samples/DJsamples/" + i + ".mp3",
        loop: true,
        "volume" : -Infinity
    }).toMaster();
    var dragTone = new Tone.Oscillator(440).toMaster();


    var imgURL;
    if (i < 10) {
        imgURL = "assets/face_0" + i + ".png";
    } else {
        imgURL = "assets/face_" + i + ".png";
    }

    var facePart = {
        draggingtone: dragTone,
        img: imgURL,
        audio: player,
        targetX: facePartsTarget[i][0],
        targetY: facePartsTarget[i][1],
        onTarget: false

    };
    faceParts.push(facePart);
   

}

function checkForFinished() {
    lookingtoAdd = true
    console.log('checking them all')

    var finished = false;
    //look at all face parts
    for (var i = 0; i < faceParts.length; i++) {
        if (faceParts[i].onTarget){
            $("#percentage").text(totalFound )
            
            // .css( "text-decoration", "underline" )
        }
        if (faceParts[i].onTarget === false) {
            finished = false;
        }
    }
    if (finished) {
        //
        //play the whole song!!!!!
    }
    //return finished;
}

function makeImage(i) {
    var imageObject = $("<img class='draggable dropshadow absolute' src='" + faceParts[i].img + "'/>")

    //give it a z-index, an ID, draggability
    imageObject.css('z-index', i);
    imageObject.attr('id', 'layer' + i);
    imageObject.draggable({
        drag: function(event, ui) {

            // play a tone while dragging
            faceParts[i].draggingtone.start();
            //change frequency as you get close to the target
            faceParts[i].draggingtone.frequency.value = 2 * (distance(faceParts[i].targetX, faceParts[i].targetY, ui.offset.left, ui.offset.top));
            // faceParts[i].player.start();
            // console.log('Layer' + i + 'is at:' + Math.round(ui.offset.left) + ',' + Math.round(ui.offset.top) + '||  target:  ' + faceParts[i].targetX + ',' + faceParts[i].targetY);

            //is it close to the target?
            if (Math.abs(faceParts[i].targetX - ui.offset.left) < thresh && Math.abs(faceParts[i].targetY - ui.offset.top) < thresh) {
                faceParts[i].draggingtone.stop();
                faceParts[i].onTarget = true;
                AddtoTargetCount();
                Ding();
                console.log('play sound')
                faceParts[i].audio.volume.value = 0;
                //TURN VOLUME UP HERE
                // faceParts[i].audio.volume(1)
                // console.log(distance(faceParts[i].targetX, faceParts[i].targetY, ui.offset.left, ui.offset.top))

            } else {
                var theResult = distance(faceParts[i].targetX, faceParts[i].targetY, ui.offset.left, ui.offset.top)
                // console.log('distance to target:  '+ theResult)

            }
        },
        stop: function(event, ui) {
            console.log('it stopped dragging, check all layers');
            checkForFinished();
            
        }
    });
    $('body').append(imageObject);
}

function displayAllImages() {
    for (i = 0; i < faceParts.length; i++) {
        makeImage(i);
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}


function AddtoTargetCount(){
    if (lookingtoAdd)
    {
        totalFound++
        lookingtoAdd = false
    }
    console.log(totalFound)
}
$(document).ready(function() {
    displayAllImages();
});
