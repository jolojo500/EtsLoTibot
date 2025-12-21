import type { StmResponse } from "./stm.types.js"

const STM_ALTERTS_URL = "https://api.stm.info/pub/od/i3/v2/messages/etatservice"

export async function fetchStmAlerts(): Promise<StmResponse>{
    const res = await fetch(STM_ALTERTS_URL, {
        headers: {
            "apiKey": process.env.STM_API_KEY!
        }
    })
    
    if(!res.ok){
        throw new Error(`Stm Api error: ${res.status}`)
    }

    return res.json()
}