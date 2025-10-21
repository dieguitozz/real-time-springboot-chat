
<h1>🚀 MicroChat: Chat em Tempo Real com Spring Boot e Next.js </h1>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js Badge">
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring Boot Badge">
  <img src="https://img.shields.io/badge/Websocket-000000?style=for-the-badge&logo=websocket&logoColor=white" alt="WebSocket Badge">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS Badge">
</p>

> Um sistema de chat básico e moderno, construído com arquitetura de microserviços em mente. Utiliza o poder do **WebSockets** para comunicação instantânea, combinando a robustez do Spring Boot (Java) no backend com a performance do Next.js (React/TypeScript) no frontend.

<br>

## ✨ Visão Geral do Projeto

Este projeto demonstra um chat básico de sala única que utiliza o protocolo STOMP sobre WebSockets para garantir a entrega de mensagens em tempo real.

| Componente | Função | Tecnologias Chave |
| :--- | :--- | :--- |
| **Frontend** | Interface de Usuário e Cliente STOMP | Next.js, React, TypeScript, Tailwind CSS, Lucide Icons |
| **Backend** | Servidor WebSocket/STOMP e Broker de Mensagens | Spring Boot, Java, Spring WebSocket |

-----

## ⚙️ Funcionalidades Atuais

  * **Conexão em Tempo Real:** Comunicação bidirecional instantânea via WebSockets.
  * **Identificação de Usuário:** Tela de login simples para definir o nome de usuário.
  * **Mensagens de Status:** Notificações de `JOIN` (entrada) e `LEAVE` (saída) de usuários.
  * **Design Responsivo:** Interface limpa com tema escuro (Dark Mode) usando Tailwind CSS.
  * **Bolhas de Chat Dinâmicas:** Alinhamento de mensagens à direita (próprias) e à esquerda (outros usuários).
  * **Timestamp Local:** Exibição do horário de recebimento da mensagem.

## 🧱 Estrutura do Código

A aplicação é dividida em dois repositórios/pastas principais:

### Frontend (Cliente Next.js)

  * **`Home.tsx`:** Componente principal que gerencia o estado global do chat, a conexão STOMP/WebSocket e a lógica de envio/recebimento de mensagens (usando `useEffect` e `useRef`).
  * **`components/LoginForm.tsx`:** Componente de interface dedicado à entrada do nome de usuário.
  * **`components/ChatInterface.tsx`:** Componente de interface responsável pela renderização das mensagens e pelo formulário de envio.

### Backend (Servidor Spring Boot)

  * **`ChatController.java`:** Define os *endpoints* de mapeamento de mensagens (`@MessageMapping`):
      * `/chat.sendMessage`: Envia mensagens de chat para o tópico público.
      * `/chat.addUser`: Registra um novo usuário na sessão, enviando uma notificação de `JOIN`.
  * **`WebSocketConfig.java` (Implícito):** (Necessário no backend) Configuração do broker de mensagens e do endpoint `/ws`.

-----

## 🛠️ Como Executar Localmente

Para rodar o projeto localmente, você precisa ter o Java/Maven/Gradle (para o Spring Boot) e o Node.js/npm (para o Next.js) instalados.

### 1\. Backend (Servidor Spring Boot)

1.  Navegue até o diretório do seu projeto Spring Boot.

2.  Compile e execute a aplicação (ex: via IDE ou linha de comando):

    ```bash
    # Usando Maven (se for o caso)
    ./mvnw spring-boot:run
    ```

3.  O servidor WebSocket estará acessível em `ws://localhost:8080/ws`.

### 2\. Frontend (Cliente Next.js)

1.  Navegue até o diretório do projeto Next.js.

2.  Instale as dependências:

    ```bash
    npm install
    # ou
    yarn
    ```

3.  Inicie o servidor de desenvolvimento do Next.js:

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

4.  Abra seu navegador em `http://localhost:3000` (ou a porta padrão).

-----

## 🎯 Próximos Passos (Roadmap)

Este projeto é uma base sólida. Aqui estão algumas ideias para evoluir o MicroChat:

  * **Persistência de Mensagens:** Integrar um banco de dados (ex: PostgreSQL) no Spring Boot para armazenar o histórico de conversas.
  * **Múltiplas Salas:** Adicionar a funcionalidade de criar ou ingressar em diferentes canais/tópicos (ex: `/topic/sala/{nome}`).
  * **Autenticação:** Implementar segurança via Spring Security e JWT, garantindo que apenas usuários autenticados possam enviar mensagens.
  * **Notificações (Typing Indicator):** Adicionar um indicador visual quando outro usuário estiver digitando.

-----

## 🤝 Contribuições

Sinta-se à vontade para abrir *issues* ou enviar *pull requests* para melhorias e novas funcionalidades. Toda contribuição é bem-vinda\!

-----

Desenvolvido por Diego Dias.
