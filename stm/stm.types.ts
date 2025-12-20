export interface StmResponse {
  header: {
    timestamp: number
  }
  alerts: StmAlert[]
}

export interface StmAlert {
  active_periods: {
    start: number
    end: number | null
  }
  cause: string | null
  effect: string | null
  informed_entities: StmEntity[]
  header_texts: StmText[]
  description_texts: StmText[]
}

export interface StmEntity {
  route_short_name?: string
  stop_code?: string
  direction_id?: string
}

export interface StmText {
  language: "fr" | "en"
  text: string
}
