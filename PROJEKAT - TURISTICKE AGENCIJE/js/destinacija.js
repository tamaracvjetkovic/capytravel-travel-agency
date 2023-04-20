
window.addEventListener('load', main);

var clicked = 0;
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

var picturesNum = 0;

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
            let logo = document.querySelector(".logo");
            logo.style.color = "black";
        }
        if (window.scrollY == 0) {
            nav.classList.remove("scrolled");
            for (let i = 0; i < nava.length; i++) {
                nava[i].classList.remove("scrolled");
            }
            if (clicked === 0) {
                let logo = document.querySelector(".logo");
                logo.style.color = "white";
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
            let logo = document.querySelector(".logo");
                logo.style.color = "black";
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
                let logo = document.querySelector(".logo");
                logo.style.color = "black";
            } else {
                let logo = document.querySelector(".logo");
                logo.style.color = "white";
                let button1 = document.querySelector(".menu-button");
                button1.style.setProperty('--button1Color','white');
            }
        }
    }

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


function promijeniBroj(id) {
    ids = id.split("-");
    let p = document.querySelector(".numberSlide");
    p.innerHTML = ids[2] + " / " + picturesNum;
}


function appendDestinationBody(cur, br, agency, destinacija) {
   
    let newTitle = document.getElementById("header1");
    newTitle.innerHTML = destinacija.naziv;
    let newHead = document.querySelector(".head");
    newHead.style.backgroundImage = "url(" + destinacija.slike[0] + ")";

    let newDestinationDesc = document.getElementById("opis-trenutne-destinacije");
    newDestinationDesc.innerHTML = destinacija.opis;

    let citat = document.getElementById("citat");
    citat.innerHTML = destinacija.tip;

    let logo = document.querySelector(".logo");
    logo.innerHTML = "<i> Agencija: " + agency.naziv + "</i>";

    let number = destinacija.maxOsoba; // Change this number to the desired value
    number.trim();
    number = parseInt(number);
    let interval = 20; // Change this value to control the speed of the loading effect
    if (number < 60) {
        interval = 30; 
    }
    if (number < 40) {
        interval = 35;
    }
    if (number < 20) {
        interval = 40;
    }
	let count = 0;
    let intervalId = setInterval(function() {
        document.getElementById("ispis-maks-osoba-destinacije").innerHTML = count++;
        if (count > number) {
            clearInterval(intervalId);
        }
    }, interval);
 
    let cost = destinacija.cena; // Change this number to the desired value
    cost.trim();
    cost = parseInt(cost);
    let interval1 = 1; // Change this value to control the speed of the loading effect
	let count1 = 0;
    let intervalId1 = setInterval(function() {
        document.getElementById("ispis-cijena-destinacije").innerHTML = (count1 += 100);
        if (count1 > cost) {
            clearInterval(intervalId1);
        }
    }, interval1);

    document.getElementById("ispis-prevoz-destinacije").innerHTML = destinacija.prevoz;

    let sliderContainer = document.querySelector(".slider-container")
    let slikemenu = document.querySelector(".slikemenu");
    let sveSlike = destinacija.slike;
    picturesNum = sveSlike.length;

    for (let i = 0; i < sveSlike.length; i++) {
        let label = document.createElement("Label");
        label.setAttribute("for", ("slide-tackica-" + (i + 1)));
        slikemenu.appendChild(label);
    }
    sliderContainer.append(slikemenu);

    let p = document.createElement("div");
    p.innerHTML = sveSlike.length + " / " + sveSlike.length;
    p.classList.add("numberSlide")
    sliderContainer.append(p);

    for (let i = 0; i < sveSlike.length; i++) {
        let input = document.createElement("input");
        input.setAttribute("id", ("slide-tackica-" + (i + 1)));
        input.setAttribute("name", "slides");
        input.setAttribute("type", "radio");
        input.setAttribute("onclick", "promijeniBroj(this.id)");
        if (i == sveSlike.length - 1) {
            input.setAttribute("checked", "true");
        }
        let div = document.createElement("div");
        div.classList.add("slide");
        div.style.backgroundImage = "url(" + sveSlike[i] + ")";

        sliderContainer.appendChild(input);
        sliderContainer.appendChild(div);
    }

    let opis2Agencije = document.querySelector(".opis2-agencije-tekstovi");
    let opis2AgencijeInfo = document.createElement("div");
    opis2AgencijeInfo.classList.add("opis2-agencije-info");
    
    let opis2AgencijeTekst1 = document.createElement("p");
    let randomProcenat = Math.floor(Math.random() * (35 - 15 + 1)) + 15;
    opis2AgencijeTekst1.innerHTML = "Agencija '" + agency.naziv + "' je turistička agencija u Srbiji, koja je osnovana " + agency.godina + ", a u poslednje 3 godine ima čak " + randomProcenat + "% godišnje više putnika o odnosu na druge turističke agencije iz Srbije! <br/> <br/> '" + agency.naziv + "' nudi najbolje destinacije za Vas, te smo tu da Vaše putovanje učinimo putovanjem iz snova!";
    
    let opis2AgencijeTekst2 = document.createElement("p");
    opis2AgencijeTekst2.innerText = "E-mail: " + agency.email;
    opis2AgencijeTekst2.style.marginTop = "50px";
    let opis2AgencijeTekst3 = document.createElement("p");
    opis2AgencijeTekst3.innerText = "Telefon: " + agency.brojTelefona;
    opis2AgencijeTekst3.style.marginTop = "10px";
    opis2AgencijeTekst3.style.marginBottom = "40px";
    let opis2AgencijeTekst4 = document.createElement("p");
    opis2AgencijeTekst4.innerText = "Lokacija agencije: " + agency.adresa;
    opis2AgencijeTekst4.style.marginTop = "10px";

    opis2Agencije.append(opis2AgencijeTekst1);
    opis2AgencijeInfo.append(opis2AgencijeTekst2);
    opis2AgencijeInfo.append(opis2AgencijeTekst3);
    opis2AgencijeInfo.append(opis2AgencijeTekst4);
    opis2Agencije.append(opis2AgencijeInfo);
}





function appendMainBox2(position, destination, agency) {

    console.log(destination);
    let newMainBox = document.createElement('div');
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


