
window.addEventListener('load', main);


var curBox = 1;
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
var destinationsID = [];
var destinations = {};
var destinationsInDestinationID = [];
var destinationsInDestination = {};


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


    let pageId = window.location.hash.substr(1);
    pageId = pageId.split("-");
    loadAgencies(pageId[0], pageId[1], pageId[2]);

    /*
    let body = document.querySelector("body");
    let bodyID = (body.getAttribute('id')).split("-");
    loadAgencies(bodyID[0], bodyID[1]);
    bodyID.appendChild(newp);*/

}


function loadAgencies(cur, br, curAgency) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                agenciesID = [];
                agencies = JSON.parse(request.responseText);
                for (let id in agencies) {
                    var agency = agencies[id];
                    agenciesID.push(id);
                }
            } else {
                alert('Error occurred. Car could not be loaded.')
            }
            loadAgency(cur, br, curAgency); 
        }
    }
    request.open('GET', firebaseUrl + '/agencjie.json');
    request.send();
}
function loadAgency(cur, br, curAgency) {
    // GET by id    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                //removeTableRows('oneCar');
                var agency = JSON.parse(request.responseText);
            } else {
                alert('Error occurred. Car could not be loaded.')
            }
            loadDestinations(cur, br, agency);
        }
    }
    request.open('GET', firebaseUrl + '/agencjie/' + agenciesID[curAgency] + '.json');
    request.send();
}

/*
var destinationsInDestinationID = []
var destinationInDestination = {};
*/
function loadDestinations(cur, br, agency) {
    let dest = agency.destinacije;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                let b = 0;
                destinationsID = [];
                destinationsInDestinationID = [];
                destinations = JSON.parse(request.responseText);
                for (let id in destinations) {
                    var destination = destinations[id];
                    destinationsID.push(id);
                    if (id === dest) {
                        for (let i in destination) {
                            var destinationInDestination = destination[i];
                            destinationsInDestinationID.push(i);
                            if (b == br) {
                                loadDestination(cur, br, agency);
                            }
                            b++;
                        }
                    }      
                }           
            } else {
                alert('Error occurred. Car could not be loaded.')
            }
           
        }
    }
    request.open('GET', firebaseUrl + '/destinacije.json');
    request.send();
}
function loadDestination(cur, br, agency) {
    // GET by id
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var destination = JSON.parse(request.responseText);
            } else {
                alert('Error occurred. Car could not be loaded.')
            }
            appendDestinationBody(cur, br, agency, destination);
        }
    }
    request.open('GET', firebaseUrl + '/destinacije/' + destinationsID[cur] + "/" + destinationsInDestinationID[br] + '.json');
    request.send();
}


function appendDestinationBody(cur, br, agency, destinacija) {
   
    let newTitle = document.getElementById("header1");
    newTitle.innerHTML = destinacija.naziv;
    let newHead = document.querySelector(".head");
    newHead.style.backgroundImage = "url(" + agency.logo + ")";

    //appendMainBox2(".boxes",)
}



function appendMainBox2(position, destination, agency) {

    console.log(destination);
    let newMainBox = document.createElement('a');
    newMainBox.setAttribute('href', "destinacija" + dest + "-" + (curBox - 1) + ".html");
    newMainBox.setAttribute('id', curBox);
    newMainBox.classList.add("box");
    curBox++;
   
    let newBoxCard = document.createElement('div');
    newBoxCard.classList.add("card");  

    let newDestinationImage = document.createElement('div');
    newDestinationImage.classList.add("destination-image");
    newDestinationImage.innerHTML = '<img src = "' + destination.slike[0] + '">';

    let newDestinationDesc = document.createElement('div');
    newDestinationDesc.style.textDecoration = "none";
    newDestinationDesc.classList.add("opis-destinacije");

    let newDestinationName = document.createElement('p');
    newDestinationName.classList.add("ime-destinacije");
    newDestinationName.innerHTML = destination.naziv;
    newDestinationDesc.appendChild(newDestinationName);

    let newDestinationType = document.createElement('p');
    newDestinationType.classList.add("tip-destinacije");
    newDestinationType.innerHTML = destination.tip;
    newDestinationDesc.appendChild(newDestinationType);

    let newDestinationTransport = document.createElement('p');
    newDestinationTransport.classList.add("prevoz-destinacije");
    newDestinationTransport.innerHTML = destination.prevoz;
    newDestinationDesc.appendChild(newDestinationTransport);

    let newDestinationCost = document.createElement('p');
    newDestinationCost.classList.add("cena-destinacije");
    newDestinationCost.innerHTML = destination.cena;
    newDestinationDesc.appendChild(newDestinationCost);

    newBoxCard.appendChild(newDestinationImage);
    newBoxCard.appendChild(newDestinationDesc);

    newMainBox.appendChild(newBoxCard);

    let mainBoxes = document.querySelector(position);
    mainBoxes.appendChild(newMainBox);
}