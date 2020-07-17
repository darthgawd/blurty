const dotenv = require("dotenv").config();
const blurt = require("@blurtfoundation/blurtjs");
const Discord = require("discord.js");
const moment = require("moment");

// Configuration
blurt.api.setOptions({ url: "https://blurtd.privex.io" });
blurt.config.set("transport", "https");
blurt.config.set("websocket", "wss://blurtd.privex.io");
blurt.config.set("dev_uri", "https://rpc.blurt.world");
blurt.config.set("address_prefix", "BLT");
blurt.config.set(
  "chain_id",
  "cd8d90f29ae273abec3eaa7731e25934c63eb654d55080caff2ebb7f5df6381f"
);
blurt.config.set("alternative_api_endpoints", [
  "https://blurtd.privex.io",
  "https://blurtd.privex.io",
]);
blurt.config.get("chain_id");

const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const prefix = process.env.PREFIX;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`prefix = ${prefix}`);
});

client.login(TOKEN);
client.on("message", (msg) => {
  // if message is not the bot
  if (!msg.author.bot) {
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === "get_top20") {
      blurt.api.getActiveWitnesses(function (err, result) {
        if (result) {
          msg.channel.send(result.sort()); // display result in alphabetical order
        }
      });
    }
    else if (command === 'check') {
        
          
    }

  }
});