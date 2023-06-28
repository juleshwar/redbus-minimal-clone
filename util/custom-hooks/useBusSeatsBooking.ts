import { Dispatch, SetStateAction, useEffect, useState } from "react";
import getAllBusSeats, { BusSeat, BusSeatArrangement } from "../../lib/bus-seats";
import { CurrentUser } from "./useCurrentUser";
import { BusRoute } from "../../lib/bus-routes";
import { localStorageService } from "../localStorageService";

export interface BusSeatBooking {
	busId: BusRoute["id"];
	seatNumber: BusSeat["id"];
	passengerDetails: CurrentUser;
}

const useBusSeatsBooking = (
	busId: BusRoute["id"]
): [BusSeatArrangement | null, () => void, () => Promise<void>] => {
	const [busSeats, setBusSeats] = useState<BusSeatArrangement | null>(null);

	const doLoadBusSeats = async (): Promise<void> => {
		await loadBusSeats(busId, setBusSeats);
	};

	const bookBusSeat = () => {
		// TODO
	};

	return [busSeats, bookBusSeat, doLoadBusSeats];
};

const loadBusSeats = async (
	busId: BusRoute["id"],
	setBusSeats: Dispatch<SetStateAction<BusSeatArrangement | null>>
) => {
	const busSeatsData = await getAllBusSeats(busId);
	const allSeatBookings = localStorageService
		.getBusSeatBookingData(busId)
		.map((booking) => booking.seatNumber);
	markBookedBusSeats(busSeatsData, allSeatBookings);

	setBusSeats(busSeatsData);
};

const markBookedBusSeats = (
	busSeats: BusSeatArrangement,
	allBookings: BusSeatBooking["seatNumber"][]
) => {
	const [rowA, rowB] = busSeats;
	const bookingMarkerLogic = (busSeat: BusSeat) => {
		if (allBookings.includes(busSeat.id)) {
			busSeat.booked = true;
		}
	};
	rowA.forEach(bookingMarkerLogic);
	rowB.forEach(bookingMarkerLogic);

	return busSeats;
};

export { useBusSeatsBooking };
