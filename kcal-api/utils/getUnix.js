export default function getUnix(date){
    const newUnix = Math.floor(new Date(date).getTime() / 1000)
    return newUnix
}