document.addEventListener('DOMContentLoaded', function() {
    // Configura o botão do Gmail
    const gmailBtn = document.getElementById('gmail-btn');
    
    gmailBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Prepara o assunto e corpo do email
        const subject = encodeURIComponent('Contato via Site');
        const body = encodeURIComponent('Olá, gostaria de mais informações sobre seus serviços.\n\n');
        
        // Abre o Gmail em nova aba
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=v.graphikscorp@gmail.com&su=${subject}&body=${body}`, '_blank');
    });
});