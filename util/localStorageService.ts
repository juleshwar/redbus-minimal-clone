import { BusRoute } from "../lib/bus-routes";
import { BusSeatBooking } from "./custom-hooks/useBusSeatsBooking";

const BOOK_BUS_LS_PREFIX = "BookBus_LS_";

const KEYS = {
	CURRENT_USER: BOOK_BUS_LS_PREFIX + "CurrentUser",
	GLOBAL_BUS_BOOKING_MAP: BOOK_BUS_LS_PREFIX + "BusSeatBookings",
};

class LocalStorageService {
	//#region Current User functions
	doLoginUser(id: string) {
		localStorage.setItem(KEYS.CURRENT_USER, id);
	}
	doLogoutUser() {
		localStorage.removeItem(KEYS.CURRENT_USER);
	}
	getCurrentUser() {
		return localStorage.getItem(KEYS.CURRENT_USER) ?? null;
	}
	//#endregion
	//#region Bus Seat Booking functions
	private getGlobalBusSeatBookingMap(): Record<BusRoute["id"], BusSeatBooking[]> {
		return JSON.parse(localStorage.getItem(KEYS.GLOBAL_BUS_BOOKING_MAP) ?? "{}");
	}
	getBusSeatBookingData(busId: BusRoute["id"]): BusSeatBooking[] {
		const busBookingMap = this.getGlobalBusSeatBookingMap();
		return busBookingMap[busId] ?? [];
	}
	doBookBusSeat(busId: string, bookingDetails: BusSeatBooking) {
		let updatedBusBookingArray = this.getBusSeatBookingData(busId);
		updatedBusBookingArray.push(bookingDetails);

		const newBusSeatBookingMap = this.getGlobalBusSeatBookingMap();
		newBusSeatBookingMap[busId] = updatedBusBookingArray;

		localStorage.setItem(KEYS.GLOBAL_BUS_BOOKING_MAP, JSON.stringify(newBusSeatBookingMap));
	}
	//#endregion
}

const localStorageService = new LocalStorageService();

export { localStorageService };
