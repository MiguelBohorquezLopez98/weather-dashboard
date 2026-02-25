import { City, Country, State } from 'country-state-city';

export type CountryOption = { isoCode: string; name: string };
export type StateOption = { isoCode: string; name: string };
export type CityOption = { name: string };

export function getCountries(): CountryOption[] {
    return Country.getAllCountries()
        .map((c) => ({ isoCode: c.isoCode, name: c.name }))
        .sort((a, b) => a.name.localeCompare(b.name));
}

export function getStates(countryIsoCode: string): StateOption[] {
    return State.getStatesOfCountry(countryIsoCode)
        .map((s) => ({ isoCode: s.isoCode, name: s.name }))
        .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCities(countryIsoCode: string, stateIsoCode: string): CityOption[] {
    return City.getCitiesOfState(countryIsoCode, stateIsoCode)
        .map((c) => ({ name: c.name }))
        .sort((a, b) => a.name.localeCompare(b.name));
}