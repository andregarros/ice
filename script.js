document.addEventListener('DOMContentLoaded', () => {
    // Referências dos Elementos DOM
    const flavourIcons = document.querySelectorAll('.flavour-icon');
    const productImage = document.querySelector('.product-image');
    const heroSection = document.querySelector('.hero-section');
    
    // REMOVIDO: const bgPattern = document.querySelector('.bg-pattern'); // Removido por não existir mais no HTML
    
    const rightArrow = document.querySelector('.right-arrow'); 

    const flavorData = {
        'limao': {
            image: 'gelo.png', // Caminho da imagem da embalagem de Limão
            // REMOVIDO: bgPattern não é mais necessário
            glowColor: '#39FF14', // Verde Neon do Limão
            bgColor: '#A0D0A0' // Cor de fundo da seção Hero para Limão
        },
        'morango': {
            image: 'bannermorango.png', 
            // bgPattern: 'fundo_geometrico_morango_claro.png', // Removido
            glowColor: '#FF10F0', // Rosa Neon
            bgColor: '#F5B0C0' // Rosa Claro
        },
        'melancia': {
            image: 'bannermelancia.png',
            // bgPattern: 'fundo_geometrico_melancia_claro.png', // Removido
            glowColor: '#FF0033', // Vermelho/Pink Forte
            bgColor: '#FFA0A0' // Salmão/Vermelho Claro
        },
        'uva': {
            image: 'bannerdeuva.png', 
            // bgPattern: 'fundo_geometrico_uva_claro.png', // Removido
            glowColor: '#7B00FF', // Roxo Neon
            bgColor: '#C0A0FF' // Roxo Claro
        },
        'maracuja': {
            image: 'bannermaracuja.png', 
            // bgPattern: 'fundo_geometrico_maracuja_claro.png', // Removido
            glowColor: '#FFC300', // Amarelo Neon
            bgColor: '#FFF0A0' // Amarelo Claro
        }
    };

    const updateProductDisplay = (sabor) => {
        const data = flavorData[sabor];
        if (!data) return; // Adicionado verificação

        // Inicia a transição de saída (esconde elementos)
        productImage.classList.add('fade-out');

        setTimeout(() => {
            // Atualiza os estilos CSS (variáveis CSS para cores do glow/borda)
            document.documentElement.style.setProperty('--product-glow-color', data.glowColor);
            document.documentElement.style.setProperty('--flavour-icon-active-border', data.glowColor);
            

            // !!! CORREÇÃO MAIS IMPORTANTE: ATUALIZAR A IMAGEM DO PRODUTO !!!
            productImage.src = data.image; 
            // -----------------------------------------------------------------
            
            // REMOVIDO: bgPattern.src = data.bgPattern; 

            // Finaliza a transição de entrada (mostra elementos)
            productImage.classList.remove('fade-out');
            productImage.classList.add('fade-in');

        }, 300); // O tempo (em ms) deve corresponder à duração da transição no CSS
    };

    // --- Event Listeners para os botões de sabor ---
    flavourIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // Remove a classe 'active' de todos os ícones
            flavourIcons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active'); // Adiciona 'active' ao ícone clicado
            updateProductDisplay(icon.getAttribute('data-sabor')); // Atualiza o display do produto
        });
    });

    // --- Lógica da seta de navegação ---
    rightArrow.addEventListener('click', () => {
        let currentIndex = -1;
        const currentActive = document.querySelector('.flavour-icon.active');
        if (currentActive) {
            currentIndex = Array.from(flavourIcons).indexOf(currentActive);
        }
        
        let nextIndex = (currentIndex + 1) % flavourIcons.length;
        if (nextIndex < 0) nextIndex = 0; // Garante que não haja índice negativo
        flavourIcons[nextIndex].click(); // Simula o clique no próximo sabor
    });

    // --- Estado Inicial (Limão) ---
    // Simula o clique inicial para garantir que tudo carregue corretamente com Limão
    const initialSabor = document.querySelector('.flavour-icon.active');
    if (initialSabor) {
        updateProductDisplay(initialSabor.getAttribute('data-sabor'));
    }
});