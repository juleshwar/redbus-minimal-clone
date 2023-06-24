import { Header } from "@/components/Header";
import {
  InputWithAutosuggestion,
  Suggestion,
} from "@/components/InputWithAutosuggestion";
import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { BusTicketsPageSearchParams } from "./bus-tickets";

const getLocationSuggestions = (loc: string): Suggestion[] => {
  const locations = [
    {
      id: 1,
      name: "Lorem",
    },
    {
      id: 2,
      name: "ipsum",
    },
    {
      id: 3,
      name: "dolor",
    },
    {
      id: 4,
      name: "sit",
    },
    {
      id: 5,
      name: "amet",
    },
    {
      id: 6,
      name: "consectetur",
    },
    {
      id: 7,
      name: "adipisicing",
    },
    {
      id: 8,
      name: "elit",
    },
  ];
  return locations.splice(1, Math.floor(Math.random() * locations.length));
};

export default function Home() {
  const router = useRouter();
  const [sourceLocation, setSourceLocation] = useState("Madurai");
  const [destinationLocation, setDestinationLocation] = useState("Chennai");
  const [travelDate, setTravelDate] = useState(dayjs());

  const [locationSuggestions, setLocationSuggestions] = useState(
    [] as Suggestion[]
  );
  const travelFormRef = useRef(null) as RefObject<HTMLFormElement>;

  const onFromLocationChange = (newLocation: string) => {
    setSourceLocation(newLocation);
    setLocationSuggestions([]);
  };
  const onDestinationLocationChange = (newLocation: string) => {
    setDestinationLocation(newLocation);
    setLocationSuggestions([]);
  };
  const getBusTicketsUrl = () => {
    const queryParams: BusTicketsPageSearchParams = {
      from: sourceLocation,
      to: destinationLocation,
      date: travelDate.date().toString(),
      month: travelDate.month().toString(),
      year: travelDate.year().toString(),
    };
    return {
      pathname: "/bus-tickets",
      query: queryParams,
    };
  };

  const onFormSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (travelFormRef.current?.checkValidity()) {
      router.push(getBusTicketsUrl());
    }
  };

  useEffect(() => {
    setLocationSuggestions(getLocationSuggestions(sourceLocation));
  }, [sourceLocation]);

  useEffect(() => {
    setLocationSuggestions(getLocationSuggestions(destinationLocation));
  }, [destinationLocation]);

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
              />
            </div>
            |
            <div>
              <DatePicker
                minDate={travelDate}
                defaultValue={travelDate}
                onChange={(value) =>
                  value ? setTravelDate(value) : setTravelDate(dayjs())
                }
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
