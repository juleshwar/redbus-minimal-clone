import Logo from "@/public/logo.svg";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

const Header = ({ children }: Props) => {
	return (
		<div className="flex items-center px-8 py-3 sticky shadow drop-shadow-md shadow-neutral-200">
			<Logo className="px-8 w-[140px] border-r border-r-slate-200" />
			<div className="flex w-full px-6">
				<div className="flex items-center w-full">
					<Link href={"/"}>Bus Tickets</Link>
				</div>
				<div className="flex items-center col-auto">Profile</div>
			</div>
			{children}
		</div>
	);
};

export { Header };
