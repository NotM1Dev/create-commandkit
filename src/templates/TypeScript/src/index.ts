import { config } from 'dotenv';
import { Client, IntentsBitField } from 'discord.js';
import { CommandKit } from 'commandkit';
import path from 'path'

const client = new Client({
    intents: [ 'Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent' ],
});

new CommandKit({
    client,
    eventsPath: path.join(__dirname, 'events'),
    commandsPath: path.join(__dirname, 'commands')
});

client.login(process.env.TOKEN);