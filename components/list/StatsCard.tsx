"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function StatsCard({ compact = false }: { compact?: boolean }) {
  return (
    <Card
      className={`transition-all duration-300 ${
        compact
          ? "p-2 text-sm bg-card/60"
          : "p-4 bg-card shadow-lg border border-border/40"
      }`}
    >
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold tracking-tight">Trading Stats</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Trades</p>
            <p className={`font-bold ${compact ? "text-lg" : "text-2xl"}`}>148</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Win Rate</p>
            <p className={`font-bold ${compact ? "text-lg" : "text-2xl"}`}>72%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
