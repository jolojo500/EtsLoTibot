import { Routes, SlashCommandBuilder, REST } from "discord.js";

const command = new SlashCommandBuilder()
    .setName("stm")
    .setDescription("État des lignes de métro.")

const rest = new REST({version:"10"}).setToken(process.env.DISCORD_TOKEN!)

await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID!),
    {
        body: [command.toJSON()]
    }
)

console.log("Registration done")