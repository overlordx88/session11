var users_output = document.getElementById('users-output');
var comments_output = document.getElementById('comments-output');
var user_temp = document.getElementById('user-template').innerHTML;
var comments_temp = document.getElementById('comments-template').innerHTML;
var response = null;
var index = null;
window.onload = init;

function init(){
    loadJSON(function(res){
        response = res;
        users_output.innerHTML = build(res, user_temp);
    }, 'GET', 'https://jsonplaceholder.typicode.com/users');
}

function loadJSON(callback, method, url){
    var xHR= new XMLHttpRequest;
    xHR.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // var $this = this;
            callback(JSON.parse(this.response));
        }
    }
    xHR.open(method, url, true);
    xHR.send();
}
function build(data, temp){
    var template = Handlebars.compile(temp);
    var html = template(data);
    return html;
}

function findUser($this){
   index = $this.getAttribute('data-id');
//    var url = 'https://jsonplaceholder.typicode.com/posts?userId='+ response[index].id;
   loadJSON(function(res){
    comments_output.innerHTML = build(res, comments_temp);
   }, 'GET', 'https://jsonplaceholder.typicode.com/posts?userId='+ response[index].id);
}




function findComment($this) {
    index = $this.getAttribute('data-id');
    return response.body;

}


function add() {
    if (document.getElementById('name').value == "") {
        alert('Please enter your name...');
    } else {
        var name = document.getElementById('name').value;
        var username = document.getElementById('username').value;
        document.getElementById('name').value = "";
        document.getElementById('username').value = "";
        // var obj = {"name": name, "username": username};
        response.push({ "name": name, "username": username });
        users_output.innerHTML = build(response, user_temp);
    }
}

function deleteUser() {
    response.splice(index, 1);
    users_output.innerHTML = build(response, user_temp);

}

function editUser() {
    response[index].name = document.getElementById('edited-name').value;
    users_output.innerHTML = build(response, user_temp);
}

function addcomment() {
    var body = comments.value;
    // document.getElementById('comments').value = "";
    response.push({ "body": body });
    comments_output.innerHTML = build(response, comments_temp);

}

function editComment() {
    response[index].body = document.getElementById('comments').value;
    comments_output.innerHTML = build(response, comments_temp);
}

function deleteComment() {
    response.splice(index, 1);
    comments_output.innerHTML = build(response, comments_temp);
}