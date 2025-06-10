import { useCallback, useState } from 'react';
import '../styles/Header.css'
import { useLocation } from 'react-router-dom';
import { useUser } from '../context/userContext';
import NavLinksLoggedIn from '../components/NavLinksLoggedIn';
import NavLinksNotLoggedIn from '../components/NavLinksNotLoggedIn';
import Feedback from '../components/FeedbackAlert';
import { useFeedback } from '../context/FeedbackContext';
import useDeviceType from '../hooks/useDeviceType';

function Header(props) {
  const location = useLocation();
  const [hideMobileNav, setHideMobileNav] = useState(true);
  const { userLoggedIn } = useUser();
  const { feedbackData } = useFeedback();
  const deviceType = useDeviceType();

  const handleToggleNavbar = useCallback(() => {
    if (deviceType !== 'lg') {
      props.page.current.classList.toggle('inactive');
      setHideMobileNav(prev => !prev);
    }

    // If the device is large, we don't want to toggle the navbar
  }, [setHideMobileNav, props.page, deviceType]);
  
  return (
    <>
      <header className="header bg-pink">
        <nav className="navbar header-nav py-auto">
          <div className="container-fluid p-0">
            <button className="d-lg-none navbar-toggler m-auto" type="button" data-bs-toggle="collapse" aria-label="Toggle navigation" id='navbar-toggler' onClick={handleToggleNavbar}>
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="white" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
              </svg>
            </button>

            <div className="bg-pink w-100" id="navbarSupportedContent">

              {/* Desktop */}
              <div className='d-lg-flex d-none justify-content-between align-items-center w-100'>
                <ul className="navbar-nav me-aut flex-row justify-content-around justify-self w-75 mb-2 mx-auto mb-lg-0">
                  {userLoggedIn() ? <NavLinksLoggedIn location={location} handleToggleNavbar={handleToggleNavbar} /> : <NavLinksNotLoggedIn location={location} handleToggleNavbar={handleToggleNavbar} />}
                </ul>
              </div>
            

              {/* Mobile */}
              <div className={`${hideMobileNav ? 'hidden': ''}`} id="navbar-sm">
                <button className="float-end btn-blank" type="button" aria-label="Close" onClick={handleToggleNavbar}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="white" className="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
                </button>
                <ul className="flex-column justify-content-around w-75 mb-2 mb-lg-0" id="navlinks-sm">
                  {userLoggedIn() ? <NavLinksLoggedIn location={location} handleToggleNavbar={handleToggleNavbar} /> : <NavLinksNotLoggedIn location={location} handleToggleNavbar={handleToggleNavbar} />}
                </ul>
              </div>
              
            </div>
          </div>
        </nav>
      </header>

      {feedbackData.showAtTop && feedbackData.source !== null ? <Feedback key={feedbackData.feedbackKey} message={feedbackData.message} alertType={feedbackData.type} extraClasses="fixed-top text-center" dismissable={true} /> : (null)}
    </>

  );
}

export default Header;
