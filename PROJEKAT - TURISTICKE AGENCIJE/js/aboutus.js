
window.addEventListener('load', main);

var clicked = 0;

function main() {

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
            for (let i = 0; i < nava.length; i++) {
                nava[i].style.color = "white";
            }
            document.querySelector('.navbar').classList.toggle("navbarButtonClicked");
            let logo = document.getElementById("logo1");
            logo.src = "../slike/logo/logo1/png/logo-no-background.png";
            let button1 = document.querySelector(".menu-button");
            button1.style.setProperty('--button1Color','black');
        } else {
            clicked = 0;
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


}

function scrollToTop() {
    var position = document.body.scrollTop || document.documentElement.scrollTop;
    if (position) {
      window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
      scrollAnimation = setTimeout("scrollToTop()", 12);
    } else clearTimeout(scrollAnimation);
  }





/*
var res = 0;
var okay = 0;

function izracunajRezultat() {
    let br1 = document.querySelector('#br1');
    let br2 = document.querySelector('#br2');
    res = Number(br1.value) + Number(br2.value);
    document.querySelector('#rezultat').innerHTML = `Rezultat je <b> ${res} </b>!`;
    okay = 1;
}

function promijeniParagraf() {
    let p1 = document.querySelector('#paragraf1');
    let vr = res;
    if (okay == 1) {
        p1.innerHTML = `<b> Vrijednost prethodne racunice je ${vr}! </b>`;
    } else {
        p1.innerHTML = `<b> Prvo unesite neki broj! </b>`; 
    }
}
function misNijeTu() {
    document.querySelector('#paragraf1').innerHTML = `Racunica za prethodno!`;
}


*/