import Logo from "@/public/logo.svg";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { LoginDialog } from "./LoginDialog";
import { useCurrentUser } from "../util/customHooks";

interface Props {
	children?: ReactNode;
}

const Header = ({ children }: Props) => {
	const [showLoginDialog, setShowLoginDialog] = useState(false);
	const [currentUser, setCurrentUser] = useCurrentUser();

	return (
		<div className="flex px-8 py-3 sticky shadow drop-shadow-md shadow-neutral-200">
			<Logo className="px-8 w-[140px] border-r border-r-slate-200" />
			<div className="flex px-6 grow items-center">
				<div className="flex items-center grow">
					<Link href={"/"}>Bus Tickets</Link>
				</div>
				<div
					className="flex items-center col-auto border rounded-md border-green-600 cursor-pointer px-8 py-4"
					onClick={() => setShowLoginDialog(true)}
				>
					{currentUser ? "Profile" : "Login"}
				</div>
			</div>
			{children}
			{showLoginDialog && (
				<LoginDialog
					currentUser={currentUser}
					setCurrentUser={setCurrentUser}
					isOpen={showLoginDialog}
					onClose={() => setShowLoginDialog(false)}
				/>
			)}
		</div>
	);
};

export { Header };
