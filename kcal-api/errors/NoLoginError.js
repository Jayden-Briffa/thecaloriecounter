import { RfcError } from "./RfcError.js";

export class NoLoginError extends RfcError {
    constructor({ cause = undefined } = {}) {

        super(
            "You must log in before making a request to this service", 
            { 
                title: "login_required", 
                status: 401,
                cause
            });
    }
}