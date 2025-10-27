import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowDownCircle, ArrowUpCircle, Bell } from "lucide-react"

const HeroCard = () => {
  return (
    <Card
      className="
        w-full max-w-md mt-4
        border border-border
        rounded-2xl shadow-sm
        bg-linear-to-br from-blue-50 to-white
        dark:from-slate-900 dark:to-slate-800
        transition-colors duration-300
      "
    >
      {/* === HEADER === */}
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 rounded-full overflow-hidden">
            <AvatarImage src="/avatar.png" alt="User avatar" />
            <AvatarFallback>DG</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none text-foreground">
              Dev Gorai
            </p>
            <p className="text-xs text-muted-foreground">NSU2456</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="
            rounded-full border border-transparent hover:border-accent
            hover:bg-accent/10 transition-colors
          "
        >
          <Bell className="h-5 w-5" />
        </Button>
      </CardHeader>

      {/* === CONTENT === */}
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              PORTFOLIO
            </p>
            <p className="text-3xl font-bold tracking-tight text-foreground">
              $5,271.39
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-semibold text-emerald-600 dark:text-emerald-400">
              +130.62%
            </p>
            <p className="text-sm text-muted-foreground">+$2,979.23</p>
          </div>
        </div>
      </CardContent>

      {/* === FOOTER === */}
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button
          variant="secondary"
          className="
            w-full rounded-2xl border border-transparent
            bg-blue-100 hover:bg-blue-200
            dark:bg-blue-950 dark:hover:bg-blue-900
            dark:text-blue-100 text-blue-700
            transition-all duration-200
          "
        >
          <ArrowUpCircle className="mr-2 h-4 w-4" />
          Withdraw
        </Button>
        <Button
          variant="secondary"
          className="
            w-full rounded-2xl border border-transparent
            bg-blue-100 hover:bg-blue-200
            dark:bg-blue-950 dark:hover:bg-blue-900
            dark:text-blue-100 text-blue-700
            transition-all duration-200
          "
        >
          <ArrowDownCircle className="mr-2 h-4 w-4" />
          Deposit
        </Button>
      </CardFooter>
    </Card>
  )
}

export default HeroCard
