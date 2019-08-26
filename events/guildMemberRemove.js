module.exports = member => {
  let guild = member.guild;
  member.send('Kullanıcı Çıktı');
  guild.defaultChannel.send(`${member.user.username} gitti.`);
};
