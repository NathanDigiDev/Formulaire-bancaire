// Récupère les éléments du formulaire par leur identifiant
const form = document.getElementById('form-bancaire');
const nomInput = document.getElementById('nom');
const prenomInput = document.getElementById('prenom');
const dateInput = document.getElementById('date');
const emailInput = document.getElementById('email');
const codeInput = document.getElementById('code');

// Récupère les éléments pour afficher les messages d'erreur
const nomError = document.querySelector('.error-nom');
const prenomError = document.querySelector('.error-prenom');
const dateError = document.querySelector('.error-date');
const emailError = document.querySelector('.error-email');
const codeError = document.querySelector('.error-code');

// Récupère les éléments de la modal de confirmation
const modal = document.getElementById('myModal');
const closeModal = document.getElementsByClassName('close')[0];
const closeSubmit = document.getElementById('close-submit');

// Fonction pour afficher une erreur
function showError(input, message) {
    input.style.border = '2px solid #ff0000'; // Ajoute une bordure rouge à l'input
    const errorElement = input.parentElement.nextElementSibling.querySelector('.error-message');
    errorElement.textContent = message; // Affiche le message d'erreur
    errorElement.style.display = 'block'; // Affiche le message d'erreur
}

// Fonction pour effacer une erreur
function clearError(input) {
    input.style.border = '2px solid green'; // Ajoute une bordure verte à l'input
    const errorElement = input.parentElement.nextElementSibling.querySelector('.error-message');
    errorElement.textContent = ''; // Efface le message d'erreur
    errorElement.style.display = 'none'; // Cache le message d'erreur
}

// Fonction pour valider les champs nom et prénom
function validateNomPrenom(input, errorElement, isNom) {
    let value = input.value.trim(); // Supprime les espaces en début et fin de chaîne
    if (isNom) {
        value = value.toUpperCase(); // Met en majuscules pour le nom
    } else {
        value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Met en majuscule la première lettre pour le prénom
    }
    input.value = value;

    // Vérifie que la valeur a au moins 3 caractères et est alphanumérique
    if (value.length < 3 || !/^[\wÀ-ÖØ-öø-ÿ]+$/.test(value)) {
        showError(input, 'Le champ doit contenir au moins 3 caractères alphanumériques.');
    } else {
        clearError(input);
    }
}

// Fonction pour valider la date
function validateDate(input) {
    let value = input.value.replace(/[\s\-.]/g, '/'); // Remplace les espaces, points et tirets par des slashs
    input.value = value;

    const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!datePattern.test(value)) {
        showError(input, 'Le format de la date doit être jj/mm/aaaa.');
        return;
    }

    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        showError(input, 'La date saisie est invalide.');
    } else {
        clearError(input);
    }
}

// Fonction pour valider l'email
function validateEmail(input) {
    const value = input.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
        showError(input, 'Veuillez saisir un email valide.');
    } else {
        clearError(input);
    }
}

// Fonction pour valider le code
function validateCode(input) {
    const value = input.value.trim();
    const codePattern = /^FR\d{5}[A-Z.\-_]{3}x$/;
    if (!codePattern.test(value)) {
        showError(input, 'Le code doit commencer par "FR", suivi de 5 chiffres, 3 lettres majuscules (ou caractères spéciaux "-", ".", "_"), et se terminer par "x".');
    } else {
        clearError(input);
    }
}

// Ajoute des écouteurs d'événements sur les champs du formulaire
nomInput.addEventListener('input', () => validateNomPrenom(nomInput, nomError, true));
prenomInput.addEventListener('input', () => validateNomPrenom(prenomInput, prenomError, false));
dateInput.addEventListener('input', () => validateDate(dateInput));
emailInput.addEventListener('input', () => validateEmail(emailInput));
codeInput.addEventListener('input', () => validateCode(codeInput));

// Ajoute un écouteur d'événement sur la soumission du formulaire
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire
    validateNomPrenom(nomInput, nomError, true);
    validateNomPrenom(prenomInput, prenomError, false);
    validateDate(dateInput);
    validateEmail(emailInput);
    validateCode(codeInput);

    // Vérifie s'il y a des erreurs affichées
    const errors = document.querySelectorAll('.error-message');
    let hasErrors = false;
    for (let error of errors) {
        if (error.style.display === 'block') {
            hasErrors = true;
            showError(document.querySelector('.btn-submit button'), 'Veuillez corriger les erreurs avant de soumettre le formulaire.');
            break;
        }
    }

    // Affiche la modal si aucune erreur n'est présente
    if (!hasErrors) {
        modal.style.display = 'block';
    }
});

// Ajoute un écouteur d'événement sur le bouton de fermeture de la modal
closeSubmit.addEventListener('click', function() {
    modal.style.display = 'none';
    form.submit(); // Soumet le formulaire après fermeture de la modal
});

// Ajoute un écouteur d'événement sur le bouton de fermeture de la modal
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Ferme la modal si on clique à l'extérieur de celle-ci
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Ajoute un écouteur d'événement sur le bouton de réinitialisation du formulaire
form.addEventListener('reset', function() {
    clearError(nomInput);
    clearError(prenomInput);
    clearError(dateInput);
    clearError(emailInput);
    clearError(codeInput);
    clearError(document.querySelector('.btn-submit button'));
    
});
