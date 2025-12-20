import type { StmAlert, StmText } from "./stm.types.js";

const METRO_LINES = new Set(["1", "2", "3", "4"]) //confirmé, reserv pour métro chez stm

export function filterMetroAlerts(alerts: StmAlert[]) : StmAlert[]{
    return alerts.filter(alert =>
        isMetroAlert(alert) && !isNormalService(alert)
    )
}




function getFrenchText(texts: StmText[]): string{
    return texts.find(t=> t.language === "fr")?.text ?? ""
}

function isMetroAlert(alert: StmAlert): boolean{
    return alert.informed_entities.some(
        e => e.route_short_name && METRO_LINES.has(e.route_short_name) //aka exist + actual metro
    )
}

function isNormalService(alert: StmAlert): boolean{
    const text = getFrenchText(alert.description_texts).toLowerCase()
    return text.includes("service normal") //unchanged for 2+ years why bother
}

//etc, par ex we can add interactive choice later which will basically mean more funcs

