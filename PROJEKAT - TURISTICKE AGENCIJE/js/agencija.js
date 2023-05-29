
var firebaseUrl = 'https://tacaprobabaza-default-rtdb.europe-west1.firebasedatabase.app/';

var agenciesID = [];
var agencies = {};
var destinationsID = [];
var destinations = {};

var curBox = 0;
var clicked = 0;

var popupClicked = 0;


window.addEventListener('load', loadAgencies);



// LOGIN
function tryToLogin() {
    let request = new XMLHttpRequest();
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
                window.location.href = "error.html";
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
// LOGIN POPUP
var mainFilterLogin;
function showLogin() {
    if (popupClicked === 1) {
        return
    }
    popupClicked = 1
    window.scrollTo(0, 0);
    let logDiv = document.querySelector(".login-div");
    logDiv.style.display = "flex";

    let head = document.querySelector(".head");
    head.style.opacity = "0.1";
    head.style.filter = "blur(4px)";

    let main = document.querySelector(".main");
    main.style.opacity = "0.1";
    mainFilterLogin = main.style.filter;
    main.style.filter = "blur(4px)";

    let navbar = document.querySelector(".navbar");
    navbar.style.opacity = "0.1";
    navbar.style.filter = "blur(4px)";
    
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "0";
    document.body.style.overflow = "hidden";
}
function closeLogin() {
    popupClicked = 0
    let logDiv = document.querySelector(".login-div");
    logDiv.style.display = "none";
    let head = document.querySelector(".head");
    head.style.filter = "none";
    head.style.opacity = "1";
    let main = document.querySelector(".main");
    main.style.filter = mainFilterLogin;
    main.style.opacity = "1";
    let navbar = document.querySelector(".navbar");
    navbar.style.filter = "none";
    navbar.style.opacity = "1";
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "1";
    goUp.style.filter = "none";
    document.body.style.overflow = "auto";
}


// REGISTER
function registerNewUser() {
    let ime1 = document.getElementById('ime-register').value;
    let prezime1 = document.getElementById('prezime-register').value;
    let datum1 = document.getElementById('date-register').value;
    let email1 = document.getElementById('email-register').value;
    let korisnicko1 = document.getElementById('korisnicko-register').value;
    let psw1 = document.getElementById('psw-register').value;
    let adresa1 = document.getElementById('adresa-register').value;
    let telefon1 = document.getElementById('telefon-register').value;
    let newUser = {
        adresa: adresa1,
        datumRodjenja: datum1,
        email: email1,
        ime: ime1,
        korisnickoIme: korisnicko1,
        lozinka: psw1,
        prezime: prezime1,
        telefon: telefon1   
    };
    let userJson = JSON.stringify(newUser);
    let request = new XMLHttpRequest();
    request.open('POST', firebaseUrl + '/korisnici.json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
        } else {
            window.location.href = "error.html";
        }
    }
    };
    request.send(userJson);
}
function isRegisterValid() { 
    event.preventDefault();
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
        registerNewUser();
        alert("Registracija USPEŠNA!");
        let btnClose = document.querySelector(".btn-register-cancel");
        btnClose.click();
        location.reload();
        return true;
    } else {
        alert("GREŠKA! Popunite pravilno podatke!");
        return false;
    }
}
function validateRegisterInputIme(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let regexIme = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s']+$/;
    let errorMessage = document.getElementById("error-ime");
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (!regexIme.test(value)) { 
        errorMessage.innerText = 'Pogrešni karakteri!';
        ok = 0;
    } else if (value.length < 2) {
        errorMessage.innerText = 'Dužina imena >= 2';
        ok = 0;
    } else if (value.length > 30) {
        errorMessage.innerText = 'Dužina imena <= 30';
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
    let regexPrezime = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s']+$/;
    let errorMessage = document.getElementById("error-prezime");
    if (!regexPrezime.test(value)) {
        errorMessage.innerText = 'Pogrešni karakteri!';
        ok = 0;
    }  else if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (value.length < 2) {
        errorMessage.innerText = 'Dužina prezimena >= 2';
        ok = 0;
    } else if (value.length > 30) {
        errorMessage.innerText = 'Dužina prezimena <= 30';
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
    let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    let date1 = new Date(value);
    let currentDate = new Date();

    let errorMessage = document.getElementById("error-date");

    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    }
    else if (dateRegex.test(value) != true) {
        errorMessage.innerText = 'Pogrešan datum!';
        ok = 0;
    }
    else if (isNaN(date1.getTime())) {
        errorMessage.innerText = 'Pogrešan datum!';
        ok = 0;
    }
     else if (currentDate < date1) {
        errorMessage.innerText = 'Pogrešan datum!';
        ok = 0;
    }
    else if (currentDate.getFullYear() - date1.getFullYear() > 110) {
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
    let ok2 = 1;
    for (let user in users) {
        if (users[user].email === value) {
            ok2 = 0;
            break
        }
    }
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    }
    else if (atIndex < 1 || dotIndex < atIndex + 2 || dotIndex + 2 >= value.length) {
        errorMessage.innerText = 'Pogrešan email!';
        ok = 0;
    } else if (ok2 === 0) {
        errorMessage.innerText = 'Email je zauzet!';
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
function validateRegisterInputUsername(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let errorMessage = document.getElementById("error-username");
    let usernameRegex = /^[a-z][a-z0-9]*$/;
    let ok2 = 1;
    for (let user in users) {
        if (users[user].korisnickoIme === value) {
            ok2 = 0;
            break
        }
    }
    if (usernameRegex.test(value) != true) {
        errorMessage.innerText = 'Pogrešno korisničko ime!';
        ok = 0;
    } else if (ok2 === 0) {
        errorMessage.innerText = 'Korisničko ime je zauzeto!';
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
function togglePswVisibility3() {
    let passwordInputEditUser = document.getElementById("psw-edit-user");
    let passwordToggleEditUser = document.querySelector(".psw-edit-user-toggle");
    if (passwordInputEditUser.type === "password") {
        passwordInputEditUser.type = "text";
        passwordToggleEditUser.innerHTML = '<i class = "fa fa-eye" aria-hidden = "true"> </i>';
    } else {
        passwordInputEditUser.type = "password";
        passwordToggleEditUser.innerHTML = '<i class = "fa fa-eye-slash" aria-hidden = "true"> </i>';
    }
}
function togglePswVisibility2() {
    let passwordInputLogin = document.getElementById("psw-login");
    let passwordToggleLogin = document.querySelector(".psw-login-toggle");
    if (passwordInputLogin.type === "password") {
        passwordInputLogin.type = "text";
        passwordToggleLogin.innerHTML = '<i class = "fa fa-eye" aria-hidden = "true"> </i>';
    } else {
        passwordInputLogin.type = "password";
        passwordToggleLogin.innerHTML = '<i class = "fa fa-eye-slash" aria-hidden = "true"> </i>';
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
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    }
    else if (value.length < 8) {
        errorMessage.innerText = 'Dužina lozinke >= 8!';
        ok = 0;
    }
    for (let i = 0; i < value.length; i++) {
        if (value[i] === " ") {
            errorMessage.innerText = 'Lozinka sadrži space!';
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
    let value = elem.value.trim();
    let ok = 1;
    let regexAdresa = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\d\s',']+$/;
    let errorMessage = document.getElementById("error-address");
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (!regexAdresa.test(value)) {
        errorMessage.innerText = 'Pogrešni karakteri!';
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
function validateRegisterInputPhone(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let errorMessage = document.getElementById("error-phone");
    let testing = /^06[1-6]{1}[0-9]{6}$/.test(value);
    let ok2 = 1;
    for (let user in users) {
        if (users[user].telefon === value) {
            ok2 = 0;
            break
        }
    }
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (testing != true) {
        errorMessage.innerText = 'Pogrešan broj telefona!';
        ok = 0;
    } else if (ok2 === 0) {
        errorMessage.innerText = 'Broj telefona je zauzet!';
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
// REGISTER POPUP
var mainFilterRegister;
function showRegister() {
    if (popupClicked === 1) {
        return
    }
    popupClicked = 1
    window.scrollTo(0, 0);
    let regDiv = document.querySelector(".register-div");
    regDiv.style.display = "flex";

    let head = document.querySelector(".head");
    head.style.opacity = "0.1";
    head.style.filter = "blur(4px)";

    let main = document.querySelector(".main");
    mainFilterRegister = main.style.filter;
    main.style.opacity = "0.1";
    main.style.filter = "blur(4px)";

    let navbar = document.querySelector(".navbar");
    navbar.style.opacity = "0.1";
    navbar.style.filter = "blur(4px)";
    
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "0";
    document.body.style.overflow = "hidden";
}
function closeRegister() {
    popupClicked = 0
    let regDiv = document.querySelector(".register-div");
    regDiv.style.display = "none";
    let head = document.querySelector(".head");
    head.style.filter = "none";
    head.style.opacity = "1";
    let main = document.querySelector(".main");
    main.style.filter = mainFilterRegister;
    main.style.opacity = "1";
    let navbar = document.querySelector(".navbar");
    navbar.style.filter = "none";
    navbar.style.opacity = "1";
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "1";
    goUp.style.filter = "none";
    document.body.style.overflow = "auto";
}


// FUNKCIJE ZA IZGLED
function appendMainBox(position, dest, destination, curAgency) {
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
function appendAgencyBody(cur, agency) {

    let newTitle = document.getElementById("header1");
    newTitle.innerHTML = agency.naziv.toUpperCase();
    let newHead = document.querySelector(".head");
    newHead.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.383), rgba(0, 0, 0, 0.338)), url('" + agency.logo + "')";

    document.querySelector(".boxes h1").innerHTML = "Destinacije '" + agency.naziv + "'";

    let documentTitle = document.querySelector("title");
    documentTitle.innerText = "CapyTravel | " + agency.naziv;
    
    let dest = agency.destinacije;
    let br = 0;
    for (let id in destinations) {
        var destination = destinations[id];
        if (id === dest) {
            for (let i in destination) {
                appendMainBox(".boxes", br, destination[i], cur);
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
    }
    //loadDestinations(cur, agency.destinacije);

    let opis2Agencije = document.querySelector(".opis2-agencije-tekstovi");
    let opis2AgencijeInfo = document.createElement("div");
    opis2AgencijeInfo.classList.add("opis2-agencije-info");
    
    let opis2AgencijeTekst1 = document.createElement("p");
    let randomProcenat = Math.floor(Math.random() * (35 - 15 + 1)) + 15;
    opis2AgencijeTekst1.innerHTML = "Agencija <b>'" + agency.naziv + "'</b> je jedna od poznatijih turističkih agencija u Srbiji, koja je osnovana <b>" + agency.godina + ". </b>godine, a u poslednje 3 godine ima čak " + randomProcenat + "% godišnje više putnika o odnosu na druge turističke agencije iz Srbije! <br/> <br/> '" + agency.naziv + "' nudi najbolje destinacije za Vas, te smo tu da Vaše putovanje učinimo putovanjem iz snova!";
    
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


// OCITAJ POCETNU STRANICU
function ocitajPocetnu() {
    window.location.href = "index.html";
}
// SCROLL TO TOP DUGME
function scrollToTop() {
    if (popupClicked === 1) {
        return
    }
    var position = document.body.scrollTop || document.documentElement.scrollTop;
    if (position) {
      window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
      scrollAnimation = setTimeout("scrollToTop()", 12);
    } else clearTimeout(scrollAnimation);
}
// MAIN
function main() {

    let pageId = window.location.hash.substr(1);
    loadAgency(pageId);

    document.addEventListener("click", () => {
        if (popupClicked === 1) {
            let nav = document.querySelector(".navbar");
            nav.style.visibility = "hidden";
            let footer = document.querySelector(".footer");
            footer.style.visibility = "hidden";
            
        } else {
            let nav = document.querySelector(".navbar");
            nav.style.visibility = "";
            let footer = document.querySelector(".footer");
            footer.style.visibility = "";
        }
    });

    // ***** CHANGING NAVBAR WHEN SCROLLED *****
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

    let logo1 = document.getElementById("logo1");
    logo1.onclick = ocitajPocetnu;

    let log = document.getElementById("login-button");
    log.onclick = showLogin;

    let reg = document.getElementById("register-button");
    reg.onclick = showRegister; 
    
    let loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", isLoginValid)
    
    let registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", isRegisterValid)

}


// LOAD IZ FIREBASE
function loadUsers() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                usersID = [];
                users = JSON.parse(request.responseText);
                for (let id in users) {
                    usersID.push(id);
                }       
                main();  
            } else {
                window.location.href = "error.html";
            }       
        }
    }
    request.open('GET', firebaseUrl + '/korisnici.json');
    request.send();
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
                loadUsers();
            } else {
                window.location.href = "error.html";
            }  
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
                loadDestinations(); 
            } else {
                window.location.href = "error.html";
            }
        }
    }
    request.open('GET', firebaseUrl + '/agencije.json');
    request.send();
}
function loadAgency(cur) {
    // GET by id    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var agency = JSON.parse(request.responseText);
                appendAgencyBody(cur, agency);
            } else {
                window.location.href = "error.html";
            }
            
        }
    }
    request.open('GET', firebaseUrl + '/agencije/' + agenciesID[cur] + '.json');
    request.send();
}


