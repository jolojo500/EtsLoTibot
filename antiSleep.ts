import { type Client, ChannelType } from "discord.js";
import { fetchStmAlerts } from "./stm/stm.api.js";
import { filterMetroAlerts } from "./stm/stm.filters.js";

export async function autoCheckStm(client: Client){
    if(!isPeakHour()) return

    const data = await fetchStmAlerts()
    const alerts = filterMetroAlerts(data.alerts)

    if(alerts.length === 0) return

    const channel = await client.channels.fetch(process.env.CHANNEL_ID!)
    if(channel?.type !== ChannelType.GuildText) return

   
    const msg = alerts.map(a =>
        a.description_texts.find(t=> t.language === "fr")?.text
    ).join("\n\n")

    await channel.send(`🚨 **Alertes STM**\n${msg}`)
}


function isPeakHour(date = new Date()) {
  const h = date.getHours();
  const m = date.getMinutes();
  const time = h * 60 + m;

  return (
    //06:00 - 08:30
    (time >= 6 * 60 && time <= 8 * 60 + 30) ||
    //16:00 - 18:00
    (time >= 16 * 60 && time <= 18 * 60)
  );
}
