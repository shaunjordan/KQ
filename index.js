const database = require('./database');
const url = require('url');
const path = require('path');
const swal = require('sweetalert');

/**
This file is trying to do it all. Some of it successfully, despite all my
best efforts. That said, this really needs to be more of a view file.
**/



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

document.body.addEventListener('click', function (event){
// this section handles what happens if list items on the edit.html are clicked
// it should be split off into a controller file
if(event.target.dataset.edits){
    target = event.target;

    let remove = ["glyphicon", "glyphicon-remove-circle"];
    let confirm = ["glyphicon", "glyphicon-ok-circle"];
    const listItem = target.parentElement;

    const input = document.createElement('input');
    const cancelThisEdit = document.createElement('span');
    const confirmThisEdit = document.createElement('span');

    listItem.classList.add('editing');

    input.value = target.innerText;
    listItem.appendChild(input);
    listItem.appendChild(cancelThisEdit);
    listItem.appendChild(confirmThisEdit);

    // using a spread operator here to see if it works
    // it does, and it's an easy way to add classes
    // also, should have used FontAwesome
    cancelThisEdit.classList.add(...remove);
    confirmThisEdit.classList.add(...confirm);

    input.focus();

    // cancel button - glyphicon remove circle
    // removes the children of the li element
    // and removes the editing class from the li element
    // should probably split the remove and toggle into separate function
    // since that code shows up in two functions confirm/cancel
    cancelThisEdit.onclick = function(){
      listItem.classList.toggle('editing');
      this.parentNode.removeChild(input);
      this.parentNode.removeChild(confirmThisEdit);
      this.parentNode.removeChild(this);
    }

    // confirm button
    confirmThisEdit.onclick = function(){

      let dbId = document.querySelector('.editList').id;
      let elementId = this.parentNode.firstElementChild.id;
      let updateValue = this.parentNode.children[1].value;
      let label = this.parentNode.firstElementChild;

      label.innerHTML = updateValue;

      switch(elementId){
        case 'nameUp':

          db.update({_id: dbId}, {$set:{groupName: updateValue}}, function(err){
            if(err){alert(err);}
          });
          populateTable();
          break;
        case 'pwd1Up':
          db.update({_id: dbId}, {$set:{password1: updateValue}}, function(err){
            if(err){alert(err);}
          });
          break;
        case 'pwd2Up':
          db.update({_id: dbId}, {$set:{password2: updateValue}}, function(err){
            if(err){alert(err);}
          });
          break;
        case 'pwd3Up':
          db.update({_id: dbId}, {$set:{password3: updateValue}}, function(err){
            if(err){alert(err);}
          });
          break;
        default:
          break;
      }
      listItem.classList.toggle('editing');
      this.parentNode.removeChild(input);
      this.parentNode.removeChild(cancelThisEdit);
      this.parentNode.removeChild(this);
    };
  }
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
    // tableBody += '<td><button type="button" onclick="populateEditList(\'' + game[i]._id + '\')" data-section="edit" class="glyphicon glyphicon-pencil"</button></td>';
    tableBody += '<td><span onclick="populateEditList(\'' + game[i]._id + '\')" data-section="edit" class="glyphicon glyphicon-pencil"</span></td>';
    tableBody += '<td><span class="glyphicon glyphicon-trash" value="Delete" onclick="deleteGame(\'' + game[i]._id + '\')"</span></td>';
    tableBody += '</tr>';
  }
  document.getElementById('tablebody').innerHTML = tableBody;
  });
}

//
function populateEditList(id){
  var editList = '';
  var editArray = [];
  db.findOne({_id: id}, function(err, docs){
    editArray = (Object.values(docs));


    editList += '<li><label data-edits = "e0" id="nameUp">' + editArray[0] + '</label></li>';
    editList += '<li><label data-edits = "e1" id="pwd1Up">' + editArray[1] + '</label></li>';
    editList += '<li><label data-edits = "e2" id="pwd2Up">' + editArray[2] + '</label></li>';
    editList += '<li><label data-edits = "e3" id="pwd3Up">' + editArray[3] + '</label></li>';

    document.querySelector('.editList').innerHTML = editList;
    document.querySelector('.editList').id = id;
  });
}

function deleteGame(id) {
  database.deleteGame(id);

  populateTable();
}

function removeChildren(e){

}
