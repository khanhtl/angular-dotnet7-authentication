import { EnumErrorCode } from "../enums";
import { ErrorResponse } from "./ErrorResponse";

export interface ServiceResponse {
    Success: boolean;
    Data: any;
    ErrorCode: EnumErrorCode;
    Errors: ErrorResponse[];
    ServerTime: Date;
}