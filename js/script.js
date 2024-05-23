const form = document.getElementById('form-bancaire');
      const nomInput = document.getElementById('nom');
      const prenomInput = document.getElementById('prenom');
      const dateInput = document.getElementById('date');
      const emailInput = document.getElementById('email');
      const codeInput = document.getElementById('code');

      const nomError = document.querySelector('.error-nom');
      const prenomError = document.querySelector('.error-prenom');
      const dateError = document.querySelector('.error-date');
      const emailError = document.querySelector('.error-email');
      const codeError = document.querySelector('.error-code');

      const modal = document.getElementById('myModal');
      const closeModal = document.getElementsByClassName('close')[0];
      const closeSubmit = document.getElementById('close-submit');

      function showError(input, message) {
        input.style.border = '2px solid #ff0000';
        const errorElement = input.parentElement.nextElementSibling.querySelector('.error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
      }

      function clearError(input) {
        input.style.border = '2px solid green';
        const errorElement = input.parentElement.nextElementSibling.querySelector('.error-message');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
      }

      function validateNomPrenom(input, errorElement, isNom) {
        let value = input.value.trim();
        if (isNom) {
          value = value.toUpperCase();
        } else {
          value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }
        input.value = value;

        if (value.length < 3 || !/^[\wÀ-ÖØ-öø-ÿ]+$/.test(value)) {
          showError(input, 'Le champ doit contenir au moins 3 caractères alphanumériques.');
        } else {
          clearError(input);
        }
      }

      function validateDate(input) {
        let value = input.value.replace(/[\s\-.]/g, '/');
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

      function validateEmail(input) {
        const value = input.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          showError(input, 'Veuillez saisir un email valide.');
        } else {
          clearError(input);
        }
      }

      function validateCode(input) {
        const value = input.value.trim();
        const codePattern = /^FR\d{5}[A-Z.\-_]{3}x$/;
        if (!codePattern.test(value)) {
          showError(input, 'Le code doit commencer par "FR", suivi de 5 chiffres, 3 lettres majuscules (ou caractères spéciaux "-", ".", "_"), et se terminer par "x".');
        } else {
          clearError(input);
        }
      }

      nomInput.addEventListener('input', () => validateNomPrenom(nomInput, nomError, true));
      prenomInput.addEventListener('input', () => validateNomPrenom(prenomInput, prenomError, false));
      dateInput.addEventListener('input', () => validateDate(dateInput));
      emailInput.addEventListener('input', () => validateEmail(emailInput));
      codeInput.addEventListener('input', () => validateCode(codeInput));

      form.addEventListener('submit', function(event) {
        event.preventDefault();
        validateNomPrenom(nomInput, nomError, true);
        validateNomPrenom(prenomInput, prenomError, false);
        validateDate(dateInput);
        validateEmail(emailInput);
        validateCode(codeInput);

        const errors = document.querySelectorAll('.error-message');
        let hasErrors = false;
        for (let error of errors) {
          if (error.style.display === 'block') {
            hasErrors = true;
            showError(document.querySelector('.btn-submit button'), 'Veuillez corriger les erreurs avant de soumettre le formulaire.');
            break;
          }
        }

        if (!hasErrors) {
          modal.style.display = 'block';
        }
      });

      closeSubmit.addEventListener('click', function() {
        modal.style.display = 'none';
        form.submit();
      });

      closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
      });

      window.addEventListener('click', function(event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      });

      form.addEventListener('reset', function() {
        clearError(nomInput);
        clearError(prenomInput);
        clearError(dateInput);
        clearError(emailInput);
        clearError(codeInput);
        clearError(document.querySelector('.btn-submit button'));
      });
  