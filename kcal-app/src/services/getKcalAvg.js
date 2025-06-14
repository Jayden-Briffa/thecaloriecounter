// Get and return the average kcal consumed between 2 dates
export default async function getKcalAvg({start, end}){

    try{
        const url = `${process.env.VITE_API_URL}/api/kcal`;
        let query = `?getAvg=true&start=${start}&end=${end}`;
        
        // Get a response from the API and translate to JSON
        const response = await fetch(url + query, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok){
            return new Error(response.message);
        }

        const jsonResponse = await response.json();

        //console.log("AVG: ", jsonResponse.Kcal.average_kcal)
        return jsonResponse.Kcal;

    } catch (error){
        console.error("Error getting average kcal data: ", error)

        return new Error(error)
    }
}
