import { useEffect, useState } from "react";

export default function useDeviceType() {
    const [deviceType, setDeviceType] = useState(undefined)
   
    useEffect(() => {
        
        const breakpoints = {
            "992px": "lg",
            "768px": "md",
            "0": "sm"
        };

        let deviceBreakpoint;
        for (let breakpoint in breakpoints){
            if (window.matchMedia(`(width >= ${breakpoint})`).matches) {
                deviceBreakpoint = breakpoint;
                break;
            }
        }

        setDeviceType(breakpoints?.[deviceBreakpoint] ?? null)
    }, [setDeviceType])


    return deviceType;
}