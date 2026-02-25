import { useMemo } from 'react';
import { getCities, getCountries, getStates } from '../lib/locations';
import type { LocationSelection } from '../types/location';

type Props = {
    value: LocationSelection;
    onChange: (next: LocationSelection) => void;
};

export function LocationSelectors({ value, onChange }: Props) {
    // Countries solo se calculan una vez
    const countries = useMemo(() => getCountries(), []);

    // States depende del country seleccionado
    const states = useMemo(() => getStates(value.countryIso), [value.countryIso]);

    // Cities depende de country + state
    const cities = useMemo(() => {
        if (!value.countryIso || !value.stateIso) return [];
        return getCities(value.countryIso, value.stateIso);
    }, [value.countryIso, value.stateIso]);

    function changeCountry(countryIso: string) {
        // Cuando cambia el país, reseteamos state y city (porque ya no son válidos)
        onChange({ countryIso, stateIso: '', cityName: '' });
    }

    function changeState(stateIso: string) {
        // Cuando cambia el estado, reseteamos city
        onChange({ ...value, stateIso, cityName: '' });
    }

    function changeCity(cityName: string) {
        onChange({ ...value, cityName });
    }

    return (
        <div className="grid gap-12 mt-16 border-2 border-amber-500 rounded-2xl p-8 bg-amber-500">
            {/* Country */}
            <div>
                <label className='text-xl text-white font-bold'>
                    Country
                    <select
                        className='text-lg text-black font-normal bg-amber-50 rounded border border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0'
                        value={value.countryIso}
                        onChange={(e) => changeCountry(e.target.value)}
                        style={{ display: 'block', width: '100%', marginTop: 6 }}
                    >
                        {countries.map((c) => (
                            <option key={c.isoCode} value={c.isoCode}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {/* State */}
            <div>
                <label className='text-xl text-white font-bold'>
                    State / Province
                    <select
                        className='text-lg text-black font-normal bg-amber-50 rounded border border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0'
                        value={value.stateIso}
                        onChange={(e) => changeState(e.target.value)}
                        disabled={states.length === 0}
                        style={{ display: 'block', width: '100%', marginTop: 6 }}
                    >
                        <option value="" disabled>
                            Select a state...
                        </option>
                        {states.map((s) => (
                            <option key={s.isoCode} value={s.isoCode}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {/* City */}
            <div>
                <label className='text-xl text-white font-bold'>
                    City
                    <select
                        className='text-lg text-black font-normal bg-amber-50 rounded border border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0'
                        value={value.cityName}
                        onChange={(e) => changeCity(e.target.value)}
                        disabled={!value.stateIso || cities.length === 0}
                        style={{ display: 'block', width: '100%', marginTop: 6 }}
                    >
                        <option value="" disabled>
                            Select a city...
                        </option>
                        {cities.map((c) => (
                            <option key={c.name} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
}