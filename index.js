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
const currentMiss = 0;
const witnesses = []
const discordID = "";


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
    switch (command) {
      case "help":
        console.log("use this command for help");
        break;
      case "get_top20":
        blurt.api.getActiveWitnesses(function (err, result) {
          if (result) { msg.channel.send(result.sort()); // display result in alphabetical order
          }
        });
        break;
      case "check_missed":
        let witnessName = msg.content.trim().split(/ +/g)[1]; // grab name after command
        blurt.api.getWitnessByAccount(witnessName, function (err, result) {
            // console.log(result);
          msg.channel.send(
            `${witnessName} has a total of ` +
              result.total_missed +
              " missed blocks"
          );
        });
        break;
      case "monitor_on":
        //
         // 
        blurt.api.getWitnessByAccount(msg.content.trim().split(/ +/g)[1], function (err, result) {
          if (result.total_missed > currentMiss) { //  need to create db to hold witness name and discord ids
            msg.channel.send(
              "Missing blocks, please check your witness server"
            );
          }
        });
        break;
        case "test":
          console.log(blurt.config)
    break;
      default:
    }
  }
});


