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

    expanded?: boolean;
}


export interface IToursData {
tours: ITour[];
}

export type ITourTypes ='all' | 'single' | 'group';

export interface IFilterTypeLogic { key: ITourTypes, label?: string}
 
