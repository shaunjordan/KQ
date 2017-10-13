const database = require('./database');
const url = require('url');
const path = require('path');
const swal = require('sweetalert');


window.onload = function() {

  populateTable();

  var groupName = document.getElementById('groupName');
  var password1 = document.getElementById('password1');
  var password2 = document.getElementById('password2');
  var password3 = document.getElementById('password3');
  var divCreation = document.getElementById('creation')

  // Sets variables for the DB objects
  document.getElementById('create').addEventListener('click', () =>{

    // addGame function (database.js)
    // checks that values are !blank
    if(groupName.value === '' || password1.value === '' || password2.value === '' || password3.value === ''){
      swal({
        title: "Did you forget something?",
        text: "Make sure you complete all fields!",
        icon: "warning"
      });
    } else {
    database.addGame(groupName.value, password1.value, password2.value, password3.value); /* , _id removed*/
    }

    groupName.value = '';
    password1.value = '';
    password2.value = '';
    password3.value = '';

    populateTable();
  });

  divCreation.addEventListener('keyup', function(e){
    var keyCode = e.keyCode;
    if(keyCode === 13){
        if(groupName.value === '' || password1.value === '' || password2.value === '' || password3.value === ''){
          swal({
            title: "Did you forget something?",
            text: "Make sure you complete all fields.",
            icon: "warning"
          });
        } else {
          database.addGame(groupName.value, password1.value, password2.value, password3.value);

          groupName.value = '';
          password1.value = '';
          password2.value = '';
          password3.value = '';

          populateTable();
        }
      }
  });

//reset button and function
document.getElementById('reset').addEventListener('click', function() {
  groupName.value = '';
  password1.value = '';
  password2.value = '';
  password3.value = '';
});

}  //end of window.onload function


function populateTable() {
  database.getGames(function(game) {

  var tableBody = '';
  for (i = 0; i < game.length; i++) {
    tableBody += '<tr>';
    tableBody += '<td>' + '<input class="groups" type="checkbox" value="' + game[i].groupName + '"' + '>' + game[i].groupName + '</td>';
    // tableBody += '<td><input type="button" value="Delete" onclick="deleteGame(\'' + game[i]._id + '\')"></td>'
    //tableBody += '<td><input type="button" class="btn btn-danger" value="Delete" onclick="deleteGame(\'' + game[i]._id + '\')"></td>'
    tableBody += '<td><span class="glyphicon glyphicon-trash" value="Delete" onclick="deleteGame(\'' + game[i]._id + '\')"</span></td>'
    tableBody += '</tr>';
  }
  document.getElementById('tablebody').innerHTML = tableBody;
  });
}

function deleteGame(id) {
  database.deleteGame(id);

  populateTable();
}
