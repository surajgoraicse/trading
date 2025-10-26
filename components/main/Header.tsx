"use client";
// import { authClient, signOut } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileView from "./MobileView";

const Header = () => {
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [isUser, setIsUser] = useState<boolean>(false);

	// useEffect(() => {
	// 	(async function getSession() {
	// 		// const { data: session, error } = await authClient.getSession();
	// 		const error = undefined
	// 		const session = undefined

	// 		if (error) {
	// 			console.log("error fetching session ", error);
	// 			return;
	// 		}
	// 		console.log("session ", session);

	// 		if (session?.user.role === "ADMIN") {
	// 			setIsAdmin(true);
	// 			setIsUser(false);
	// 		} else if (session?.user.role === "USER") {
	// 			setIsAdmin(false);
	// 			setIsUser(true);
	// 		} else {
	// 			setIsAdmin(false);
	// 			setIsUser(false);
	// 		}
	// 	})();
	// }, [isAdmin, isUser]);


	function signOut() {
		console.log("signout action ");
	}




	return (
		<header className="sticky mt-5  top-5 px-4 z-50 ">
			<div className="max-w-3xl mx-auto  bg-background/95 backdrop-blur-sm  border rounded-4xl ">
				<div className="flex items-center px-5 lg:px-8  justify-between py-3">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<Image alt="logo" src={"/logo-new.png"} width={50} height={50}></Image>
						<h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
							Rich Trader
						</h1>
					</Link>



					<div className="flex items-center space-x-2 lg:space-x-4">

						<Avatar className="h-9 w-9 lg:h-8 lg:w-8 rounded-full overflow-hidden">
							<AvatarImage src="./avatar.png" />
							<AvatarFallback>D</AvatarFallback>
						</Avatar>
						<div className="lg:hidden lg:hi border rounded-full border-gray-200 dark:border-gray-700">

							<MobileView />

						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
