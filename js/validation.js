// Função de validação de CPF (simples, apenas para demonstração de JS avançado)
function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

// Função para exibir feedback de erro
function showFeedback(inputElement, message) {
    // Remove feedback anterior
    let feedback = inputElement.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.remove();
    }

    // Adiciona novo feedback
    feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = message;
    inputElement.parentNode.insertBefore(feedback, inputElement.nextSibling);
    inputElement.classList.add('is-invalid');
    inputElement.classList.remove('is-valid');
}

// Função para remover feedback de erro
function removeFeedback(inputElement) {
    let feedback = inputElement.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.remove();
    }
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
}

// Função de validação principal
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

    inputs.forEach(input => {
        removeFeedback(input); // Limpa feedback anterior

        if (!input.checkValidity()) {
            isValid = false;
            showFeedback(input, input.validationMessage || 'Campo obrigatório ou formato incorreto.');
        } else if (input.id === 'cpf') {
            const cpfValue = input.value;
            if (!isValidCPF(cpfValue)) {
                isValid = false;
                showFeedback(input, 'CPF inválido. Verifique o número.');
            }
        }
        // Adicionar outras validações avançadas aqui (ex: data de nascimento, email, etc.)
    });

    return isValid;
}

// Função para aplicar máscaras (integrada do mask.js)
function applyMasks() {
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');

    // Função genérica para aplicar máscara
    function applyMask(input, maskPattern) {
        if (!input) return;
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            let maskedValue = '';
            let k = 0;

            for (let i = 0; i < maskPattern.length; i++) {
                if (k >= value.length) break;

                if (maskPattern[i] === '#') {
                    maskedValue += value[k++];
                } else {
                    maskedValue += maskPattern[i];
                }
            }
            e.target.value = maskedValue;
        });
    }

    // Máscara para CPF: ###.###.###-##
    applyMask(cpfInput, '###.###.###-##');

    // Máscara para CEP: #####-###
    applyMask(cepInput, '#####-###');

    // Máscara para Telefone: (##) #####-#### (para 9 dígitos) ou (##) ####-#### (para 8 dígitos)
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let mask = '';

            if (value.length > 10) {
                // Celular com 9 dígitos: (##) #####-####
                mask = '(##) #####-####';
            } else {
                // Fixo ou celular antigo com 8 dígitos: (##) ####-####
                mask = '(##) ####-####';
            }

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
        });
    }
}

// Listener para o formulário de cadastro (quando carregado pelo SPA)
document.addEventListener('DOMContentLoaded', function() {
    // A lógica de máscara será chamada no spa.js após a renderização
});

// Listener para o formulário de cadastro (quando carregado pelo SPA)
document.addEventListener('submit', function(e) {
    const form = e.target.closest('#cadastro-form');
    if (form) {
        e.preventDefault();
        if (validateForm(form)) {
            alert('Formulário validado com sucesso! (Simulação de envio)');
            form.reset();
        } else {
            alert('Por favor, corrija os erros no formulário.');
        }
    }
});
