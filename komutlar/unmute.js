const Discord = require("discord.js")
const ms = require("ms")

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermissions ('KICK_MEMBERS')) return message.channel.send("You must have Kick Members Authorization to do this.")
    const mod = message.author;
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setAuthor("Hata").setDescription(`User not found`))
    let reason = message.content.split(" ").slice(2).join(" ");
    if (!user.roles.find(`name`, "Muted")) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setTitle('Kişi Mutelenmemiş'))
    if (!reason) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setAuthor("Hata").setDescription(`You Should Write Why!`))
    let muterole = message.guild.roles.find(`name`, "Muted");

    if (!muterole) {
        try {
           muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
  


     await (user.removeRole(muterole.id));
    const muteembed = new Discord.RichEmbed()
            .setAuthor('Unmute')
            .addField('User', `<@${user.id}>`)
            .addField('Reason', `${reason}`)
            .addField('Moderator', `${mod}`)
            .setColor('RANDOM')
        message.channel.send(muteembed)
}


exports.conf = {
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: "unmute",
    description: "Etiketlenen Kişinin Mutesini Geri Alır",
    usage:  "unmute [kullanıcı] [sebep]",
}