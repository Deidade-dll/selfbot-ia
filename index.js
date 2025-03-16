const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs').promises;
const path = require('path');

const loadConfig = async () => {
    const data = await fs.readFile('config.json', 'utf8');
    return JSON.parse(data);
};

const client = new Client();
client.commands = new Map();
let prefix;

const loadCommands = async () => {
    const commandFiles = await fs.readdir(path.join(__dirname, 'comandos'));
    const loadPromises = commandFiles
        .filter(file => file.endsWith('.js'))
        .map(async (file) => {
            const command = require(path.join(__dirname, 'comandos', file));
            if (command.name) {
                if (typeof command.run !== 'function') {
                    console.warn(`Comando ${command.name} carregado, mas NÃO tem função run!`);
                    return;
                }
                client.commands.set(command.name, command);
                console.log(`Comando carregado: ${command.name}`);
            }
        });
    await Promise.all(loadPromises);
};

client.once('ready', async () => {
    console.log(`${client.user.username} está pronto!`);
    await loadCommands();
    try {
        await client.user.setActivity('GitHub: https://github.com/Deidade-dll', { type: 'WATCHING' });
        console.log('Rich Presence definido para "GitHub: https://github.com/Deidade-dll"');
    } catch (error) {
        console.error('Erro ao definir o Rich Presence:', error);
    }
});

const startBot = async () => {
    const config = await loadConfig();
    prefix = config.prefix;
    const { token } = config;

    await client.login(token);
    console.log('Bot logado com sucesso!');

    client.on('messageCreate', async (message) => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);

        if (!command) return;

        try {
            console.log(`Comando recebido de ${message.author.username} (${message.author.id}): ${message.content}`);
            await command.run(client, message, args);
        } catch (error) {
            console.error(`Erro ao executar o comando ${commandName}: ${error.message}`);
        }
    });
};

startBot().catch(console.error);
