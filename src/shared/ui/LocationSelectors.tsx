import { useMemo } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
        // Cuando cambia el país, reseteamos state y city
        onChange({ countryIso, stateIso: '', cityName: '' });
    }

    function changeState(stateIso: string) {
        // Cuando cambia el estado, reseteamos city
        onChange({ ...value, stateIso, cityName: '' });
    }

    function changeCity(cityName: string) {
        onChange({ ...value, cityName });
    }

    const selectedState = value.stateIso.length > 0 ? value.stateIso : undefined;
    const selectedCity = value.cityName.length > 0 ? value.cityName : undefined;

    return (
        <div className="grid gap-12 mt-16 border-2 border-amber-500 rounded-2xl p-8 bg-amber-500">
            {/* Country */}
            <div>
                <label className='text-xl text-white font-bold'>
                    Country
                    <Select value={value.countryIso} onValueChange={changeCountry}>
                        <SelectTrigger className='mt-1.5 w-full text-lg text-black font-normal bg-amber-50 border-gray-300'>
                            <SelectValue placeholder="Select a country..." />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map((c) => (
                                <SelectItem key={c.isoCode} value={c.isoCode}>
                                    {c.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </label>
            </div>

            {/* State */}
            <div>
                <label className='text-xl text-white font-bold'>
                    State / Province
                    <Select
                        key={value.countryIso}
                        value={selectedState}
                        onValueChange={changeState}
                        disabled={states.length === 0}
                    >
                        <SelectTrigger className='mt-1.5 w-full text-lg text-black font-normal bg-amber-50 border-gray-300'>
                            <SelectValue placeholder="Select a state..." />
                        </SelectTrigger>
                        <SelectContent>
                            {states.map((s) => (
                                <SelectItem key={s.isoCode} value={s.isoCode}>
                                    {s.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </label>
            </div>

            {/* City */}
            <div>
                <label className='text-xl text-white font-bold'>
                    City
                    <Select
                        key={`${value.countryIso}-${value.stateIso}`}
                        value={selectedCity}
                        onValueChange={changeCity}
                        disabled={!value.stateIso || cities.length === 0}
                    >
                        <SelectTrigger className='mt-1.5 w-full text-lg text-black font-normal bg-amber-50 border-gray-300'>
                            <SelectValue placeholder="Select a city..." />
                        </SelectTrigger>
                        <SelectContent>
                            {cities.map((c) => (
                                <SelectItem key={c.name} value={c.name}>
                                    {c.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </label>
            </div>
        </div>
    );
}
