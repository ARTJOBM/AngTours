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
}

export interface IToursData {
tours: ITour[];
}
 
