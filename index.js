var container = document.getElementById('container');
container.style.height = "230px"

// var ob1 = document.getElementById("transform").getAttribute("placeholder");
// console.log(typeof ob1);
function getdata() {
    const dataFromInput = document.getElementById('transform').value;
    if (dataFromInput !== "") {
        var container = document.getElementById('container');
        container.style.height = "auto"
        const modified = dataFromInput.replace(/'/g, "\"")
        var ob1 = JSON.parse(modified);


        window.onerror = function (error, url, line) {
            console.log(error);
            var message = document.getElementById("err3");
            message.style.display = "block"
        };
        if (typeof ob1 == "object") {
            console.log(typeof ob1, "ds");
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

    return `<${data.tag} ${attribute}/>`;

}

function json2html(data) {
    let allSelfClosingTags = ["area", "base", "br", "col", "command", "embed", "hr", "menuitem", "meta", "param", "img", "input", "link", "source", "track", "wbr", "keygen",]
    const a = addAttributes(data)
    if (!data || !data.tag) {
        return "";
    } else if (allSelfClosingTags.includes(data.tag)) {
        oneEndTag(data, a)
    }
    const b = addChildren(data)
    return `<${data.tag} ${a}>${b}</${data.tag}>`



}

function addAttributes(data) {
    if (!data.attributes) {
        return "";
    }
    let allAttrs = "";
    const attrs = Object.keys(data.attributes);
    for (const value in attrs) {
        (allAttrs += `${attrs[value]}="${data.attributes[attrs[value]]}" `);
    }
    return allAttrs;
}

function addChildren(data) {
    if (!data.children) {
        return "";
    }
    else {
        let tag = "";
        for (const child in data.children) {
            if ("object" == typeof data.children[child]) {
                tag += json2html(data.children[child])
            }
            else {
                tag += data.children[child]
            }
        }
        return tag
    }
}