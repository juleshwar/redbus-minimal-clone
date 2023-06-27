import { useSearchParams } from "next/navigation";
import { ParsedUrlQuery } from "querystring";
import { BusRoute, getBusRoutes } from "../lib/bus-routes";
import dayjs from "dayjs";
import { LOCATION_ID } from "../lib/travel-locations";
import { GetServerSidePropsContext } from "next";

export interface BusTicketsPageSearchParams extends ParsedUrlQuery {
	to: LOCATION_ID;
	from: LOCATION_ID;
	date: string;
	month: string;
	year: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { to, from, date, month, year } = context.query as BusTicketsPageSearchParams;
	const busesInRoute = await getBusRoutes(from, to, dayjs(`${year}/${month}/${date}`).toString());
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
			<div>
				Bus tickets from {from} to {to} on {date + "/" + month + "/" + year}
			</div>
			{busesInRoute.map((bus) => {
				return <li key={bus.from}>{bus.startTime.toString() + " => " + bus.endTime.toString()}</li>;
			})}
		</>
	);
}
