"use client"

import { useState } from "react"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import HeroCard from "./HeroCard"
import StatsCard from "./StatsCard"
import NotificationCard from "./NotificationCard"

const cards = {
  hero: HeroCard,
  stats: StatsCard,
  notifications: NotificationCard,
}

export default function CardSelector() {
  const [selected, setSelected] = useState("all")

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-4 mt-4 mb-5">
      <Select onValueChange={(v) => setSelected(v)} defaultValue="all">
        <SelectTrigger className="w-full rounded-xl">
          <SelectValue placeholder="Select Card" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cards</SelectItem>
          <SelectItem value="hero">Portfolio</SelectItem>
          <SelectItem value="stats">Trading Stats</SelectItem>
          <SelectItem value="notifications">Notifications</SelectItem>
        </SelectContent>
      </Select>

      <div className="w-full space-y-4">
        {selected === "all" ? (
          <div className="grid grid-cols-1 gap-3">
            <HeroCard compact />
            <StatsCard compact />
            <NotificationCard compact />
          </div>
        ) : (
          (() => {
            const CardComponent = cards[selected as keyof typeof cards]
            return <CardComponent />
          })()
        )}
      </div>
    </div>
  )
}
