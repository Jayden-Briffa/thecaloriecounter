import React from 'react'
import NavLink from './NavLink';

function NavLinksNotLoggedIn(props){

    return (
        <>
            {/* Account */}
            <NavLink path="/account" label="Signup/login" location={props.location} />
        </>
    )
}

export default NavLinksNotLoggedIn