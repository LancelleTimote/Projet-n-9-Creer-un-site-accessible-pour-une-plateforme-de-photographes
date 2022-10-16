const closeButton = document.querySelector("#close_modal");
const modal = document.getElementById("contact_modal");
const main = document.querySelector("main");
const form = document.querySelector("#contact_form");
const headerModal = document.querySelector(".modal_title");
const contactButton = document.querySelector(".contact_button");

const first = document.querySelector("#firstName");
const last = document.querySelector("#lastName");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

const firstNameValidation = document.querySelector("#firstNameValidation");
const lastNameValidation = document.querySelector("#lastNameValidation");
const emailValidation = document.querySelector("#emailValidation");
const messageValidation = document.querySelector("#messageValidation");

function addPhotographerName(photographe) {
    document.querySelector("#test").innerHTML = "Contactez-moi<br>\n" + photographe.name;
}

function displayModal() {
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("modal_open");
    main.setAttribute("aria-hidden", "true");
    first.focus();
}

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "false");
    contactButton.focus()
}

window.addEventListener("keydown", (e) => {
    if(e.key === "Escape" || e.key === "Enter" && document.activeElement === closeButton) {
        e.preventDefault();
        closeModal();
    }
})

//Regex
function regExLastnameFirstname(value) {
    return /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/.test(value);
    //la méthode test() vérifie s'il y a une correspondance entre un texte et une expression rationnelle.
    //elle retourne true en succès, et false en cas contraire (booléen).
}

//Texte validation ok
function textCorrectForm(querySelectorId) {
    document.querySelector(`#${querySelectorId}`).innerHTML = "Valide";
}

//Couleur texte champ correct
function colorTextCorrectForm(querySelectorId) {
    document.querySelector(`#${querySelectorId}`).classList.add("p-valide");
    document.querySelector(`#${querySelectorId}`).classList.remove("p-error");
}

//Couleur texte champ incorrect
function colorTextIncorrectForm(querySelectorId) {
    document.querySelector(`#${querySelectorId}`).classList.add("p-error");
    document.querySelector(`#${querySelectorId}`).classList.remove("p-valide");
}

//Couleur border champ correct
function colorBorderCorrectForm(querySelectorId) {
    document.querySelector(`#${querySelectorId}`).classList.add("border-valide");
    document.querySelector(`#${querySelectorId}`).classList.remove("border-error");
}

//Couleur border champ incorrect
function colorBorderIncorrectForm(querySelectorId) {
    document.querySelector(`#${querySelectorId}`).classList.add("border-error");
    document.querySelector(`#${querySelectorId}`).classList.remove("border-valide");
}

//Contrôle de la validité du prénom
function firstNameControl() {
    if (regExLastnameFirstname(firstName.value)) {
        textCorrectForm("firstNameValidation");
        colorTextCorrectForm("firstNameValidation");
        colorBorderCorrectForm("firstName");
        return true;
    } else {
        firstNameValidation.innerHTML = "Veuillez entrer 2 à 20 caractères pour le champ du prénom.";
        colorTextIncorrectForm("firstNameValidation");
        colorBorderIncorrectForm("firstName");
        return false;
    }
}

//Contrôle de la validité du nom
function lastNameControl() {
    if (regExLastnameFirstname(lastName.value)) {
        textCorrectForm("lastNameValidation");
        colorTextCorrectForm("lastNameValidation");
        colorBorderCorrectForm("lastName");
        return true;
    } else {
        lastNameValidation.innerHTML = "Veuillez entrer 2 à 20 caractères pour le champ du nom.";
        colorTextIncorrectForm("lastNameValidation");
        colorBorderIncorrectForm("lastName");
        return false;
    }
}

//Contrôle de la validité de l'email
function emailControl() {
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)) {
        textCorrectForm("emailValidation");
        colorTextCorrectForm("emailValidation");
        colorBorderCorrectForm("email");
        return true;
    } else {
        emailValidation.innerHTML = "Veuillez entrer un email valide.";
        colorTextIncorrectForm("emailValidation");
        colorBorderIncorrectForm("email");
        return false;
    }
}

//Contrôle de la validité du message
function messageControl() {
    if(/[^A-Za-z0-9 .'?!,@$#-_]/.test(message.value)) {
        textCorrectForm("messageValidation");
        colorTextCorrectForm("messageValidation");
        colorBorderCorrectForm("message");
        return true;
    } else {
        messageValidation.innerHTML = "Veuillez entrer un message valide.";
        colorTextIncorrectForm("messageValidation");
        colorBorderIncorrectForm("message");
        return false;
    }
}

//Retire texte correct
function DeleteTextCorrectForm(querySelectorId) {
    document.querySelector(`#${querySelectorId}`).innerHTML = '';
}

//Retire bordure correct + remet une width
function DeleteBorderCorrectForm(querySelectorId) {
    document.querySelector(`#${querySelectorId}`).classList.remove("border-valide");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    //Contrôle validité du formulaire
    if(firstNameControl() && lastNameControl() && emailControl() && messageControl()) {
        console.log(
            "Prénom :", firstName.value,
            "Nom :", lastName.value,
            "Email :", email.value,
            "Message :", message.value,
        );
        const deleteTextCorrect = ["firstNameValidation", "lastNameValidation", "emailValidation", "messageValidation"]
        deleteTextCorrect.forEach(element => {
            DeleteTextCorrectForm(element);
        })
        const deleteBorderCorrect = ["firstName", "lastName", "email", "message"]
        deleteBorderCorrect.forEach(element => {
            DeleteBorderCorrectForm(element);
        })
        form.reset();
    } else {
        alert("Veuillez remplir correctement le formulaire.");
    }
})