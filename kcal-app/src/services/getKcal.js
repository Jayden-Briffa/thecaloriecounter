// Get and return all data from Kcal_Logs, or just the one associated with a specific date if given 
export default async function getKcal({date = null, start=null, end=null}){

    try{
        const url = `${import.meta.env.VITE_API_URL}/api/kcal`;
        let query = '';

        if (date){
            query = `?date=${date}`

        } else if (start && end){
            query = `?start=${start}&end=${end}`
        }

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
        
        //console.log("LOGS: ", jsonResponse)
        return jsonResponse.Logs ?? jsonResponse.Log ?? jsonResponse;

    } catch (error){
        console.error("Error getting Foods data: ", error)

        return new Error(error)
    }
}
