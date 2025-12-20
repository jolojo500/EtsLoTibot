import type { StmAlert } from "./stm.types.js";

export function filterMetroAlerts(alerts: StmAlert[]) : StmAlert[]{
    return alerts.filter(alert =>
        alert.informed_entities.some(e =>
            e.route_short_name?.toLowerCase().includes("metro")
        )
    )
}