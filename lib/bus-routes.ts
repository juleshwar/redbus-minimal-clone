import dayjs, { Dayjs } from "dayjs";
import { LOCATION_ID } from "./travel-locations";

export async function getBusRoutes(from: LOCATION_ID, to: LOCATION_ID, date: Dayjs) {
	return ALL_ROUTES.get(from)
		?.get(to)
		?.filter((route) => {
			route.startTime.isSame(date);
		});
}

const NOW = dayjs();
const NOW_PLUS_10_HOURS = dayjs().add(10, "hours");

interface BusRoute {
	from: LOCATION_ID;
	to: LOCATION_ID;
	startTime: Dayjs;
	endTime: Dayjs;
}

const MADURAI_ROUTES = new Map<LOCATION_ID, BusRoute[]>([
	[
		LOCATION_ID.CHENNAI,
		[
			{
				from: LOCATION_ID.MADURAI,
				to: LOCATION_ID.CHENNAI,
				startTime: NOW,
				endTime: NOW_PLUS_10_HOURS,
			},
		],
	],
	[
		LOCATION_ID.HYDERABAD,
		[
			{
				from: LOCATION_ID.MADURAI,
				to: LOCATION_ID.HYDERABAD,
				startTime: NOW,
				endTime: NOW_PLUS_10_HOURS,
			},
		],
	],
	[
		LOCATION_ID.COIMBATORE,
		[
			{
				from: LOCATION_ID.MADURAI,
				to: LOCATION_ID.COIMBATORE,
				startTime: NOW,
				endTime: NOW_PLUS_10_HOURS,
			},
		],
	],
]);

const CHENNAI_ROUTES = new Map<LOCATION_ID, BusRoute[]>([
	[
		LOCATION_ID.BANGALORE,
		[
			{
				from: LOCATION_ID.CHENNAI,
				to: LOCATION_ID.BANGALORE,
				startTime: NOW,
				endTime: NOW_PLUS_10_HOURS,
			},
		],
	],
	[
		LOCATION_ID.HYDERABAD,
		[
			{
				from: LOCATION_ID.CHENNAI,
				to: LOCATION_ID.HYDERABAD,
				startTime: NOW,
				endTime: NOW_PLUS_10_HOURS,
			},
		],
	],
	[
		LOCATION_ID.COIMBATORE,
		[
			{
				from: LOCATION_ID.CHENNAI,
				to: LOCATION_ID.COIMBATORE,
				startTime: NOW,
				endTime: NOW_PLUS_10_HOURS,
			},
		],
	],
]);

const ALL_ROUTES = new Map([
	[LOCATION_ID.MADURAI, MADURAI_ROUTES],
	[LOCATION_ID.CHENNAI, CHENNAI_ROUTES],
]);
