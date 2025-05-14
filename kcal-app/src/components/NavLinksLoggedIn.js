import React from 'react'
import NavLink from './NavLink';

function NavLinksLoggedIn(props){

    return (
        <>
            {/* Dashboard */}
            <NavLink path="/dashboard" label="Dashboard" location={props.location} />

            {/* My foods */}
            <NavLink path="/myfoods" label="My Foods" location={props.location} />

            {/* Today */}
            <NavLink path="/today" label="Today" location={props.location} />

            {/* Account */}
            <NavLink path="/account" label="Account" location={props.location} />
        </>
    )
}

export default NavLinksLoggedIn