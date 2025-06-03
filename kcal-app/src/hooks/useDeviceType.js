import { useEffect, useState } from "react";

export default function useDeviceType() {
    const [deviceType, setDeviceType] = useState(undefined)
   
    useEffect(() => {
        
        const breakpoints = [
            { min: '992px', type: "lg" },
            { min: '768px', type: "md" },
            { min: 0,   type: "sm" }
        ];

        let deviceBreakpoint;
        for (let bp of breakpoints){
            console.log(`Checking breakpoint: ${bp.min}`);
            console.log(`Matches: ${window.matchMedia(`(width >= ${bp.min})`).matches}`);
            if (window.matchMedia(`(width >= ${bp.min})`).matches) {
                deviceBreakpoint = bp.type;
                break;
            }
        };

        setDeviceType(deviceBreakpoint ?? null)

    }, [setDeviceType])


    return deviceType;
}