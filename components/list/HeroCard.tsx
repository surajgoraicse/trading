"use client"

import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react"

export default function HeroCard({ compact = false }: { compact?: boolean }) {
  return (
    <Card
      className={`transition-all duration-300 ${
        compact
          ? "p-2 text-sm bg-card/60"
          : "p-4 bg-card shadow-lg border border-border/40"
      }`}
    >
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold tracking-tight">Portfolio Balance</h3>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Total Value</p>
          <p className={`font-bold ${compact ? "text-lg" : "text-3xl"}`}>
            $5,271.39
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-green-500">+130.62%</p>
          {!compact && <p className="text-sm text-muted-foreground">+$2,979.23</p>}
        </div>
      </CardContent>
      {!compact && (
        <CardFooter className="flex gap-3">
          <Button className="w-full rounded-xl">
            <ArrowUpCircle className="mr-2 h-4 w-4" /> Withdraw
          </Button>
          <Button variant="secondary" className="w-full rounded-xl">
            <ArrowDownCircle className="mr-2 h-4 w-4" /> Deposit
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
