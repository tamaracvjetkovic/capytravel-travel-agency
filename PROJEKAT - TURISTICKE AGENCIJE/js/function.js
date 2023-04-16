
window.addEventListener('load', main);

/*

***** RANDOM STUFF *****

//alert("Pravite novo dugme!");

for (let i = 0; i < 8; i++) {
    createMainBox();
}

*/

var curBox = 0;
function createMainBox() {
    let newMainBox = document.createElement('div');
    newMainBox.classList.add("box");
    newMainBox.innerHTML = " " + curBox + " ";
    let mainBoxes = document.querySelector(".boxes");
    mainBoxes.appendChild(newMainBox);
    curBox++;
};

function scrollToTop() {
    var position = document.body.scrollTop || document.documentElement.scrollTop;
    if (position) {
      window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
      scrollAnimation = setTimeout("scrollToTop()", 12);
    } else clearTimeout(scrollAnimation);
}



var firebaseUrl = 'https://turistickaagencijaprojekattaca-default-rtdb.europe-west1.firebasedatabase.app';

var agenciesID = [];
var agencies = {};


function main() {

    // ***** CHANGING NAVBAR WHEN SCROLLED *****
    document.addEventListener("scroll", () => {
        let nav = document.querySelector(".navbar");
        let nava = document.querySelectorAll(".nava");
        if (window.scrollY > 0) {
            nav.classList.add("scrolled");
            for (let i = 0; i < nava.length; i++) {
                nava[i].classList.add("scrolled");
            }
        }
        if (window.scrollY == 0) {
            nav.classList.remove("scrolled");
            for (let i = 0; i < nava.length; i++) {
                nava[i].classList.remove("scrolled");
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

    
    // ***** LOAD BOXES ON MAIN PAGE *****
    loadBoxes();
}


function loadBoxes() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                //removeMainBoxes(".box");
                agenciesID = [];
                curBox = 0;
                agencies = JSON.parse(request.responseText);
                for (var id in agencies) {
                    var agency = agencies[id];
                    appendMainBox(".boxes", agency);
                    agenciesID.push(id);
                }
            } else {
                alert('Error occurred. Car could not be loaded.')
            }
        }
    }
    request.open('GET', firebaseUrl + '/agencjie.json');
    request.send();
}


function appendMainBox(position, agency) {

    let newMainBox = document.createElement('a');
    newMainBox.setAttribute('href', "agencija" + curBox + ".html");
    newMainBox.setAttribute('id', curBox);
    newMainBox.classList.add("box");
    curBox++;
   
    let newBoxCard = document.createElement('div');
    newBoxCard.classList.add("card");  

    let newAgencyImage = document.createElement('div');
    newAgencyImage.classList.add("agency-image");
    newAgencyImage.innerHTML = '<img src = "' + agency.logo + '">';
    
    let newAgencyDesc = document.createElement('div');
    newAgencyDesc.style.textDecoration = "none";
    newAgencyDesc.classList.add("opis-agencije");

    let newAgencyName = document.createElement('p');
    newAgencyName.classList.add("ime-agencije");
    newAgencyName.innerHTML = agency.naziv;
    newAgencyDesc.appendChild(newAgencyName);
    let newAgencyAdress = document.createElement('p');
    newAgencyAdress.classList.add("adresa-agencije");
    newAgencyAdress.innerHTML = agency.adresa;
    newAgencyDesc.appendChild(newAgencyAdress);
    let newAgencyNumber = document.createElement('p');
    newAgencyNumber.classList.add("broj-telefona-agencije");
    newAgencyNumber.innerHTML = agency.brojTelefona;
    newAgencyDesc.appendChild(newAgencyNumber);
    let newAgencyEmail = document.createElement('p');
    newAgencyEmail.classList.add("email-agencije");
    newAgencyEmail.innerHTML = agency.email;
    newAgencyDesc.appendChild(newAgencyEmail);

    newBoxCard.appendChild(newAgencyImage);
    newBoxCard.appendChild(newAgencyDesc);

    newMainBox.appendChild(newBoxCard);

    let mainBoxes = document.querySelector(position);
    mainBoxes.appendChild(newMainBox);
}




/*
function removeMainBoxes(position) {
    var elem = document.querySelector(position);
    while (elem.firstChild) {
        elem.removeChild(elem.lastChild);
    }
}
*/





