// Get and return the average kcal consumed between 2 dates
export default async function getKcalAvg({start, end}){

    try{
        const url = `${process.env.REACT_APP_API_URL}/api/kcal`;
        let query = `?getAvg=true&start=${start}&end=${end}`;
        
        // Get a response from the API and translate to JSON
        const response = await fetch(url + query);

        if (!response.ok){
            return new Error(response.message);
        }

        const jsonResponse = await response.json();

        //console.log("AVG: ", jsonResponse.Kcal[0].average_kcal)
        return jsonResponse.Kcal[0].average_kcal;

    } catch (error){
        console.error("Error getting average kcal data: ", error)

        return new Error(error)
    }
}