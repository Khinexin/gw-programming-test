export interface Customer {
  id: number;
  name: string;
  dateOfBirth: string;
  address: string;
  contactNumber: string;
  favoriteItems: Item[];
}
export class Customer {
  constructor(customer?: Customer) {
    return {
      id : customer ? customer.id : -1,
      name: customer ? customer.name : '',
      dateOfBirth: customer ? customer.dateOfBirth : '',
      address: customer ? customer.address : '',
      contactNumber: customer ? customer.contactNumber : '',
      favoriteItems: customer ? customer.favoriteItems : [],
    };
  }
}

export interface Item {
  id: number;
  name: string;
  photo: string;
  price: string;
}
export class Item{
  constructor(item?: Item) {
    return{
      id: item ? item.id : -1,
      name: item ? item.name : '',
      photo: item ? item.photo : '',
      price: item ? item.price : '',
    };
  }
}
