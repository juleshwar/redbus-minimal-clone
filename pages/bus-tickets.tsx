import { useSearchParams } from "next/navigation";
import { ParsedUrlQuery } from "querystring";

export interface BusTicketsPageSearchParams extends ParsedUrlQuery {
  to: string;
  from: string;
  date: string;
  month: string;
  year: string;
}

export default function BusTickets() {
  const searchParams = useSearchParams();
  const [to, from, date, month, year] = [
    "to",
    "from",
    "date",
    "month",
    "year",
  ].map(searchParams.get);

  return (
    <>
      <div>
        Bus tickets from {to} to {from} on {date + "/" + month + "/" + year}
      </div>
    </>
  );
}
