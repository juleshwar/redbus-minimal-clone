import dayjs from "dayjs";
import { LOCATION_ID } from "./travel-locations";
import { uniqueId } from "lodash";

export async function getBusRoutes(
	from: LOCATION_ID,
	to: LOCATION_ID,
	date: string
): Promise<BusRoute[]> {
	return (
		ALL_ROUTES.get(from)
			?.get(to)
			?.filter((route) => dayjs(route.startTime).isAfter(dayjs(date))) ?? []
	);
}

export interface BusRoute {
	from: LOCATION_ID;
	to: LOCATION_ID;
	startTime: string;
	endTime: string;
	id: string;
}

const getDateStringPlus10Hours = (d: string) => dayjs(d).add(10, "hours").toString();
const generateUniqueBusId = () => uniqueId("bus_");

const getMaduraiRoutesForDate = (date: string): Map<LOCATION_ID, BusRoute[]> => {
	const datePlus10Hours = getDateStringPlus10Hours(date);

	return new Map<LOCATION_ID, BusRoute[]>([
		[
			LOCATION_ID.CHENNAI,
			[
				{
					from: LOCATION_ID.MADURAI,
					to: LOCATION_ID.CHENNAI,
					startTime: date,
					endTime: datePlus10Hours,
					id: generateUniqueBusId(),
				},
			],
		],
		[
			LOCATION_ID.HYDERABAD,
			[
				{
					from: LOCATION_ID.MADURAI,
					to: LOCATION_ID.HYDERABAD,
					startTime: date,
					endTime: datePlus10Hours,
					id: generateUniqueBusId(),
				},
			],
		],
		[
			LOCATION_ID.COIMBATORE,
			[
				{
					from: LOCATION_ID.MADURAI,
					to: LOCATION_ID.COIMBATORE,
					startTime: date,
					endTime: datePlus10Hours,
					id: generateUniqueBusId(),
				},
			],
		],
	]);
};

const getChennaiRoutesForDate = (date: string): Map<LOCATION_ID, BusRoute[]> => {
	const datePlus10Hours = getDateStringPlus10Hours(date);
	return new Map([
		[
			LOCATION_ID.BANGALORE,
			[
				{
					from: LOCATION_ID.CHENNAI,
					to: LOCATION_ID.BANGALORE,
					startTime: date,
					endTime: datePlus10Hours,
					id: generateUniqueBusId(),
				},
			],
		],
		[
			LOCATION_ID.HYDERABAD,
			[
				{
					from: LOCATION_ID.CHENNAI,
					to: LOCATION_ID.HYDERABAD,
					startTime: date,
					endTime: datePlus10Hours,
					id: generateUniqueBusId(),
				},
			],
		],
		[
			LOCATION_ID.COIMBATORE,
			[
				{
					from: LOCATION_ID.CHENNAI,
					to: LOCATION_ID.COIMBATORE,
					startTime: date,
					endTime: datePlus10Hours,
					id: generateUniqueBusId(),
				},
			],
		],
	]);
};

const ALL_ROUTES = new Map([
	[
		LOCATION_ID.MADURAI,
		new Map( // Immediately invoked generator function to merge the maps (https://stackoverflow.com/a/32001750)
			(function* () {
				yield* getMaduraiRoutesForDate("2023/06/27 10:00:00 +5:30");
				yield* getMaduraiRoutesForDate("2023/06/28 10:00:00 +5:30");
			})()
		),
	],
	[
		LOCATION_ID.CHENNAI,
		new Map( // Immediately invoked generator function to merge the maps (https://stackoverflow.com/a/32001750)
			(function* () {
				yield* getChennaiRoutesForDate("2023/06/27 10:00:00 +5:30");
				yield* getChennaiRoutesForDate("2023/06/28 10:00:00 +5:30");
			})()
		),
	],
]);
