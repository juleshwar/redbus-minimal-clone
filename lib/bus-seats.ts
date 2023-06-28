import { uniqueId } from "lodash";
import { BusRoute } from "./bus-routes";

enum BUS_SEAT_TYPE {
	SEATER = "seater",
	SLEEPER = "sleeper",
}

const generateBusSeatId = () => uniqueId("bus_seat_");

export interface BusSeat {
	id: string;
	type: BUS_SEAT_TYPE;
	booked?: boolean;
}

export type BusSeatArrangement = Array<Array<BusSeat>>;

export default async function getAllBusSeats(busId: BusRoute["id"]): Promise<BusSeatArrangement> {
	const busSeats = BUS_SEATS?.[busId];
	if (busSeats === undefined) {
		initialiseBusSeatsForBus(busId);
		return BUS_SEATS[busId];
	}
	return busSeats;
}

const initialiseBusSeatsForBus = (busId: BusRoute["id"]) => {
	BUS_SEATS[busId] = getAllSeaterBusSeatArrangement();
};

const getAllSeaterBusSeatArrangement = () => {
	return [
		[
			{ type: BUS_SEAT_TYPE.SEATER, id: generateBusSeatId() },
			{ type: BUS_SEAT_TYPE.SEATER, id: generateBusSeatId() },
			{ type: BUS_SEAT_TYPE.SEATER, id: generateBusSeatId() },
			{ type: BUS_SEAT_TYPE.SEATER, id: generateBusSeatId() },
		],
		[
			{ type: BUS_SEAT_TYPE.SEATER, id: generateBusSeatId() },
			{ type: BUS_SEAT_TYPE.SEATER, id: generateBusSeatId() },
			{ type: BUS_SEAT_TYPE.SEATER, id: generateBusSeatId() },
			{ type: BUS_SEAT_TYPE.SEATER, id: generateBusSeatId() },
		],
	];
};

const getSeaterPlusSleeperBusSeatArrangement = () => {
	return [
		[
			{ type: BUS_SEAT_TYPE.SEATER, id: generateBusSeatId() },
			{ type: BUS_SEAT_TYPE.SEATER, id: generateBusSeatId() },
			{ type: BUS_SEAT_TYPE.SEATER, id: generateBusSeatId() },
			{ type: BUS_SEAT_TYPE.SEATER, id: generateBusSeatId() },
		],
		[
			{ type: BUS_SEAT_TYPE.SLEEPER, id: generateBusSeatId() },
			{ type: BUS_SEAT_TYPE.SLEEPER, id: generateBusSeatId() },
		],
	];
};

const BUS_SEATS: Record<BusRoute["id"], BusSeatArrangement> = {
	bus_1: getSeaterPlusSleeperBusSeatArrangement(),
	bus_2: getAllSeaterBusSeatArrangement(),
	bus_3: getAllSeaterBusSeatArrangement(),
	bus_4: getAllSeaterBusSeatArrangement(),
};
