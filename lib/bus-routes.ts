import dayjs from "dayjs";
import { LOCATION_ID } from "./travel-locations";
import { uniqueId, random } from "lodash";
import utc from "dayjs/plugin/utc";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(utc);
dayjs.extend(LocalizedFormat);

export interface BusRoute {
	from: LOCATION_ID;
	to: LOCATION_ID;
	startTime: string;
	endTime: string;
	travelDurationInHours: number;
	id: string;
}

const BUS_TIME_FORMAT = "llll";

export async function getBusRoutes(
	from: LOCATION_ID,
	to: LOCATION_ID,
	date: string
): Promise<BusRoute[]> {
	return (
		ALL_ROUTES.get(from)
			?.get(to)
			?.filter((route) => {
				return dayjs(route.startTime).isAfter(dayjs(date));
			}) ?? []
	);
}

const getDateStringPlusXHours = (d: string) => {
	const randomDuration = [6, 8, 10][random(0, 2)];
	return dayjs(d).local().add(randomDuration, "hours").format(BUS_TIME_FORMAT);
};

const getDateDiffInHours = (a: string, b: string) =>
	Math.abs(Math.round(dayjs(a).diff(dayjs(b), "hours", true)));

const generateUniqueBusId = () => uniqueId("bus_");

const generateBusRoute = (from: LOCATION_ID, to: LOCATION_ID, date: string) => {
	const currDate = dayjs(date).local().format(BUS_TIME_FORMAT);
	const datePlusXHours = getDateStringPlusXHours(currDate);
	return {
		from,
		to,
		id: generateUniqueBusId(),
		startTime: currDate,
		endTime: datePlusXHours,
		travelDurationInHours: getDateDiffInHours(date, datePlusXHours),
	};
};

const MADURAI_TO_CHENNAI_ROUTES = [
	generateBusRoute(LOCATION_ID.MADURAI, LOCATION_ID.CHENNAI, dayjs().local().format()),
	generateBusRoute(
		LOCATION_ID.MADURAI,
		LOCATION_ID.CHENNAI,
		dayjs().add(5, "hours").local().format()
	),
	generateBusRoute(
		LOCATION_ID.MADURAI,
		LOCATION_ID.CHENNAI,
		dayjs().add(10, "hours").local().format()
	),
];

const CHENNAI_TO_MADURAI_ROUTES = [
	generateBusRoute(LOCATION_ID.CHENNAI, LOCATION_ID.MADURAI, dayjs().local().format()),
	generateBusRoute(
		LOCATION_ID.CHENNAI,
		LOCATION_ID.MADURAI,
		dayjs().add(2, "hours").local().format()
	),
];

const ALL_ROUTES = new Map([
	[LOCATION_ID.MADURAI, new Map([[LOCATION_ID.CHENNAI, MADURAI_TO_CHENNAI_ROUTES]])],
	[LOCATION_ID.CHENNAI, new Map([[LOCATION_ID.MADURAI, CHENNAI_TO_MADURAI_ROUTES]])],
]);
