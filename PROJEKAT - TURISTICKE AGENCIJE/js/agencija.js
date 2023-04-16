
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
var destinationsInDestinationsID = [];
var destinationsInDestinations = {};


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

    let body = document.querySelector("body");
    let id = body.getAttribute('id');

    loadAgencies(id);

    let bodyID = document.getElementById(id);
    let newp = document.createElement('p');
    newp.innerHTML = id;

    bodyID.appendChild(newp);

}


function loadAgencies(cur) {
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
            loadAgency(cur); 
        }
    }
    request.open('GET', firebaseUrl + '/agencjie.json');
    request.send();
}
function loadAgency(cur) {
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
            appendAgencyBody(cur, agency);
        }
    }
    request.open('GET', firebaseUrl + '/agencjie/' + agenciesID[cur] + '.json');
    request.send();
}



function appendAgencyBody(cur, agency) {
    /*
    let mainBoxes = document.querySelector(position);
    //console.log(agency);
    let newp= document.createElement('p');
    newp.innerHTML = agency.naziv;
    mainBoxes.appendChild(newp);*/

    let newTitle = document.getElementById("header1");
    newTitle.innerHTML = agency.naziv;
    let newHead = document.querySelector(".head");
    newHead.style.backgroundImage = "url(" + agency.logo + ")";

    loadDestinations(cur, agency.destinacije);
}


function loadDestinations(cur, dest) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                destinationsID = [];
                destinations = JSON.parse(request.responseText);
                for (let id in destinations) {
                    var destination = destinations[id];
                    /*console.log("\n");
                    console.log("id: " + id);*/
                    if (id === dest) {
                        for (let wtf in destination) {
                            appendMainBox2(".boxes", destination[wtf]);
                            /*console.log("WTF: " + wtf);
                            console.log("destinacijaWTF: " + );*/
                        }
                    }
                    /*console.log("destinacija: " + destinations[id]);
                    
                    console.log("\n");*/
                    destinationsID.push(id);
                }
                /*console.log("ids: " + destinationsID);
                console.log("id 0: " + destinationsID[0]);*/
                
            } else {
                alert('Error occurred. Car could not be loaded.')
            }
           
        }
    }
    request.open('GET', firebaseUrl + '/destinacije.json');
    request.send();
}
function loadDestination(cur) {
    // GET by id
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                destinationsInDestinationsID = [];
                for (let id in destinationsID) {
                    var destination = destinations[id]; 
                    appendMainBox2(".boxes", destination);
                }   
            } else {
                alert('Error occurred. Car could not be loaded.')
            }
            //appendDestinationBody(cur, destination);
        }
    }
    request.open('GET', firebaseUrl + '/destinacije/' + destinationsID[cur] + '.json');
    request.send();
}



function appendMainBox2(position, destination) {

    console.log(destination);
    let newMainBox = document.createElement('a');
    newMainBox.setAttribute('href', "destinacija" + curBox + ".html");
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