module.exports = {
  name: '.menu',
  description: 'Show command menu in anime style',
  execute: async function (m, sock) {
    let menu = `🌸 *ATOMICEND-XMD Menu* 🌸\n\n• .tic\n• .vv\n• .truth\n• .dare\n• .2048\n• .gpt\n• .promote\n• .demote\n• .addsudo\n...`;
    await sock.sendMessage(m.chat, { text: menu }, { quoted: m });
  }
};
