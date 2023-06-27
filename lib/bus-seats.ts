import { uniqueId } from "lodash";
import { BusRoute } from "./bus-routes";

enum BUS_SEAT_TYPE {
	SEATER = "seater",
	SLEEPER = "sleeper",
}

const generateBusSeatId = () => uniqueId("bus_seat_");

interface BusSeat {
	id: string;
	type: BUS_SEAT_TYPE;
}

type BusSeatArrangement = Array<Array<BusSeat>>;

export default async function busSeats(busId: BusRoute["id"]): Promise<BusSeatArrangement> {
	switch (busId) {
		case "bus_1":
			return getSeaterPlusSleeperBusSeatArrangement();

		case "bus_2":
		case "bus_3":
		case "bus_4":
			return getAllSeaterBusSeatArrangement();
		default:
			return getAllSeaterBusSeatArrangement();
			break;
	}
}

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
