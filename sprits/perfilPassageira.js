document.addEventListener('DOMContentLoaded', function() {
    const ridesListSolicitadas = document.getElementById('ridesListSolicitadas');
    const ridesListAceitas = document.getElementById('ridesListAceitas');
    const btnSair = document.getElementById('btnSair');

    if (!ridesListSolicitadas || !ridesListAceitas || !btnSair) {
        console.error('Elemento necessário não encontrado no DOM');
        return;
    }

    function loadCorridas() {
        const corridas = localStorage.getItem('corridas');
        return corridas ? JSON.parse(corridas) : [];
    }

    function loadUsuarios() {
        const usuarios = localStorage.getItem('usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
    }

    function loadLoggedInUser() {
        return JSON.parse(localStorage.getItem('loggedInUser'));
    }

    function capitalizeFirstLetter(str) {
        return str.replace(/\b\w/g, function(char) {
            return char.toUpperCase();
        });
    }

    function displayPassengerDetails(passageiro) {
        document.getElementById('profileImage').src = passageiro.fotoPerfil ? passageiro.fotoPerfil : '../img/Rectangle 1582.png';
        document.getElementById('passengerName').textContent = capitalizeFirstLetter(passageiro.nome || passageiro.NomeCompleto);
        document.getElementById('passengerPhone').textContent = `Telefone: ${passageiro.telefone}`;
        document.getElementById('passengerEmail').textContent = `Email: ${passageiro.email}`;
    }

    function displayRides(corridas, usuarioId, usuarios) {
        ridesListSolicitadas.innerHTML = '';
        ridesListAceitas.innerHTML = '';

        const corridasSolicitadas = corridas.filter(corrida => corrida.passageiro_id === usuarioId && corrida.status !== 'aceita');
        const corridasAceitas = corridas.filter(corrida => corrida.passageiro_id === usuarioId && corrida.status === 'aceita');

        corridasSolicitadas.forEach(corrida => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>Origem:</strong> ${corrida.origem}<br>
                <strong>Destino:</strong> ${corrida.destino}<br>
                <strong>Data:</strong> ${corrida.data}<br>
                <strong>Hora:</strong> ${corrida.hora}<br>
                <strong>Status:</strong> ${corrida.status}
            `;
            ridesListSolicitadas.appendChild(listItem);
        });

        corridasAceitas.forEach(corrida => {
            const motorista = usuarios.find(usuario => usuario.id === corrida.motorista_id);
            if (motorista) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <div style="text-align: center;">
                        <img src="${motorista.fotoPerfil ? motorista.fotoPerfil : '../img/Rectangle 1582.png'}" alt="Foto do Motorista" width="100"><br>
                        <strong>Motorista:</strong> ${capitalizeFirstLetter(motorista.nome || motorista.NomeCompleto)}
                    </div>
                    <div style="text-align: center;">
                        <strong>Origem:</strong> ${corrida.origem}<br>
                        <strong>Destino:</strong> ${corrida.destino}<br>
                        <strong>Data:</strong> ${corrida.data}<br>
                        <strong>Hora:</strong> ${corrida.hora}<br>
                        <strong>Status:</strong> ${corrida.status}<br>
                        <strong>Telefone do Motorista:</strong> ${motorista.telefone}<br>
                        <strong>Cor do Carro:</strong> ${motorista.cor}<br>
                        <strong>Placa do Carro:</strong> ${motorista.placa}<br>
                        <button onclick="window.location.href='../avaliar-corrida-passa/index.html?corridaId=${corrida.id}'" class="btncorrida">Avaliar Corrida</button>
                        <button onclick="window.location.href='../entrarcont-versP/index.html?corridaId=${corrida.id}'" class="btncorrida">Entrar em Contato</button>
                        <div style="text-align: center;">
                            <strong>Minha avaliação para da corrida:</strong> ${corrida.avaliacao ? `${corrida.avaliacao.nota} estrelas - ${corrida.avaliacao.comentario}` : 'Nenhuma avaliação ainda'}
                        </div>
                        <div style="text-align: center;">
                            <strong>Nota que recebi do motorista:</strong> ${corrida.avaliacaoPassageiro ? `${corrida.avaliacaoPassageiro.nota} estrelas - ${corrida.avaliacaoPassageiro.comentario}` : 'Nenhuma avaliação ainda'}
                        </div>
                    </div>
                `;
                ridesListAceitas.appendChild(listItem);
            }
        });
    }

    const loggedInUser = loadLoggedInUser();
    if (loggedInUser) {
        displayPassengerDetails(loggedInUser);
        const corridas = loadCorridas();
        const usuarios = loadUsuarios();
        displayRides(corridas, loggedInUser.id, usuarios);
    } else {
        alert('Usuário não está logado.');
        window.location.href = '../index.html';
    }

    btnSair.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        window.location.href = '../index.html';
    });
});
