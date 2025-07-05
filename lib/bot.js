// lib/bot.js

const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require("path");
const express = require("express"); // ✅ Only declare ONCE

// 🧠 Load session
const { state, saveState } = useSingleFileAuthState('./auth_info.json');

module.exports.startBot = async () => {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveState);

  console.log("🤖 ATOMICEND-XMD is now running with Anime UI!");

  // ✅ Command listener
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0];
    if (!m.message) return;

    const prefix = ".";
    const body = m.message?.conversation || m.message?.extendedTextMessage?.text || "";
    const command = body.startsWith(prefix) ? body.slice(1).split(" ")[0] : null;
    const args = body.trim().split(" ").slice(1);
    const isCmd = body.startsWith(prefix);

    if (isCmd) {
      console.log("📥 Command received:", command);

      if (command === "menu") {
        await sock.sendMessage(m.key.remoteJid, {
          text: "💠 *ATOMICEND-XMD Menu*\n\n🛠 .menu\n📥 .vv\n🎮 .tic\n...",
        }, { quoted: m });
      }

      if (command === "ping") {
        await sock.sendMessage(m.key.remoteJid, {
          text: "🏓 Pong, I'm alive!",
        }, { quoted: m });
      }
    }
  });
};

// ✅ Express web server for Render
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("🤖 ATOMICEND-XMD is alive!"));

app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});
