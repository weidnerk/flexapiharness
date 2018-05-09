import { Component, OnInit } from '@angular/core';
import { CustomerApp, CustomerAppVehicle, CustomerAppCoApp, CustomerAppEmployment, CustomerAppAddress } from '../_models/customerapp';
import { CallbackDigest, CallbackViewModel } from '../_models/callback';
import { FlexService } from '../_services/flex.service';
import { HttpClient, HttpRequest, HttpEventType, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dealerStates: Array<Object> = [
    { id: "OK", name: "OK" },
    { id: "FL", name: "FL" },
    { id: "TX", name: "TX" }
  ];

  listOptions: Array<Object> = [
    { id: "SPOUSE", name: "SPOUSE" },
    { id: "FAMILY", name: "FAMILY" },
    { id: "FRIEND", name: "FRIEND" },
    { id: "OTHER", name: "OTHER" },
  ];
  errorMessage: string | null;
  errorObject: HttpErrorResponse | null;
  callbackViewModel: CallbackViewModel;
  customerApp = new CustomerApp();
  addProgress: string | null;
  updateProgress: boolean;

  // Back the SUBMIT form
  ssn: string;
  appFirstName: string;
  appLastName: string;
  appNoSSN: boolean = false;
  dmsAppId: string;
  includeCoApp: boolean = false;
  coAppNoSSN: boolean = false;
  coAppSSN: string;
  DMSId: number = 2;
  produceAllForms: boolean = false;
  produceCallback: boolean = false;
  phoneNumber: string;
  dealerState: string;

  // Back the UPDATE form
  coStreet: string;
  updateMiles: string;
  updateAddCoApp: boolean = false;
  appId: string;
  updateCoAppNoSSN: boolean = false;
  updateCoAppSSN: string;
  updateFirstName: string;
  updateLastName: string;
  updateNoSsn: boolean = false;
  relationship: string;
  updateDMSId: number;
  updateDMSAppId: string;
  updatePhoneNumber: string;
  updateTimeOnJob: number;
  updatePrevTimeOnJob: number;
  updateCity: string;
  updatePrevCity: string;
  updateCoAppPhoneNumber: string;
  updateRate: number;
  updateTerm: number;
  updateCoSSN: string;
  updateVin: string;
  updateMake: string;
  updateModel: string;
  updateYear: string;
  updateCashDown: number;
  updateLoanStatus: string;
  updateSalePrice: number;
  //updateCoPhone: string;

  // Back the Buttons
  reviseProduceAllForms: boolean;
  reviseProduceCallback: boolean;
  maxProduceAllForms: boolean;
  maxProduceCallback: boolean;

  constructor(private _flexService: FlexService) {
  }

  ngOnInit() {

    this.customerApp.loanStatus = 'P';
    this.customerApp.firstName = 'Rhonda';
    this.customerApp.lastName = 'Frank';
    this.customerApp.dob = new Date(1996, 10, 12);

    let a = new CustomerAppAddress();
    a.houseNumber = '4';
    a.streetName = 'Post Rd';
    a.city = 'White Plains';
    a.state = 'NY';
    a.zip = '10605';
    this.customerApp.currentAddress = a;

    let pa = new CustomerAppAddress();
    pa.houseNumber = '43';
    pa.streetName = 'Acre Rd';
    pa.city = 'Orlando';
    pa.state = 'FL';
    pa.zip = '33500';
    this.customerApp.previousAddress = a;

    this.customerApp.rate = 15;
    this.customerApp.term = 18;
    this.customerApp.appJobIncome = 800;
    this.customerApp.appOtherInc = 500;
    this.customerApp.tag = 200; // might be empty
    this.customerApp.cashDown = 1000;
    this.customerApp.noSSN = this.appNoSSN;

    let v = new CustomerAppVehicle();
    v.insertDate = new Date();
    v.vin = '5NPDH4AE0DH280572';
    //v.vin = 'yyyDH4AE0DH280572';
    v.miles = 89000;
    v.make = 'Hyuandi';
    v.model = 'Elantra';
    v.year = "2013";
    this.customerApp.vehicle = v;

    let ce = new CustomerAppEmployment();
    ce.occupation = "driver";
    ce.employer = "UPS";
    ce.employerPhone = "999-909-9888";
    ce.timeOnJobMo = 3;
    ce.timeOnJobYr = 4;
    this.customerApp.currentEmployment = ce;

    let pe = new CustomerAppEmployment();
    pe.occupation = "plumber";
    pe.employer = "ABC Plumbing";
    pe.employerPhone = "939-909-9888";
    pe.timeOnJobMo = 0;
    pe.timeOnJobYr = 1;
    this.customerApp.previousEmployment = pe;
  }

  submitApp() {

    this.updateProgress = true;
    this.errorMessage = null;
    this.errorObject = null;

    this.customerApp.SSN = this.ssn;
    this.customerApp.firstName = this.appFirstName;
    this.customerApp.lastName = this.appLastName;
    this.customerApp.dmsAppId = this.dmsAppId;
    this.customerApp.noSSN = this.appNoSSN;
    this.customerApp.dmsId = this.DMSId;
    this.customerApp.produceAllForms = this.produceAllForms;
    this.customerApp.produceCallback = this.produceCallback;
    this.customerApp.currentAddress.phone = this.phoneNumber;

    switch (this.dealerState) {
      case 'OK':
        this.customerApp.cmsId = 250663;  // DUMMY OK
        break;
      case 'FL':
        this.customerApp.cmsId = 195315;  // FL Test
        break;
      case 'TX':
        this.customerApp.cmsId = 250761;  // TX Test
        break;
      default:
        this.customerApp.cmsId = 250761;  // TX Test
    }

    if (this.includeCoApp) {
      let coapp = new CustomerAppCoApp();
      coapp.ssn = this.coAppSSN;
      coapp.noSsn = this.coAppNoSSN;
      coapp.firstName = 'Jane';
      coapp.lastName = 'Boston';
      coapp.dob = new Date(1990, 12, 24);
      coapp.relationship = 'SPOUSE';
      coapp.jobIncome = 600;
      coapp.otherInc = 150;

      let a = new CustomerAppAddress();
      a.houseNumber = '49';
      a.streetName = '123 Main';
      a.city = 'Tampa';
      a.state = 'FL';
      a.zip = '33609';
      a.phone = '800-985-7777';
      coapp.currentAddress = a;

      this.customerApp.coApplicant = coapp;
    }

    this._flexService.submitApp(this.customerApp)
      .subscribe(response => {
        this.callbackViewModel = response;
        //console.log(this.callbackViewModel.callbackResponse.callback[0].appId);
        //window.open("assets\/" + this.callbackViewModel.CallbackFileName);
        this.updateProgress = false;
      },
        error => {
          this.errorObject = error.errObj;
          if (error.errObj.status === 400) {

            //handle validation error

            // return object from GetErrorResult has 2 properties: "$id" and ""
            // here, we are grabbing last error in modelState - probably not best way to do it
            if (error.errObj.error.modelState) {
              for (var key in error.errObj.error.modelState) {
                if (error.errObj.error.modelState.hasOwnProperty(key)) {
                  this.errorMessage = error.errObj.error.modelState[key];
                }
              }
            }
            else
              this.errorMessage = error.errMsg;
          }
          else
            this.errorMessage = error.errMsg;
            this.updateProgress = false;
        });
  }

  updateApp(action: number) {

    this.errorMessage = null;
    this.errorObject = null;

    this.updateProgress = true;

    let customerApp = new CustomerApp();
    customerApp.lenderAppId = +this.appId;
    customerApp.loanStatus = 'P';
    customerApp.firstName = this.updateFirstName;
    customerApp.lastName = this.updateLastName;
    customerApp.cashDown = this.updateCashDown;
    customerApp.SSN = '999-99-9999'; // original must be passed but won't be updated again
    customerApp.dob = new Date(1996, 10, 12);

    switch (this.dealerState) {
      case 'OK':
        customerApp.cmsId = 250663;  // DUMMY OK
        break;
      case 'FL':
        customerApp.cmsId = 195315;  // FL Test
        break;
      case 'TX':
        customerApp.cmsId = 250761;  // TX Test
        break;
      default:
        customerApp.cmsId = 250761;  // TX Test
    }

    customerApp.appJobIncome = 800;
    customerApp.appOtherInc = 500;
    customerApp.tag = 200; // might be empty
    customerApp.dmsAppId = "1001";
    //customerApp.appPhone = "800-555-1212";
    customerApp.noSSN = this.updateNoSsn;
    customerApp.dmsId = this.updateDMSId; // not updating, but needs to be passed correctly
    customerApp.dmsAppId = this.updateDMSAppId;
    customerApp.rate = this.updateRate;
    customerApp.term = this.updateTerm;
    customerApp.salePrice = this.updateSalePrice;

    let a = new CustomerAppAddress();
    a.houseNumber='689';
    a.state = 'FL';
    a.zip = '33609';
    a.streetName = 'Main Street';
    a.city = this.updateCity;
    a.phone = this.updatePhoneNumber;
    customerApp.currentAddress = a;

    let pa = new CustomerAppAddress();
    pa.houseNumber='2696';
    pa.streetName = 'Acre Rd';
    pa.city = this.updatePrevCity;
    pa.state = 'FL';
    pa.zip = '33500';
    pa.phone = '899-222-2222';
    customerApp.previousAddress = pa;

    let v = new CustomerAppVehicle();
    v.insertDate = new Date();
    v.vin = this.updateVin;
    if (this.updateMiles != undefined) v.miles = +this.updateMiles;
    v.make = this.updateMake;
    v.model = this.updateModel;
    v.year = this.updateYear;
    customerApp.vehicle = v;

    if (this.updateAddCoApp) {
      let coapp = new CustomerAppCoApp();
      coapp.ssn = this.updateCoAppSSN;
      coapp.noSsn = this.updateCoAppNoSSN;
      coapp.firstName = 'Rick';
      coapp.lastName = 'Newberry';
      coapp.dob = new Date(1990, 12, 24);
      coapp.relationship = this.relationship;
      coapp.jobIncome = 600;
      coapp.otherInc = 150;
      customerApp.coApplicant = coapp;

      let coappAddr = new CustomerAppAddress();
      coappAddr.houseNumber = '1A';
      coappAddr.streetName = '123 Main';
      coappAddr.city = 'Riverview';
      coappAddr.state = 'FL';
      coappAddr.zip = '33609';
      coappAddr.phone = this.updateCoAppPhoneNumber;
      coappAddr.streetName = this.coStreet;
      customerApp.coApplicant.currentAddress = coappAddr;
    }

    let ce = new CustomerAppEmployment();
    ce.occupation = "driver";
    ce.employer = "UPS";
    ce.employerPhone = "999-909-9888";
    ce.timeOnJobMo = 3;
    ce.timeOnJobYr = +this.updateTimeOnJob;
    customerApp.currentEmployment = ce;

    let pe = new CustomerAppEmployment();
    pe.occupation = "plumber";
    pe.employer = "ABC Plumbing";
    pe.employerPhone = "939-909-9888";
    pe.timeOnJobMo = 0;
    pe.timeOnJobYr = +this.updatePrevTimeOnJob;
    customerApp.previousEmployment = pe;

    // update
    if (action == 0) {
      this._flexService.updateApp(customerApp)
        .subscribe(response => {
          this.callbackViewModel = response;
          //this.appId = this.callbackViewModel.callbackResponse.callback[0].appId.toString();
          //window.open("assets\/" + this.callbackViewModel.CallbackFileName);
          this.updateProgress = false;
        },
          error => {
            this.errorObject = error.errObj;
            if (error.errObj.status === 400) {

              //handle validation error

              // return object from GetErrorResult has 2 properties: "$id" and ""
              // here, we are grabbing last error in modelState - probably not best way to do it
              if (error.errObj.error.modelState) {
                for (var key in error.errObj.error.modelState) {
                  if (error.errObj.error.modelState.hasOwnProperty(key)) {
                    this.errorMessage = error.errObj.error.modelState[key];
                  }
                }
              }
              else
                this.errorMessage = error.errMsg;
            }
            else
              this.errorMessage = error.errMsg;
            this.updateProgress = false;
          });
    }

    // revise
    if (action == 1) {
      customerApp.produceAllForms = this.reviseProduceAllForms;
      customerApp.produceCallback = this.reviseProduceCallback;

      this._flexService.reviseApp(customerApp)
        .subscribe(response => {
          this.callbackViewModel = response;
          //          this.appId = this.callbackViewModel.callbackResponse.callback[0].appId.toString();
          //window.open("assets\/" + this.callbackViewModel.CallbackFileName);
          this.updateProgress = false;
        },
          error => {
            this.errorObject = error.errObj;
            if (error.errObj.status === 400) {

              //handle validation error

              // return object from GetErrorResult has 2 properties: "$id" and ""
              // here, we are grabbing last error in modelState - probably not best way to do it
              if (error.errObj.error.modelState) {
                for (var key in error.errObj.error.modelState) {
                  if (error.errObj.error.modelState.hasOwnProperty(key)) {
                    this.errorMessage = error.errObj.error.modelState[key];
                  }
                }
              }
              else
                this.errorMessage = error.errMsg;
            }
            else
              this.errorMessage = error.errMsg;
            this.updateProgress = false;
          });
    }

    // maximize
    if (action == 2) {
      customerApp.produceAllForms = this.maxProduceAllForms;
      customerApp.produceCallback = this.maxProduceCallback;

      this._flexService.maxApp(customerApp)
        .subscribe(response => {
          this.callbackViewModel = response;
          //          this.appId = this.callbackViewModel.callbackResponse.callback[0].appId.toString();
          //window.open("assets\/" + this.callbackViewModel.CallbackFileName);
          this.updateProgress = false;
          this.getApp();
        },
          error => {
            this.errorObject = error.errObj;
            if (error.errObj.status === 400) {

              //handle validation error

              // return object from GetErrorResult has 2 properties: "$id" and ""
              // here, we are grabbing last error in modelState - probably not best way to do it
              if (error.errObj.error.modelState) {
                for (var key in error.errObj.error.modelState) {
                  if (error.errObj.error.modelState.hasOwnProperty(key)) {
                    this.errorMessage = error.errObj.error.modelState[key];
                  }
                }
              }
              else
                this.errorMessage = error.errMsg;
            }
            else
              this.errorMessage = error.errMsg;
            this.updateProgress = false;
          });
    }
  }

  getApp() {
    this.updateProgress = true;
    this.errorMessage = null;
    this.errorObject = null;
    let x = +this.appId;
    this._flexService.getApp(x)
      .subscribe(response => {
        this.callbackViewModel = response;
        this.updateDMSId = this.callbackViewModel.callbackResponse.custApp.dmsId;
        this.updateDMSAppId = this.callbackViewModel.callbackResponse.custApp.dmsAppId;
        this.updateLoanStatus = this.callbackViewModel.callbackResponse.custApp.loanStatus;
        this.updateFirstName = this.callbackViewModel.callbackResponse.custApp.firstName;
        this.updateLastName = this.callbackViewModel.callbackResponse.custApp.lastName;
        this.updateCashDown = this.callbackViewModel.callbackResponse.custApp.cashDown;
        this.updatePhoneNumber = this.callbackViewModel.callbackResponse.custApp.currentAddress.phone;
        this.updateCity = this.callbackViewModel.callbackResponse.custApp.currentAddress.city;
        this.updatePrevCity = this.callbackViewModel.callbackResponse.custApp.previousAddress.city;
        this.updateTimeOnJob = this.callbackViewModel.callbackResponse.custApp.currentEmployment.timeOnJobYr;
        this.updatePrevTimeOnJob = this.callbackViewModel.callbackResponse.custApp.previousEmployment.timeOnJobYr;

        this.updateMiles = this.callbackViewModel.callbackResponse.custApp.vehicle.miles.toString();
        this.updateMake = this.callbackViewModel.callbackResponse.custApp.vehicle.make;
        this.updateModel = this.callbackViewModel.callbackResponse.custApp.vehicle.model;
        this.updateYear = this.callbackViewModel.callbackResponse.custApp.vehicle.year;
        this.updateVin = this.callbackViewModel.callbackResponse.custApp.vehicle.vin;
        
        this.updateRate = this.callbackViewModel.callbackResponse.custApp.rate;
        this.updateTerm = this.callbackViewModel.callbackResponse.custApp.term;
        this.updateSalePrice = this.callbackViewModel.callbackResponse.custApp.salePrice;
        this.updateNoSsn = this.callbackViewModel.callbackResponse.custApp.noSSN;
        if (this.callbackViewModel.callbackResponse.custApp.coApplicant) {
          this.updateCoAppSSN = this.callbackViewModel.callbackResponse.custApp.coApplicant.ssn;
          this.updateCoAppPhoneNumber = this.callbackViewModel.callbackResponse.custApp.coApplicant.currentAddress.phone;
          this.coStreet = this.callbackViewModel.callbackResponse.custApp.coApplicant.currentAddress.streetName;
          this.relationship = this.callbackViewModel.callbackResponse.custApp.coApplicant.relationship;
          this.updateCoAppNoSSN = this.callbackViewModel.callbackResponse.custApp.coApplicant.noSsn;
          this.updateAddCoApp = (this.callbackViewModel.callbackResponse.custApp.coApplicant) ? true : false;
        }
        this.updateProgress = false;
      },
        error => {
          this.errorMessage = error.errObj.statusText;
          this.errorObject = error.errObj;
          this.updateProgress = false;
        });
  }

  generateAllForms() {
    this.errorMessage = null;
    this.errorObject = null;
    this.updateProgress = true;

    let x = +this.appId;
    this._flexService.generateForms(x)
      .subscribe(response => {
        this.callbackViewModel = response;
        this.updateProgress = false;
      },
      error => {
        this.updateProgress = false;
        this.errorMessage = error.errObj.statusText;
        this.errorObject = error.errObj;
      });
  }

  cancelApp() {
    this.errorMessage = null;
    this.errorObject = null;
    this.updateProgress = true;

    let x = +this.appId;
    var app = new CustomerApp();
    app.lenderAppId = x;
    this._flexService.cancelApp(app)
      .subscribe(response => {
        this.updateProgress = false;
      },
      error => {
        this.updateProgress = false;
        this.errorMessage = error.errObj.statusText;
        this.errorObject = error.errObj;
      });
  }
}
