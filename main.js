window.cfg = [];
window.cfg_bool = [];

$.getJSON("config.json", function(data) {
    window.cfg = [
        data.style.heading_font,
        data.style.link_font,
        data.style.heading_font_size,
        data.style.link_font_size,
        data.style.background,
        data.style.foreground,
        data.style.heading_color,
        data.style.link_color,
        data.style.border_color,
        data.style.border_width,
        data.style.link_hover_color,
        data.ext.ref,
        data.ext.bottom,
        data.ext.right,
        data.ext.height,
        data.ext.width,
        data.ext.opacity,
        data.clock.hour_format
    ];

    window.cfg_bool = [
        data.bool.borders,
        data.bool.simplesearch,
        data.bool.alwaysopen,
        data.bool.mascot
    ];
 

    if (window.cfg_bool[3]) {
        $("#bgimg").css({
            "backgroundImage": "url('" + cfg[13] + "')",
            "bottom": cfg[14],
            "right": cfg[15],
            "height": cfg[16],
            "width": cfg[17],
            "opacity": cfg[18]
        });
    }
    else {
        $("#bgimg").css({
            "backgroundImage": ""
        });
    }
}).done(function() {
        updateClock();
});

function evenContainerHeight() {
        if (window.innerHeight % 2 == 0) {
                document.getElementById("container").style.height = window.innerHeight;
        }
    else {
                document.getElementById("container").style.height = window.innerHeight - 1;
        }
}

window.onresize = function() {
        evenContainerHeight();
};

function changeMascot(imgPath) {
        if (window.cfg_bool[3]) {
                imgPath = (imgPath == "") ? window.cfg[13] : imgPath;

                if (imgPath == window.cfg[13]) {
                    $("#bgimg").css({
                        "backgroundImage": "url('" + imgPath + "')",
                        "height": window.cfg[16],
                        "width": window.cfg[17],
                        "opacity": window.cfg[18]
                    });
                }
                else {
                        $("#bgimg").css({
                        "backgroundImage": "url('" + imgPath + "')",
                        "height": "117px",
                        "width": "127px",
                        "opacity": "0.5"
                    });
                }
    }
    else {
        $("#bgimg").css({
            "backgroundImage": ""
        });
    }
}

function updateClock() {
        var currentTime = new Date();
        var currentHours = currentTime.getHours();

        var greeting = "";
         var currentHours = currentTime.getHours();
var currentMinutes = currentTime.getMinutes();

$.ajax({
    success: function (clock) {
        if (currentMinutes.toString().length == 1) {
            currentMinutes = "0" + currentMinutes;
        }

        document.getElementById("hour").firstChild.nodeValue = currentHours;
        document.getElementById("minutes").firstChild.nodeValue = currentMinutes;
    }
});
        // Seems like it's only executing the last if-statement
        // Did I write something wrong?
        /*greeting = ((0 <= currentHours) && (currentHours < 6)) ? "Good Night" : "1";
        greeting = ((6 <= currentHours) && (currentHours < 12)) ? "Good Morning" : "2";
        greeting = ((12 <= currentHours) && (currentHours < 18)) ? "Good Afternoon" : "3";
        greeting = ((18 <= currentHours) && (currentHours < 22)) ? "Good Evening" : "4";
        greeting = ((22 <= currentHours) && (currentHours < 24)) ? "Sleep Well" : "5";*/
        //Greeting'e gerek yok diye comment out!
       /* if ((0 <= currentHours) && (currentHours < 6)) {
                switch (currentHours) {
                        case 0:
                                greeting = "Midnight";
                                break;
                        default:
                                greeting = "Good Night";
                                break;
                }
        }

        if ((6 <= currentHours) && (currentHours < 12)) { greeting = "Moin, Moin"; }

        if ((12 <= currentHours) && (currentHours < 18)) {
                switch (currentHours) {
                        case 12:
                                greeting = "Noon";
                                break;
                        case 16:
                                greeting = "Good Morning";
                                changeMascot("img/waffle.png");
                                break;
                        default:
                                greeting = "Good Morning";
                                changeMascot(window.cfg[13]);
                                break;
                }
        }*/

       // if ((18 <= currentHours) && (currentHours < 22)) { greeting = "Guten Abend"; }
        //if ((22 <= currentHours) && (currentHours < 24)) { greeting = "Schlafenszeit"; }

        var currentMinutes = currentTime.getMinutes();
        var currentSeconds = currentTime.getSeconds();

        currentMinutes = ((currentMinutes < 10) ? "0" : "") + currentMinutes;
        currentSeconds = ((currentSeconds < 10) ? "0" : "") + currentSeconds;

        var currentTimeString = currentHours + ":" + currentMinutes;

        if (window.cfg[19] == "12") {
                var timeOfDay = (currentHours < 12) ? "am" : "pm";

                currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
                currentHours = (currentHours == 0) ? 12 : currentHours;

                currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;
        }

        document.getElementById("clock").firstChild.nodeValue = currentTimeString;
        document.getElementById("greeting").firstChild.nodeValue = greeting;
}

document.addEventListener("DOMContentLoaded", function() {
        evenContainerHeight();

        setInterval("updateClock()", 10000);



    var sqr = document.querySelectorAll(".sqr");
    var i = 0;
    var lenSqr = sqr.length;

    if (!window.cfg_bool[2]) {
        for (i = 0; i < lenSqr; ++i) {
            sqr[i].addEventListener("mouseover", expand, false);
            sqr[i].addEventListener("mouseout", contract, false);
        }
    }
    else {
        for (i = 0; i < lenSqr; ++i) {
            var a = 0;

            for (var x = 0; x < lenSqr; ++x) {
                if (a < sqr[x].getElementsByTagName("a").length) {
                    a = sqr[x].getElementsByTagName("a").length;
                }
            }
            sqr[i].style.height = (225 + 25 * a) + "px";

            if (window.cfg_bool[0]) {
                sqr[i].style.borderTop = cfg[9] + " solid " + cfg[8];
                sqr[i].style.borderBottom = cfg[9] + " solid " + cfg[8];
            }
        }
    }
});

function expand() {
        var acount = this.getElementsByTagName("a").length;
    var icount = this.getElementsByTagName("input").length;

    if (icount >= 1) {
        this.style.height = (100 + 15 * icount) + "px";
    }
    else {
        this.style.height = (270 + 5 * acount) + "px";
    }

    if (window.cfg_bool[0]) {
        this.style.borderTop = cfg[9] + " solid " + cfg[8];
        this.style.borderBottom = cfg[9] + " solid " + cfg[8];
    }
}
function contract() {
        this.style.height = "75px";
        this.style.borderTop = "0 solid" + cfg[8];
        this.style.borderBottom = "0 solid" + cfg[8];
}

String.prototype.replaceChars = function(character, replacement) {
    var str = this;
    var a;
    var b;
    var strLen = str.length;

    for (var i = 0; i < strLen; i++){
        if (str.charAt(i) == character){
            a = str.substr(0, i) + replacement;
            b = str.substr(i + 1);
            str = a + b;
        }
    }

    return str;
};

window.onunload = function() {
    delete window.cfg;
    delete window.cfg_bool;
};