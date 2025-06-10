// Calculate the kcal of a food item
export default function calcKcal(storedKcal, storedQuantity, actualQuantity){
    const kcal = storedKcal / storedQuantity * actualQuantity;
    return Math.floor(kcal);
}
