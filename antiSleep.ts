import { type Client, ChannelType } from "discord.js";
import { fetchStmAlerts } from "./stm/stm.api.js";
import { filterMetroAlerts } from "./stm/stm.filters.js";


const lastAlertsCache = new Map<string, number>(); //"id"(lets say) , timestamp
export async function autoCheckStm(client: Client){
    if(!isPeakHour()) return

    const data = await fetchStmAlerts()
    const alerts = filterMetroAlerts(data.alerts)

    if(alerts.length === 0) return
    //filer old stuff, didnt put in filter func cuz their job is categorising tbf this use case too specific
    const now = Date.now();
    const newAlerts = alerts.filter(alert => {
      const key = JSON.stringify(alert.description_texts);
      const lastSent = lastAlertsCache.get(key);

      if(!lastSent || now - lastSent > 180 * 60 * 1000){ //if never been sent or older than 30mins
        lastAlertsCache.set(key, now);
        return true;
      }

      return false;
    });
    if(newAlerts.length === 0) return;
    //TODO gotta make map cleaning sometimes perhaps and maybe add better handling lol even if we dont got an actual id maybe hashmap or simply lowercase idk

    const channel = await client.channels.fetch(process.env.CHANNEL_ID!)
    if(channel?.type !== ChannelType.GuildText) return

    //was alerts before handling of dupes
    const msg = newAlerts.map(a =>
        a.description_texts.find(t=> t.language === "fr")?.text
    ).join("\n\n")

    await channel.send(`🚨 **Alertes STM**\n${msg}`)
}


function isPeakHour(date = new Date()) {
  const actualLocalTime = new Date(date.toLocaleString("ens-US",{ timeZone: "America/Montreal"}));

  const h = actualLocalTime.getHours();
  const m = actualLocalTime.getMinutes();
  const time = h * 60 + m;

  return (
    //06:00 - 08:30
    (time >= 6 * 60 && time <= 8 * 60 + 30) ||
    //16:00 - 18:00
    (time >= 16 * 60 && time <= 18 * 60)
  );
}
