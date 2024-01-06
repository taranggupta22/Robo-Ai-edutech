var $tickerWrapper = $(".tickerwrapper");
var $list = $tickerWrapper.find("ul.ticker-list");
var $clonedList = $list.clone();
var listWidth = 10;

$list.find("li").each(function (i) {
    listWidth += $(this, i).outerWidth(true);
});

var endPos = $tickerWrapper.width() - listWidth;

$list.add($clonedList).css({
    "width": listWidth + "px"
});

$clonedList.addClass("cloned").appendTo($tickerWrapper);

//TimelineMax
var infinite = new TimelineMax({ repeat: -1, paused: true });
var time = 40;

infinite
    .fromTo($list, time, { rotation: 0.01, x: 0 }, { force3D: true, x: -listWidth, ease: Linear.easeNone }, 0)
    .fromTo($clonedList, time, { rotation: 0.01, x: listWidth }, { force3D: true, x: 0, ease: Linear.easeNone }, 0)
    .set($list, { force3D: true, rotation: 0.01, x: listWidth })
    .to($clonedList, time, { force3D: true, rotation: 0.01, x: -listWidth, ease: Linear.easeNone }, time)
    .to($list, time, { force3D: true, rotation: 0.01, x: 0, ease: Linear.easeNone }, time)
    .progress(1).progress(0)
    .play();

//Pause/Play		
$tickerWrapper.on("mouseenter", function () {
    infinite.pause();
}).on("mouseleave", function () {
    infinite.play();
});

function main() {
    const navLinks = document.querySelector("#links");
    const hamburgerOpen = document.querySelector(".open");
    const hamburgerClose = document.querySelector(".close");

    navLinks.classList.add("hide");
    hamburgerOpen.classList.add("show");

    hamburgerClose.onclick = function () {
        this.classList.remove("show");
        hamburgerOpen.classList.add("show");
        menuDisplay("close", navLinks);
    }

    hamburgerOpen.onclick = function () {
        this.classList.remove("show");
        hamburgerClose.classList.add("show");
        menuDisplay("open", navLinks);
    }
}

function menuDisplay(state, navLinks) {
    if (state == "open") {
        navLinks.classList.remove("hide");
    } else if (state == "close") {
        navLinks.classList.add("hide");
    }
}

window.onload = function () {
    main();
}