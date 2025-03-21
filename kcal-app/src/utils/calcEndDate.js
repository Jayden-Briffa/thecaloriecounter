// Calculate and return the end date from the...
//... start date and number of days
import extractDate from "./extractDate";

export default function calcEndDate(start, numDays){ // Date, int
    const startUnix = start.getTime();
    const endUnix = startUnix + (numDays * (8.64e+7))

    const startDate = extractDate(new Date(startUnix));
    const endDate = extractDate(new Date(endUnix));

    return {
        startDate: startDate,
        endDate: endDate
    }
}