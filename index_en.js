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
                    console.warn(`Command ${command.name} loaded, but it does NOT have a run function!`);
                    return;
                }
                client.commands.set(command.name, command);
                console.log(`Command loaded: ${command.name}`);
            }
        });
    await Promise.all(loadPromises);
};

client.once('ready', async () => {
    console.log(`${client.user.username} is ready!`);
    await loadCommands();
    try {
        await client.user.setActivity('GitHub: https://github.com/Deidade-dll', { type: 'WATCHING' });
        console.log('Rich Presence set to "GitHub: https://github.com/Deidade-dll"');
    } catch (error) {
        console.error('Error setting Rich Presence:', error);
    }
});

const startBot = async () => {
    const config = await loadConfig();
    prefix = config.prefix;
    const { token } = config;

    await client.login(token);
    console.log('Bot logged in successfully!');

    client.on('messageCreate', async (message) => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);

        if (!command) return;

        try {
            console.log(`Command received from ${message.author.username} (${message.author.id}): ${message.content}`);
            await command.run(client, message, args);
        } catch (error) {
            console.error(`Error executing the command ${commandName}: ${error.message}`);
        }
    });
};

startBot().catch(console.error);
