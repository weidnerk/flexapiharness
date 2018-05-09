import { CustomerApp, CustomerAppForms } from "./customerapp";

export class CallbackDigest {
    appId: number;
    principal: number;
    CMSId: number;
    gap: number;
    gapSelected: boolean;
    deviceSelected: boolean;
    discount: number;
    bonus: number;
    netProceeds: number;
    rate: number;
    term: number;
}

export class CallbackResponse {
    callback: CallbackDigest[];
    custApp: CustomerApp;
}

export class CallbackViewModel {
    callbackResponse: CallbackResponse;
    forms: CustomerAppForms;
}
