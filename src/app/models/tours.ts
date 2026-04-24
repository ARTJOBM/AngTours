export interface ITour {
    id: string;
    name: string;
    description: string;
    tourOperator: string;
    price: string;
    img: string;
    Location: string;
    type?: string;
    date?: string;
    country?: ICountriesResponseItem;
    code?: string;
    inBasket?: boolean;

    expanded?: boolean;
}

export interface IToursServerRes {
    tours: Omit<ITour, 'country' | 'inBasket'>[];
}


export interface IToursData {
tours: ITour[];
}

export type ITourTypes ='all' | 'single' | 'group';

export interface IFilterTypeLogic { key: ITourTypes, label?: string}

export interface ICountriesResponseItem{
    iso_code2: string;
    iso_code3: string;
    name_ru: string;
    flag_url: string;
}
 
export interface ILocation {
  lat: number;
  lng: number;
}


export type Coords = {
  latlng: [number, number];
}

export interface IWeatherData  {
    isDay: number;
    rain: number;
    snowfall: number;
    currentWeather: number;
}

export interface ICountryWeather {
    weatherDate: IWeatherData;
    countrieData: Coords;
}

export interface IOrder {
  userLogin: string | undefined;
  tourId: string | null;
  personalData: IPersonalData[]; 
}


export interface IPersonalData {
  firstName: string;
  lastName: string;
  cardNumber: string;
  birthDate: string | Date;
  age: number;
  citizenship: string;
}