export enum LOCATION_ID {
	MADURAI = "001",
	COIMBATORE = "002",
	CHENNAI = "003",
	HYDERABAD = "004",
	BANGALORE = "005",
}
export interface LocationDetails {
	name: string;
}

const MADURAI_DETAILS: LocationDetails = {
	name: "Madurai",
};
const COIMBATORE_DETAILS: LocationDetails = {
	name: "Coimbatore",
};
const CHENNAI_DETAILS: LocationDetails = {
	name: "Chennai",
};
const HYDERABAD_DETAILS: LocationDetails = {
	name: "Hyderabad",
};
const BANGALORE_DETAILS: LocationDetails = {
	name: "Bangalore",
};

const LOCATION_DETAILS = {
	[LOCATION_ID.MADURAI]: MADURAI_DETAILS,
	[LOCATION_ID.COIMBATORE]: COIMBATORE_DETAILS,
	[LOCATION_ID.CHENNAI]: CHENNAI_DETAILS,
	[LOCATION_ID.HYDERABAD]: HYDERABAD_DETAILS,
	[LOCATION_ID.BANGALORE]: BANGALORE_DETAILS,
};

export function getAllLocationIds(): LOCATION_ID[] {
	return [
		LOCATION_ID.MADURAI,
		LOCATION_ID.COIMBATORE,
		LOCATION_ID.CHENNAI,
		LOCATION_ID.HYDERABAD,
		LOCATION_ID.BANGALORE,
	];
}

export function getAllLocationIdToNameMap() {
	return getAllLocationIds().reduce((acc, locId) => {
		acc[locId] = LOCATION_DETAILS[locId].name;
		return acc;
	}, {} as Record<LOCATION_ID, string>);
}

export function getAllTravelLocationsWithDetails() {
	return LOCATION_DETAILS;
}
