
window.addEventListener('load', main2);



var firebaseUrl = 'https://turistickaagencijaprojekattaca-default-rtdb.europe-west1.firebasedatabase.app';
var agenciesID = [];
var agencies = {};
var destinationsID = [];
var destinations = {};
var destinationsInDestinationsID = [];
var destinationsInDestinations = {};
var curBox = 0;
var clicked = 0;

function scrollToTop() {
    var position = document.body.scrollTop || document.documentElement.scrollTop;
    if (position) {
      window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
      scrollAnimation = setTimeout("scrollToTop()", 12);
    } else clearTimeout(scrollAnimation);
}


function ocitaj() {
    console.log("radi");
}


function main2() {

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

    let pageId = window.location.hash.substr(1);
    loadAgencies(pageId);

    /*const saznajViseFormNovi = document.querySelector('.upit-saznaj-vise:last-child');
        saznajViseFormNovi.addEventListener('click', () => {
            const boxId = box.getAttribute('id');
            window.location.href = `destinacija.html#${boxId}`;
        });
    }); */
    /*
    OVO RADI
    const boxContent = document.getElementById('header1');
    boxContent.innerHTML = "Taacadsaaa";
    const content = document.createElement('p');
    content.innerHTM = `You clicked on box ${pageId}`;
    boxContent.appendChild(content);
    */
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
    newTitle.innerHTML = agency.naziv.toUpperCase();
    let newHead = document.querySelector(".head");
    newHead.style.background = "linear-gradient(rgba(0, 0, 0, 0.383), rgba(0, 0, 0, 0.338)), url('" + agency.logo + "')";
    newHead.style.backgroundRepeat = "no-repeat";
    newHead.style.backgroundSize = "cover";
    newHead.style.backgroundPosition = "center"
    newHead.style.backgroundAttachment = "fixed"

    document.querySelector(".boxes h1").innerHTML = "Destinacije '" + agency.naziv + "'";
    /*background-size: cover;
    background-position: center; 
    background-attachment: fixed;*/

    let documentTitle = document.querySelector("title");
    documentTitle.innerText = "CapyTravel | " + agency.naziv;
    

    loadDestinations(cur, agency.destinacije);

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
    /*let opis2AgencijeMapa = document.createElement("div");
    opis2AgencijeMapa.classList.add("googleMap");*/
    

}


function loadDestinations(cur, dest) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                destinationsID = [];
                let br = 0;
                destinations = JSON.parse(request.responseText);
                for (let id in destinations) {
                    var destination = destinations[id];
                    if (id === dest) {
                        for (let i in destination) {
                            appendMainBox2(".boxes", br, destination[i], cur);
                        }
                        const boxes = document.querySelectorAll('.box');
                        boxes.forEach(box => {
                            box.addEventListener('click', () => {
                            const boxId = box.getAttribute('id');
                            window.location.href = `destinacija.html#${boxId}`;
                            });
                        }); 
                    }
                    br++;
                    destinationsID.push(id);
                }
            } else {
                alert('Error occurred. Car could not be loaded.')
            }
           
        }
    }
    request.open('GET', firebaseUrl + '/destinacije.json');
    request.send();
}
/*
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
*/




function appendMainBox2(position, dest, destination, curAgency) {

    let newMainBox = document.createElement('div');
    newMainBox.setAttribute('id', (dest + "-" + curBox + "-" + curAgency));
    newMainBox.classList.add("box");
    
    curBox++;
   
    let newBoxCard = document.createElement('div');
    newBoxCard.setAttribute('id', ("card" + dest + "-" + curBox + "-" + curAgency));
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
    newDestinationTransport.innerHTML = "Prevoz: " + destination.prevoz;
    newDestinationDesc.appendChild(newDestinationTransport);

    let newDestinationMaxPerson = document.createElement('p');
    newDestinationMaxPerson.classList.add("maks-osoba-destinacije");
    newDestinationMaxPerson.innerHTML = "Broj mesta: " + destination.maxOsoba;
    newDestinationDesc.appendChild(newDestinationMaxPerson);

    let newDestinationCost = document.createElement('p');
    newDestinationCost.classList.add("cena-destinacije");
    newDestinationCost.innerHTML = "<div style = 'margin-top: -1px;'> <div style = 'font-size: 12px';> Od </div> <b>" + destination.cena + " </div> <div style = 'font-size: 13px'> RSD! </div> </b>";

    
    newBoxCard.appendChild(newDestinationCost);
    newBoxCard.appendChild(newDestinationImage);
    newBoxCard.appendChild(newDestinationDesc);

    newMainBox.appendChild(newBoxCard);

    let upitSaznajVise = document.createElement('div');
    upitSaznajVise.classList.add("upit-saznaj-vise");
    newBoxCard.appendChild(upitSaznajVise);

    let posaljiUpitDiv = document.createElement('div');
    let posaljiUpitForm = document.createElement('form');
    posaljiUpitForm.setAttribute("action", "form.html");
    let posaljiUpit = document.createElement('button');
    posaljiUpit.classList.add("posalji-upit");
    posaljiUpit.innerHTML = "Pošalji upit";
    posaljiUpitForm.appendChild(posaljiUpit);
    posaljiUpitDiv.appendChild(posaljiUpitForm);
    upitSaznajVise.appendChild(posaljiUpitDiv);
    
    let saznajViseForm = document.createElement('div');
    let saznajVise = document.createElement('button');
    saznajVise.classList.add("saznaj-vise");
    saznajVise.innerHTML = "Saznaj više";
    saznajViseForm.appendChild(saznajVise);
    upitSaznajVise.appendChild(saznajViseForm);

    let mainBoxes = document.querySelector(position);
    mainBoxes.appendChild(newMainBox);
}

