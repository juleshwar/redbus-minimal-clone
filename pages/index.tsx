import { Header } from "@/components/Header";
import { InputWithAutosuggestion } from "@/components/InputWithAutosuggestion";
import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { BusTicketsPageSearchParams } from "./bus-tickets";
import {
	LOCATION_ID,
	LocationDetails,
	getAllLocationIdToNameMap,
	getAllNameToLocationIdMap,
} from "../lib/travel-locations";
import { SuggestionItem } from "@/components/SuggestionDropdown";

export async function getServerSideProps() {
	const allLocationIdToNameMap = getAllLocationIdToNameMap();
	const allNameToLocationIdMap = getAllNameToLocationIdMap();

	return {
		props: {
			allLocationIdToNameMap,
			allNameToLocationIdMap,
		},
	};
}

interface Props {
	allLocationIdToNameMap: Record<LOCATION_ID, LocationDetails["name"]>;
	allNameToLocationIdMap: Record<LocationDetails["name"], LOCATION_ID>;
}

export default function Home({ allLocationIdToNameMap, allNameToLocationIdMap }: Props) {
	const router = useRouter();
	const [sourceLocation, setSourceLocation] = useState(allLocationIdToNameMap[LOCATION_ID.MADURAI]);
	const [sourceLocationErrorMessage, setSourceLocationErrorMessage] = useState("");
	const [destinationLocation, setDestinationLocation] = useState(
		allLocationIdToNameMap[LOCATION_ID.CHENNAI]
	);
	const [destinationLocationErrorMessage, setDestinationLocationErrorMessage] = useState("");
	const [travelDate, setTravelDate] = useState(dayjs());

	const [locationSuggestions, setLocationSuggestions] = useState([] as SuggestionItem[]);
	const travelFormRef = useRef(null) as RefObject<HTMLFormElement>;

	const onFromLocationChange = (newLocation: string) => {
		setSourceLocation(newLocation);
		setLocationSuggestions([]);
	};
	const onDestinationLocationChange = (newLocation: string) => {
		setDestinationLocation(newLocation);
		setLocationSuggestions([]);
	};

	const isFormValid = () => {
		const isSourceLocationValid = allNameToLocationIdMap[sourceLocation] !== undefined;
		if (!isSourceLocationValid) {
			setSourceLocationErrorMessage("Please select a location from the dropdown");
			return false;
		}

		const isDestinationLocationValid = allNameToLocationIdMap[destinationLocation] !== undefined;
		if (!isDestinationLocationValid) {
			setDestinationLocationErrorMessage("Please select a location from the dropdown");
			return false;
		}

		return travelFormRef.current?.checkValidity();
	};

	const onFormSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		if (isFormValid()) {
			router.push(
				getBusTicketsUrl(
					allNameToLocationIdMap[sourceLocation],
					allNameToLocationIdMap[destinationLocation],
					travelDate,
					allNameToLocationIdMap
				)
			);
		}
	};

	// TODO: Add debouncing to filter locations
	useEffect(() => {
		setLocationSuggestions(
			getLocationSuggestions(sourceLocation, allLocationIdToNameMap) as SuggestionItem[]
		);
	}, [sourceLocation, allLocationIdToNameMap]);

	// TODO: Add debouncing to filter locations
	useEffect(() => {
		setLocationSuggestions(
			getLocationSuggestions(destinationLocation, allLocationIdToNameMap) as SuggestionItem[]
		);
	}, [destinationLocation, allLocationIdToNameMap]);

	return (
		<main className="flex min-h-screen flex-col">
			<Header />
			<section className="flex flex-col">
				<div
					className="flex w-full items-center justify-center bg-cover bg-no-repeat h-96"
					style={{ backgroundImage: "url('/home-bg-banner.svg')" }}
				>
					<form
						className="flex bg-white text-xl rounded-3xl shadow-md gap-8 items-center h-24 w-fit"
						onSubmit={onFormSubmitHandler}
						ref={travelFormRef}
					>
						<div className="pl-9">
							<InputWithAutosuggestion
								label="From"
								value={sourceLocation}
								onChangeText={onFromLocationChange}
								suggestions={locationSuggestions}
								isRequired={true}
								isError={sourceLocationErrorMessage.length > 0}
								errorMessage={sourceLocationErrorMessage}
							/>
						</div>
						|
						<div className="">
							<InputWithAutosuggestion
								label="To"
								value={destinationLocation}
								onChangeText={onDestinationLocationChange}
								suggestions={locationSuggestions}
								isRequired={true}
								isError={destinationLocationErrorMessage.length > 0}
								errorMessage={destinationLocationErrorMessage}
							/>
						</div>
						|
						<div>
							<DatePicker
								minDate={travelDate}
								defaultValue={travelDate}
								onChange={(value) => (value ? setTravelDate(value) : setTravelDate(dayjs()))}
								format="DD MMM YYYY"
							/>
						</div>
						<button className="h-full px-9 font-semibold overflow-hidden rounded-r-3xl text-white bg-green-700">
							SEARCH BUSES
						</button>
					</form>
				</div>
			</section>
		</main>
	);
}

const getLocationSuggestions = (
	loc: string,
	allLocationIdToNameMap: Record<LOCATION_ID, LocationDetails["name"]>
): SuggestionItem[] => {
	const allLocationSuggestions = Object.entries(allLocationIdToNameMap).map(([locId, locName]) => ({
		id: locId,
		name: locName,
	}));
	const filteredLocations = allLocationSuggestions.filter((locObj) =>
		locObj.name.toLowerCase().includes(loc)
	);

	// return all locations if array empty
	return filteredLocations.length > 0 ? filteredLocations : allLocationSuggestions;
};

function getBusTicketsUrl(
	sourceLocation: LOCATION_ID,
	destinationLocation: LOCATION_ID,
	travelDate: dayjs.Dayjs,
	allNameToLocationIdMap: Record<LocationDetails["name"], LOCATION_ID>
) {
	const queryParams: BusTicketsPageSearchParams = {
		from: allNameToLocationIdMap[sourceLocation],
		to: allNameToLocationIdMap[destinationLocation],
		date: travelDate.date().toString(),
		month: travelDate.month().toString(),
		year: travelDate.year().toString(),
	};
	return {
		pathname: "/bus-tickets",
		query: queryParams,
	};
}
