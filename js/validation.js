
function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}


function showFeedback(inputElement, message) {
    let feedback = inputElement.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.remove();
    }

    feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = message;
    inputElement.parentNode.insertBefore(feedback, inputElement.nextSibling); 
    
    inputElement.classList.add('is-invalid');
    inputElement.classList.remove('is-valid');
}


function removeFeedback(inputElement) {
    let feedback = inputElement.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.remove();
    }
    inputElement.classList.remove('is-invalid');
    inputElement.classList.remove('is-valid');
}


function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    inputs.forEach(input => {
        removeFeedback(input); 
        let fieldIsValid = true;
        const digitsOnly = input.value.replace(/\D/g, ''); // Pega apenas os dígitos

        //cpf
        if (input.id === 'cpf') {
            if (input.required && digitsOnly.length === 0) {
                isValid = false;
                fieldIsValid = false;
                showFeedback(input, 'O CPF é obrigatório.');
            } else if (digitsOnly.length > 0 && digitsOnly.length < 11) {
                isValid = false;
                fieldIsValid = false;
                showFeedback(input, 'CPF incompleto. Deve ter 11 dígitos.');
            } else if (digitsOnly.length === 11 && !isValidCPF(digitsOnly)) {
                isValid = false;
                fieldIsValid = false;
                showFeedback(input, 'CPF inválido. Verifique o número.');
            }
        } 
        //telefone
        else if (input.id === 'telefone') {
            if (input.required && digitsOnly.length === 0) {
                isValid = false;
                fieldIsValid = false;
                showFeedback(input, 'O Telefone é obrigatório.');
            } else if (digitsOnly.length > 0 && (digitsOnly.length < 10)) {
                isValid = false;
                fieldIsValid = false;
                showFeedback(input, 'Telefone incompleto. Deve ter 10 ou 11 dígitos.');
            }
        }
       
        else if (!input.checkValidity()) {
            isValid = false;
            fieldIsValid = false;
            showFeedback(input, input.validationMessage || 'Campo obrigatório ou formato incorreto.');
        }

        if (fieldIsValid) {
            input.classList.add('is-valid');
        }
    });

    return isValid;
}


//mascaras
document.addEventListener('input', function(e) {
    
    // Máscara para CPF: ###.###.###-##
    if (e.target.id === 'cpf') {
        let value = e.target.value.replace(/\D/g, ''); 
        let maskedValue = '';
        let k = 0;
        const maskPattern = '###.###.###-##';

        for (let i = 0; i < maskPattern.length; i++) {
            if (k >= value.length) break;
            if (maskPattern[i] === '#') {
                maskedValue += value[k++];
            } else {
                maskedValue += maskPattern[i];
            }
        }
        e.target.value = maskedValue;
    }

    // Máscara dinâmica para Telefone: (##) #####-#### ou (##) ####-####
    if (e.target.id === 'telefone') {
        let value = e.target.value.replace(/\D/g, '');
        let mask = (value.length > 10) ? '(##) #####-####' : '(##) ####-####';
        
        let maskedValue = '';
        let k = 0;
        for (let i = 0; i < mask.length; i++) {
            if (k >= value.length) break;
            if (mask[i] === '#') {
                maskedValue += value[k++];
            } else {
                maskedValue += mask[i];
            }
        }
        e.target.value = maskedValue;
    }
});



document.addEventListener('submit', function(e) {
    const form = e.target.closest('#cadastro-form'); 
    if (form) {
        e.preventDefault(); 
        
        const msgDiv = document.getElementById('cadastro-msg');
        if(msgDiv) {
            msgDiv.textContent = '';
        }

        if (validateForm(form)) {
        
            const formData = new FormData(form);
            const nome = formData.get('nome') || 'Voluntário(a)';

            alert('Formulário validado com sucesso!');
            if(msgDiv) {
                msgDiv.textContent = 'Obrigado(a), ' + nome + '! Cadastro enviado com sucesso.';
                msgDiv.style.color = 'green';
            }
            
            form.reset(); 
            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
            const allFeedbacks = form.querySelectorAll('.invalid-feedback');
            allFeedbacks.forEach(fb => fb.remove());

        } else {
            alert('Por favor, corrija os erros no formulário.');
             if(msgDiv) {
                msgDiv.textContent = 'Formulário com erros. Verifique os campos em vermelho.';
                msgDiv.style.color = 'red';
            }
        }
    }
});