import getKcal from "./getKcal";
import postKcal from "./postKcal";
import putKcal from "./putKcal";

// Set and return a new record in Kcal_Logs
export default async function submitKcal(body){
    
    try{
        // Look for an existing log with the given date
        const currLog = await getKcal({date: body.date});
        
        let newLog; 

        // If a record for today is already present, update it...
        //... otherwise, create one
        if (Object.keys(currLog).length > 0){
            newLog = await putKcal(currLog['Logs'].id, body)
        } else {
            newLog = await postKcal(body)
        }

        return newLog;

    } catch (error){
        console.error("Error handling kcal data: ", error)

        return new Error(error)
    }
}