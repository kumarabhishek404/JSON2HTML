var container = document.getElementById('container');
container.style.height = "230px"

// var ob1 = document.getElementById("transform").getAttribute("placeholder");
// console.log(typeof ob1);
function getdata() {
    const dataFromInput = document.getElementById('transform').value;
    if (dataFromInput !== "") {
        var container = document.getElementById('container');
        container.style.height = "auto"
        var modified = dataFromInput.replace(/'/g, "\"")

        if(modified.charAt(0) === "["){
            modified = modified.substring(1, modified.length-1);
        }
        // console.log(modified);
        var ob1 = JSON.parse(modified);
        // console.log(ob1);


        window.onerror = function (error, url, line) {
            console.log(error);
            var message = document.getElementById("err3");
            message.style.display = "block"
        };
        if (typeof ob1 == "object") {
            // console.log(typeof ob1, "ds");
            var html = json2html(ob1)
            document.getElementById('container').innerHTML = html;
        }
        else {
            var message = document.getElementById("err1");
            message.style.display = "block"
        }
    }
    else {
        var message = document.getElementById("err2");
        message.style.display = "block"

    }
}

function oneEndTag(data, attribute) {

    return `<${data.kind} ${attribute}/>`;

}

function json2html(data) {
    let allSelfClosingTags = ["area", "base", "br", "col", "command", "embed", "hr", "menuitem", "meta", "param", "img", "input", "link", "source", "track", "wbr", "keygen",]
    const a = addAttributes(data)
    if (!data || !data.kind) {
        return "";
    } else if (allSelfClosingTags.includes(data.kind)) {
        oneEndTag(data, a)
    }
    const b = addChildren(data)
    if(data.value == undefined){
        return `<${data.kind} ${a}>${b}</${data.kind}>`
    }
    console.log(`<${data.kind} ${a}>${b}</${data.kind}>`);
    return `<${data.kind} ${a}>${b}${data.value}</${data.kind}>`
    
    
    
}

function addAttributes(data) {
    var attributes = {};
    for (var key in data){
            if(data.hasOwnProperty(key)){
                    if(key === "kind" || key === "child" || key === "value"){
                            continue
                        }
                        // console.log(key + ':' + data[key]);
                        attributes[key] = data[key]

        }
    }
    // console.log(attributes);
    // if (!data.attributes) {
    //     return "";
    // }
    let allAttrs = "";
    const attrs = Object.keys(attributes);
    // console.log(attrs);
    for (const value in attrs) {
        (allAttrs += `${attrs[value]}="${attributes[attrs[value]]}" `);
    }
    // console.log(allAttrs);
    return allAttrs;
}

function addChildren(data) {
    if (!data.child) {
        return "";
    }
    else {
        let tag = "";
        for (const child in data.child) {
            if ("object" == typeof data.child[child]) {
                tag += json2html(data.child[child])
            }
            else {
                tag += data.child[child]
            }
        }
        return tag
    }
}