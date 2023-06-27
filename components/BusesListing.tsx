import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { BusRoute } from "../lib/bus-routes";

interface Props {
	busesList: BusRoute[];
}

interface RowProps {
	bus: BusRoute;
}

const Row = ({ bus }: RowProps) => {
	return (
		<>
			<TableRow>
				<TableCell>{bus.id}</TableCell>
				<TableCell>{bus.startTime}</TableCell>
				<TableCell>{bus.travelDurationInHours}</TableCell>
				<TableCell>{bus.endTime}</TableCell>
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
