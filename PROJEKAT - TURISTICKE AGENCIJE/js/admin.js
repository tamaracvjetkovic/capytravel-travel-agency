
var firebaseUrl = 'https://turistickaagencijaprojekattaca-default-rtdb.europe-west1.firebasedatabase.app/';

var agenciesID = [];
var agencies = {};
var destinationsID = [];
var destinations = {};
var usersID = []; 
var users = {}; 

var clicked = 0;
var curBox = 1;

var userDeleteID;
var agencyDeleteID;
var destinationDeleteID;


window.addEventListener('load', loadAgencies);



function closeDeleteDestinationPopup() {
    let popup = document.getElementById("delete-destination-popup");
    popup.style.display = "none";
}
function closeDeleteAgencyPopup() {
    let popup = document.getElementById("delete-agency-popup");
    popup.style.display = "none";
}
function closeDeleteUserPopup() {
    let popup = document.getElementById("delete-user-popup");
    popup.style.display = "none";
}


//CEKACU DA APDEJTUJU JSON FILE
function deleteDestination() {
    let popup = document.getElementById("delete-destination-popup");
    popup.style.display = "none";
    /*var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log('Destination deleted successfully!');
                location.reload();
            } else {
                alert('Error occurred. Destination could not be deleted.')
            }            
        }
    }
    request.open('DELETE', firebaseUrl + '/destinacije/' + destinationDeleteID + '.json');
    request.send(); */
}
function doYouWantToDeleteDestination(destinationID) {
    destinationDeleteID = destinationID;
    let popup = document.getElementById("delete-destination-popup");
    popup.style.display = "block";
}

function deleteAgency() {
    //  alert("Brisete user: " + userID);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log('Agency deleted successfully!');
                location.reload();
            } else {
                alert('Error occurred. Agency could not be deleted.')
            }            
        }
    }
    request.open('DELETE', firebaseUrl + '/agencjie/' + agencyDeleteID + '.json');
    request.send(); 
}
function doYouWantToDeleteAgency(agencyID) {
    agencyDeleteID = agencyID;
    //console.log(agencyDeleteID);
    let popup = document.getElementById("delete-agency-popup");
    popup.style.display = "block";
}

function deleteUser() {
    //  alert("Brisete user: " + userID);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log('User deleted successfully!');
                location.reload();
            } else {
                alert('Error occurred. User could not be deleted.')
            }            
        }
    }
    request.open('DELETE', firebaseUrl + '/korisnici/' + userDeleteID + '.json');
    request.send(); 
}
function doYouWantToDeleteUser(userID) {
    userDeleteID = userID;
    console.log(userDeleteID);
    let popup = document.getElementById("delete-user-popup");
    popup.style.display = "block";
}


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
    
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "0";
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
    let goUp = document.querySelector(".go-up");
    goUp.style.opacity = "1";
    goUp.style.filter = "none";
    document.body.style.overflow = "auto";
    document.body.removeEventListener('click', disableClicksOutsideRegisterPopup);
}


function createUsersTable() {
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
        let td = document.createElement("td")
        let buttonEdit = document.createElement("button")
        buttonEdit.setAttribute("id", ("edit,korisnik," + id));
        buttonEdit.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>';
        let buttonDelete = document.createElement("button")
        buttonDelete.setAttribute("id", (id));
        buttonDelete.setAttribute("onclick", "doYouWantToDeleteUser(this.id)");
        buttonDelete.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        td.append(buttonEdit);
        td.append(buttonDelete);
        tr.append(td);
        for (i in user) {
            let td = document.createElement("td")
            td.append(user[i]);
            tr.append(td);
        }
    }       
}
function createAgencyTable() {
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
        let td = document.createElement("td")
        let div1 = document.createElement("div");
        let buttonEdit = document.createElement("button")
        buttonEdit.setAttribute("id", ("edit,agencija," + id));
        buttonEdit.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>';
        let buttonDelete = document.createElement("button")
        buttonDelete.setAttribute("id", (id));
        buttonDelete.setAttribute("onclick", "doYouWantToDeleteAgency(this.id)");
        buttonDelete.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
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
            let td = document.createElement("td")
            td.append(agency[i]);
            tr.append(td);
        }
    }       
}
function createDestinationTable() {
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
            let td = document.createElement("td")
            let buttonEdit = document.createElement("button")
            buttonEdit.setAttribute("id", ("edit,destinacija," + dest));
            buttonEdit.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>';
            let buttonDelete = document.createElement("button")
            buttonDelete.setAttribute("id", (dest));
            buttonDelete.setAttribute("onclick", "doYouWantToDeleteDestination(this.id)");
            buttonDelete.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
            td.append(buttonEdit);
            td.append(buttonDelete);
            tr.append(td);
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
    
    let log = document.getElementById("login-button");
    log.onclick = showLogin;

    let reg = document.getElementById("register-button");
    reg.onclick = showRegister;

    createDestinationTable();
    createAgencyTable();
    createUsersTable();

    let selectDropdown = document.getElementById("select-dropdown");
    let agencijeTable = document.querySelector(".tabela-agencije");
    let destinacijeTable = document.querySelector(".tabela-destinacije");
    let korisniciTable = document.querySelector(".tabela-korisnici");
    selectDropdown.addEventListener("change", function() {
        let selectedValue = this.value;
        agencijeTable.style.display = "none";
        destinacijeTable.style.display = "none";
        korisniciTable.style.display = "none";
        if (selectedValue === "agencije") {
            agencijeTable.style.display = "table";
        } else if (selectedValue === "destinacije") {
            destinacijeTable.style.display = "table";
        } else if (selectedValue === "korisnici") {
            korisniciTable.style.display = "table";
        }
    });
}


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
            } else {
                alert('Error occurred. Car could not be loaded.')
            }  
            main();      
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
            } else {
                alert('Error occurred. Car could not be loaded.')
            }
            loadUsers();
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