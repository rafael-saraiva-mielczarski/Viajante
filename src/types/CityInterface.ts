export interface CityInterface {
    cityName: string,
    countryName: string,
    emoji: string,
    date: string,
    notes: string,
    position: {
        lat: any,
        lng: any,
    },
    id?: string
}