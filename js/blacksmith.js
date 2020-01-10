/**
 * Created by RA on 12/25/2016.
 */

var $debug = true;

var $scripts = [
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"
    // ,"http://ajax.googleapis.com/ajax/libs/prototype/1.6.1.0/prototype.js"
];

// var $mainContainer = document.getElementById('mainContainer');

function init() {
    trace('init');
    load()
}

function load() {
    trace('load');
    loadJS($scripts);
}

function start() {
    trace('start');

    tl = new TimelineLite();
    tl.to(mainContainer,2,{opacity:1})
        // .from(mainContainer,1,{top:-20},'-=1')
        // .from(mainContainer,2,{scale:0.5},"-=2");
}

function loadJS(link) {
    loadScripts(link,function(){
        trace('Scripts loaded');
        start();
    });
}

function loadScripts(array,callback){
    var loader = function(src,handler){
        var script = document.createElement("script");
        script.src = src;
        script.onload = script.onreadystatechange = function(){
            script.onreadystatechange = script.onload = null;
            handler();
        }
        var head = document.getElementsByTagName("head")[0];
        (head || document.body).appendChild( script );
    };
    (function run(){
        if(array.length!=0){
            loader(array.shift(), run);
        }else{
            callback && callback();
        }
    })();
}

// trace for consistent console logging
function trace(value) {
    if ($debug == true) {
        console.log('<<< ',value,' >>>')
    }
}

window.addEventListener('load',init)