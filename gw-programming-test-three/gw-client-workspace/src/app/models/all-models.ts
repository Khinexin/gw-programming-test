export interface Customer {
  id?: number;
  name?: string;
  dateOfBirth?: string;
  address?: string;
  contactNumber?: string;
  favoriteItems?: String[];
  isDeleting: boolean;
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
      isDeleting: customer ? customer.isDeleting : false,
    };
  }
}
