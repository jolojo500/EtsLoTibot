# Discord utils Bot for students

A lightweight Discord bot that for now monitors STM service alerts and reports **relevant metro issues** directly in a Discord server.

The project is intentionally kept simple and modular so it can evolve easily (alert subscriptions, more filters, other services, etc.).

---

## Features

- Slash command `/stm` to check current metro issues
- Automatic STM checks during **peak hours**
- Filters out:
  - bus alerts
  - normal metro service messages
- Posts alerts directly in a Discord channel
- Clean and extensible TypeScript structure

---

## Project Structure
As you can see the hierarchy to follow is quite simple:
```text
root/
├── index.ts    # Discord client entry point
├── commands/
│ └──stm.ts      # Slash command registration scripts are held there
├── stm/ # a folder for a functionnality or a type of interaction
│ ├── stm.api.ts      # STM API fetch logic
│ ├── stm.filters.ts  # Alert filtering logic (metro, relevance)
│ └── stm.types.ts    # The defined types of the object to receive
    #etc
```
---

## Automatic Checks

The bot automatically checks STM alerts:
- **Morning:** 06:00 to 08:30
- **Evening:** 16:00 to 18:00

Checks run continuously using `setInterval`.
This also keeps the hosting service awake without requiring HTTP endpoints.

---

## Disclaimer

This project uses STM public data.

Not affiliated with STM or Discord.

---
## License
MIT license contribute as you wish please.