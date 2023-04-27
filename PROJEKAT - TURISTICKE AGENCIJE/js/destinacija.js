
var firebaseUrl = 'https://turistickaagencijaprojekattaca-default-rtdb.europe-west1.firebasedatabase.app';

var agenciesID = [];
var agencies = {};
var destinationsID = [];
var destinations = {};
var destinationsInDestinationID = [];
var destinationsInDestination = {};

var picturesNum = 0;
var clicked = 0;
var curBox = 1;


window.addEventListener('load', loadAgencies);



function tryToLogin() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                usersID = [];
                users = JSON.parse(request.responseText);
                let korisnickoValue = document.getElementById('korisnicko-login');
                let korisnicko1 = korisnickoValue.value;
                let pswValue = document.getElementById('psw-login');
                let psw1 = pswValue.value; 
                let errorKorisnicko = document.getElementById("error-login-korisnicko");
                errorKorisnicko.innerText = "";
                let errorLozinka = document.getElementById("error-login-lozinka");
                errorLozinka.innerText = "";
                for (let i in users) { 
                    if (users[i].korisnickoIme === korisnicko1) {
                        if (users[i].lozinka === psw1) {
                            alert("Dobrodošli, " + korisnicko1 + "!");  
                            errorKorisnicko.innerText = "";
                            errorLozinka.innerText = "";
                            let btnClose = document.querySelector(".btn-login-cancel");
                            btnClose.click();
                            location.reload();
                            return;
                        } else {
                            errorLozinka.innerText = "Pogresna šifra!"; 
                            return;
                        }
                    } 
                }   
                errorKorisnicko.innerText = "Ne postoji korisničko ime!";   
            } else {
                alert('Error occurred. Car could not be loaded.')
            }   
            return users;     
        }
    }
    request.open('GET', firebaseUrl + '/korisnici.json');
    request.send();
}   
function isLoginValid() {
    event.preventDefault();
    tryToLogin();
}



function registerNewUser() {
    let ime1 = document.getElementById('ime-register').value;
    let prezime1 = document.getElementById('prezime-register').value;
    let datum1 = document.getElementById('date-register').value;
    let email1 = document.getElementById('email-register').value;
    let korisnicko1 = document.getElementById('korisnicko-register').value;
    let psw1 = document.getElementById('psw-register').value;
    let adresa1 = document.getElementById('adresa-register').value;
    let telefon1 = document.getElementById('telefon-register').value;

    var newUser = {
        adresa: adresa1,
        datumRodjenja: datum1,
        email: email1,
        ime: ime1,
        korisnickoIme: korisnicko1,
        lozinka: psw1,
        prezime: prezime1,
        telefon: telefon1   
    };

    var userJson = JSON.stringify(newUser);
    console.log(userJson);
    var request = new XMLHttpRequest();
    request.open('POST', firebaseUrl + '/korisnici.json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
            console.log('Novi korisnik je registrovan!');
        } else {
            console.error('Greška u registraciji!');
        }
    }
    };
    request.send(userJson);
}
function isRegisterValid() { 
    let okForma = 1;
    let inputIme = document.getElementById("ime-register");
    let isImeValid = validateRegisterInputIme(inputIme);
    if (isImeValid != true) {
        okForma = 0;
    }
    let inputPrezime = document.getElementById("prezime-register");
    let isPrezimeValid = validateRegisterInputPrezime(inputPrezime);
    if (isPrezimeValid != true) {
        okForma = 0;
    }
    let inputDate = document.getElementById("date-register");
    let isDateValid = validateRegisterInputDate(inputDate);
    if (isDateValid != true) {
        okForma = 0;
    }
    let inputEmail = document.getElementById("email-register");
    let isEmailValid = validateRegisterInputEmail(inputEmail);
    if (isEmailValid != true) {
        okForma = 0;
    }
    let inputUsername = document.getElementById("korisnicko-register");
    let isUsernameValid = validateRegisterInputUsername(inputUsername);
    if (isUsernameValid != true) {
        okForma = 0;
    }
    let inputPsw = document.getElementById("psw-register");
    let isPswValid = validateRegisterInputPsw(inputPsw);
    if (isPswValid != true) {
        okForma = 0;
    }
    let inputAddress = document.getElementById("adresa-register");
    let isAddressValid = validateRegisterInputAddress(inputAddress);
    if (isAddressValid != true) {
        okForma = 0;
    }
    let inputPhone = document.getElementById("telefon-register");
    let isPhoneValid = validateRegisterInputPhone(inputPhone);
    if (isPhoneValid != true) {
        okForma = 0;
    }
    
    if (okForma === 1) {
        //alert("Registrovani ste!");
        event.preventDefault();
        registerNewUser();
        alert("Registracija USPEŠNA!");
        let btnClose = document.querySelector(".btn-register-cancel");
        btnClose.click();
        location.reload();
        return true;
    } else {
        alert("GREŠKA! Popunite pravilno podatke!");
        event.preventDefault();
        return false;
    }
}


function validateRegisterInputIme(elem) {
    let value = elem.value.trim();
    let ok = 1;
    for (let i = 0; i < value.length; i++) {
        if ((value.codePointAt(i) < 65) || ((value.codePointAt(i) > 90) && (value.codePointAt(i) < 97)) || value.codePointAt(i) > 122) {
            ok = 0;
        }
    }
    let errorMessage = document.getElementById("error-ime");
    if (ok === 0) {
        errorMessage.innerText = 'Pogrešni karakteri!';
        ok = 0;
    } else if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (value.length < 2) {
        errorMessage.innerText = 'Dužina imena >= 2';
        ok = 0;
    } else if (value.length > 40) {
        errorMessage.innerText = 'Dužina imena <= 40';
        ok = 0;
    }  else {
        errorMessage.innerText = '';
        ok = 1;
    }
    if (ok === 1) {
        return true;
    } else {
        return false;
    }
}
function validateRegisterInputPrezime(elem) {
    let value = elem.value.trim();
    let ok = 1;
    for (let i = 0; i < value.length; i++) {
        if ((value.codePointAt(i) < 65) || ((value.codePointAt(i) > 90) && (value.codePointAt(i) < 97)) || value.codePointAt(i) > 122) {
            ok = 0;
        }
    }
    let errorMessage = document.getElementById("error-prezime");
    if (ok === 0) {
        errorMessage.innerText = 'Pogrešni karakteri!';
        ok = 0;
    } else if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (value.length < 2) {
        errorMessage.innerText = 'Dužina prezimena >= 2';
        ok = 0;
    } else if (value.length > 40) {
        errorMessage.innerText = 'Dužina prezimena <= 40';
        ok = 0;
    }  else {
        errorMessage.innerText = '';
        ok = 1;
    }

    if (ok === 1) {
        return true;
    } else {
        return false;
    }
}
function validateRegisterInputDate(elem) {
    let value = elem.value;
    let date1 = new Date(value);
    let currentDate = new Date();
    let errorMessage = document.getElementById("error-date");
    if (isNaN(date1.getTime())) {
        errorMessage.innerText = 'Pogrešan datum!';
        ok = 0;
    } else if (currentDate < date1) {
        errorMessage.innerText = 'Pogrešan datum!';
        ok = 0;
    } else if (currentDate.getFullYear() - date1.getFullYear() > 110) {
        errorMessage.innerText = 'Pogrešan datum!';
        ok = 0;
    } else {
        errorMessage.innerText = '';
        ok = 1;
    }

    if (ok === 1) {
        return true;
    } else {
        return false;
    }
}
function validateRegisterInputEmail(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let errorMessage = document.getElementById("error-email");
    let atIndex = value.indexOf("@");
    let dotIndex = value.lastIndexOf(".");
    if (atIndex < 1 || dotIndex < atIndex + 2 || dotIndex + 2 >= value.length) {
        errorMessage.innerText = 'Pogrešan email!';
        ok = 0;
    }  else {
        errorMessage.innerText = '';
        ok = 1;
    }

    if (ok === 1) {
        return true;
    } else {
        return false;
    }
}
function validateRegisterInputUsername(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let errorMessage = document.getElementById("error-username");
    let usernameRegex = /^[a-z][a-z0-9]*$/;
    if (usernameRegex.test(value) != true) {
        errorMessage.innerText = 'Pogrešno korisničko ime!';
        ok = 0;
    } else {
        errorMessage.innerText = '';
        ok = 1;
    }

    if (ok === 1) {
        return true;
    } else {
        return false;
    }
}
function togglePswVisibility() {
    let passwordInput = document.getElementById("psw-register");
    let passwordToggle = document.querySelector(".psw-register-toggle");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.innerHTML = '<i class = "fa fa-eye" aria-hidden = "true"> </i>';
    } else {
        passwordInput.type = "password";
        passwordToggle.innerHTML = '<i class = "fa fa-eye-slash" aria-hidden = "true"> </i>';
    }
}
function validateRegisterInputPsw(elem) {
    let value = elem.value;
    let ok = 1;
    let errorMessage = document.getElementById("error-psw");
    if (value.length < 8) {
        errorMessage.innerText = 'Dužina lozinke >= 8!';
        ok = 0;
    }
    for (let i = 0; i < value.length; i++) {
        if (value[i] === " ") {
            errorMessage.innerText = 'Lozinka ne treba da sadrži space!';
            ok = 0;
        }
    } 

    if (ok === 1) {
        errorMessage.innerText = '';
        return true;
    } else {
        return false;
    }
}
function validateRegisterInputAddress(elem) {
    let value = elem.value;
    let ok = 1;/*
    let errorMessage = document.getElementById("error-address");
    let testing = /^[a-zA-Z0-9]+([ \t]+[a-zA-Z0-9]+)*$/.test(value);
    if (testing === true) {
        errorMessage.innerText = 'Pogrešna adresa!';
        ok = 0;
    } else {
        errorMessage.innerText = '';
        ok = 1;
    }
*/
    if (ok === 1) {
        return true;
    } else {
        return false;
    }
}
function validateRegisterInputPhone(elem) {
    let value = elem.value;
    let ok = 1;
    let errorMessage = document.getElementById("error-phone");
    let testing = /06[1-6]{1}[0-9]{7}/.test(value);
    if (testing != true) {
        errorMessage.innerText = 'Pogrešan br. telefona!';
        ok = 0;
    } else {
        errorMessage.innerText = '';
        ok = 1;
    }

    if (ok === 1) {
        return true;
    } else {
        return false;
    }
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
    mojOpisDestinacije.innerHTML = "Turistička agencija '" + agency.naziv + "' nudi veliki broj destinacija. Jedna od njih je " + cuveno + " <b>" + destinacija.naziv + "</b>, čiji aranžman ukupno iznosi <b>" + destinacija.cena + " RSD. </b>" + prevoz + " Broj putnika je ograničen, a maksimalni broj slobodnih mesta je <b>" + destinacija.maxOsoba + "</b>, tako da požurite i rezervišite Vaše mesto!";

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
    opis2AgencijeTekst1.innerHTML = "Agencija <b>'" + agency.naziv + "'</b> je jedna od poznatijih turističkih agencija u Srbiji, koja je osnovana <b>" + agency.godina + ". </b> godine, a u poslednje 3 godine ima čak " + randomProcenat + "% godišnje više putnika o odnosu na druge turističke agencije iz Srbije! <br/> <br/> <i>" + agency.naziv + "</i> nudi najbolje destinacije za Vas, te smo tu da Vaše putovanje učinimo putovanjem iz snova!";
    
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

function loadDestination(cur, br, agency) {
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
function loadDestination2(cur, br, agency) {
    let b = 0;
    let dest = agency.destinacije;
    for (let id in destinations) {
        var destination = destinations[id];
        destinationsID.push(id);
        if (id === dest) {
            for (let i in destination) {
                destinationsInDestinationID.push(i);
                if (b == br) {
                    loadDestination(cur, br, agency);
                }
                b++;
            }
        }      
    }           
}
function loadAgency(cur, br, curAgency) {  
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var agency = JSON.parse(request.responseText);
            } else {
                alert('Error occurred. Car could not be loaded.')
            }
            loadDestination2(cur, br, agency);
        }
    }
    request.open('GET', firebaseUrl + '/agencjie/' + agenciesID[curAgency] + '.json');
    request.send();
}


function scrollToTop() {
    var position = document.body.scrollTop || document.documentElement.scrollTop;
    if (position) {
      window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
      scrollAnimation = setTimeout("scrollToTop()", 12);
    } else clearTimeout(scrollAnimation);
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
            let logo = document.querySelector(".logo");
            logo.style.color = "black";
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
            document.querySelector(".main").style.filter = "blur(1px)";
            for (let i = 0; i < nava.length; i++) {
                nava[i].style.color = "black";
            }
            document.querySelector('.navbar').classList.toggle("navbarButtonClicked");
            let logo = document.querySelector(".logo");
                logo.style.color = "black";
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

    let log = document.getElementById("login-button");
    log.onclick = showLogin;

    let reg = document.getElementById("register-button");
    reg.onclick = showRegister;

    let pageId = window.location.hash.substr(1);
    pageId = pageId.split("-");
    loadAgency(pageId[0], pageId[1], pageId[2]);
}


function loadDestinations() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                destinationsID = [];
                destinations = JSON.parse(request.responseText);
                for (let id in destinations) {
                    destinationsID.push(id);
                }
            } else {
                alert('Error occurred. Car could not be loaded.')
            }
            main();
        }
    }
    request.open('GET', firebaseUrl + '/destinacije.json');
    request.send();
}

function loadAgencies() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                agenciesID = [];
                agencies = JSON.parse(request.responseText);
                for (let id in agencies) {
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