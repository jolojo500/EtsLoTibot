import {Client , GatewayIntentBits} from "discord.js"

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
})

client.once("ready", () =>{
    console.log(`Logged in as ${client.user?.tag}`) //da bot
})

client.login(process.env.DISCORD_TOKEN) //env node(os) level iirc not file