// server address
let _baseUrl = "http://localhost";
let _port = "3000";

function createMayhem(e) {
    e.preventDefault();
    let content = $("#content");
    let attribute = $("#attribute");
    let css = $("#css");
    let javascript = $("#javascript");

    let contentVal = content.val();
    let attributeVal = attribute.val();
    let cssVal = css.val();
    let javascriptVal = javascript.val();

    jQuery.post(`${_baseUrl}:${_port}/api/post`, { content: contentVal, attribute: attributeVal, css: cssVal, javascript: javascriptVal }, function (data) {
    });
}

$(function () {
    // server is running from same IP as front-end so get the hostname
    _baseUrl = `http://${window.location.hostname}`;
    $("#sandbox").on('submit', createMayhem);
});