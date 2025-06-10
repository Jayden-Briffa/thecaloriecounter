import NavLink from './NavLink';

function NavLinksLoggedIn(props){

    return (
        <>
            {/* Dashboard */}
            <NavLink path="/dashboard" label="Dashboard" location={props.location} onClick={props.handleToggleNavbar} />

            {/* My foods */}
            <NavLink path="/myfoods" label="My Foods" location={props.location} onClick={props.handleToggleNavbar} />

            {/* Today */}
            <NavLink path="/today" label="Today" location={props.location} onClick={props.handleToggleNavbar} />

            {/* Account */}
            <NavLink path="/account" altPaths={['/']} label="Account" location={props.location} onClick={props.handleToggleNavbar} />
        </>
    )
}

export default NavLinksLoggedIn
