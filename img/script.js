document.addEventListener('DOMContentLoaded', function() {
    // Função para mudar idioma
    function changeLanguage(lang) {
        const elements = document.querySelectorAll('[data-pt], [data-en]');
        elements.forEach(element => {
            if (element.getAttribute(`data-${lang}`)) {
                if(element.hasAttribute('data-innerhtml')) {
                    element.innerHTML = element.getAttribute(`data-${lang}`);
                } else {
                    element.textContent = element.getAttribute(`data-${lang}`);
                }
            }
        });
        
        // Atualiza o texto do botão
        const btn = document.getElementById('translate-btn');
        if(btn) {
            btn.innerHTML = `<i class="fas fa-language"></i> ${lang === 'pt' ? 'EN' : 'PT'}`;
        }
        localStorage.setItem('preferredLanguage', lang);
    }

    // Verifica linguagem salva
    const savedLang = localStorage.getItem('preferredLanguage') || 'pt';
    changeLanguage(savedLang);
    
    // Configura o botão de tradução
    document.getElementById('translate-btn').addEventListener('click', function() {
        const currentLang = localStorage.getItem('preferredLanguage') || 'pt';
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        changeLanguage(newLang);
    });

    // Botão do Gmail
    const gmailBtn = document.getElementById('gmail-btn');
    if(gmailBtn) {
        gmailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentLang = localStorage.getItem('preferredLanguage') || 'pt';
            const subject = encodeURIComponent(
                currentLang === 'pt' 
                ? 'Contato via Site' 
                : 'Website Contact'
            );
            const body = encodeURIComponent(
                currentLang === 'pt' 
                ? "Olá, gostaria de mais informações sobre seus serviços.\n\n" 
                : "Hello, I would like more information about your services.\n\n"
            );
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=v.graphikscorp@gmail.com&su=${subject}&body=${body}`, '_blank');
        });
    }
});