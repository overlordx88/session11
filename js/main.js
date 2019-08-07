var output = document.getElementById('output');
var response = null;
// var fuser = null;
var index = null;
window.onload = init;

function init(){
    loadJSON(function(res){
       output.innerHTML = build(res);
    });
}
function loadJSON(callback){
    var xHR = new XMLHttpRequest;
    xHR.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
    xHR.onreadystatechange = function(){
        if(xHR.readyState == 4 && xHR.status == 200){
            response = JSON.parse(xHR.response);
            callback(response);
        }
    } 
    xHR.send(); 
}
function build(r){
    var html = "";
    for(var i = 0 ; i < r.length; i++){
        // html += '<div>'+r[i].name+'</div>';
        html += '<div class="d-flex justify-content-between p-2 mt-2 bg-info text-white box-round">';
        html += '<div class="">'+r[i].name+'</div>';
        html += '<div> <i class="fa fa-edit mr-2 text-warning" data-toggle="modal" data-target="#edit-user" data-id="'+i+'" onclick=findUser(this)></i> <i class="fa fa-trash text-danger" data-toggle="modal" data-target="#del-user" data-id="'+i+'" onclick="findUser(this)"></i> </div>';
        html += '</div>';
    }
    // output.innerHTML = html;
    return html;
}
function add(){
    if(document.getElementById('name').value == ""){
        alert('Please enter your name...');
    }
    else{
        var name = document.getElementById('name').value;
        var username = document.getElementById('username').value;
        document.getElementById('name').value = "";
        document.getElementById('username').value = "";
        // var obj = {"name": name, "username": username};
        response.push({"name": name, "username": username});
        output.innerHTML = build(response);
    }
}

function findUser($this){
    index = $this.getAttribute('data-id');
}
function deleteUser(){
    response.splice(index, 1);
    output.innerHTML = build(response);
}
function editUser(){
    response[index].name = document.getElementById('edited-name').value;
    output.innerHTML = build(response);
}