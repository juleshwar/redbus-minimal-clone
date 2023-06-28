import { Button, Collapse, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { BusRoute } from "../lib/bus-routes";
import { useEffect, useState } from "react";
import { useBusSeatsBooking } from "../util/custom-hooks/useBusSeatsBooking";
import { BusSeatsPicker } from "./BusSeatsPicker";

interface Props {
	busesList: BusRoute[];
}

interface RowProps {
	bus: BusRoute;
}

const Row = ({ bus }: RowProps) => {
	const [busSeats, bookBusSeat, doLoadBusSeats] = useBusSeatsBooking(bus.id);
	const [isBusSeatsViewOpen, setIsBusSeatsViewOpen] = useState(false);
	const onClickBookButtonHandler = async (busId: string) => {
		await doLoadBusSeats();
		if (busSeats && busSeats.length > 0) {
			// The first time busSeats are loaded, the useEffect opens the <Collapse />
			// The other times, the code below will open it
			setIsBusSeatsViewOpen(true);
		}
	};

	useEffect(() => {
		if (busSeats?.length) {
			setIsBusSeatsViewOpen(true);
		}
	}, [busSeats?.length]);

	return (
		<>
			<TableRow>
				<TableCell>{bus.id}</TableCell>
				<TableCell>{bus.startTime}</TableCell>
				<TableCell>{bus.travelDurationInHours}</TableCell>
				<TableCell>{bus.endTime}</TableCell>
				<TableCell>
					<Button onClick={() => onClickBookButtonHandler(bus.id)}>Book</Button>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>
					<Collapse in={isBusSeatsViewOpen}>
						<div>{busSeats?.length && <BusSeatsPicker busSeats={busSeats} />}</div>
						<Button onClick={() => setIsBusSeatsViewOpen(false)}>Close</Button>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};

export default function BusesListing({ busesList }: Props) {
	return (
		<>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Bus Name</TableCell>
							<TableCell>Departure</TableCell>
							<TableCell>Duration</TableCell>
							<TableCell>Arrival</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{busesList.map((bus) => (
							<Row key={bus.id} bus={bus} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
