const Discord = require('discord.js');


exports.run = function(client, message, args) {
//Komutun Kodları
  const m = args.join(' ');
  if(!m) return message.channel.send('**:gear: You must enter an amount!**');
  if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**:x: You do not have permission to do this!**');
  if(m < 2) return message.channel.send(':gear: **I can delete at least 2 messages!**')
 if(m>100) return message.channel.send('**:gear: **I can delete up to 100 messages!**')
  message.channel.bulkDelete(m);
  

  message.channel.send(
  new Discord.RichEmbed()
    .setTitle(':white_check_mark: **Successful!**')
    .setDescription('**With success __'+m+'__ I deleted the message! :gear:**')
  .setColor('0x36393E')
  ).then(i=>{
  }  
  )
};

exports.conf = {
  enabled: true,//True => Komut açık, False => Komut kapalı 
  guildOnly: false, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: ['temizle','delete','sil','clearing'],//Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'clear',//Komutun adı (Komutu girerken lazım olucak)
  description: 'Belirlediğiniz miktarda mesaj siler',//Komutun Açıklaması
  category:'yetkili',
  usage: 'sil 100' //komutun kullanım şekli; ÖR: !ban @Kullanıcı
}