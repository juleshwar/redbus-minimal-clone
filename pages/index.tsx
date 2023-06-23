import { Header } from "@/components/Header";
import {
  InputWithAutosuggestion,
  Suggestion,
} from "@/components/InputWithAutosuggestion";
import { useEffect, useState } from "react";

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
  const [sourceLocation, setSourceLocation] = useState("Madurai");
  const [destinationLocation, setDestinationLocation] = useState("Chennai");
  const [locationSuggestions, setLocationSuggestions] = useState(
    [] as Suggestion[]
  );
  const onFromLocationChange = (newLocation: string) => {
    setSourceLocation(newLocation);
    setLocationSuggestions([]);
  };
  const onDestinationLocationChange = (newLocation: string) => {
    setDestinationLocation(newLocation);
    setLocationSuggestions([]);
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
          className="flex w-full items-center justify-center grow bg-cover bg-no-repeat h-96"
          style={{ backgroundImage: "url('/home-bg-banner.svg')" }}
        >
          <InputWithAutosuggestion
            label="From"
            value={sourceLocation}
            onChangeText={onFromLocationChange}
            suggestions={locationSuggestions}
          />
          <InputWithAutosuggestion
            label="To"
            value={destinationLocation}
            onChangeText={onDestinationLocationChange}
            suggestions={locationSuggestions}
          />
        </div>
      </section>
    </main>
  );
}
