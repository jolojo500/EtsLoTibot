import {Client , GatewayIntentBits} from "discord.js"
import { fetchStmAlerts } from "./stm/stm.api.js"
import { filterMetroAlerts } from "./stm/stm.filters.js"
import {autoCheckStm} from "./antiSleep.js"
import express from "express"

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
})

client.once("ready", () =>{
    console.log(`Logged in as ${client.user?.tag}`) //da bot

    setInterval(() => { //TODO since express needed actual schedule instead then (no need for it potentially to keep runing)
        console.log("routine check")
        autoCheckStm(client).catch(console.error)
    }, 5* 60 * 1000); //chaque 5 min hopefully that means less lag but no sleep
})

client.on("interactionCreate", async interaction =>{
    if (!interaction.isChatInputCommand()) return
    if(interaction.commandName !== "stm") return
    
    await interaction.deferReply() //possible timeout gotta check new imp for ephemeral false

    try{
        const data = await fetchStmAlerts()
        const alerts = filterMetroAlerts(data.alerts)

        if(alerts.length === 0){
            await interaction.editReply("Aucun problème sur les lignes de métro!")
            return
        }

        const message = alerts.map(alert => {
            const fr = alert.description_texts.find(t => t.language === "fr")?.text
            return `🚨 ${fr} 🚨 `
        }).join("\n\n")

        await interaction.editReply(message)
    } catch (err) {
        console.error(err)
        await interaction.editReply("Erreur lors de la récupération des données STM.")
    }
})

client.login(process.env.DISCORD_TOKEN) //env node(os) level iirc not file



const app = express();
app.get("/health", (req, res) => {
  res.send("Bot is running");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Health endpoint listening on port ${port}`));