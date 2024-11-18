document.getElementById('avaliacaoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Formulário submetido');

    const criatividade = document.querySelector('input[name="criatividade"]:checked');
    const projetos = document.querySelector('input[name="projetos"]:checked');
    const interatividade = document.querySelector('input[name="interatividade"]:checked');

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

    console.log('Dados a serem enviados:', avaliacao);

    // Salvar no Firebase
    db.ref('avaliacoes').push(avaliacao)
        .then(() => {
            console.log('Dados salvos com sucesso!');
            this.reset();
            alert('Obrigado por sua avaliação!');
        })
        .catch(error => {
            console.error('Erro ao salvar:', error);
            alert('Ops! Algo deu errado. Tente novamente.');
        });
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