import { ERequestPayLoadTypes } from '../enums/RequestPayLoadTypes'

export interface IControllerHandlerParams {
    schema?: object;
    // tslint:disable-next-line: ban-types
    controller: Function;
    schemaLookup?: ERequestPayLoadTypes;
    options?: any;
}
