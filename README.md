
# Discord Selfbot com Google AI

Este selfbot foi desenvolvido em JavaScript utilizando a biblioteca `discord.js-selfbot-v13`. Ele permite a execução de comandos personalizados e se integra à API do Google Generative AI para gerar respostas automáticas com base nas mensagens enviadas pelo usuário.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

/comandos └── sudo.js  # Comando que interage com a API do Google Generative AI  
/config.json  # Arquivo de configuração com o prefixo e o token  
/index.js  # Código principal em português  
/index_en.js  # Código principal em inglês  
/package.json  # Dependências do projeto  

### Como usar o bot

1. **Configuração inicial**:
   - Clone este repositório:
     ```bash
     git clone https://github.com/SeuUsuario/discord-selfbot.git
     cd discord-selfbot
     ```
   - Instale as dependências:
     ```bash
     npm install
     ```

2. **Configuração do arquivo `config.json`**:
   O arquivo `config.json` deve conter o token do seu bot e o prefixo dos comandos. Aqui está um exemplo de como deve ser o arquivo:

   ```json
   {
     "prefix": "!",
     "token": "SEU_TOKEN_AQUI"
   }
   ```

3. **Iniciando o bot**:
   Para rodar o bot, você pode usar o arquivo `index.js` ou `index_en.js`, dependendo do idioma desejado:

   - Em português:
     ```bash
     node index.js
     ```
   - Em inglês:
     ```bash
     node index_en.js
     ```

   O bot vai se conectar ao Discord e você verá uma mensagem indicando que o bot está pronto.

### Comandos

O bot tem um comando principal chamado `sudo`, que interage com a API do Google Generative AI para gerar respostas automáticas com base na mensagem fornecida.

Para usar o comando, basta digitar:

```css
!sudo [sua mensagem aqui]
```

O bot responderá com a resposta gerada pela AI. Exemplo:

```diff
!sudo Me conte uma piada.
Resposta do bot: uma piada.
```

*(a resposta gerada pela AI pode ser imprecisa)*

### Configuração do Google Generative AI

No código do comando `sudo`, você precisa configurar sua chave de API para o Google Generative AI. Isso pode ser feito no arquivo do comando `sudo.js`:

```javascript
const apiKey = "Sua_Chave_API_Aqui";
```

Para obter uma chave de API, siga as instruções no site do Google Cloud.

## Dependências

- `discord.js-selfbot-v13`: Para interação com a API do Discord.
- `@google/generative-ai`: Para acessar a API do Google Generative AI.
- `axios`: Para fazer requisições HTTP.

## Licença

Este projeto é licenciado sob a Licença MIT - consulte o arquivo LICENSE para mais detalhes.
