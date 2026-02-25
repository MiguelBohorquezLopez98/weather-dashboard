import { useState } from 'react';
import type { LocationSelection } from '../shared/types/location';
import { LocationSelectors } from '../shared/ui/LocationSelectors';
import { WeatherPanel } from '../features/weather/components/WeatherPanel';

export default function App() {
  const [selection, setSelection] = useState<LocationSelection>({
    countryIso: 'EC',
    stateIso: '',
    cityName: '',
  });

  return (
    <div className="min-h-screen bg-blue-300">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="mt-28 mb-14 text-5xl font-bold text-white text-center">Weather Dashboard</h1>

        <div className="mt-6">
          <LocationSelectors value={selection} onChange={setSelection} />
        </div>

        <hr className="my-12 border-gray-600 border-2" />

        <WeatherPanel cityName={selection.cityName} countryIso={selection.countryIso} />
      </div>
    </div>
  );
}