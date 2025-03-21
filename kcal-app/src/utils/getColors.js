// Get colors defined in CSS root
const rootStyles = getComputedStyle(document.documentElement);
const appPink = rootStyles.getPropertyValue('--PINK').trim(); 
const appBlue = rootStyles.getPropertyValue('--BLUE').trim(); 
const appGreen = rootStyles.getPropertyValue('--GREEN').trim(); 

export {appPink, appBlue, appGreen};
