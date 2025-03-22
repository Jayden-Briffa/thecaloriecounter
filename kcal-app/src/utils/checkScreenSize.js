// Uses bootstrap's breakpoints
export function usingMobile(){
    return window.matchMedia("(max-width: 767px)").matches;
}

export function usingTablet(){
    return window.matchMedia("(min-width: 768px) and (max-width: 991px)").matches;
}

export function usingDesktop(){
    return window.matchMedia("(min-width: 992px)").matches;
}
