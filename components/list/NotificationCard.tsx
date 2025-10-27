"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Bell } from "lucide-react"

export default function NotificationCard({ compact = false }: { compact?: boolean }) {
  return (
    <Card
      className={`transition-all duration-300 ${
        compact
          ? "p-2 text-sm bg-card/60"
          : "p-4 bg-card shadow-lg border border-border/40"
      }`}
    >
      <CardHeader className="flex items-center gap-2 pb-3">
        <Bell className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold tracking-tight">Alerts</h3>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>📈 BTC crossed $70,000</li>
          <li>🎮 New gaming tournament live</li>
          {!compact && <li>📊 Portfolio up 12% this week</li>}
        </ul>
      </CardContent>
    </Card>
  )
}
