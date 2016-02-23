//change Z index
// know whEn they are in their final place: http://jqueryui.com/droppable/
// loop their song with blank space, endlessly, once they are in their final place

var faceParts = [];
var Allimages = [];
var audioSamples = [];
var thresh = 10;
var env = new Tone.Envelope({
    "attack": 0.1,
    "decay": 0.2,
    "sustain": 1,
    "release": 0.8,
});


var facePartsTarget = [
    [346,388], //0
    [160,527],
    [381,502], //2
    [302,46], //3
    [173,235], //4
    [287,195], //5
    [183,261], //6
    [330,268], //7
    [317,262], //8
    [429,298], //9
    [387,411], //10
    [408,235],//11
    [300,185], //12
    [161,175], //13
    [191,423], //14
    [197,448], //15
    [196,447], //16
    [294,283], //17
    [297,383], //18
    [301,233], //19
    [1, 0],
    [1, 0]
];
for (var i = 0; i < 20; i++) {
    //create a player from each file
    var player = new Tone.Player({
        "url": "http://evejweinberg.github.io/samples/audio" + i + ".wav",
        loop: true,
    }).toMaster();
    // var dragTone = new Tone.SimpleSynth().toMaster();
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
    var finished = false;
    //look at all face parts
    for (var i = 0; i < faceParts.length; i++) {
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
            console.log('Layer' + i + 'is at:' + Math.round(ui.offset.left) + ',' + Math.round(ui.offset.top) + '||  target:  ' + faceParts[i].targetX + ',' + faceParts[i].targetY);

            //is it close to the target?
            if (Math.abs(faceParts[i].targetX - ui.offset.left) < thresh && Math.abs(faceParts[i].targetY - ui.offset.top) < thresh) {
                faceParts[i].draggingtone.stop();
                console.log('TargetHit!')
                faceParts[i].onTarget = true;
                console.log('is true??' + faceParts[i].onTarget)
                faceParts[i].audio.start();
                console.log(distance(faceParts[i].targetX, faceParts[i].targetY, ui.offset.left, ui.offset.top))

            } else {
                distance(faceParts[i].targetX, faceParts[i].targetY, ui.offset.left, ui.offset.top)
                console.log(distance(faceParts[i].targetX, faceParts[i].targetY, ui.offset.left, ui.offset.top))

            }
        },
        stop: function(event, ui) {
            console.log('it stopped dragging, check all layers');
            checkForFinished();
            //audioSamples[i].start();
        }
    });
    $('body').append(imageObject);
}

function displayAllImages() {
    // Here has to be some error!!! //
    for (i = 0; i < faceParts.length; i++) {
        makeImage(i);
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}



$(document).ready(function() {
    displayAllImages();
});
