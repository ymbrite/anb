export type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'

export interface PricePoint {
  t: number
  v: number
}

export interface StrategyKpis {
  cagr?: number
  sharpe?: number
  maxDrawdown?: number
  winRate?: number
}

export interface StrategySnapshot {
  id: string
  name: string
  updatedAt: string
  kpis: StrategyKpis
}

