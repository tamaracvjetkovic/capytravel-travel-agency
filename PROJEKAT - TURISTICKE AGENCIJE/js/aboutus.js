
window.addEventListener('load', main);

var clicked = 0;


function scrollToTop() {
    var position = document.body.scrollTop || document.documentElement.scrollTop;
    if (position) {
      window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
      scrollAnimation = setTimeout("scrollToTop()", 12);
    } else clearTimeout(scrollAnimation);
}


function disableClicksOutsideLoginPopup(event) {
    let logDiv = document.querySelector(".login-div");
    if (!logDiv.contains(event.target)) {
      event.stopPropagation();
      event.preventDefault();
    }
}

var mainFilterLogin;
function showLogin() {
    let logDiv = document.querySelector(".login-div");
    logDiv.style.display = "flex";
    let main = document.querySelector(".main");
    main.style.opacity = "0.1";
    mainFilterLogin = main.style.filter;
    main.style.filter = "blur(4px)";

    let navbar = document.querySelector(".navbar");
    navbar.style.opacity = "0.1";
    navbar.style.filter = "blur(4px)";
    
    let head = document.querySelector(".head");
    head.style.opacity = "0.5";
    head.style.filter = "blur(10px)";

    let footer = document.querySelector(".footer");
    footer.style.opacity = "0.5";
    footer.style.filter = "blur(10px)";

    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "0";
    //goUp.style.filter = "blur(4px)";
    document.body.style.overflow = "hidden";
    document.body.addEventListener('click', disableClicksOutsideLoginPopup);
}
function closeLogin() {
    let logDiv = document.querySelector(".login-div");
    logDiv.style.display = "none";
    let main = document.querySelector(".main");
    main.style.filter = mainFilterLogin;
    main.style.opacity = "1";
    let navbar = document.querySelector(".navbar");
    navbar.style.filter = "none";
    navbar.style.opacity = "1";
    let head = document.querySelector(".head");
    head.style.opacity = "1";
    head.style.filter = "none";
    let footer = document.querySelector(".footer");
    footer.style.opacity = "1";
    footer.style.filter = "none";
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "1";
    goUp.style.filter = "none";
    document.body.style.overflow = "auto";
    document.body.removeEventListener('click', disableClicksOutsideLoginPopup);
}


var mainFilterRegister;
function disableClicksOutsideRegisterPopup(event) {
    let regDiv = document.querySelector(".register-div");
    if (!regDiv.contains(event.target)) {
      event.stopPropagation();
      event.preventDefault();
    }
}
function showRegister() {
    let regDiv = document.querySelector(".register-div");
    regDiv.style.display = "flex";
    let main = document.querySelector(".main");
    mainFilterRegister = main.style.filter;
    main.style.opacity = "0.1";
    main.style.filter = "blur(4px)";

    let navbar = document.querySelector(".navbar");
    navbar.style.opacity = "0.1";
    navbar.style.filter = "blur(4px)";
    
    let head = document.querySelector(".head");
    head.style.opacity = "0.5";
    head.style.filter = "blur(10px)";

    let footer = document.querySelector(".footer");
    footer.style.opacity = "0.5";
    footer.style.filter = "blur(10px)";

    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "0";
    document.body.style.overflow = "hidden";
    document.body.addEventListener('click', disableClicksOutsideRegisterPopup);
}
function closeRegister() {
    let regDiv = document.querySelector(".register-div");
    regDiv.style.display = "none";
    let main = document.querySelector(".main");
    main.style.filter = mainFilterRegister;
    main.style.opacity = "1";
    let navbar = document.querySelector(".navbar");
    navbar.style.filter = "none";
    navbar.style.opacity = "1";
    let head = document.querySelector(".head");
    head.style.opacity = "1";
    head.style.filter = "none";
    let footer = document.querySelector(".footer");
    footer.style.opacity = "1";
    footer.style.filter = "none";
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "1";
    goUp.style.filter = "none";
    document.body.style.overflow = "auto";
    document.body.removeEventListener('click', disableClicksOutsideRegisterPopup);
}



function main() {

    document.addEventListener("load", () => {
        let nav = document.querySelector(".navbar");
        let nava = document.querySelectorAll(".nava");
        if (window.scrollY > 0) {
            if (clicked === 0) {
                nav.classList.add("scrolled");
                for (let i = 0; i < nava.length; i++) {
                    nava[i].classList.add("scrolled");
                }
            } 
            let button1 = document.querySelector(".menu-button");
            button1.style.setProperty('--button1Color','black');
            let logo = document.getElementById("logo1");
            logo.src = "../slike/logo/logo1/png/logo-no-background.png";
        }
    });

    // ***** CHANGING NAVBAR WHEN SCROLLED *****
    document.addEventListener("scroll", () => {
        let nav = document.querySelector(".navbar");
        let nava = document.querySelectorAll(".nava");
        if (window.scrollY > 0) {
            if (clicked === 0) {
                nav.classList.add("scrolled");
                for (let i = 0; i < nava.length; i++) {
                    nava[i].classList.add("scrolled");
                }
            } 
            let button1 = document.querySelector(".menu-button");
            button1.style.setProperty('--button1Color','black');
            let logo = document.getElementById("logo1");
            logo.src = "../slike/logo/logo1/png/logo-no-background.png";
        }
        if (window.scrollY == 0) {
            nav.classList.remove("scrolled");
            for (let i = 0; i < nava.length; i++) {
                nava[i].classList.remove("scrolled");
            }
            if (clicked === 0) {
                let logo = document.getElementById("logo1");
                logo.src = "../slike/logo/logo2/png/logo-no-background.png";
                let button1 = document.querySelector(".menu-button");
                button1.style.setProperty('--button1Color','white');
            }
        }
    });

    // ***** GO-UP BUTTON *****
    document.addEventListener("scroll", () => {
        let goUp = document.querySelector(".go-up");
        if (window.scrollY > 0) {
            goUp.classList.add("scrolled");
        }
        if (window.scrollY == 0) {
            goUp.classList.remove("scrolled");
        }
    });

    document.getElementById('menu-toggle').onclick = function() {
        if (clicked === 0) {
            clicked = 1;
            let nava = document.querySelectorAll(".nava");
            document.querySelector(".main").style.filter = "blur(1px)";
            for (let i = 0; i < nava.length; i++) {
                nava[i].style.color = "black";
            }
            document.querySelector('.navbar').classList.toggle("navbarButtonClicked");
            let logo = document.getElementById("logo1");
            logo.src = "../slike/logo/logo1/png/logo-no-background.png";
            let button1 = document.querySelector(".menu-button");
            button1.style.setProperty('--button1Color','black');
        } else {
            clicked = 0;
            document.querySelector(".main").style.filter = "none";
            let nava = document.querySelectorAll(".nava");
            for (let i = 0; i < nava.length; i++) {
                nava[i].style.color = "";
            }
            document.querySelector('.navbar').classList.toggle("navbarButtonClicked");
            if (window.scrollY > 0) {
                let button1 = document.querySelector(".menu-button");
                button1.style.setProperty('--button1Color','black');
                let logo = document.getElementById("logo1");
                logo.src = "../slike/logo/logo1/png/logo-no-background.png";
            } else {
                let logo = document.getElementById("logo1");
                logo.src = "../slike/logo/logo2/png/logo-no-background.png";
                let button1 = document.querySelector(".menu-button");
                button1.style.setProperty('--button1Color','white');
            }
        }
    }

    let log = document.getElementById("login-button");
    log.onclick = showLogin;

    let reg = document.getElementById("register-button");
    reg.onclick = showRegister;
}




