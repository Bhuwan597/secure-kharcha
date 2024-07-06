import parsePhoneNumberFromString from "libphonenumber-js";

export function extractPhoneNumber(eSewa?: string | null){
    if(!eSewa) return "";
    const phoneNumber = parsePhoneNumberFromString(eSewa);
    return phoneNumber?.nationalNumber?? ""
}
