import Logo from "@/public/logo.svg"
import Link from "next/link"

const VerticalDivider = () => {
    return (
        <div className="mx-8 text-gray-400"> | </div>
    )
}

const Header = () => {
    return (
      <div className="flex items-center px-8 py-3 sticky shadow drop-shadow-md shadow-neutral-200">
        <title>BookBus</title>
        <Logo className="mx-6 w-[80px]" />
        <VerticalDivider />
        <div className="flex w-full">
          <div className="flex items-center w-full">
            <Link href={"/"}>Bus Tickets</Link>
          </div>
          <div className="flex items-center col-auto">Profile</div>
        </div>
      </div>
    );
}

export { Header }