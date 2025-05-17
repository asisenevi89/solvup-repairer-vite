import { CommonObjType, WarrantyBrandType, WarrantyGroupType } from "../CustomTypes";

export const dummyNote: CommonObjType = {
  submittedBy: 'Custom User',
  staffId: '2332',
  status: 'repairerToOrganizePickup',
  updated: '04-06-2024 23:15PM',
  attachment: '--',
  notes: 'caseCreated',
};

export const customerDetails: CommonObjType = {
  name: 'Bill Edwards',
  email: 'billeddy@ticgroup.com',
  mobilePhone: '+61558625171',
  address: '214 Blackshaws Road Altona North, Altona, East VIC 3025',
};

export const warrantyBrands: WarrantyBrandType[] = [
  { id: 1, name: 'Apple', groups: [1, 2, 3, 4] },
  { id: 2, name: 'Acer', groups: [1, 5, 6, 7] },
  { id: 3, name: 'Sony', groups: [5, 8, 9, 10] },
  { id: 4, name: 'LG', groups: [5, 6, 11, 12] },
  { id: 5, name: 'Panasonic', groups: [5, 13, 10, 6] },
  { id: 6, name: 'Philips', groups: [14, 15, 16] },
  { id: 7, name: 'Dell', groups: [3, 17, 18] },
  { id: 8, name: 'HP', groups: [3, 19, 20] },
  { id: 9, name: 'Lenovo', groups: [3, 21, 1] },
  { id: 10, name: 'Bose', groups: [13, 22, 23] },
];

export const warrantyGroups: WarrantyGroupType[] = [
  { id: 1, name: 'Smartphones', products: [1, 2, 9]},
  { id: 2, name: 'Tablets', products: [1, 9]},
  { id: 3, name: 'Computers', products: [1, 7, 8, 9]},
  { id: 4, name: 'Wearables', products: [1]},
  { id: 5, name: 'Televisions', products: [2, 3, 4, 5]},
  { id: 6, name: 'Home Appliances', products: [2, 5]},
  { id: 7, name: 'Semiconductors', products: [2]},
  { id: 8, name: 'Audio Systems', products: [3]},
  { id: 9, name: 'Gaming Consoles', products: [3]},
  { id: 10, name: 'Cameras', products: [3, 5]},
  { id: 11, name: 'Mobile Devices', products: [4]},
  { id: 12, name: 'Solar Panels', products: [4]},
  { id: 13, name: 'Audio Equipments', products: [5, 10]},
  { id: 14, name: 'Health Care Equipment', products: [6]},
  { id: 15, name: 'Personal Care Devices', products: [6]},
  { id: 16, name: 'Lighting Solutions', products: [6]},
  { id: 17, name: 'Monitors', products: [7]},
  { id: 18, name: 'Data Storage Devices', products: [7]},
  { id: 19, name: 'Printers', products: [8]},
  { id: 20, name: '3D Printing Solutions', products: [8]},
  { id: 21, name: 'Tablets', products: [9]},
  { id: 22, name: 'Home Theater Systems', products: [10]},
  { id: 23, name: 'Headphones', products: [10]},
];
