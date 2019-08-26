const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

const girismesaj = [
  '**Bot Sunucuya Eklendi',
  '**RaiL Bot** sunucunuzdaki insanlara kolaylıklar sağlar.',
  'Bot Her Türlü Komudu Vardır'
]

client.on('guildCreate', guild => {
    const generalChannel = guild.defaultChannel
    generalChannel.sendMessage(girismesaj)
	client.user.setGame(prefix  + client.guilds.size + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() );
})