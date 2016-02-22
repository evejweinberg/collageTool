//change Z index
// know whrn they are in their final place
// loop their song with blank space, endlessly, once they are in their final place



var audioSamples = [];
var env = new Tone.Envelope({
    "attack": 0.1,
    "decay": 0.2,
    "sustain": 1,
    "release": 0.8,
});
// env.connect(gainNode.gain);
// gainNode.start();
for (var i = 0; i < 16; i++) {
    // var audio0[i] = "http://evejweinberg.github.io/samples/audio0"+i+".wav";
    var player = new Tone.Player("http://evejweinberg.github.io/samples/audio" + i + ".wav").toMaster();
    audioSamples.push(player)
        // console.log("created  " + player0[i])
}




window.onload = function() { // Run this function when the document loads
// $("#layer20").draggable({
//         drag: function(event, ui) {}
//     });

 




    var colLayer;


    // Find all <img> tags in the document
    var backgroundImage = new Array();
    for (var i = 0; i < 20; i++) {
        if (i < 10) {
            colLayer = backgroundImage[i] = "assets/face_0" + i + ".png";
        } else {
            colLayer = backgroundImage[i] = "assets/face_" + i + ".png";
        }
        backgroundImage.push(colLayer)
    }

    displayAllImages();





    /* //////////psudo code/////////
  if (layer[i] is in it's destination){
loop it's sample, on a certain interval so it's hitting it's mark in the greater track
each sample is 20 frames long and the entire song is 17 seconds 
  }

  ///////////////////////////
  */
    var Allimages = [];

    function displayAllImages() {
        // Here has to be some error!!! //
        for (i = 0; i < backgroundImage.length; i++) {

            imageObject = $("<img class='draggable dropshadow' src='" + backgroundImage[i] + "'/>")


            imageObject.css('z-index', i);
            $(imageObject).attr('id', 'layer' + i).draggable({
                drag: function(event, ui) {
                    if (($(this).attr('id')) == "layer20") {
                        audioSamples[15].start();
                    } else if (($(this).attr('id')) == "layer19") {
                        audioSamples[15].start();
                    } else if (($(this).attr('id')) == "layer18") {
                        audioSamples[15].start();
                    } else if (($(this).attr('id')) == "layer17") {
                        audioSamples[15].start();
                    } else if (($(this).attr('id')) == "layer16") {
                        audioSamples[15].start();
                    } else if (($(this).attr('id')) == "layer15") {
                        audioSamples[14].start();
                    } else if (($(this).attr('id')) == "layer14") {
                        audioSamples[13].start();
                    } else if (($(this).attr('id')) == "layer13") {
                        audioSamples[12].start();
                    } else if (($(this).attr('id')) == "layer12") {
                        audioSamples[11].start();
                    } else if (($(this).attr('id')) == "layer11") {
                        audioSamples[10].start();
                    } else if (($(this).attr('id')) == "layer10") {
                        audioSamples[9].start();
                    } else if (($(this).attr('id')) == "layer9") {
                        audioSamples[8].start();
                    } else if (($(this).attr('id')) == "layer8") {
                        audioSamples[8].start();
                    } else if (($(this).attr('id')) == "layer7") {
                        audioSamples[7].start();
                    } else if (($(this).attr('id')) == "layer6") {
                        audioSamples[6].start();
                    } else if (($(this).attr('id')) == "layer5") {
                        audioSamples[5].start();
                    } else if (($(this).attr('id')) == "layer4") {
                        audioSamples[4].start();
                    } else if (($(this).attr('id')) == "layer3") {
                        audioSamples[3].start();
                    } else if (($(this).attr('id')) == "layer2") {
                        audioSamples[2].start();
                    } else if (($(this).attr('id')) == "layer1") {
                        audioSamples[1].start();
                    } else if (($(this).attr('id')) == "layer0") {
                        audioSamples[0].start();
                    }

                    console.log()

                }
            });;
            // Allimages.push(imageObject)
            $('body').append(imageObject);
        }
    }


    var images = document.getElementsByTagName("img");

    for (var i = 0; i < images.length; i++) {
        var image = images[i];

    }
    // This is the event handler function registered above
    function hide(event) {
        event.target.style.visibility = "hidden";
    }

}; //on load ends
