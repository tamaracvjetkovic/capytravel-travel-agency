
var firebaseUrl = 'https://novabazawebprojekat-default-rtdb.europe-west1.firebasedatabase.app/';

var agenciesID = [];
var agencies = {};
var destinationsID = [];
var destinations = {};
var usersID = []; 
var users = {}; 


var userDeleteID;
var agencyDeleteID;

var clicked = 0;
var curBox = 1;


var popupClicked = 0
var curAgencyToEdit = 0;
var curUserToEdit = 0;


window.addEventListener('load', loadAgencies);


// EDIT USER
function showToastEditUser() {
    let toast = document.querySelector(".toast-div");
    let toastPopup = document.getElementById("toast-popup");
    toastPopup.innerHTML = "Korisnik uspešno izmenjen!";
    toast.classList.add("show");
    setTimeout(function(){ toast.classList.remove("show"); location.reload();}, 1000);
}
function closeAllForEditUser() {
    showToastEditUser();
}
function editTheUser() {
    //let user = users[curUserToEdit];  
    let ime1 = document.getElementById('ime-edit-user').value;
    let prezime1 = document.getElementById('prezime-edit-user').value;
    let datum1 = document.getElementById('date-edit-user').value;
    let email1 = document.getElementById('email-edit-user').value;
    let korisnicko1 = document.getElementById('korisnicko-edit-user').value;
    let psw1 = document.getElementById('psw-edit-user').value;
    let adresa1 = document.getElementById('adresa-edit-user').value;
    let telefon1 = document.getElementById('telefon-edit-user').value;
    let editedUser = {
        adresa: adresa1,
        datumRodjenja: datum1,
        email: email1,
        ime: ime1,
        korisnickoIme: korisnicko1,
        lozinka: psw1,
        prezime: prezime1,
        telefon: telefon1   
    };
    let editedUserJson = JSON.stringify(editedUser);
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                closeAllForEditUser();
            } else {
                window.location.href = "error.html";
            }            
        }
    }
    request.open('PUT', firebaseUrl + '/korisnici/' + curUserToEdit + '.json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(editedUserJson);
}
function validateEditUserInputIme(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let regexIme = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s']+$/;
    let errorMessage = document.getElementById("error-user-ime");
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
function validateEditUserInputPrezime(elem) {
    let value = elem.value.trim();
    let regexPrezime = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s']+$/;
    let errorMessage = document.getElementById("error-user-prezime");
    if (!regexPrezime.test(value)) {
        errorMessage.innerText = 'Pogrešni karakteri!';
        ok = 0;
    } else if (value === '') {
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
function validateEditUserInputDate(elem) {
    let value = elem.value;
    let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    let date1 = new Date(value);
    let currentDate = new Date();

    let errorMessage = document.getElementById("error-user-date");

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
        errorMessage.innerText = 'Datum je u budućnosti!';
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
function validateEditUserInputEmail(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let errorMessage = document.getElementById("error-user-email");
    let atIndex = value.indexOf("@");
    let dotIndex = value.lastIndexOf(".");
    let ok2 = 1;
    for (let user in users) {
        if (users[user].email === value) {
            if (users[curUserToEdit].email === value) {
                continue;
            }
            ok2 = 0;
            break
        }
    }
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (atIndex < 1 || dotIndex < atIndex + 2 || dotIndex + 2 >= value.length) {
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
function validateEditUserInputUsername(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let errorMessage = document.getElementById("error-user-username");
    let usernameRegex = /^[a-z][a-z0-9]*$/;
    let ok2 = 1;
    for (let user in users) {
        if (users[user].korisnickoIme === value) {
            if (value === users[curUserToEdit].korisnickoIme) {
                break;
            }
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
function validateEditUserInputPsw(elem) {
    let value = elem.value;
    let ok = 1;
    let errorMessage = document.getElementById("error-user-psw");
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
function validateEditUserInputAddress(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let regexAdresa = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\d\s',']+$/;
    let errorMessage = document.getElementById("error-user-address");
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
function validateEditUserInputPhone(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let errorMessage = document.getElementById("error-user-phone");
    let testing = /^06[1-6]{1}[0-9]{6}$/.test(value);
    let ok2 = 1;
    for (let user in users) {
        if (users[user].telefon === value) {
            if (users[curUserToEdit].telefon === value) {
                continue;
            }
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
function isEditUserValid() { 
    event.preventDefault();
    let okForma = 1;
    let inputIme = document.getElementById("ime-edit-user");
    let isImeValid = validateEditUserInputIme(inputIme);
    if (isImeValid != true) {
        okForma = 0;
    }
    let inputPrezime = document.getElementById("prezime-edit-user");
    let isPrezimeValid = validateEditUserInputPrezime(inputPrezime);
    if (isPrezimeValid != true) {
        okForma = 0;
    }
    let inputDate = document.getElementById("date-edit-user");
    let isDateValid = validateEditUserInputDate(inputDate);
    if (isDateValid != true) {
        okForma = 0;
    }
    let inputEmail = document.getElementById("email-edit-user");
    let isEmailValid = validateEditUserInputEmail(inputEmail);
    if (isEmailValid != true) {
        okForma = 0;
    }
    let inputUsername = document.getElementById("korisnicko-edit-user");
    let isUsernameValid = validateEditUserInputUsername(inputUsername);
    if (isUsernameValid != true) {
        okForma = 0;
    }
    let inputPsw = document.getElementById("psw-edit-user");
    let isPswValid = validateEditUserInputPsw(inputPsw);
    if (isPswValid != true) {
        okForma = 0;
    }
    let inputAddress = document.getElementById("adresa-edit-user");
    let isAddressValid = validateEditUserInputAddress(inputAddress);
    if (isAddressValid != true) {
        okForma = 0;
    }
    let inputPhone = document.getElementById("telefon-edit-user");
    let isPhoneValid = validateEditUserInputPhone(inputPhone);
    if (isPhoneValid != true) {
        okForma = 0;
    }
    if (okForma === 1) {
        editTheUser();
        return true;
    } else {
        return false;
    }
}
function closeEditUserPopup() {
    popupClicked = 0;
    let popup = document.querySelector(".edit-user-div")
    popup.style.display = "none";
    let main = document.querySelector(".main");
    main.style.opacity = "1";
    main.style.filter = "none";
    let adminBody = document.querySelector(".admin-body");
    adminBody.style.opacity = "1";
    adminBody.style.filter = "none";
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
function editUserPopup(userID) {
    if (popupClicked === 1) {
        return
    }
    popupClicked = 1
    curUserToEdit = userID;

    let user = users[userID]

    let popup = document.querySelector(".edit-user-div")
    popup.style.display = "flex";
    let main = document.querySelector(".main");
    main.style.opacity = "0.3";
    main.style.filter = "blur(4px)";
    let adminBody = document.querySelector(".admin-body");
    adminBody.style.opacity = "0.3";
    adminBody.style.filter = "blur(4px)";
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

    let imeUser = document.getElementById("ime-edit-user");
    imeUser.value = user.ime;
    let prezimeUser = document.getElementById("prezime-edit-user");
    prezimeUser.value = user.prezime;

    let datumUser = document.getElementById("date-edit-user");
    datumUser.value = user.datumRodjenja;
    let emailUser = document.getElementById("email-edit-user");
    emailUser.value = user.email;
    
    let korisnickoUser = document.getElementById("korisnicko-edit-user");
    korisnickoUser.value = user.korisnickoIme;
    let pswUser = document.getElementById("psw-edit-user");
    pswUser.value = user.lozinka;

    let adresaUser = document.getElementById("adresa-edit-user");
    adresaUser.value = user.adresa;
    let telefonUser = document.getElementById("telefon-edit-user");
    telefonUser.value = user.telefon;
    
    let h1 = document.querySelector(".edit-user-div h1")
    h1.style.display = "flex";
    h1.style.justifyContent = "center";
    h1.style.alignItems = "center";
    h1.innerHTML = "EDIT - " + user.ime + " " + user.prezime;
}


// EDIT AGENCY



var slikeLinks = [];
var addedDestRightNow = 0;
function loadDestinations4(agencyID, destinacijeID) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                destinationsID = [];
                destinations = JSON.parse(request.responseText);
                for (let id in destinations) {
                    destinationsID.push(id);
                }
                addDestinationsToEditAgencyPopup(agencyID, destinacijeID, destinations[destinacijeID]);
                addedDestRightNow = 1;
                closeEditAgencyAddDestinationPopup();
                editAgencyPopup(agencyID);
            } else {
                window.location.href = "error.html";
            }
        }
    }
    request.open('GET', firebaseUrl + '/destinacije.json');
    request.send();
}
function addTheDestination(agencyID, destinacijeID) {
    let ime1 = document.getElementById('ime-add-destination').value;
    let tip1 = document.getElementById('tip-add-destination').value;
    let cena1 = document.getElementById('cena-add-destination').value;
    let prevoz1 = document.getElementById('prevoz-add-destination').value;
    let maxOsoba1 = document.getElementById('maxOsoba-add-destination').value;
    let opis1 = document.getElementById('opis-add-destination').value;
    let slike1 = slikeLinks;
    let newDestination = {
        cena: cena1,
        maxOsoba: maxOsoba1,
        naziv: ime1,
        opis: opis1,
        prevoz: prevoz1,
        slike: slike1,
        tip: tip1
    };
    let destinationJson = JSON.stringify(newDestination);
    let request = new XMLHttpRequest();
    request.open('POST', firebaseUrl + '/destinacije/' + agencies[curAgencyToEdit].destinacije + '.json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
            destinacijeID = agencies[agencyID].destinacije;
            loadDestinations4(agencyID, destinacijeID);
        } else {
            window.location.href = "error.html";
        }
    }
    };
    request.send(destinationJson);
}
function isAddDestinationValid() { 
    event.preventDefault();
    let okForma = 1;
    let inputIme = document.getElementById("ime-add-destination");
    let isImeValid = validateAddDestinationInputIme(inputIme);
    if (isImeValid != true) {
        okForma = 0;
    }
    let inputTip = document.getElementById("tip-add-destination");
    let isTipValid = validateAddDestinationInputTip(inputTip);
    if (isTipValid != true) {
        okForma = 0;
    }
    let inputCena = document.getElementById("cena-add-destination");
    let isCenaValid = validateAddDestinationInputCena(inputCena);
    if (isCenaValid != true) {
        okForma = 0;
    }
    let inputPrevoz = document.getElementById("prevoz-add-destination");
    let isPrevozValid = validateAddDestinationInputPrevoz(inputPrevoz);
    if (isPrevozValid != true) {
        okForma = 0;
    }
    let inputMaxOsoba = document.getElementById("maxOsoba-add-destination");
    let isMaxOsobaValid = validateAddDestinationInputMaxOsoba(inputMaxOsoba);
    if (isMaxOsobaValid != true) {
        okForma = 0;
    }
    let inputOpis = document.getElementById("opis-add-destination");
    let isOpisValid = validateAddDestinationInputOpis(inputOpis);
    if (isOpisValid != true) {
        okForma = 0;
    }
    let inputSlike = document.getElementById("slike-add-destination");
    let isSlikeValid = validateAddDestinationInputSlike(inputSlike);
    if (isSlikeValid != true) {
        okForma = 0;
    }

    if (okForma === 1) {
        addTheDestination(curAgencyToEdit, agencies[curAgencyToEdit].destinacije);
        return true;
    } else {
        return false;
    }
}
function validateAddDestinationInputSlike(elem) {
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
function validateAddDestinationInputOpis(elem) {
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
function validateAddDestinationInputMaxOsoba(elem) {
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
function validateAddDestinationInputPrevoz(elem) {
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
function validateAddDestinationInputCena(elem) {
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
function validateAddDestinationInputTip(elem) {
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
function validateAddDestinationInputIme(elem) {
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
function closeEditAgencyAddDestinationPopup() {
    let popup = document.querySelector(".add-destination-div");
    popup.style.display = "none";
    let editAgencyPopup = document.querySelector(".edit-agency-div");
    editAgencyPopup.style.display = "flex";
}
function editAgencyAddDestinationPopup() {
    let popup = document.querySelector(".add-destination-div");
    popup.style.display = "flex";
    let editAgencyPopup = document.querySelector(".edit-agency-div");
    editAgencyPopup.style.display = "none";
}
 

function showToastEditAgency() {
    let toast = document.querySelector(".toast-div");
    let toastPopup = document.getElementById("toast-popup");
    toastPopup.innerHTML = "Agencija uspešno izmenjena!";
    toast.classList.add("show");
    setTimeout(function(){ toast.classList.remove("show"); location.reload();}, 1000);
}
function closeAllForEditAgency() {
    showToastEditAgency();
    //location.reload();
}
function editTheAgency() {
    let agencija = agencies[curAgencyToEdit];  
    let ime1 = document.getElementById('ime-edit-agency').value;
    let telefon1 = document.getElementById('telefon-edit-agency').value;
    let email1 = document.getElementById('email-edit-agency').value;
    let adresa1 = document.getElementById('adresa-edit-agency').value;
    let logo1 = document.getElementById('logo-edit-agency').value;
    let godina1 = document.getElementById('godina-edit-agency').value;
    let editedAgency = {
        adresa: adresa1,
        brojTelefona: telefon1 ,
        destinacije: agencija.destinacije,
        email: email1,
        godina: godina1,
        logo: logo1,
        naziv: ime1,      
    };
    let editedAgencyJson = JSON.stringify(editedAgency);
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                closeAllForEditAgency();
            } else {
                window.location.href = "error.html";
            }            
        }
    }
    request.open('PUT', firebaseUrl + '/agencije/' + curAgencyToEdit + '.json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(editedAgencyJson);
}
function isEditAgencyValid() { 
    event.preventDefault();
    let okForma = 1;
    let inputIme = document.getElementById("ime-edit-agency");
    let isImeValid = validateEditAgencyInputIme(inputIme);
    if (isImeValid != true) {
        okForma = 0;
    }
    let inputPhone = document.getElementById("telefon-edit-agency");
    let isPhoneValid = validateEditAgencyInputPhone(inputPhone);
    if (isPhoneValid != true) {
        okForma = 0;
    }
    let inputEmail = document.getElementById("email-edit-agency");
    let isEmailValid = validateEditAgencyInputEmail(inputEmail);
    if (isEmailValid != true) {
        okForma = 0;
    }
    let inputAddress = document.getElementById("adresa-edit-agency");
    let isAddressValid = validateEditAgencyInputAddress(inputAddress);
    if (isAddressValid != true) {
        okForma = 0;
    }
    let inputLogo = document.getElementById("logo-edit-agency");
    let isLogoValid = validateEditAgencyInputLogo(inputLogo);
    if (isLogoValid != true) {
        okForma = 0;
    }
    let inputGodina = document.getElementById("godina-edit-agency");
    let isGodinaValid = validateEditAgencyInputGodina(inputGodina);
    if (isGodinaValid != true) {
        okForma = 0;
    }
    if (okForma === 1) {
        editTheAgency();
        return true;
    } else {
        return false;
    }
}
function validateEditAgencyInputGodina(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let ok2 = 1;
    let y = 3000;
    let errorMessage = document.getElementById("error-agency-godina");
    for (let i = 0; i < value.length; i++) {
        if ((value.codePointAt(i) < 48) || (value.codePointAt(i) > 57)) {
            ok2 = 0;
            break;
        }
        y = parseInt(value);
    }
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (ok2 === 0) {
        errorMessage.innerText = 'Polje sadrži slova!';
        ok = 0;
    } else if (y > 2023) {
        errorMessage.innerText = 'Godina > 2023!';
        ok = 0;
    } else if (y < 1000) {
        errorMessage.innerText = 'Godina < 1000!!';
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
function validateEditAgencyInputLogo(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let regexLogo = /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
    let errorMessage = document.getElementById("error-agency-logo");
    let testing = regexLogo.test(value);

    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (testing != true) {
        errorMessage.innerText = 'Unos nije link slike!';
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
function validateEditAgencyInputAddress(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let regexAdresa = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\d\s',']+$/;
    let errorMessage = document.getElementById("error-agency-address");
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
function validateEditAgencyInputEmail(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let errorMessage = document.getElementById("error-agency-email");
    let atIndex = value.indexOf("@");
    let dotIndex = value.lastIndexOf(".");
    let ok2 = 1;
    for (let agency in agencies) {
        if (agencies[agency].email === value) {
            if (agencies[curAgencyToEdit].email === value) {
                continue;
            }
            ok2 = 0;
            break
        }
    }
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (atIndex < 1 || dotIndex < atIndex + 2 || dotIndex + 2 >= value.length) {
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
function validateEditAgencyInputPhone(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let errorMessage = document.getElementById("error-agency-phone");
    let testing = /0[1-9]{2}\/[0-9]{4}-[0-9]{4,8}\b/.test(value);
    let ok2 = 1;
    for (let agency in agencies) {
        if (agencies[agency].brojTelefona === value) {
            if (agencies[curAgencyToEdit].brojTelefona === value) {
                continue;
            }
            ok2 = 0;
            break
        }
    }
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (testing != true) {
        errorMessage.innerText = 'Pogrešan format broja telefona!';
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
function validateEditAgencyInputIme(elem) {
    let value = elem.value.trim();
    let ok = 1;
    let regexIme = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\d\s']+$/;
    let errorMessage = document.getElementById("error-agency-ime");
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
var deletedDestRightNow = 0;
function loadDestinations3(agencyID, destinacijeID, destInDestID) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                destinationsID = [];
                destinations = JSON.parse(request.responseText);
                for (let id in destinations) {
                    destinationsID.push(id);
                }
                addDestinationsToEditAgencyPopup(agencyID, destinacijeID, destinations[destinacijeID]);
                deletedDestRightNow = 1;
                closeDeleteDestinationInAgencyPopup();
                editAgencyPopup(agencyID);
            } else {
                window.location.href = "error.html";
            }
        }
    }
    request.open('GET', firebaseUrl + '/destinacije.json');
    request.send();
}
function deleteDestinationInAgency(id) {
    let ids = id.split(",");
    let agencyID = ids[0];
    let destinacijeID = ids[1];
    let destInDestID = ids[2];
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                loadDestinations3(agencyID, destinacijeID, destInDestID);          
            } else {
                window.location.href = "error.html";
            }            
        }
    }
    request.open('DELETE', firebaseUrl + '/destinacije/' + destinacijeID + "/" + destInDestID + '.json');
    request.send(); 
}
function closeEditAgencyPopup() {
    if (deletedDestRightNow === 1 || addedDestRightNow === 1) {
        deletedDestRightNow = 0;
        addedDestRightNow = 0;
        location.reload();
    }
    popupClicked = 0;
    let popup = document.querySelector(".edit-agency-div")
    popup.style.display = "none";
    let main = document.querySelector(".main");
    main.style.opacity = "1";
    main.style.filter = "none";
    let adminBody = document.querySelector(".admin-body");
    adminBody.style.opacity = "1";
    adminBody.style.filter = "none";
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
function closeDeleteDestinationInAgencyPopup() {
    let popup = document.getElementById("delete-destination-popup");
    popup.style.display = "none";
    let editAgencyPopup = document.querySelector(".edit-agency-div");
    editAgencyPopup.style.display = "flex";
}
function addDestinationsToEditAgencyPopup(agencyID, destinacijeID, destinacije) {
    let div = document.querySelector(".edit-agency-destinacije")
    while (div.firstChild) {
        div.removeChild(div.lastChild);
    }
    let p = document.createElement("p");
    p.setAttribute("id", "p-edit-destination-in-agency");
    p.innerHTML = "<b> DESTINACIJE </b>";
    div.appendChild(p);
    let btnEditAgencyAddDestination = document.createElement("button");
    div.appendChild(btnEditAgencyAddDestination);
    btnEditAgencyAddDestination.innerHTML = "<i style = 'cursor: pointer;' class='fa fa-plus-circle' aria-hidden=';'true'></i>"
    btnEditAgencyAddDestination.style.cursor = "pointer";
    btnEditAgencyAddDestination.classList.add("btn-edit-agency-add-destination");
    btnEditAgencyAddDestination.addEventListener("click", editAgencyAddDestinationPopup);
    
    for (let destInDestID in destinacije) {
        let destInDest = destinacije[destInDestID]
        let divEditAgencyDestination = document.createElement("div")
        divEditAgencyDestination.classList.add("edit-agency-destination");
        divEditAgencyDestination.setAttribute("id", destInDestID);
        div.appendChild(divEditAgencyDestination);
        let divLabel = document.createElement("div")
        divLabel.classList.add("edit-agency-div-label")
        let img = document.createElement("img")
        img.src = (destInDest.slike)[0];
        //img.style.marginLeft = "10px";
        img.style.width = "45px";
        img.style.height = "40px";
        divLabel.appendChild(img)
        let label = document.createElement("label");
        label.style.marginLeft = "15px";
        label.htmlFor = destInDestID;
        label.innerHTML = destInDest.naziv;  
        divLabel.appendChild(label);
        divEditAgencyDestination.appendChild(divLabel);
        let divButtons = document.createElement("div")
        divButtons.classList.add("buttons")
        divEditAgencyDestination.appendChild(divButtons);
        let buttonDeleteDestinationInAgency = document.createElement("button")    
        divButtons.appendChild(buttonDeleteDestinationInAgency)
        buttonDeleteDestinationInAgency.innerHTML = '<i style = "cursor: pointer;" class="fa fa-trash" aria-hidden="true"></i>';
        buttonDeleteDestinationInAgency.style.cursor = "pointer";
        buttonDeleteDestinationInAgency.classList.add("btn-delete-dest-in-agency");
        let idDel = agencyID + "," + destinacijeID + "," + destInDestID;
        buttonDeleteDestinationInAgency.setAttribute("id", idDel);
    }
    let btnExit = document.createElement("button")
    btnExit.classList.add("edit-agency-btn-exit")
    btnExit.innerHTML = '<i style = "cursor: pointer;" class="fa fa-times-circle" aria-hidden="true"></i>';
    btnExit.style.cursor = "pointer";
    btnExit.addEventListener("click", closeEditAgencyPopup);
    div.appendChild(btnExit); 
    let buttons = document.querySelectorAll(".btn-delete-dest-in-agency");
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            let btnDeleteYes = document.querySelector(".delete-popup3 .btn-delete-yes")
            let buttonID = button.getAttribute('id');
            let ids = buttonID.split(",");
            let agencyID = ids[0];
            let destinacijeID = ids[1];
            let destInDestID = ids[2];
            btnDeleteYes.setAttribute("id", buttonID);
            let destinacije = destinations[destinacijeID];
            let destInDest = destinacije[destInDestID];
            let p = document.getElementById("upozorenje-poruka-destinacija");
            p.innerHTML = "Da li ste sigurni da želite da obrišete destinaciju '" + destInDest.naziv + "'?";
            let popup = document.getElementById("delete-destination-popup");
            popup.style.display = "block";
            let editAgencyPopup = document.querySelector(".edit-agency-div");
            editAgencyPopup.style.display = "none";
        });
    }); 
    
}
function editAgencyPopup(agencyID) {
    if (popupClicked === 1) {
        return
    }
    popupClicked = 1
    curAgencyToEdit = agencyID;

    let agencija = agencies[agencyID]
    let destinacijeID = agencija.destinacije
    let destinacije = destinations[destinacijeID]

    let popup = document.querySelector(".edit-agency-div")
    popup.style.display = "flex";
    let main = document.querySelector(".main");
    main.style.opacity = "0.3";
    main.style.filter = "blur(4px)";
    let adminBody = document.querySelector(".admin-body");
    adminBody.style.opacity = "0.3";
    adminBody.style.filter = "blur(4px)";
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

    let imeAgencije = document.getElementById("ime-edit-agency");
    imeAgencije.value = agencija.naziv;
    let telefonAgencije = document.getElementById("telefon-edit-agency");
    telefonAgencije.value = agencija.brojTelefona;

    let emailAgencije = document.getElementById("email-edit-agency");
    emailAgencije.value = agencija.email;
    let adresaAgencije = document.getElementById("adresa-edit-agency");
    adresaAgencije.value = agencija.adresa;

    let logoAgencije = document.getElementById("logo-edit-agency");
    logoAgencije.value = agencija.logo;
    let godinaAgencije = document.getElementById("godina-edit-agency");
    godinaAgencije.value = agencija.godina;
    let h1 = document.querySelector(".edit-agency-div h1")
    h1.style.display = "flex";
    h1.style.justifyContent = "center";
    h1.style.alignItems = "center";
    h1.innerHTML = "EDIT - " + agencija.naziv + "<img style = 'margin-left: 15px; height: 35px; width: 45px;' src = '" + agencija.logo + "'>";
    addDestinationsToEditAgencyPopup(agencyID, destinacijeID, destinacije);
}


// DELETE AGENCY
function closeDeleteAgencyPopup() {
    popupClicked = 0;
    let popup = document.getElementById("delete-agency-popup");
    popup.style.display = "none";
    let popup2 = document.querySelector(".delete-popup2");
    popup2.style.display = "none";
    let main = document.querySelector(".main");
    main.style.opacity = "1";
    main.style.filter = "none";
    let adminBody = document.querySelector(".admin-body");
    adminBody.style.opacity = "1";
    adminBody.style.filter = "none";
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
function deleteAgency() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                closeDeleteAgencyPopup()
                loadAgencies2()
            } else {
                window.location.href = "error.html";
            }            
        }
    }
    request.open('DELETE', firebaseUrl + '/agencije/' + agencyDeleteID + '.json');
    request.send(); 
}
function doYouWantToDeleteAgency(agencyID) {
    if (popupClicked === 1) {
        return
    }
    popupClicked = 1;
    agencija = agencies[agencyID];
    let p = document.getElementById("upozorenje-poruka-agencija");
    p.innerHTML = "Da li ste sigurni da želite da obrišete agenciju '" + agencija.naziv + "'?";
    agencyDeleteID = agencyID;
    let popup = document.getElementById("delete-agency-popup");
    popup.style.display = "block";
    let popup2 = document.querySelector(".delete-popup2");
    popup2.style.display = "flex";
    
    let main = document.querySelector(".main");
    main.style.opacity = "0.3";
    main.style.filter = "blur(4px)";
    let adminBody = document.querySelector(".admin-body");
    adminBody.style.opacity = "0.3";
    adminBody.style.filter = "blur(4px)";
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


// DELETE USER
function closeDeleteUserPopup() {
    popupClicked = 0;
    let popup = document.getElementById("delete-user-popup");
    popup.style.display = "none";
    let popup2 = document.querySelector(".delete-popup1");
    popup2.style.display = "none";
    let main = document.querySelector(".main");
    main.style.opacity = "1";
    main.style.filter = "none";
    let adminBody = document.querySelector(".admin-body");
    adminBody.style.opacity = "1";
    adminBody.style.filter = "none";
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
function deleteUser() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                closeDeleteUserPopup();
                loadUsers2();;
            } else {
                window.location.href = "error.html";
            }    
                    
        }
    }
    request.open('DELETE', firebaseUrl + '/korisnici/' + userDeleteID + '.json');
    request.send(); 
}
function doYouWantToDeleteUser(userID) {
    if (popupClicked === 1) {
        return
    }
    popupClicked = 1
    let user = users[userID];
    let p = document.getElementById("upozorenje-poruka-user");
    p.innerHTML = "Da li ste sigurni da želite da obrišete korisnika '@" + user.korisnickoIme + "'?";
    userDeleteID = userID;
    let popup = document.getElementById("delete-user-popup");
    popup.style.display = "block";
    let popup2 = document.querySelector(".delete-popup1");
    popup2.style.display = "flex";
    
    let main = document.querySelector(".main");
    main.style.opacity = "0.3";
    main.style.filter = "blur(4px)";
    let adminBody = document.querySelector(".admin-body");
    adminBody.style.opacity = "0.3";
    adminBody.style.filter = "blur(4px)";
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


// LOGIN
function showToastLogin(korisnicko) {
    let toast = document.querySelector(".toast-div");
    let toastPopup = document.getElementById("toast-popup");
    toastPopup.innerHTML = "Dobrodošli, " + korisnicko + "!";
    toast.classList.add("show");
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
    let adminBody = document.querySelector(".admin-body");
    adminBody.style.opacity = "0.3";
    adminBody.style.filter = "blur(4px)";
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
    let adminBody = document.querySelector(".admin-body");
    adminBody.style.opacity = "1";
    adminBody.style.filter = "none";
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
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (!regexPrezime.test(value)) {
        errorMessage.innerText = 'Pogrešni karakteri!';
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
    } else if (dateRegex.test(value) != true) {
        errorMessage.innerText = 'Pogrešan datum!';
        ok = 0;
    } else if (isNaN(date1.getTime())) {
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
    if (value === '') {
        errorMessage.innerText = 'Polje je prazno!';
        ok = 0;
    } else if (usernameRegex.test(value) != true) {
        errorMessage.innerText = 'Pogrešni karakteri!';
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
        errorMessage.innerText = 'Pogrešni karakteri!';
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
    let adminBody = document.querySelector(".admin-body");
    adminBody.style.opacity = "0.3";
    adminBody.style.filter = "blur(4px)";
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
    let adminBody = document.querySelector(".admin-body");
    adminBody.style.opacity = "1";
    adminBody.style.filter = "none";
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


// GENERISANJE TABELA U ADMIN PANELU
function deleteUsersTable() {
    let tableUsersBody = document.querySelector(".tabela-korisnici");
    while (tableUsersBody.firstChild) {
        tableUsersBody.removeChild(tableUsersBody.lastChild);
    }
}
function createUsersTable() {
    deleteUsersTable()
    let tableUsers = document.querySelector(".tabela-korisnici");
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
        let td = document.createElement("td")
        let div1 = document.createElement("div");
        let buttonEdit = document.createElement("button");
        buttonEdit.setAttribute("id", (id));
        buttonEdit.setAttribute("onclick", "editUserPopup(this.id)");
        buttonEdit.innerHTML = '<i style = "cursor: pointer;" class="fa fa-pencil-square-o" aria-hidden="true"></i>';
        buttonEdit.style.cursor = "pointer";
        let buttonDelete = document.createElement("button")
        buttonDelete.setAttribute("id", (id));
        buttonDelete.setAttribute("onclick", "doYouWantToDeleteUser(this.id)");
        buttonDelete.innerHTML = '<i style = "cursor: pointer;" class="fa fa-trash" aria-hidden="true"></i>';
        buttonDelete.style.cursor = "pointer";
        div1.append(buttonEdit);   
        div1.append(buttonDelete);  
        div1.classList.add("edit-delete-buttons");
        td.append(div1);
        tr.append(td);
        for (i in user) {
            let td = document.createElement("td")
            td.append(user[i]);
            tr.append(td);
        }
    }       
}
function deleteAgencyTable() {
    let tableAgencyBody = document.querySelector(".tabela-agencije");
    while (tableAgencyBody.firstChild) {
        tableAgencyBody.removeChild(tableAgencyBody.lastChild);
    }
}
function createAgencyTable() {
    deleteAgencyTable()
    let tableAgencies = document.querySelector(".tabela-agencije");
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
                br++;
            }
            th.innerHTML = naziv;
            tr.append(th);
        }
        break;
    }
    for (let id in agencies) {
        let tr = document.createElement("tr");
        tableAgencies.append(tr);
        let agency = agencies[id];
        let td = document.createElement("td");
        let div1 = document.createElement("div");
        let buttonEdit = document.createElement("button");
        buttonEdit.setAttribute("id", (id));
        buttonEdit.setAttribute("onclick", "editAgencyPopup(this.id)");
        buttonEdit.innerHTML = '<i style = "cursor: pointer;" class="fa fa-pencil-square-o" aria-hidden="true"></i>';
        buttonEdit.style.cursor = "pointer";
        let buttonDelete = document.createElement("button")
        buttonDelete.setAttribute("id", (id));
        buttonDelete.setAttribute("onclick", "doYouWantToDeleteAgency(this.id)");
        buttonDelete.innerHTML = '<i style = "cursor: pointer;" style = "cursor: pointer;" class="fa fa-trash" aria-hidden="true"></i>';
        buttonDelete.style.cursor = "pointer";
        div1.append(buttonEdit);   
        div1.append(buttonDelete);  
        div1.classList.add("edit-delete-buttons");
        td.append(div1);
        tr.append(td);
        for (i in agency) {
            if (i === "destinacije") {
                let divDestinacijeNazivi = document.createElement("div");
                for (let dest in destinations) {
                    if (dest === agency.destinacije) {
                        for (let d in destinations[dest]) {
                            let ps = document.createElement("p");
                            ps.innerText = destinations[dest][d].naziv;
                            divDestinacijeNazivi.append(ps);
                        }
                    }  
                }
                let td = document.createElement("td")
                td.append(divDestinacijeNazivi);
                tr.append(td);
                continue;   
            }
            let td = document.createElement("td");
            td.append(agency[i]);
            tr.append(td);
        }
    }       
}
function createDestinationTable() {
    let tableDestinations = document.querySelector(".tabela-destinacije");
    for (let id in destinations) {
        let destination = destinations[id];
        for (let dest in destination) { 
            let tr = document.createElement("tr");
            tableDestinations.append(tr);
            for (i in destination[dest]) {
                let th = document.createElement("th");
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
            let tr = document.createElement("tr");
            tableDestinations.append(tr);  
            for (let i in destination[dest]) {
                if (i === "opis") {
                    let divOpis = document.createElement("div");
                    divOpis.classList.add("destinacija-opis-url");
                    let po = document.createElement("p");
                    po.innerText = destination[dest][i];
                    divOpis.append(po);
                    let td = document.createElement("td")
                    td.append(divOpis);
                    tr.append(td);
                    continue;
                }
                if (i === "slike") {
                    let divSlike = document.createElement("div");
                    divSlike.classList.add("destinacija-slike-url");
                    for (let sl in destination[dest][i]) {
                        let ps = document.createElement("p");
                        ps.innerText = destination[dest][i][sl];
                        divSlike.append(ps);
                    }
                    let td = document.createElement("td")
                    td.append(divSlike);
                    tr.append(td);
                    continue;
                }
                let td = document.createElement("td")
                td.append(destination[dest][i]);
                tr.append(td);
            }
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
    let position = document.body.scrollTop || document.documentElement.scrollTop;
    if (position) {
      window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
      scrollAnimation = setTimeout("scrollToTop()", 12);
    } else clearTimeout(scrollAnimation);
}
// MAIN
function main() {

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
        "Korisnici": "korisnici",
        "Destinacije": "destinacije",
    };

    for (let key in options) {
        let option = document.createElement("option");
        option.setAttribute('value', options[key]);
        let optionText = document.createTextNode(key);
        option.appendChild(optionText);
        dropdown.appendChild(option);
    }
    
    let log = document.getElementById("login-button");
    log.onclick = showLogin;

    let reg = document.getElementById("register-button");
    reg.onclick = showRegister;

    createAgencyTable();
    createUsersTable();
    createDestinationTable();

    let footer = document.querySelector(".footer");
    let navbar = document.querySelector(".navbar");
    let footerHeight = footer.offsetHeight;
    let navbarHeight = navbar.offsetHeight;
    let displayHeight = window.innerHeight;
    let main = document.querySelector(".main");
    main.style.minHeight = (displayHeight - footerHeight - navbarHeight) + "px";  

    let selectDropdown = document.getElementById("select-dropdown");
    let agencijeTable = document.querySelector(".tabela-agencije");
    let korisniciTable = document.querySelector(".tabela-korisnici");
    let destinacijeTable = document.querySelector(".tabela-destinacije");
    selectDropdown.addEventListener("change", function() {
        let selectedValue = this.value;
        let notify = document.getElementById("destination-notification");
        agencijeTable.style.display = "none";
        destinacijeTable.style.display = "none";
        korisniciTable.style.display = "none";
        if (selectedValue === "agencije") {
            agencijeTable.style.display = "table";
            notify.style.display = "none";
        } else if (selectedValue === "korisnici") {
            korisniciTable.style.display = "table";
            notify.style.display = "none";
        } else if (selectedValue === "destinacije") {
            destinacijeTable.style.display = "table";
            notify.style.display = "block";
        }
    });

    let logo1 = document.getElementById("logo1");
    logo1.onclick = ocitajPocetnu;

    let loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", isLoginValid)
    
    let registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", isRegisterValid)

    let editAgencyForm = document.getElementById("edit-agency-form");
    editAgencyForm.addEventListener("submit", isEditAgencyValid)

    let editUserForm = document.getElementById("edit-user-form");
    editUserForm.addEventListener("submit", isEditUserValid)

    let addDestinationForm = document.getElementById("add-destination-form");
    addDestinationForm.addEventListener("submit", isAddDestinationValid)
}


// LOAD IZ FIREBASE
function loadUsers() {
    let request = new XMLHttpRequest();
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
function loadUsers2() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                usersID = [];
                users = JSON.parse(request.responseText);
                for (let id in users) {
                    usersID.push(id);
                }    
                createUsersTable()  
            } else {
                window.location.href = "error.html";
            }       
        }
    }
    request.open('GET', firebaseUrl + '/korisnici.json');
    request.send();
}

function loadDestinations() {
    let request = new XMLHttpRequest();
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
function loadDestinations2() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                destinationsID = [];
                destinations = JSON.parse(request.responseText);
                for (let id in destinations) {
                    destinationsID.push(id);
                }
            } else {
                window.location.href = "error.html";
            }
        }
    }
    request.open('GET', firebaseUrl + '/destinacije.json');
    request.send();
}

function loadAgencies() {
    let request = new XMLHttpRequest();
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
function loadAgencies2() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                agenciesID = [];
                agencies = JSON.parse(request.responseText);
                for (let id in agencies) {
                    agenciesID.push(id);
                }     
                createAgencyTable()  
            } else {
                window.location.href = "error.html";
            }
        }
    }
    request.open('GET', firebaseUrl + '/agencije.json');
    request.send();
}