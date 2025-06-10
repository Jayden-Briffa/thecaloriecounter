// Reformat a date to be dd/mm/yyyy
export default function formatDate(date){
    const fullDate = new Date(date);
    const year = fullDate.getFullYear();
    const month = fullDate.getMonth() + 1;
    const day = fullDate.getDate();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate
}
