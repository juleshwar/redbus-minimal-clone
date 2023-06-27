import "@/styles/globals.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function App({ Component, pageProps }: any) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Component {...pageProps} />
		</LocalizationProvider>
	);
}
