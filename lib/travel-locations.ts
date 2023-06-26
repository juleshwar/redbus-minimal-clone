export enum LOCATION_ID {
	MADURAI = "001",
	COIMBATORE = "002",
	CHENNAI = "003",
	HYDERABAD = "004",
	BANGALORE = "005",
}

export function getAllTravelLocations() {
	return new Map([
		[
			LOCATION_ID.MADURAI,
			{
				name: "Madurai",
			},
		],
		[
			LOCATION_ID.COIMBATORE,
			{
				name: "Coimbatore",
			},
		],
		[
			LOCATION_ID.CHENNAI,
			{
				name: "Chennai",
			},
		],
		[
			LOCATION_ID.HYDERABAD,
			{
				name: "Hyderabad",
			},
		],
		[
			LOCATION_ID.BANGALORE,
			{
				name: "Bangalore",
			},
		],
	]);
}
