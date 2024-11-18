document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Credenciais (em produção, isso deveria estar em um servidor seguro)
    if (username === 'admin' && password === 'pjd123') {
        // Salva o token de autenticação
        sessionStorage.setItem('isAuthenticated', 'true');
        // Redireciona para o painel
        window.location.href = 'admin.html';
    } else {
        alert('Credenciais inválidas!');
    }
});
