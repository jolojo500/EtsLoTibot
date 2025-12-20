import {Client , GatewayIntentBits} from "discord.js"
import { fetchStmAlerts } from "./stm/stm.api.js"
import { filterMetroAlerts } from "./stm/stm.filters.js"

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
})

client.once("ready", () =>{
    console.log(`Logged in as ${client.user?.tag}`) //da bot
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