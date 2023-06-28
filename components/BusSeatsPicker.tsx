import { BusSeat, BusSeatArrangement } from "../lib/bus-seats";

interface Props {
	busSeats: BusSeatArrangement;
}

interface BusSeatProps {
	busSeat: BusSeat;
}

const BusSeat = ({ busSeat }: BusSeatProps) => {
	return (
		<li key={busSeat.id}>
			{busSeat.id} {" -> "} {busSeat.booked ? "true" : "false"}
		</li>
	);
};

const BusSeatsPicker = ({ busSeats }: Props) => {
	const [rowA, rowB] = busSeats;
	return (
		<>
			{rowA.map((busSeat) => (
				<BusSeat key={busSeat.id} busSeat={busSeat} />
			))}
			{rowB.map((busSeat) => (
				<BusSeat key={busSeat.id} busSeat={busSeat} />
			))}
		</>
	);
};

export { BusSeatsPicker };
