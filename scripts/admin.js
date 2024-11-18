checkAuth(); 

class AvaliacoesManager {
    constructor() {
        console.log('Iniciando AvaliacoesManager');
        this.avaliacoes = [];
        this.setupEventListeners();
        this.carregarAvaliacoes();
    }

    setupEventListeners() {
        // Pesquisa
        document.getElementById('pesquisa').addEventListener('input', (e) => {
            this.filtrarAvaliacoes(e.target.value);
        });

        // Filtro por nota
        document.getElementById('filtroNota').addEventListener('change', (e) => {
            this.filtrarPorNota(e.target.value);
        });
    }

    calcularEstatisticas() {
        if (this.avaliacoes.length === 0) return {
            mediaGeral: 0,
            total: 0,
            mediaCriatividade: 0,
            mediaProjetos: 0,
            mediaInteratividade: 0
        };

        const soma = this.avaliacoes.reduce((acc, av) => ({
            criatividade: acc.criatividade + Number(av.criatividade),
            projetos: acc.projetos + Number(av.projetos),
            interatividade: acc.interatividade + Number(av.interatividade)
        }), { criatividade: 0, projetos: 0, interatividade: 0 });

        const total = this.avaliacoes.length;

        return {
            mediaGeral: ((soma.criatividade + soma.projetos + soma.interatividade) / (total * 3)).toFixed(1),
            total: total,
            mediaCriatividade: (soma.criatividade / total).toFixed(1),
            mediaProjetos: (soma.projetos / total).toFixed(1),
            mediaInteratividade: (soma.interatividade / total).toFixed(1)
        };
    }

    atualizarEstatisticas() {
        const stats = this.calcularEstatisticas();
        
        document.querySelector('.stat-card:nth-child(1) .stat-number').textContent = stats.mediaGeral;
        document.querySelector('.stat-card:nth-child(2) .stat-number').textContent = stats.total;
        document.querySelector('.stat-card:nth-child(3) .stat-number').textContent = stats.mediaCriatividade;
        document.querySelector('.stat-card:nth-child(4) .stat-number').textContent = stats.mediaProjetos;
    }

    criarEstrelas(nota) {
        return '★'.repeat(nota) + '☆'.repeat(5 - nota);
    }

    formatarData(data) {
        return new Date(data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    renderizarAvaliacoes(avaliacoesArray) {
        const template = document.getElementById('avaliacao-template');
        const container = document.querySelector('.avaliacoes-list');
        container.innerHTML = '';

        avaliacoesArray.forEach(avaliacao => {
            const clone = template.content.cloneNode(true);
            
            clone.querySelector('.nome-usuario').textContent = avaliacao.nome;
            clone.querySelector('.data-avaliacao').textContent = this.formatarData(avaliacao.data);
            
            const notasItems = clone.querySelectorAll('.nota-item .estrelas');
            notasItems[0].textContent = this.criarEstrelas(avaliacao.criatividade);
            notasItems[1].textContent = this.criarEstrelas(avaliacao.projetos);
            notasItems[2].textContent = this.criarEstrelas(avaliacao.interatividade);
            
            clone.querySelector('.comentario').textContent = avaliacao.comentarios;
            
            container.appendChild(clone);
        });
    }

    filtrarAvaliacoes(termo) {
        termo = termo.toLowerCase();
        const filtradas = this.avaliacoes.filter(av => 
            av.nome.toLowerCase().includes(termo) || 
            av.comentarios.toLowerCase().includes(termo)
        );
        this.renderizarAvaliacoes(filtradas);
    }

    filtrarPorNota(nota) {
        nota = parseInt(nota);
        const filtradas = nota ? 
            this.avaliacoes.filter(av => 
                Number(av.criatividade) === nota || 
                Number(av.projetos) === nota || 
                Number(av.interatividade) === nota
            ) : this.avaliacoes;
        this.renderizarAvaliacoes(filtradas);
    }

    renderizarDashboard() {
        this.atualizarEstatisticas();
        this.renderizarAvaliacoes(this.avaliacoes);
    }

    carregarAvaliacoes() {
        console.log('Tentando carregar avaliações');
        db.ref('avaliacoes').on('value', (snapshot) => {
            console.log('Dados recebidos:', snapshot.val());
            this.avaliacoes = [];
            snapshot.forEach((child) => {
                this.avaliacoes.push({
                    id: child.key,
                    ...child.val()
                });
            });
            console.log('Avaliações processadas:', this.avaliacoes);
            this.renderizarDashboard();
        }, (error) => {
            console.error('Erro ao carregar:', error);
        });
    }

    limparAvaliacoes() {
        if (confirm('Tem certeza que deseja limpar todas as avaliações?')) {
            db.ref('avaliacoes').remove()
                .then(() => {
                    alert('Avaliações removidas com sucesso!');
                })
                .catch(error => {
                    console.error('Erro ao limpar:', error);
                    alert('Erro ao limpar avaliações.');
                });
        }
    }
}

// Inicializar quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new AvaliacoesManager();
}); 

// Exportar avaliações para CSV
function exportarCSV() {
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]');
    let csv = 'Nome,Data,Criatividade,Projetos,Interatividade,Comentários\n';
    
    avaliacoes.forEach(av => {
        csv += `"${av.nome}","${new Date(av.data).toLocaleString()}",${av.criatividade},${av.projetos},${av.interatividade},"${av.comentarios}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'avaliacoes.csv';
    a.click();
} 

// Adicione esta função no final do arquivo
function limparAvaliacoes() {
    if (confirm('Tem certeza que deseja limpar todas as avaliações? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('avaliacoes');
        // Recarrega a página para atualizar o dashboard
        window.location.reload();
    }
} 