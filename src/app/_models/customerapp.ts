export class CustomerApp {
  loanStatus: string;
  firstName: string;
  lastName: string;
  SSN: string;
  dob: Date;
  cmsId: number;
  rate: number;
  term: number;
  appJobIncome: number;
  appOtherInc: number;
  tag: number;
  noSSN: boolean;
  vehicle: CustomerAppVehicle;
  dmsAppId: string;
  lenderAppId: number;
  cashDown: number;
  coApplicant: CustomerAppCoApp;
  dmsId: number;
  produceCallback: boolean;
  produceAllForms: boolean;
  currentEmployment: CustomerAppEmployment;
  previousEmployment: CustomerAppEmployment;
  currentAddress: CustomerAppAddress;
  previousAddress: CustomerAppAddress;
  salePrice: number;
}

export class CustomerAppVehicle {
  miles: number;
  vin: string;
  make: string;
  model: string;
  year: string;
  insertDate: Date;
}

export class CustomerAppCoApp {
  firstName: string;
  lastName: string;
  ssn: string;
  dob: Date;
  relationship: string;
  jobIncome: number;
  otherInc: number;
  noSsn: boolean;
  currentAddress: CustomerAppAddress;
}

export class CustomerAppForms {
  callbackFilename: string;
  creditAppFileName: string;
  gapFilename: string;
  gpsFilename: string;
}

export class CustomerAppEmployment {
  employer: string;
  timeOnJobYr: number;
  timeOnJobMo: number;
  occupation: string;
  employerPhone: string;
}

export class CustomerAppAddress {
  houseNumber: string;
  streetName: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}