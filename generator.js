// Generator

const database = require('./database');
const url = require('url');
const path = require('path');
const BrowserWindow = require('electron').remote.BrowserWindow;
const openGameWindow = document.getElementById('openGameWindow');
const { remote } = require('electron');
const swal = require('sweetalert');

var checkedGroups = [];
var helperArray = [];
var gameArray = [];
var correctPasswordCounter1 = 0;
var correctPasswordCounter2 = 0;
var correctPasswordCounter3 = 0;
var correctPasswordCounter4 = 0;

openGameWindow.addEventListener('click', function(){
  getChecked();
});



// Gets value of checked items and pushes to checkedGroups array
function getChecked(){
    checkedGroups = [];
    gameArray = [];
    var inputElements = document.getElementsByClassName('groups');
    for (var i = 0; inputElements[i]; ++i){
        if(inputElements[i].checked){
            checkedGroups.push(inputElements[i].value);
        }
    }
    if(checkedGroups.length < 1){
        swal("Oops!","You need to select at least one group to play.", "error");
        checkedGroups = [];
    } else if (checkedGroups.length > 4){
      swal("You've selected too many groups!","Please choose four groups or fewer to play.", "error");
      checkedGroups = [];
    } else {
        helper();
    }

} //end function

// Queries DB based on checkedGroups values and returns an object
// TODO: refactor this to eliminate the need for a helperArray
function helper(){
  helperArray = [];

//
  checkedGroups.forEach(function(checkedGroups){
    db.find({groupName: {$in: [checkedGroups]}}, function(err, docs){
      helperArray.push(docs);
    });
  });
  setTimeout(function(){
    helperArray.forEach(function(helperArray){
      gameArray.push({
        groupName: helperArray[0].groupName,
        password1: helperArray[0].password1,
        password2: helperArray[0].password2,
        password3: helperArray[0].password3
      });
    });

    loadGame();
  }, 500);
}

// Loads game data onto relative page
function loadGame(){
  console.log(helperArray);
  const sections = document.querySelectorAll('.js-section.shown');
  const gamepageone = document.getElementById('gpage1-section');
  const boxContainer = document.getElementById('box-container');


  var topLeft = gameArray[0].groupName;
  var topRight = gameArray[0].groupName;
  var idNumber = 1;
  var numberOfInputs = 3



  Array.prototype.forEach.call(sections, function (section) {
  section.classList.remove('shown')
  });
  /* creates all element on gamepageone.html */
  // gamepageone.appendChild(boxContainer);
  // boxContainer.className = ("boxContainer");


  if(checkedGroups.length >= 1 || checkedGroups.length <= 4){
    gamepageone.classList.add('shown');
    // footer.classList.add('show-btn');

    for(var i = 1; i <= helperArray.length; i++){
      var divs = document.createElement('div');
      // var treasureDiv = document.createElement('div');
      var treasureChest = document.createElement('img');
      var teamNames = document.createElement('h2');
      boxContainer.appendChild(divs);
      divs.id = "top" + i;
      divs.className = "inputSections";

      divs.appendChild(teamNames);
      teamNames.textContent = helperArray[i-1][0].groupName; // i - 1 because var i starts at 1 for aesthetic purposes

      divs.appendChild(treasureChest);
      treasureChest.id = "treasure" + i;
      treasureChest.src="./assets/images/tr3lockscompressed.png";

      // divs.appendChild(treasureDiv);
      // treasureDiv.className = "treasure";

      for(var j = 1; j <= numberOfInputs; j++){
        var inputBox = document.createElement("input");
        divs.appendChild(inputBox);
        inputBox.id = "input" + idNumber;
        inputBox.placeholder = 'Enter Password ' + j;
        inputBox.className = 'inputs ';
        idNumber++;
      } //end j for
    }

    inputHandler();
  }
}

function inputHandler() {
  var input1 = document.getElementById('input1');
  var input2 = document.getElementById('input2');
  var input3 = document.getElementById('input3');
  var input5 = document.getElementById('input5');
  var input6 = document.getElementById('input6');
  var input7 = document.getElementById('input7');
  var input8 = document.getElementById('input8');
  var input9 = document.getElementById('input9');
  var input10 = document.getElementById('input10');
  var input11 = document.getElementById('input11');
  var input12 = document.getElementById('input12');

  var treasure1 = document.getElementById('treasure1');

  correctPasswordCounter1 = 0;
  correctPasswordCounter2 = 0;
  correctPasswordCounter3 = 0;
  correctPasswordCounter4 = 0;

  input1.addEventListener('keyup', function(e){
    var keyCode = e.keyCode;
    if(keyCode === 13){
      if(input1.value === helperArray[0][0].password1 ){
        input1.disabled = true;
        // treasure1.src = "";
        correctPasswordCounter1++;
        passwordCounterSet1();
      }
    }
  });

  input2.addEventListener('keyup', function(e){
    var keyCode = e.keyCode;
    if(keyCode === 13){
      if(input2.value === helperArray[0][0].password2 ){
        input2.disabled = true;
        correctPasswordCounter1++;
        passwordCounterSet1();
      }
    }
  });

  input3.addEventListener('keyup', function(e){
    var keyCode = e.keyCode;
    if(keyCode === 13){
      if(input3.value === helperArray[0][0].password3 ){
        input3.disabled = true;
        correctPasswordCounter1++;
        passwordCounterSet1();
      }
    }
  });

  input4.addEventListener('keyup', function(e){
    var keyCode = e.keyCode;
    if(keyCode === 13){
      if(input4.value === helperArray[1][0].password1 ){
        input4.disabled = true;
        correctPasswordCounter2++;
        passwordCounterSet2();
      }
    }
  });

  input5.addEventListener('keyup', function(e){
    var keyCode = e.keyCode;
    if(keyCode === 13){
      if(input5.value === helperArray[1][0].password2 ){
        input5.disabled = true;
        correctPasswordCounter2++;
        passwordCounterSet2();
      }
    }
  });

  input6.addEventListener('keyup', function(e){
    var keyCode = e.keyCode;
    if(keyCode === 13){
      if(input6.value === helperArray[1][0].password3 ){
        input6.disabled = true;
        correctPasswordCounter2++;
        passwordCounterSet2();
      }
    }
  });

  input7.addEventListener('keyup', function(e){
    var keyCode = e.keyCode;
    if(keyCode === 13){
      if(input7.value === helperArray[2][0].password1 ){
        input7.disabled = true;
        correctPasswordCounter3++;
        passwordCounterSet3();
      } // else statement on each of these to run the animation
    }
  });

  input8.addEventListener('keyup', function(e){
    var keyCode = e.keyCode;
    if(keyCode === 13){
      if(input8.value === helperArray[2][0].password2 ){
        input8.disabled = true;
        correctPasswordCounter3++;
        passwordCounterSet3();
      }
    }
  });

  input9.addEventListener('keyup', function(e){
    var keyCode = e.keyCode;
    if(keyCode === 13){
      if(input9.value === helperArray[2][0].password3 ){
        input9.disabled = true;
        correctPasswordCounter3++;
        passwordCounterSet3();
      }
    }
  });

  input10.addEventListener('keyup', function(e){
    var keyCode = e.keyCode;
    if(keyCode === 13){
      if(input10.value === helperArray[3][0].password1 ){
        input10.disabled = true;
        correctPasswordCounter4++;
        passwordCounterSet4();
      }
    }
  });

  input11.addEventListener('keyup', function(e){
    var keyCode = e.keyCode;
    if(keyCode === 13){
      if(input11.value === helperArray[3][0].password2 ){
        input11.disabled = true;
        correctPasswordCounter4++;
        passwordCounterSet4();
      }
    }
  });

  input12.addEventListener('keyup', function(e){
    var keyCode = e.keyCode;
    if(keyCode === 13){
      if(input12.value === helperArray[3][0].password3 ){
        input12.disabled = true;
        correctPasswordCounter4++;
        passwordCounterSet4();
      }
    }
  });
}

function passwordCounterSet1(){
  switch (correctPasswordCounter1) {
    case 1:
      treasure1.src = './assets/images/treasureTwoLocks.png';
      break;
    case 2:
      treasure1.src = './assets/images/treasureOneLock.png';
      break;
    case 3:
        treasure1.src = './assets/images/treasureOpen2.png'; // chest opens
      break;
    default:
      break;
  }
}

function passwordCounterSet2(){
  switch (correctPasswordCounter2) {
    case 1:
      treasure2.src = './assets/images/treasureTwoLocks.png';
      break;
    case 2:
      treasure2.src = './assets/images/treasureOneLock.png';
      break;
    case 3:
        treasure2.src = './assets/images/treasureOpen2.png'; // chest opens
      break;
    default:
      break;
  }
}

function passwordCounterSet3(){
  switch (correctPasswordCounter3) {
    case 1:
      treasure3.src = './assets/images/treasureTwoLocks.png';
      break;
    case 2:
      treasure3.src = './assets/images/treasureOneLock.png';
      break;
    case 3:
        treasure3.src = './assets/images/treasureOpen2.png'; // chest opens
      break;
    default:
      break;
  }
}

function passwordCounterSet4(){
  switch (correctPasswordCounter4) {
    case 1:
      treasure4.src = './assets/images/treasureTwoLocks.png';
      break;
    case 2:
      treasure4.src = './assets/images/treasureOneLock.png';
      break;
    case 3:
        treasure4.src = './assets/images/treasureOpen2.png'; // chest opens
      break;
    default:
      break;
  }
}

exports.gameArray = gameArray;
