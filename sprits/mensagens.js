document.addEventListener('DOMContentLoaded', function() {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    const defaultData = {
        usuarios: [
            {   
                "id": "1",
                "cpf":"000.000.000-00",
                "datadeNascimento":"00/00/0000",
                "genero":"Femino",
                "Endereco":"rua dos anjos 700",
                "login": "admin",
                "senha": "123",
                "nome": "Administrador do Sistema",
                "email": "admin@abc.com",
                "fotoPerfil":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
                "identidade": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
                "tipo": "passageiro"
            },
            {
                "id": "2",
                "login": "motorista",
                "cpf":"000.000.000-00",
                "telefone":"(00) 00000-0000",
                "NomeCompleto": "Maria da silvia",
                "datadeNascimento": "00/00/0000",
                "genero":"Femino",
                "Endereco":"rua dos anjos 700",
                "email":"exemplo@gmail.com",
                "cordocarro":"rosa",
                "placadocarro":"AAA1A11",
                "fotoPerfil":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
                "cnh": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
                "senha":"123",
                "tipo": "motorista"
            }
        ],
        corridas: [
            {
                "id": "1",
                "origem": "Local de Origem",
                "destino": "Local de Destino",
                "data": "2024-05-16",
                "hora": "08:00",
                "status": "agendada",
                "passageiro_id": "2",
                "motorista_id": "1"
            },
            {
                "id": "2",
                "origem": "Outro Local de Origem",
                "destino": "Outro Local de Destino",
                "data": "2024-05-17",
                "hora": "09:00",
                "status": "concluída",
                "passageiro_id": "1",
                "motorista_id": "2"
            }
        ],
        mensagens: []
    };

    // Inicializa o localStorage com os dados padrão, se ainda não estiver inicializado
    if (!localStorage.getItem('chatData')) {
        localStorage.setItem('chatData', JSON.stringify(defaultData));
    }

    let chatData = JSON.parse(localStorage.getItem('chatData'));

    const loggedInUser = JSON.parse(localStorage.getItem('usuarioAtual'));

    if (!loggedInUser) {
        alert('Nenhum usuário logado encontrado.');
        // Você pode redirecionar o usuário para a página de login aqui, se desejar
    } else {
        function loadMessages() {
            chatData.mensagens.forEach(message => {
                displayMessage(message);
            });
        }

        function saveMessage(message) {
            chatData.mensagens.push(message);
            localStorage.setItem('chatData', JSON.stringify(chatData));
        }

        function displayMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', message.sender);
            messageElement.textContent = `${message.sender}: ${message.text}`;
            messagesContainer.appendChild(messageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        sendButton.addEventListener('click', function() {
            const messageText = messageInput.value.trim();
            if (messageText !== '') {
                const message = {
                    sender: loggedInUser.tipo,
                    text: messageText,
                    timestamp: new Date().toISOString()
                };
                displayMessage(message);
                saveMessage(message);
                messageInput.value = '';
            }
        });

        loadMessages();
    }
});
