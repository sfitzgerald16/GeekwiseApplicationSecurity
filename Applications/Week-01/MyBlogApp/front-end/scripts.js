// server address
let _baseUrl = "http://localhost";
let _port = "3000";

function getPosts() {
    let list = document.getElementById("post-list");
    list.innerHTML = "";
    clearEdit();

    jQuery.get(`${_baseUrl}:${_port}/api/post`, function(data) {
        data.data.forEach((post) => {
            var newElement = document.createElement("li");
            let edit = `<a href='#' data-postid='${post.id}' data-postbody='${post.body}' data-postauthor='${post.author}' onclick='editpost(event)'>edit</a>`;
            let del = `<a href='#' data-postid='${post.id}' onclick='delpost(event)'>delete</a>`;
            newElement.innerHTML = `${post.id} ${post.body} <br> Author: ${post.author} ${edit} | ${del}`;
            list.appendChild(newElement);
        });
    });
}

function searchposts(e) {
    e.preventDefault();
    console.log('search')
    let list = document.getElementById("post");
    list.innerHTML = "";
    let searchVal = $('#search').val();
    console.log(searchVal)
    clearEdit();

    jQuery.post(`${_baseUrl}:${_port}/api/post/search`, { search: searchVal }, function(data) {
        data.data.forEach((post) => {
            var newElement = document.createElement("li");
            let edit = `<a href='#' data-postid='${post.id}' data-postbody='${post.body}' data-postauthor='${post.author}' onclick='editpost(event)'>edit</a>`;
            let del = `<a href='#' data-postid='${post.id}' onclick='delpost(event)'>delete</a>`;
            newElement.innerHTML = `${post.id} body: ${post.body} author: ${post.author} ${edit} | ${del}`;
            list.appendChild(newElement);
        });
    });
}

function addpost(e) {
    e.preventDefault();
    let body = $("#body");
    let author = $("#author");
    let postid = $("#postid");

    let bodyVal = body.val();
    let authorVal = author.val();

    if(bodyVal == "" || authorVal == "") {
        alert('body and author cannot be blank');
        return;
    }

    if (+postid.val() === 0) {
        jQuery.post(`${_baseUrl}:${_port}/api/post`, { body: bodyVal, author: authorVal }, function(data) {
            getPosts();
        });
    } else {
        $.ajax({
                method: "PUT",
                url: `${_baseUrl}:${_port}/api/post/${postid.val()}`,
                data: { body: body.val(), author: author.val() }
            })
            .done(function(msg) {
                getPosts();
            });
    }

    postid.val(0);
    $("#post-submit").val('Add post');
    author.val("");
    body.val("");
}

function editpost(e) {
    e.preventDefault();
    let el = $(e.srcElement);
    let body = $("#body");
    let author = $("#author");
    let id = $("#postid");


    let bodyVal = el.data("postbody");
    let authorVal = el.data("postauthor");
    let idVal = el.data("postid");

    $("#post-submit").val(`Edit post #${idVal}`);
    body.val(bodyVal);
    author.val(authorVal);
    id.val(idVal);
    $("#post-submit").val('Edit post');
    author.val(authorVal);
    body.val(bodyVal);
}

function delpost(e) {
    e.preventDefault();

    let el = $(e.srcElement);
    let postid = el.data("postid");
    if (confirm(`Are you sure you want to delete post #${postid}`)) {
        $.ajax({
                method: "DELETE",
                url: `${_baseUrl}:${_port}/api/post/${postid}`
            })
            .done(function(msg) {
                getPosts();
            });
    }
}

function clearEdit() {
    let body = $("#body");
    let author = $("#author");
    let postid = $("#postid");
    postid.val(0);
    $("#post-submit").val('Add post');
    author.val("");
    body.val("");
}


// run getposts on 
$(function() {
    // server is running from same IP as front-end so get the hostname
    _baseUrl = `http://${window.location.hostname}`;
    getPosts();
    $("#add-post").on('submit', addpost);
    $("#search-post").on('submit', searchposts);
    $("#post-showall").on('click', getPosts);
});