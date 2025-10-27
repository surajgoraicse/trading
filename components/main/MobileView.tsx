"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
	Facebook,
	Home,
	Instagram,
	Linkedin,
	LogIn,
	LogOut,
	Menu,
	Youtube
} from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsCoin } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";
import { IoIosTrophy } from "react-icons/io";

import { LuUserPlus } from "react-icons/lu";
import { MdContactSupport, MdRocketLaunch } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { TbArrowsDiff } from "react-icons/tb";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

const bricolage = Bricolage_Grotesque({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-bricolage",
	display: "swap",
});

export default function MobileView() {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false); // placeholder auth state

	const navLinks = [
		{ name: "Dashboard", icon: Home, href: "/" },
		{ name: "My Income", icon: Home, href: "/" },
		{ name: "Team", icon: RiTeamFill, href: "/" },
		{ name: "Finance", icon: BsCoin, href: "/" },
		{ name: "Award & Rewards", icon: IoIosTrophy, href: "/" },
		{ name: "Wallet Transfer", icon: TbArrowsDiff, href: "/" },
		{ name: "Account Activation", icon: LuUserPlus, href: "/" },
		{ name: "Request Wallet", icon: FaDownload, href: "/" },
		{ name: "Booster Progress", icon: MdRocketLaunch, href: "/" },
		{ name: "Support", icon: MdContactSupport, href: "/" },
	];

	return (
		<div className="md:hidden">

			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="text-primary hover:bg-primary/10 transition-colors"
					>
						<Menu className="h-6 w-6" />
					</Button>
				</SheetTrigger>

				<SheetContent
					side="right"
					className=" h-full
            w-[80%] sm:w-[400px]  
            bg-linear-to-b from-pink-100 via-white to-blue-100 
            dark:from-slate-900 dark:via-slate-950 dark:to-slate-900
            border-l-0 shadow-2xl p-6 flex flex-col justify-between
            transition-all duration-300
			 [background:radial-gradient(125%_125%_at_50%_90%,#fff_40%,#6366f1_100%)]
        dark:[background:radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(139,92,246,0.25),transparent_70%),#000]
          "
				>
					<div className="flex flex-col gap-3">
						{/* Logo / Site Name */}
						<div className="flex items-center justify-between mb-4">
							<Link
								href="/"
								className="text-2xl font-bold text-pink-600 dark:text-blue-400 flex items-center gap-2 transition-colors"
							>
								<Image alt="logo" src={"/logo-new.png"} width={50} height={50}></Image>
								<p className="">

									Rich Trader
								</p>
							</Link>
						</div>

						{/* Profile Section */}
						<div className="flex items-center justify-between ">
							<div className="flex items-center gap-4">
								<Avatar className="h-9 w-9 lg:h-8 lg:w-8 rounded-full overflow-hidden">
									<AvatarImage src="./avatar.png" />
									<AvatarFallback>D</AvatarFallback>
								</Avatar>
								<div className="relative">
									<h3 className="scroll-m-20 text-md font-medium tracking-tight text-gray-700 dark:text-gray-100">Dev Gorai</h3>
									<p className="text-muted-foreground text-[11px] ">NSU2429423</p>
								</div>
							</div>
							<div className="rounded-full  border p-2 flex items-center justify-center">

								<AnimatedThemeToggler />
							</div>


						</div>

						{/* Search Bar */}
						{/* <div className="mb-4">
							<Input
								placeholder="Search products..."
								className="border-pink-200 focus:ring-2 focus:ring-pink-400 dark:bg-slate-800 dark:border-slate-700"
							/>
						</div> */}

						<Separator className="  dark:bg-slate-700" />

						{/* Navigation Links with click effect */}

						<nav className="space-y-3">
							{navLinks.map(({ name, icon: Icon, href }) => (
								<Link
									key={name}
									href={href}
									onClick={() => setIsOpen(false)}
									className="
									hover:border border-pink-300 dark:border-blue-700 
                    flex items-center gap-3 text-lg font-medium  
                    text-slate-700 dark:text-slate-200
                    hover:text-pink-600 dark:hover:text-blue-400
                    hover:bg-pink-100 dark:hover:bg-slate-800
                    px-3 py-2 rounded-xl transition-colors
                  "
								>
									<Icon className="h-5 w-5" />
									<p className="text-[14px]">

										{name}
									</p>
								</Link>
							))}
						</nav>

						<Separator className="my-6 dark:bg-slate-700" />

						{/* Auth Button */}
						<Button
							variant="outline"
							onClick={() => setIsLoggedIn(!isLoggedIn)}
							className="
                w-full mt-2 flex items-center gap-2 justify-center
                border-pink-300 dark:border-blue-700
                text-pink-600 dark:text-blue-400
                hover:bg-pink-100 dark:hover:bg-slate-800
                transition-colors rounded-xl
              "
						>
							{isLoggedIn ? (
								<>
									<LogOut className="h-5 w-5" /> Logout
								</>
							) : (
								<>
									<LogIn className="h-5 w-5" /> Sign Out
								</>
							)}
						</Button>
					</div>

					{/* Footer Section */}
					<div className="mt-6 space-y-4">

						<Separator className="dark:bg-slate-700" />
						<div className="flex justify-center gap-5">
							<Link
								href="#"
								className="text-pink-600 hover:text-pink-800 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
							>
								<Linkedin className="h-5 w-5" />
							</Link>
							<Link
								href="#"
								className="text-pink-600 hover:text-pink-800 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
							>
								<Instagram className="h-5 w-5" />
							</Link>
							<Link
								href="#"
								className="text-pink-600 hover:text-pink-800 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
							>
								<Facebook className="h-5 w-5" />
							</Link>
							<Link
								href="#"
								className="text-pink-600 hover:text-pink-800 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
							>
								<Youtube className="h-5 w-5" />
							</Link>
						</div>
						<p className="text-center text-xs text-slate-500 dark:text-slate-400">
							© 2025 Rich Trader. All rights reserved.
						</p>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
