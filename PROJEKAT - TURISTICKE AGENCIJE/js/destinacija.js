
var firebaseUrl = 'https://novabazawebprojekat-default-rtdb.europe-west1.firebasedatabase.app/';

var agenciesID = [];
var agencies = {};
var destinationsID = [];
var destinations = {};


var curDestinationInDestinationID;
var curDestinationInDestination;
var curDestinationID;

var picturesNum = 0;
var clicked = 0;
var curBox = 1;

var popupClicked = 0; 


window.addEventListener('load', loadAgencies);



var links = []
//EDIT DESTINATION
function showToastEditDestination() {
    let toast = document.querySelector(".toast-div");
    let toastPopup = document.getElementById("toast-popup");
    toastPopup.innerHTML = "Destinacija uspešno izmenjena!";
    toast.classList.add("show");
    //console.log(toast); 
    setTimeout(function(){ toast.classList.remove("show"); location.reload();}, 1000);
}
function closeAllForEditDestination() {
    showToastEditDestination();
}
function editTheDestination() {
    let ime1 = document.getElementById('ime-edit-destination').value;
    let tip1 = document.getElementById('tip-edit-destination').value;
    let cena1 = document.getElementById('cena-edit-destination').value;
    let prevoz1 = document.getElementById('prevoz-edit-destination').value;
    let maxOsoba1 = document.getElementById('maxOsoba-edit-destination').value;
    let opis1 = document.getElementById('opis-edit-destination').value;
    let slike1 = document.getElementById('slike-edit-destination').value;
    let links2 = [];
    let s = '';
    for (let i in slike1) {
        if (/\s/.test(slike1[i])) {
            links2.push(s);
            s = "";
            continue;
        }  
        s += slike1[i];
    }
    if (s != "") {
        links2.push(s)
    }
    links = []
    for (let i in links2) {
        if (links2[i].trim() === '') {
            console.log("Nije")
            continue;
        } else {
            links.push(links2[i]);
        }
    }
    let editedDestination = {
        cena: cena1,
        maxOsoba: maxOsoba1,
        naziv: ime1,
        opis: opis1,
        prevoz: prevoz1,
        slike: links,
        tip: tip1
    };
    let destinationJson = JSON.stringify(editedDestination);
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                closeAllForEditDestination();
            } else {
                window.location.href = "error.html";
            }            
        }
    }
    request.open('PUT', firebaseUrl + '/destinacije/' + curDestinationID + "/" + curDestinationInDestinationID + '.json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(destinationJson);
}
function isEditDestinationValid() { 
    event.preventDefault();
    let okForma = 1;
    let inputIme = document.getElementById("ime-edit-destination");
    let isImeValid = validateEditDestinationInputIme(inputIme);
    if (isImeValid != true) {
        okForma = 0;
    }
    let inputTip = document.getElementById("tip-edit-destination");
    let isTipValid = validateEditDestinationInputTip(inputTip);
    if (isTipValid != true) {
        okForma = 0;
    }
    let inputCena = document.getElementById("cena-edit-destination");
    let isCenaValid = validateEditDestinationInputCena(inputCena);
    if (isCenaValid != true) {
        okForma = 0;
    }
    let inputPrevoz = document.getElementById("prevoz-edit-destination");
    let isPrevozValid = validateEditDestinationInputPrevoz(inputPrevoz);
    if (isPrevozValid != true) {
        okForma = 0;
    }
    let inputMaxOsoba = document.getElementById("maxOsoba-edit-destination");
    let isMaxOsobaValid = validateEditDestinationInputMaxOsoba(inputMaxOsoba);
    if (isMaxOsobaValid != true) {
        okForma = 0;
    }
    let inputOpis = document.getElementById("opis-edit-destination");
    let isOpisValid = validateEditDestinationInputOpis(inputOpis);
    if (isOpisValid != true) {
        okForma = 0;
    }
    let inputSlike = document.getElementById("slike-edit-destination");
    let isSlikeValid = validateEditDestinationInputSlike(inputSlike);
    if (isSlikeValid != true) {
        okForma = 0;
    }

    if (okForma === 1) {
        //console.log(curDestinationID)
        //console.log(curDestinationInDestinationID);
        editTheDestination();
        return true;
    } else {
        return false;
    }
}
function validateEditDestinationInputSlike(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let errorMessage = document.getElementById("error-destination-slike");
    let links = [];
    let s = '';
    for (let i in value) {
        if (/\s/.test(value[i])) {
            links.push(s);
            s = "";
            continue;
        }  
        s += value[i];
    }
    if (s != "") {
        links.push(s)
    }
    let ok2 = 1;
    let regexSlike = /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
    for (let i in links) {
        if (!regexSlike.test(links[i])) {
            ok2 = 0;
        }
    }
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (ok2 === 0) {
        errorMessage.innerText = 'Unos nije link slike!';
        ok = 0;
    } else {
        errorMessage.innerText = '';
        ok = 1;
    }
    if (ok === 1) {
        slikeLinks = links;
        return true;
    } else {
        return false;
    }
}
function validateEditDestinationInputOpis(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let errorMessage = document.getElementById("error-destination-opis");
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
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
function validateEditDestinationInputMaxOsoba(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let regexMaxOsoba = /^[1-9]\d*$/;
    let errorMessage = document.getElementById("error-destination-maxOsoba");
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (!regexMaxOsoba.test(value)) { 
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
function validateEditDestinationInputPrevoz(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let regexPrevoz = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s']+$/;
    let errorMessage = document.getElementById("error-destination-prevoz");
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (!regexPrevoz.test(value)) { 
        errorMessage.innerText = 'Pogrešni karakteri!';
        ok = 0;
    }  else if (value.length < 2) {
        errorMessage.innerText = 'Dužina >= 2!';
        ok = 0;
    } else if (value.length > 30) {
        errorMessage.innerText = 'Dužina <= 30!';
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
function validateEditDestinationInputCena(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let regexCena = /^[1-9]\d*(\.\d+)?$/;
    let errorMessage = document.getElementById("error-destination-cena");
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (!regexCena.test(value)) { 
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
function validateEditDestinationInputTip(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let regexTip = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s']+$/;
    let errorMessage = document.getElementById("error-destination-tip");
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (!regexTip.test(value)) { 
        errorMessage.innerText = 'Pogrešni karakteri!';
        ok = 0;
    }  else if (value.length < 2) {
        errorMessage.innerText = 'Dužina >= 2!';
        ok = 0;
    } else if (value.length > 30) {
        errorMessage.innerText = 'Dužina <= 30!';
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
function validateEditDestinationInputIme(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let regexIme = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s']+$/;
    let errorMessage = document.getElementById("error-destination-ime");
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (!regexIme.test(value)) { 
        errorMessage.innerText = 'Pogrešni karakteri!';
        ok = 0;
    }  else if (value.length < 2) {
        errorMessage.innerText = 'Dužina naziva >= 2';
        ok = 0;
    } else if (value.length > 30) {
        errorMessage.innerText = 'Dužina naziva <= 30';
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
function closeEditDestinationPopup() {
    popupClicked = 0;
    let popup = document.querySelector(".edit-destination-div");
    popup.style.display = "none";
    let head = document.querySelector(".head");
    head.style.opacity = "1";
    head.style.filter = "none";
    let main = document.querySelector(".main");
    main.style.opacity = "1";
    main.style.filter = "none";
    let navbar = document.querySelector(".navbar");
    navbar.style.filter = "none";
    navbar.style.opacity = "1";
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "1";
    goUp.style.filter = "none";
    document.body.style.overflow = "auto";
    let nav = document.querySelector(".navbar");
    nav.style.visibility = "visible";
    let footer = document.querySelector(".footer");
    footer.style.visibility = "visible";
}
function editDestinationPopup() {
    if (popupClicked === 1) {
        return
    }
    popupClicked = 1
    window.scrollTo(0, 0);
    let destinacija = curDestinationInDestination;
    let popup = document.querySelector(".edit-destination-div");
    popup.style.display = "flex";
    let head = document.querySelector(".head");
    head.style.opacity = "0.1";
    head.style.filter = "blur(4px)";
    let main = document.querySelector(".main");
    main.style.opacity = "0.1";
    main.style.filter = "blur(4px)";
    let navbar = document.querySelector(".navbar");
    navbar.style.opacity = "0.3";
    navbar.style.filter = "blur(4px)";
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "0";
    document.body.style.overflow = "hidden";
    let nav = document.querySelector(".navbar");
    nav.style.visibility = "hidden";
    let footer = document.querySelector(".footer");
    footer.style.visibility = "hidden";

    let imeDestinacije = document.getElementById("ime-edit-destination");
    imeDestinacije.value = destinacija.naziv;
    let tipDestinacije = document.getElementById("tip-edit-destination");
    tipDestinacije.value = destinacija.tip;
    let cenaDestinacije = document.getElementById("cena-edit-destination");
    cenaDestinacije.value = destinacija.cena;
    let prevozDestinacije = document.getElementById("prevoz-edit-destination");
    prevozDestinacije.value = destinacija.prevoz;
    let maxOsobaDestinacije = document.getElementById("maxOsoba-edit-destination");
    maxOsobaDestinacije.value = destinacija.maxOsoba;
    let opisDestinacije = document.getElementById("opis-edit-destination");
    opisDestinacije.value = destinacija.opis;
    let s = destinacija.slike;
    let slikeDestinacije = document.getElementById("slike-edit-destination");
    slikeDestinacije.value = s.join("\n");  

    let h1 = document.querySelector(".edit-destination-div h1");
    h1.style.display = "flex";
    h1.style.justifyContent = "center";
    h1.style.alignItems = "center";
    h1.innerHTML = "EDIT - " + destinacija.naziv;
}



// DELETE DESTINATION
function closeDeleteDestinationPopup() {
    popupClicked = 0;
    let popup = document.getElementById("delete-destination-popup");
    popup.style.display = "none";
    let head = document.querySelector(".head");
    head.style.opacity = "1";
    head.style.filter = "none";
    let main = document.querySelector(".main");
    main.style.opacity = "1";
    main.style.filter = "none";
    let navbar = document.querySelector(".navbar");
    navbar.style.filter = "none";
    navbar.style.opacity = "1";
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "1";
    goUp.style.filter = "none";
    document.body.style.overflow = "auto";
}
function deleteDestination() {
    popupClicked = 0;
    let popup = document.getElementById("delete-destination-popup");
    popup.style.display = "none";
    let pageId = window.location.hash.substr(1);
    pageId = pageId.split("-");
    let id1 = parseInt(pageId[0])
    let id2 = parseInt(pageId[1])
    let id3 = parseInt(pageId[2])
    let destID = destinationsID[id1];
    let destInDestID = curDestinationInDestinationID;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                //location.reload();
                window.location.href = `agencija.html#${id3}`;
            } else {
                window.location.href = "error.html";
            }            
        }
    }
    request.open('DELETE', firebaseUrl + '/destinacije/' + destID + "/" + destInDestID + '.json');
    request.send(); 
}
function doYouWantToDeleteDestination() {
    if (popupClicked === 1) {
        return
    }
    popupClicked = 1
    window.scrollTo(0, 0);
    let destInDest = curDestinationInDestination;
    let p = document.getElementById("upozorenje-poruka-destinacija");
    p.innerHTML = "Da li ste sigurni da želite da obrišete destinaciju '" + destInDest.naziv + "'?";
    let popup = document.getElementById("delete-destination-popup");
    popup.style.display = "block";
    let head = document.querySelector(".head");
    head.style.opacity = "0.3";
    head.style.filter = "blur(4px)";
    let main = document.querySelector(".main");
    main.style.opacity = "0.3";
    main.style.filter = "blur(4px)";
    let navbar = document.querySelector(".navbar");
    navbar.style.opacity = "0.3";
    navbar.style.filter = "blur(4px)";
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "0";
    document.body.style.overflow = "hidden";
}


// LOGIN
function showToastLogin(korisnicko) {
    let toast = document.querySelector(".toast-div");
    let toastPopup = document.getElementById("toast-popup");
    toastPopup.innerHTML = "Dobrodošli, " + korisnicko + "!";
    toast.classList.add("show");
    //console.log(toast); 
    setTimeout(function(){ toast.classList.remove("show"); location.reload();}, 1000);
}
function closeAllForLogin(korisnicko) {
    showToastLogin(korisnicko);    
}
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
                            errorKorisnicko.innerText = "";
                            errorLozinka.innerText = ""; 
                            closeAllForLogin(korisnicko1);   
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
    let main = document.querySelector(".main");
    main.style.opacity = "0.1";
    mainFilterLogin = main.style.filter;
    main.style.filter = "blur(4px)";
    let head = document.querySelector(".head");
    head.style.opacity = "0.1";
    head.style.filter = "blur(4px)";
    let navbar = document.querySelector(".navbar");
    navbar.style.opacity = "0.3";
    navbar.style.filter = "blur(4px)";
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "0";
    document.body.style.overflow = "hidden";
    let nav = document.querySelector(".navbar");
    nav.style.visibility = "hidden";
    let adminSelect = document.querySelector(".admin-select");
    adminSelect.style.visibility = "hidden";
    let footer = document.querySelector(".footer");
    footer.style.visibility = "hidden";
}
function closeLogin() {
    popupClicked = 0
    let logDiv = document.querySelector(".login-div");
    logDiv.style.display = "none";
    let main = document.querySelector(".main");
    main.style.filter = mainFilterLogin;
    main.style.opacity = "1";
    let head = document.querySelector(".head");
    head.style.opacity = "1";
    head.style.filter = "none";
    let navbar = document.querySelector(".navbar");
    navbar.style.filter = "none";
    navbar.style.opacity = "1";
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "1";
    goUp.style.filter = "none";
    document.body.style.overflow = "auto";
    let nav = document.querySelector(".navbar");
    nav.style.visibility = "visible";
    let adminSelect = document.querySelector(".admin-select");
    adminSelect.style.visibility = "visible";
    let footer = document.querySelector(".footer");
    footer.style.visibility = "visible";
}

// REGISTER
function showToastRegister(korisnicko) {
    let toast = document.querySelector(".toast-div");
    let toastPopup = document.getElementById("toast-popup");
    toastPopup.innerHTML = "Korisnik " + korisnicko + " je uspešno registrovan!";
    toast.classList.add("show");
    //console.log(toast); 
    setTimeout(function(){ toast.classList.remove("show"); location.reload();}, 1000);
}
function closeAllForRegisterUser(korisnicko) {
    showToastRegister(korisnicko);
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
            closeAllForRegisterUser(korisnicko1);
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
        registerNewUser();
        return true;
    } else {
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
        passwordToggleEditUser.innerHTML = '<i style = "cursor: pointer;" class = "fa fa-eye" aria-hidden = "true"> </i>';
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
        passwordToggleLogin.innerHTML = '<i style = "cursor: pointer;" class = "fa fa-eye" aria-hidden = "true"> </i>';
    } else {
        passwordInputLogin.type = "password";
        passwordToggleLogin.innerHTML = '<i style = "cursor: pointer;" class = "fa fa-eye-slash" aria-hidden = "true"> </i>';
    }
}
function togglePswVisibility() {
    let passwordInput = document.getElementById("psw-register");
    let passwordToggle = document.querySelector(".psw-register-toggle");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.innerHTML = '<i style = "cursor: pointer;" class = "fa fa-eye" aria-hidden = "true"> </i>';
    } else {
        passwordInput.type = "password";
        passwordToggle.innerHTML = '<i style = "cursor: pointer;" class = "fa fa-eye-slash" aria-hidden = "true"> </i>';
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

    let main = document.querySelector(".main");
    mainFilterRegister = main.style.filter;
    main.style.opacity = "0.1";
    main.style.filter = "blur(4px)";
    let head = document.querySelector(".head");
    head.style.opacity = "0.1";
    head.style.filter = "blur(4px)";
    let navbar = document.querySelector(".navbar");
    navbar.style.opacity = "0.3";
    navbar.style.filter = "blur(4px)";
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "0";
    document.body.style.overflow = "hidden";
    let nav = document.querySelector(".navbar");
    nav.style.visibility = "hidden";
    let adminSelect = document.querySelector(".admin-select");
    adminSelect.style.visibility = "hidden";
    let footer = document.querySelector(".footer");
    footer.style.visibility = "hidden";
}
function closeRegister() {
    popupClicked = 0
    let regDiv = document.querySelector(".register-div");
    regDiv.style.display = "none";
    let main = document.querySelector(".main");
    main.style.filter = mainFilterRegister;
    main.style.opacity = "1";
    let head = document.querySelector(".head");
    head.style.opacity = "1";
    head.style.filter = "none";
    let navbar = document.querySelector(".navbar");
    navbar.style.filter = "none";
    navbar.style.opacity = "1";
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "1";
    goUp.style.filter = "none";
    document.body.style.overflow = "auto";
    let nav = document.querySelector(".navbar");
    nav.style.visibility = "visible";
    let adminSelect = document.querySelector(".admin-select");
    adminSelect.style.visibility = "visible";
    let footer = document.querySelector(".footer");
    footer.style.visibility = "visible";
}


// FUNCKIJE ZA IZGLED
function appendDestinationBody(agency, destinacija) {
   
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

    let pageId = window.location.hash.substr(1);
    pageId = pageId.split("-");

    let id1 = parseInt(pageId[0]);
    let id2 = parseInt(pageId[1]);
    let id3 = parseInt(pageId[2]);

    let destID = destinationsID[id1]
    curDestinationID = destID

    let dest = destinations[destID]
    let cnt = 0
    let destInDestID = "";
    for (let idDest in dest) {
        if (cnt == id2) {
            destInDestID = idDest;
        }
        cnt++;
    }
    let destInDest = dest[destInDestID] 
    let agencyID = agenciesID[id3];
    let agency = agencies[agencyID];

    curDestinationInDestinationID = destInDestID;
    curDestinationInDestination = destInDest;

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

    let loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", isLoginValid)
    
    let registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", isRegisterValid)

    let editForm = document.getElementById("edit-destination-form");
    editForm.addEventListener("submit", isEditDestinationValid)

    appendDestinationBody(agency, destInDest);

    let buttonEdit = document.getElementById("button-edit-destination");
    let buttonDelete = document.getElementById("button-delete-destination");
    buttonEdit.style.display = "inline-block";
    buttonEdit.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>';
    buttonEdit.setAttribute("onclick", "editDestinationPopup()");
    buttonDelete.style.display = "inline-block";
    buttonDelete.setAttribute("onclick", "doYouWantToDeleteDestination()");
    buttonDelete.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    
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

