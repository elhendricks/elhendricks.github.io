/* Make object for each bird with some basic stats*/

function Bird(name, colorful, large, land, rare, photoPath) {
    this.name = name;
    this.colorful = colorful;
    this.large = large;
    this.land = land;
    this.rare = rare;
    this.photoPath = photoPath;
    this.valueArray = function() {
      answerKey = [this.colorful, this.large, this.land, this.rare];
      return answerKey;
    };
}

var peregrineFalcon = new Bird('Peregrine Falcon', true, true, true, true, 'Photos/PeregrineFalcon.jpg');
var redTailHawk = new Bird('Red Tailed Hawk', true, true, true, false, 'Photos/RedTailedHawk.jpg');
var sandhillCrane = new Bird('Sandhill Crane', true, true, false, true, 'Photos/SandhillCrane.jpg');
var blueHeron = new Bird('Great Blue Heron', true, true, false, false, 'Photos/GreatBlueHeron.jpg');
var redBreastedSapsucker = new Bird('Red Breasted Sapsucker', true, false, true, true, 'Photos/RedBreastedSapsucker.jpg');
var americanKestrel = new Bird('American Kestrel', true, false, true, false, 'Photos/AmericanKestrel.jpg');
var ruddyDuck = new Bird('Ruddy Duck', true, false, false, true, 'Photos/RuddyDuck.jpg');
var mallard = new Bird('Mallard', true, false, false, false, 'Photos/Mallard.jpg');
var baldEagle = new Bird('Bald Eagle', false, true, true, true, 'Photos/BaldEagle.jpg');
var osprey = new Bird('Osprey', false, true, true, false, 'Photos/Osprey.jpg');
var cacklingGoose = new Bird('Cackling Goose', false, true, false, true, 'Photos/CacklingGoose.jpg');
var cormorant = new Bird('Double Crested Cormorant', false, true, false, false, 'Photos/DoubleCrestedCormorant.jpg');
var mourningDove = new Bird('Mourning Dove', false, false, true, true, 'Photos/Mourning-Dove.jpg');
var vauxsSwift = new Bird('Vaux\'s Swift', false, false, true, false, 'Photos/VauxsSwift.jpeg');
var greaterYellowlegs = new Bird('Greater Yellowlegs', false, false, false, true, 'Photos/GreaterYellowLegs.jpg');
var killdeer = new Bird('Killdeer', false, false, false, false, 'Photos/Killdeer.jpg');

// Make an array of all the bird objects

var birdArray = [killdeer, greaterYellowlegs, vauxsSwift, mourningDove, cormorant, cacklingGoose, osprey, baldEagle, mallard, ruddyDuck, americanKestrel, redBreastedSapsucker, blueHeron, sandhillCrane, redTailHawk, peregrineFalcon];

/* variables for each radio button in the quiz*/
var colorful = document.getElementById('color_colorful');
var neutral = document.getElementById('color_neutral');
var large = document.getElementById('size_large');
var small = document.getElementById('size_small');
var land = document.getElementById('land_land');
var water = document.getElementById('land_water');
var rare = document.getElementById('rare_rare');
var common = document.getElementById('rare_common');

/*Create event listeners*/
  //declare variables
var elQuizForm = document.getElementById('quiz-form');
var finishFormMsg = "Looks like you didn't fill out the whole form.";


// create object for each question that return true/false based on radio button selected using constructor notation
function Question(option1, option2) {
  this.option1 = option1;
  this.option2 = option2;
  this.answer = function () {
    if (option1.checked) {
      return true;
    } else if (option2.checked) {
      return false;
      }
  };
}

var color = new Question(colorful, neutral);
var size = new Question(large, small);
var land = new Question(land, water);
var rare = new Question(rare, common);

var questionList = [color, size, land, rare];

var colorSentence;
var sizeSentence;
var landSentence;
var rareSentence;

// put together foom answers in an array
function compileAnswers() {
var responseArray = []
  for (i = 0; i < questionList.length; i++) {
    var questionResponse = questionList[i].answer();
    var newItem = responseArray.push(questionResponse);
  }
  return responseArray;
}

// loop through bird array to compare to compare answers to birds

function compareAnswers() {
  var answerArray = compileAnswers();
  var birdName;
  var birdKey;
  var responseMatch = false;
  var i = 0;                                 // set counter to 0
  while (!responseMatch) {                   // loop while responses don't match
      birdName = birdArray[i];                // birdName is birdArray item at [i] index
      birdKey = birdName.valueArray();           // birdKey is array of responses
      for (j = 0; j < birdKey.length; j++ ) {// loop through answerArray from form
        if (answerArray[j] !== birdKey[j]) {  // if answer from form doesn't match bird's characteristics from birdKey,
          i++;                                 // advance counter for while loop to go through birdArray
          break;                               // stop for loop
        } else if (j === birdKey.length - 1) {
          responseMatch = true;
          return birdName;
        }
      }
    }
  }

function yourParagraph() {
  var yourBird = compareAnswers();
  var yourParagraph;

  if (yourBird.colorful) {
    colorSentence = 'The plumage and appearance of the ' + yourBird.name+ 'allow it to blend into its natural habitat. ';
  } else {
    colorSentence = 'The unique appearnce of the ' + yourBird.name + ' reflects your bright personality. ';
  }

  if (yourBird.rare) {
    rareSentence = 'This elusive bird is rarely seen on Ross Island or in Oaks Bottom.  The persistent birder who quietly kayaks around the island may catch a glimpse if they are lucky. '
  } else {
    rareSentence = 'A regular party animal, this bird can be frequently seen around Oaks Bottom and Ross Island.  Even amateur birders are likely to see the common ' + yourBird.name + ' if they venture to the park.';
  }
  if (yourBird.land) {
    landSentence = 'Look for the ' + yourBird.name + ' in the trees or flying in the skies above the park. ';
  } else {
    landSentence = 'Look for the '+ yourBird.name + ' wading in Oaksbottom lagoon or paddling in the Wilamette River. ';
  }

  if (yourBird.size) {
    sizeSentence =  'This bird is one of the larger species in the park. '
  } else {
    sizeSentence = 'A relatively small bird, the ' + yourBird.name + 'is still fun to spot. '
  }

   yourParagraph= colorSentence + sizeSentence + rareSentence + landSentence;
   return yourParagraph;
 }

function removeFormContent() {
  event.preventDefault();
  var quizForm = document.getElementById('quiz-page');
  quizForm.innerHTML = '<div id=\'resultsContent\' class=\'results\'></div>';
}



function createResultsDivContent() {
  var birdMatch = compareAnswers();
  var birdName = birdMatch.name;
  var birdPic = birdMatch.photoPath;
  var results = '<h1>Congratulations!</h1>';
  results += '<img src=\'' + birdPic + '\' alt=\'' + birdName + '\'/>';
  results += '<h2>You are a majestic ' + birdName + '.</h2>';
  results += yourParagraph();
  results += '</br><button type="button" id="tryAgain">Try Again!</button>';
  return results;
}

function saveResultsToLocal() {
  localStorage.setItem('results', JSON.stringify(createResultsDivContent()));
}

function appendResultsfromLocal() {
  var results = JSON.parse(localStorage.getItem('results'));
  var elResults = document.getElementById('resultsContent');
  elResults.innerHTML = results;
}

function replaceFormWithResults() {
  event.preventDefault();
  removeFormContent();
  saveResultsToLocal();
  appendResultsfromLocal();
}

function displayPastResults() {
  var quizForm = document.getElementById('quiz-page');
  quizForm.innerHTML = '<div id=\'resultsContent\' class=\'results\'></div>';
  appendResultsfromLocal();
}

function validateAnswers() {
  var noUndefined = true;
  var array = compileAnswers();
  for (i = 0; i < array.length; i++) {
    if (array[i] === undefined) {
      noUndefined = false;
      break;
    }
  }
  return noUndefined;
}

function formSubmitted() {
  event.preventDefault;
  if (!validateAnswers()) {
    alert('Looks like you missed a question.  Please complete the whole quiz for accurate results.');
  } else {
    replaceFormWithResults();

  }
}

elQuizForm.addEventListener('submit', formSubmitted, false);




function tryAgain() {
  localStorage.removeItem('results');
  document.location.reload();
}

if (localStorage.getItem('results') !== null) {
  displayPastResults();
  var elTryAgain = document.getElementById('tryAgain');
  elTryAgain.addEventListener('click', tryAgain, false);
}



//elQuizForm.addEventListener('submit', addResultsDivContent, false);
