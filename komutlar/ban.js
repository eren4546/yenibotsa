const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":no_entry: To use this command, you must have the 'Prohibit Members' authority.");
    let reason = args.slice(1).join(' ')
    if (!args[0]) return message.channel.send(":no_entry: Tag the user you want to ban.")
    let user = message.mentions.users.first() || bot.users.get(args[0]) || message.guild.members.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user

    if (!user) return message.channel.send(`${process.env.basarisiz} I couldn't find the user you tagged on the server.`)
    let member = message.guild.member(user)
    if (!member) return message.channel.send(`${process.env.basarisiz} I couldn't find the user you tagged on the server.`)
    if (member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${process.env.basarisiz} I can't ban people above my jurisdiction.`)
    if (!reason) reason = 'The reason is unspecified.'
  
    message.channel.send(`${user.tag}, Are you sure I will ban from server? If you are sure \`y\` to cancel the transaction \`n\` answer as.`)
        let uwu = false;
            while (!uwu) {
                const response = await message.channel.awaitMessages(neblm => neblm.author.id === message.author.id, { max: 1, time: 30000 });
                const choice = response.first().content
                if (choice == 'no' || choice == 'n') return message.channel.send('🚀 Transaction **canceled.**')
                if (choice !== 'yes' && choice !== 'y') {
                message.channel.send('❓ Please just answer with **yes(y)** or **no(n).**')
                }
                if (choice == 'yes' || choice == 'y') uwu = true
                }
                if (uwu) {
                try {
                await member.ban(reason + ` | Authorized: ${message.author.tag} - ${message.author.id}`)
  
                message.channel.send(`${process.env.basarili} **${user.tag}** has been banned from server.`)
                user.send(`**${message.guild.name}** From **Banned!**\n*Reason:* \`\`\`${reason}\`\`\``)

                let embed = new Discord.RichEmbed()
                    .setColor(0xffa300)
                    .setAuthor(`${user.username} has been banned!`, user.avatarURL||user.defaultAvatarURL)
                    .addField('Prohibited User', `${user.tag}-[${user.id}]`, true)
                    .addField('Banning Authorized', `${message.author.tag}-[${message.author.id}]`, true)
                    .addField('Prohibition Reason', reason, true);
                let membermodChannel = await db.fetch(`membermodChannel_${message.guild.id}`)
                if (!message.guild.channels.get(membermodChannel)) return
                else message.guild.channels.get(membermodChannel).send(embed)
            } catch(e) {
            message.channel.send(':warning: There is a mistake!')
        }
    } else return console.log('There is an error')
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'nblm',
  usage: 'ban'
};