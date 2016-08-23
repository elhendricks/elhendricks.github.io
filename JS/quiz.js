var elQuizForm = document.getElementById('quiz-form');
var finishFormMsg = "Looks like you didn't fill out the whole form.";

/* variables for each radio button element */
elColorful = document.getElementById('color_colorful');
elNeutral = document.getElementById('color_neutral');
elLarge = document.getElementById('size_large');
elSmall = document.getElementById('size_small');
elLand = document.getElementById('land_land');
elWater = document.getElementById('land_water');
elRare = document.getElementById('rare_rare');
elCommon = document.getElementById('rare_common');

/* objects based on responses selected in the form */
var color
var size
var land
var rare

/* array of Question objects which holdproperties of question responses from form */
var questionList

/* variables to hold sentences made from responses to form*/
var colorSentence;
var sizeSentence;
var landSentence;
var rareSentence;


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

/* assign each  question boolean value based on question response using radio button .checked status */
color = new Question(elColorful, elNeutral);
size = new Question(elLarge, elSmall);
land = new Question(elLand, elWater);
rare = new Question(elRare, elCommon);

/* sets to array of Question objects */
questionList = [color, size, land, rare];

/* put together form answers in an array
returns an array of boolean (or undefined--if Q not answered) values based on user input

*/

/* create function for event when try again button is clicked*/
function tryAgain() {
  localStorage.removeItem('results');                                           // remove results from local storage
  document.location.reload();                                                   // reload page
}

/*Function to use JS to build page based on past results*/
function displayPastResults() {
  var quizForm = document.getElementById('quiz-page');                           // get quiz page div
  quizForm.innerHTML = '<div id=\'resultsContent\' class=\'results\'></div>';    // set quiz page content to empty div with id of resultsContent and class of results
  appendResultsfromLocal();                                                      // add results from local storage
}

/*What to do if page already has content*/
if (localStorage.getItem('results') !== null) {                                 // check to see if local storage has any value for 'results' saved
  displayPastResults();                                                         // if so, display the page for the past results
  var elTryAgain = document.getElementById('tryAgain');
  elTryAgain.addEventListener('click', tryAgain, false);
}

function compileAnswers() {
var responseArray = []                                  //creates local var to hold empty array (to be populated with questionResponse)
  for (i = 0; i < questionList.length; i++) {           //for loop to loop through questionList array which holds Question objects
    var questionResponse = questionList[i].answer();      // create  questionResponse variable to hold return value of answer function from Question object.  If no answer will return  undefined
    var newItem = responseArray.push(questionResponse);   // push questionResponse to end of responseArray.
  }
  return responseArray;
}

/* loop through bird array to compare to compare answers to birds */

function compareAnswers() {
  var answerArray = compileAnswers();                   //local variable to hold result of compileAnswers()
  var birdName;                                         // create local var to hold the bird object variable from the birdArray
  var birdKey;                                          // create variable to hold array of responses
  var responseMatch = false;                            // create responseMatch variable and set to false.
  var i = 0;                                 // set counter to 0
  while (!responseMatch) {                   // loop while responses don't match
      birdName = birdArray[i];                // birdName is birdArray item at [i] index
      birdKey = birdName.valueArray();           // birdKey is array of responses
      for (j = 0; j < birdKey.length; j++ ) {// loop through array of responses for the bird object
        if (answerArray[j] !== birdKey[j]) {  // if answer from form doesn't match bird's characteristics from birdKey,
          i++;                                 // advance counter for while loop to go through birdArray
          break;                               // stop for loop
        } else if (j === birdKey.length - 1) { // else if for loop counter has gone through all indices in birdKey (which means that nothing failed to match)
          responseMatch = true;                // set response to true (which will end while loop)
          return birdName;                     // return the name of the Bird object
        }
      }
    }
  }

/*Create a paragraph based on the bird that matches user's responses.*/
function yourParagraph() {
  var yourBird = compareAnswers();  // set local variable yourBird to the return value of compareAnswers()  which holds a Bird object
  var yourParagraph;                //declare a variable of yourParagraph

  if (yourBird.colorful) {          //  if yourBird object's colorful property is true, use first sentence, otherwise, use second sentence
    colorSentence = 'The plumage and appearance of the ' + yourBird.name+ 'allow it to blend into its natural habitat. ';  // concatenate canned text and Name property of yourBird object
  } else {
    colorSentence = 'The unique appearnce of the ' + yourBird.name + ' reflects your bright personality. ';
  }

  if (yourBird.rare) {
    rareSentence = 'This elusive bird is rarely seen on Ross Island or in Oaks Bottom.  The persistent birder who quietly kayaks around the island may catch a glimpse if they are lucky. '
  } else {
    rareSentence = 'A regular party animal, this bird can be frequently seen around Oaks Bottom and Ross Island.  Even amateur birders are likely to see the common ' + yourBird.name + ' if they venture to the park. ';
  }
  if (yourBird.land) {
    landSentence = 'Look for the ' + yourBird.name + ' in the trees or flying in the skies above the park. ';
  } else {
    landSentence = 'Look for the '+ yourBird.name + ' wading in Oaksbottom lagoon or paddling in the Wilamette River. ';
  }

  if (yourBird.size) {
    sizeSentence =  'This bird is one of the larger species in the park. '
  } else {
    sizeSentence = 'A relatively small bird, the ' + yourBird.name + ' is still fun to spot. '
  }

   yourParagraph= colorSentence + sizeSentence + rareSentence + landSentence;  // set value of yourParagraph to concatenate the four sentences selected above
   return yourParagraph;  // return yourParagraph
 }

/* function to remove form from page. (may be called by event listener on form submission)*/
function removeFormContent() {
  event.preventDefault();
  var quizForm = document.getElementById('quiz-page');                          // get element with quiz_page ID
  quizForm.innerHTML = '<div id=\'resultsContent\' class=\'results\'></div>';   // replace  it with empty div with id of 'resultsContent' and class of 'results'
}

/* create content for results page. */
function createResultsDivContent() {
  var birdMatch = compareAnswers();                                              // local variable set to bird object returned from compareAnswers()
  var birdName = birdMatch.name;                                                 // local variable with the name property of the bird in plain english
  var birdPic = birdMatch.photoPath;                                             // local variable with the photo path property from the bird object
  var results = '<h1>Congratulations!</h1>';                                     // create results content with string of html tags
  results += '<img src=\'' + birdPic + '\' alt=\'' + birdName + '\'/>';             // add image with birdPic
  results += '<h2>You are a majestic ' + birdName + '.</h2>';                       // add sentence telling use what type of birt thhey are using birdName
  results += yourParagraph() + "</br";                                              // add bird paragraph
  results += '</br><button type="button" id="tryAgain">Try Again!</button>';        // add a button that allows user to try again
  return results;                                                               // return results string
}

/* Save new results content div from createResultsDivContent to local storage as 'results'*/
function saveResultsToLocal() {
  localStorage.setItem('results', JSON.stringify(createResultsDivContent()));
}

/* add results div from local storage */
function appendResultsfromLocal() {
  var results = JSON.parse(localStorage.getItem('results'));                     // get 'results' from local storage
  var elResults = document.getElementById('resultsContent');                     // get  div element for resultsContent
  elResults.innerHTML = results;                                                 // set innerHTML of div to results
  var elTryAgain = document.getElementById('tryAgain');                       //get element of try again button
  elTryAgain.addEventListener('click', tryAgain, false);                      //create event listener for when button is clicked.

}

/* create a function to do all of the things necessary to do when the form is submitted*/
function replaceFormWithResults() {
  event.preventDefault();
  removeFormContent();                                                          // remove form content
  saveResultsToLocal();                                                         // save results to local
  appendResultsfromLocal();                                                     // add results from local
}



/* create function to validate that all form questions have been answered*/
function validateAnswers() {
  var noUndefined = true;                                                       //  declare local variable to hold whether no responses are undefined and set to true
  var array = compileAnswers();                                                 //  declare  local variable to hold array returned from compileAnswers() which holds user respnoses as booloean values and a value of undefined if the question is not answered
  for (i = 0; i < array.length; i++) {                                          // use a for loop to loop through each index of array
    if (array[i] === undefined) {                                               // if index is undefined
      noUndefined = false;                                                      // set noUndefined to false
      break;                                                                    // and stop the loop;
    }
  }
  return noUndefined;                                                           // return value of noUndefined (true if all questions are answered and false if any question os not answered)
}

/* create function for what do when form is submitted */
function formSubmitted() {
  event.preventDefault;
  if (!validateAnswers()) {                                                     // call validateAnswers and if return value is false (not all questions are answered), use an alert to tell user to try again
    alert('Looks like you missed a question.  Please try again for accurate results.');
  } else {                                                                      // else call replaceFormWithResults which calls removeFormContent, createResultsDivContent and replaceFormWithResults
    replaceFormWithResults();
//    var elTryAgain = document.getElementById('tryAgain');                       //get element of try again button
//    elTryAgain.addEventListener('click', tryAgain, false);                      //create event listener for when button is clicked.
  }
}






elQuizForm.addEventListener('submit', formSubmitted, false);







//elQuizForm.addEventListener('submit', addResultsDivContent, false);
