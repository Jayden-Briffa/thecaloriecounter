import NavLink from './NavLink';

function NavLinksNotLoggedIn(props){
    
    return (
        <>
            {/* Account */}
            <NavLink path="/account" altPaths={['/']} label="Signup/login" location={props.location} onClick={props.handleToggleNavbar} />
        </>
    )
}

export default NavLinksNotLoggedIn