
window.addEventListener('load', main);



function main() {

    // ***** CHANGING NAVBAR WHEN SCROLLED *****
    document.addEventListener("scroll", () => {
        let nav = document.querySelector(".navbar");
        if (window.scrollY > 0) {
            nav.classList.add("scrolled")
        }
        if (window.scrollY == 0) {
            nav.classList.remove("scrolled")
        }
    });

    
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