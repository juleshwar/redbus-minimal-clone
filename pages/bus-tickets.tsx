import { useSearchParams } from "next/navigation";
import { ParsedUrlQuery } from "querystring";
import { BusRoute, getBusRoutes } from "../lib/bus-routes";
import dayjs from "dayjs";
import { LOCATION_ID } from "../lib/travel-locations";
import { GetServerSidePropsContext } from "next";
import { Header } from "../components/Header";
import BusesListing from "../components/BusesListing";

export interface BusTicketsPageSearchParams extends ParsedUrlQuery {
	to: LOCATION_ID;
	from: LOCATION_ID;
	date: string;
	month: string;
	year: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { to, from, date, month, year } = context.query as BusTicketsPageSearchParams;
	const busesInRoute = await getBusRoutes(
		from,
		to,
		dayjs(`${year}/${month}/${date}`).local().format()
	);
	return { props: { busesInRoute } };
}

interface Props {
	busesInRoute: BusRoute[];
}

export default function BusTickets({ busesInRoute }: Props) {
	const searchParams = useSearchParams();
	const [to, from, date, month, year] = ["to", "from", "date", "month", "year"].map(
		searchParams.get
	);

	return (
		<>
			<div className="flex min-h-screen flex-col">
				<Header />
				<main className="flex grow h-full">
					<aside className="w-64 border border-r-black">Filters</aside>
					<div className="scroll grow">
						<BusesListing busesList={busesInRoute} />
					</div>
				</main>
			</div>
		</>
	);
}
