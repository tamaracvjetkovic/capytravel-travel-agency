
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
var usersID = []; 
var users = {}; 
/*
var destinationsInDestinationID = [];
var destinationsInDestination = {};
*/
var clicked = 0;


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
            //document.querySelector(".main").style.transition = "filter 200ms";
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

    let dropdown = document.getElementById("select-dropdown");
    let options = {
        "Agencije": "agencije",
        "Destinacije": "destinacije",
        "Korisnici": "korisnici"
    };

    for (let key in options) {
        let option = document.createElement("option");
        option.setAttribute('value', options[key]);
        let optionText = document.createTextNode(key);
        option.appendChild(optionText);
        dropdown.appendChild(option);
      }


    loadAgencies();
}

function loadAgencies() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                agenciesID = [];
                agencies = JSON.parse(request.responseText);
                let adminBody = document.querySelector(".admin-body");
                let tableAgencies = document.createElement("table");
                tableAgencies.classList.add("tabela-agencije")
                adminBody.append(tableAgencies);
                for (let id in agencies) {
                    let agency = agencies[id];
                    let tr = document.createElement("tr")
                    tableAgencies.append(tr);
                    let th = document.createElement("th")
                    th.innerHTML = "EDIT";
                    tr.append(th);
                    for (i in agency) {
                        let th = document.createElement("th")
                        let s = i;
                        let naziv = "";
                        let br = 0;
                        for (let j = 0; j < s.length; j++) {
                            letter = s[j];
                            let l = letter.toUpperCase();
                            if (br === 0) {
                                naziv += l;
                            } else {
                                if (letter === l) {
                                    naziv += " ";
                                    naziv += l;
                                } else {
                                    naziv += l;
                                }
                            }
                            //console.log(naziv);
                            br++;
                        }
                        th.innerHTML = naziv;
                        tr.append(th);
                    }
                    break;
                }
                for (let id in agencies) {
                    let tr = document.createElement("tr")
                    tableAgencies.append(tr);
                    let agency = agencies[id];
                    //console.log("Agencija: " + agency);
                    let td = document.createElement("td")
                        let buttonEdit = document.createElement("button")
                        buttonEdit.setAttribute("id", ("edit,agencija," + id));
                        buttonEdit.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>';
                        let buttonDelete = document.createElement("button")
                        buttonDelete.setAttribute("id", ("delete,agencija," + id));
                        buttonDelete.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
                    td.append(buttonEdit);
                    td.append(buttonDelete);
                    tr.append(td);
                    for (i in agency) {
                        let td = document.createElement("td")
                        td.append(agency[i]);
                        //console.log(i + " === " + agency[i]);
                        tr.append(td);
                    }
                    agenciesID.push(id);
                }       
            } else {
                alert('Error occurred. Car could not be loaded.')
            }
            loadDestinations();
        }
    }
    request.open('GET', firebaseUrl + '/agencjie.json');
    request.send();
}
/*
function loadAgency() {
    // GET by id    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var agency = JSON.parse(request.responseText);
            } else {
                alert('Error occurred. Car could not be loaded.')
            }
        }
    }
    request.open('GET', firebaseUrl + '/agencjie/' + agenciesID[curAgency] + '.json');
    request.send();
}*/


function loadDestinations() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                destinationsID = [];
                destinations = JSON.parse(request.responseText);
                let adminBody = document.querySelector(".admin-body");
                let tableDestinations = document.createElement("table");
                tableDestinations.classList.add("tabela-destinacije")
                adminBody.append(tableDestinations);

                for (let id in destinations) {
                    let destination = destinations[id];
                    for (let dest in destination) { 
                        let tr = document.createElement("tr")
                        tableDestinations.append(tr);
                        let th = document.createElement("th")
                        th.innerHTML = "EDIT";
                        tr.append(th);
                        for (i in destination[dest]) {
                            if (i === "opis") {
                                continue;
                            }
                            if (i === "slike") {
                                continue;
                            }
                            let th = document.createElement("th")
                            let s = i;
                            let naziv = "";
                            let br = 0;
                            for (let j = 0; j < s.length; j++) {
                                letter = s[j];
                                let l = letter.toUpperCase();
                                if (br === 0) {
                                    naziv += l;
                                } else {
                                    if (letter === l) {
                                        naziv += " ";
                                        naziv += l;
                                    } else {
                                        naziv += l;
                                    }
                                }
                                br++;
                            }   
                            th.innerHTML = naziv;
                            tr.append(th);
                        }
                        break;
                    }
                    break;
                }
                for (let id in destinations) {
                    let destination = destinations[id];

                    for (let dest in destination) { 
                        let tr = document.createElement("tr")
                    tableDestinations.append(tr);
                    
                    //console.log("Agencija: " + agency);
                    let td = document.createElement("td")
                        let buttonEdit = document.createElement("button")
                        buttonEdit.setAttribute("id", ("edit,destinacija," + dest));
                        buttonEdit.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>';
                        let buttonDelete = document.createElement("button")
                        buttonDelete.setAttribute("id", ("delete,destinacija," + dest));
                        buttonDelete.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
                    td.append(buttonEdit);
                    td.append(buttonDelete);
                    tr.append(td);
                        for (i in destination[dest]) {
                            console.log(i);
                            if (i === "opis") {
                                continue;
                            }
                            if (i === "slike") {
                                continue;
                            }
                            let td = document.createElement("td")
                            td.append(destination[dest][i]);
                            tr.append(td);
                        }
                    }
                }
            } else {
                alert('Error occurred. Car could not be loaded.');
            }
            loadUsers();
        }
    }
    request.open('GET', firebaseUrl + '/destinacije.json');
    request.send();
}


function loadUsers() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                usersID = [];
                users = JSON.parse(request.responseText);
                let adminBody = document.querySelector(".admin-body");
                let tableUsers = document.createElement("table");
                tableUsers.classList.add("tabela-korisnici")
                adminBody.append(tableUsers);
                for (let id in users) {
                    let user = users[id];
                    let tr = document.createElement("tr")
                    tableUsers.append(tr);
                    let th = document.createElement("th")
                    th.innerHTML = "EDIT";
                    tr.append(th);
                    for (i in user) {
                        let th = document.createElement("th")
                        let s = i;
                        let naziv = "";
                        let br = 0;
                        for (let j = 0; j < s.length; j++) {
                            letter = s[j];
                            let l = letter.toUpperCase();
                            if (br === 0) {
                                naziv += l;
                            } else {
                                if (letter === l) {
                                    naziv += " ";
                                    naziv += l;
                                } else {
                                    naziv += l;
                                }
                            }
                            br++;
                        }
                        th.innerHTML = naziv;
                        tr.append(th);
                    }
                    break;
                }
                for (let id in users) {
                    let tr = document.createElement("tr")
                    tableUsers.append(tr);
                    let user = users[id];
                    //console.log("Agencija: " + agency);
                    let td = document.createElement("td")
                        let buttonEdit = document.createElement("button")
                        buttonEdit.setAttribute("id", ("edit,korisnik," + id));
                        buttonEdit.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>';
                        let buttonDelete = document.createElement("button")
                        buttonDelete.setAttribute("id", ("delete,korisnik," + id));
                        buttonDelete.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
                    td.append(buttonEdit);
                    td.append(buttonDelete);
                    tr.append(td);
                    for (i in user) {
                        let td = document.createElement("td")
                        td.append(user[i]);
                        //console.log(i + " === " + agency[i]);
                        tr.append(td);
                    }
                    usersID.push(id);
                }       
            } else {
                alert('Error occurred. Car could not be loaded.')
            }        
            let selectDropdown = document.getElementById("select-dropdown");
            let agencijeTable = document.querySelector(".tabela-agencije");
            let destinacijeTable = document.querySelector(".tabela-destinacije");
            let korisniciTable = document.querySelector(".tabela-korisnici");
            selectDropdown.addEventListener("change", function() {
                let selectedValue = this.value;
                agencijeTable.style.display = "none";
                destinacijeTable.style.display = "none";
                korisniciTable.style.display = "none";
                // show the selected table
                if (selectedValue === "agencije") {
                  agencijeTable.style.display = "table";
                } else if (selectedValue === "destinacije") {
                  destinacijeTable.style.display = "table";
                } else if (selectedValue === "korisnici") {
                  korisniciTable.style.display = "table";
                }
            });
        }
    }
    request.open('GET', firebaseUrl + '/korisnici.json');
    request.send();
}
/*
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
            //appendDestinationBody(cur, br, agency, destination);
        }
    }
    request.open('GET', firebaseUrl + '/destinacije/' + destinationsID[cur] + "/" + destinationsInDestinationID[br] + '.json');
    request.send();
}
*/



function promijeniBroj(id) {
    ids = id.split("-");
    let p = document.querySelector(".numberSlide");
    p.innerHTML = ids[2] + " / " + picturesNum;
    let labels = document.querySelectorAll(".slikemenu label");
    for (let i = 0; i < labels.length; i++) {
        labels[i].style.backgroundColor = "white";
        if ((i + 1) == ids[2]) {
            labels[i].style.backgroundColor = "#989898";
        }
    }
}

function appendDestinationBody(cur, br, agency, destinacija) {
   
    let title = document.querySelector("title");
    title.innerHTML = "CapyTravel | " + agency.naziv + " | " + destinacija.naziv;   
    
    let newTitle = document.getElementById("header1");
    newTitle.innerHTML = destinacija.naziv;
    let newHead = document.querySelector(".head");
    newHead.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.353), rgba(0, 0, 0, 0.288)), url('" + destinacija.slike[0] + "')";

    let newDestinationDesc = document.querySelector(".moj-opis-destinacije2");
    newDestinationDesc.innerHTML = destinacija.opis;

    let citat = document.getElementById("citat");
    citat.innerHTML = destinacija.tip;

    let logo = document.querySelector(".logo");
    logo.innerHTML = "<i>" + agency.naziv + "</i>";

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
 
    let mojOpisDestinacije = document.querySelector(".moj-opis-destinacije");
    let prevoz = "";
    if (destinacija.prevoz === "sopstveni") {
        prevoz = "Prevoz ne spada u aranžman, te morate organizovati svoj <b> sopstveni </b> prevoz. "
    } else { 
        prevoz = "Prevoz je <b> organizovan</b>, te se do naše destinacije putuje <b>" + destinacija.prevoz + "om</b>. ";
    }
    let cuveno = "";
    let n = destinacija.naziv.length;
    if (destinacija.naziv[n - 1] === 'a') {
        cuveno = "čuvena";
    } else {
        cuveno = "čuveni";
    }
    mojOpisDestinacije.innerHTML = "Turistička agencija '" + agency.naziv + "' nudi veliki broj destinacija. Jedna od njih je " + cuveno + " <b>" + destinacija.naziv + "</b>, čiji aranžman putovanja iznosi <b>" + destinacija.cena + " RSD. </b>" + prevoz + " Broj putnika je ograničen, a maksimalni broj slobodnih mesta je <b>" + destinacija.maxOsoba + "</b>, tako da požurite i rezervišite Vaše mesto!";

    let cost = destinacija.cena; // Change this number to the desired value
    cost.trim();
    cost = parseInt(cost);
    let interval1 = 1; // Change this value to control the speed of the loading effect
	let count1 = 0;
    let intervalId1 = setInterval(function() {
        if (cost <= 20000) {
            document.getElementById("ispis-cijena-destinacije").innerHTML = (count1 += 83);
        }
        if (cost > 20000 && cost <= 40000) {
            document.getElementById("ispis-cijena-destinacije").innerHTML = (count1 += 113);
        }
        if (cost > 40000 && cost <= 60000) {
            document.getElementById("ispis-cijena-destinacije").innerHTML = (count1 += 147);
        }
        if (cost > 60000 && cost <= 80000) {
            document.getElementById("ispis-cijena-destinacije").innerHTML = (count1 += 239);
        }
        if (cost > 80000 && cost <= 100000) {
            document.getElementById("ispis-cijena-destinacije").innerHTML = (count1 += 297);
        }
        if (cost >= 100000) {
            document.getElementById("ispis-cijena-destinacije").innerHTML = (count1 += 323);
        }
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
    p.innerHTML =  "1 / " + sveSlike.length;
    p.classList.add("numberSlide")
    sliderContainer.append(p);

    for (let i = 0; i < sveSlike.length; i++) {
        let input = document.createElement("input");
        input.setAttribute("id", ("slide-tackica-" + (i + 1)));
        input.setAttribute("name", "slides");
        input.setAttribute("type", "radio");
        input.setAttribute("onclick", "promijeniBroj(this.id)");
        if (i == 0) {
            input.setAttribute("checked", "true");
        }
        let div = document.createElement("div");
        div.classList.add("slide");
        div.style.backgroundImage = "url(" + sveSlike[i] + ")";
        sliderContainer.appendChild(input);
        sliderContainer.appendChild(div);
    }
    let labels = document.querySelectorAll(".slikemenu label");
    labels[0].style.backgroundColor = "#989898";

    let opis2Agencije = document.querySelector(".opis2-agencije-tekstovi");
    let opis2AgencijeInfo = document.createElement("div");
    opis2AgencijeInfo.classList.add("opis2-agencije-info");
    
    let opis2AgencijeTekst1 = document.createElement("p");
    let randomProcenat = Math.floor(Math.random() * (35 - 15 + 1)) + 15;
    opis2AgencijeTekst1.innerHTML = "Agencija <b>'" + agency.naziv + "'</b> je turistička agencija u Srbiji, koja je osnovana " + agency.godina + ", a u poslednje 3 godine ima čak " + randomProcenat + "% godišnje više putnika o odnosu na druge turističke agencije iz Srbije! <br/> <br/> <i>" + agency.naziv + "</i> nudi najbolje destinacije za Vas, te smo tu da Vaše putovanje učinimo putovanjem iz snova!";
    
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


