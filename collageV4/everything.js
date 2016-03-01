var faceParts = [];
var Allimages = [];
var audioSamples = [];
var thresh = 10;
var triggerDing = true;
var totalFound = 0;
var lookingtoAdd = true;
var offsetX = 0;
var offsetY = 0;
var ww = $(window).width();
var wh = $(window).height();
var rotationVar = 45;


$(document).ready(function() {



    var x = $("#faceFinal").position();
    console.log("Top: " + x.top + " Left: " + x.left);
    offsetX = x.left;
    offsetY = x.top
 


var facePartsTarget = [
    [346+offsetX,388+offsetY], //0
    [160+offsetX,527+offsetY], //1
    [381+offsetX,502+offsetY], //2
    [302+offsetX,46+offsetY], //3
    [173+offsetX,235+offsetY], //4
    [287+offsetX,195+offsetY], //5
    [183+offsetX,261+offsetY], //6
    [330+offsetX,268+offsetY], //7
    [317+offsetX,262+offsetY], //8
    [429+offsetX,298+offsetY], //9
    [387+offsetX,411+offsetY], //10
    [408+offsetX,235+offsetY], //11
    [300+offsetX,185+offsetY], //12
    [161+offsetX,175+offsetY], //13
    [191+offsetX,423+offsetY], //14
    [197+offsetX,448+offsetY], //15
    [196+offsetX,447+offsetY], //16
    [294+offsetX,283+offsetY], //17
    [297+offsetX,383+offsetY], //18
    [301+offsetX,233+offsetY], //19
    [0, 0],
    [0, 0]
];



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

   displayAllImages();






});


function checkForFinished() {
    lookingtoAdd = true
    // console.log('checking them all')

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
        console.log('you win!')
        
        $('body').addClass('bgbg');

    }
    if (totalFound == 20){
        console.log('equals 20!')
        $('body').addClass('bgbg');
    }
    //return finished;
}

function makeImage(i) {
    var radius = 400;
    var x = wh/2 + Math.cos(20*i) * radius;
    var y = ww/2 + Math.sin(20*i) * radius;
    var imageObject = $("<img class='draggable dropshadow absolute' src='" + faceParts[i].img + "'/>")

    //give it a z-index, an ID, draggability
    imageObject.css('z-index', i);

    imageObject.attr('id', 'layer' + i);
    imageObject.css({
            'transform':'rotate('+rotationVar+'deg)'});
    imageObject.draggable({
        drag: function(event, ui) {

console.log('trigger ding is true')
            // play a tone while dragging
            faceParts[i].draggingtone.start();
            var distToTarget = distance(faceParts[i].targetX, faceParts[i].targetY, ui.offset.left, ui.offset.top);
            //change frequency as you get close to the target
            faceParts[i].draggingtone.frequency.value = 2 * (distance(faceParts[i].targetX, faceParts[i].targetY, ui.offset.left, ui.offset.top));
          $('#layer'+i).css({
            'transform':'rotate('+distToTarget+'deg)'});
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
        imageObject.offset({top: x, left: y});
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
        triggerDing=true
        lookingtoAdd = false
    }
    console.log(totalFound)
}

///////////




function Ding(){
    
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
    console.log('ding is true')
targetFoundDing.start();
triggerDing=false;
console.log('ding is false')
}

envAmplitude.triggerAttack("+0.5");
envPitch.triggerAttack("+0.5");
}


Tone.Buffer.on("load", function(){
    // console.log("all songs loaded");
    var startTime = Tone.context.currentTime + 0.1;
    for (var j = 0; j < faceParts.length; j++){
        faceParts[j].audio.start(startTime)
    }
});
