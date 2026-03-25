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
 
