// Get and return the average kcal consumed between 2 dates
export default async function getKcalAvg(start, end){

    try{
        const url = 'http://localhost:4001/api/kcal';
        let query = `?getAvg=true&start=${start}&end=${end}`;

        // Get a response from the API and translate to JSON
        const response = await fetch(url + query);
        const jsonResponse = await response.json();

        //console.log("AVG: ", jsonResponse)
        return jsonResponse;

    } catch (error){
        console.error("Error getting average kcal data: ", error)

        return new Error(error)
    }
}