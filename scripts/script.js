document.getElementById('avaliacaoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Formulário submetido');

    try {
        const criatividade = document.querySelector('input[name="criatividade"]:checked');
        const projetos = document.querySelector('input[name="projetos"]:checked');
        const interatividade = document.querySelector('input[name="interatividade"]:checked');

        console.log('Valores selecionados:', {
            criatividade: criatividade?.value,
            projetos: projetos?.value,
            interatividade: interatividade?.value
        });

        if (!criatividade || !projetos || !interatividade) {
            alert('Por favor, avalie todas as categorias antes de enviar.');
            return;
        }

        const avaliacao = {
            nome: document.getElementById('nome').value || 'Anônimo',
            criatividade: criatividade.value,
            projetos: projetos.value,
            interatividade: interatividade.value,
            comentarios: document.getElementById('comentarios').value,
            data: new Date().toISOString()
        };

        console.log('Tentando salvar:', avaliacao);

        db.ref('avaliacoes').push(avaliacao)
            .then(() => {
                console.log('Salvo com sucesso!');
                this.reset();
                alert('Obrigado por sua avaliação!');
            })
            .catch(error => {
                console.error('Erro ao salvar:', error);
                alert('Erro ao salvar avaliação: ' + error.message);
            });

    } catch (error) {
        console.error('Erro no processo:', error);
        alert('Erro no processo: ' + error.message);
    }
});

function backupAvaliacoes() {
    const avaliacoes = localStorage.getItem('avaliacoes');
    if (avaliacoes) {
        const backup = {
            data: new Date().toISOString(),
            avaliacoes: JSON.parse(avaliacoes)
        };
        localStorage.setItem('avaliacoes_backup', JSON.stringify(backup));
    }
}

// Função para gerenciar a seleção das estrelas
function initializeStarRatings() {
    const ratingGroups = document.querySelectorAll('.rating-group');
    
    ratingGroups.forEach(group => {
        const stars = group.querySelectorAll('input[type="radio"]');
        
        stars.forEach(star => {
            star.addEventListener('change', (e) => {
                const value = e.target.value;
                const name = e.target.name;
                
                // Limpa outras seleções no mesmo grupo
                stars.forEach(s => {
                    if (s.name === name && s.value <= value) {
                        s.checked = true;
                    } else if (s.name === name) {
                        s.checked = false;
                    }
                });
            });
        });
    });
}

// Inicializa o sistema de rating quando o documento carregar
document.addEventListener('DOMContentLoaded', initializeStarRatings); 