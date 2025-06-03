import React, { useEffect, useState } from 'react';
import '../styles/Header.css'
import { useLocation } from 'react-router-dom';
import { useUser } from '../context/userContext';
import NavLinksLoggedIn from '../components/NavLinksLoggedIn';
import NavLinksNotLoggedIn from '../components/NavLinksNotLoggedIn';
import Feedback from '../components/FeedbackAlert';
import { useFeedback } from '../context/FeedbackContext';

function Header() {
  const location = useLocation();
  const [navlinks, setNavlinks] = useState(null);
  const { user, userLoggedIn } = useUser();
  const { feedbackData } = useFeedback();
 
  useEffect(() => {
    const newNavLinks = userLoggedIn() ? <NavLinksLoggedIn location={location} /> : <NavLinksNotLoggedIn location={location} />
    setNavlinks(newNavLinks)
  }, [user, location]);

  return (
    <>
      <header className="header bg-pink">
        <nav className="navbar navbar-expand-sm" data-bs-theme="dark">
          <div className="container-fluid p-0">
            <button className="navbar-toggler m-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse bg-pink" id="navbarSupportedContent">

              {/* Desktop */}
              <ul className="navbar-nav me-auto d-md-flex d-none flex-row justify-content-around justify-self w-75 mb-2 mx-auto mb-lg-0">
                {navlinks}
              </ul>

              {/* Mobile */}
              <ul className="navbar-nav me-auto d-flex d-md-none flex-column justify-content-around w-75 mb-2 mx-auto mb-lg-0" id="navlinks-sm">
                {navlinks}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {feedbackData.showAtTop ? <Feedback key={feedbackData.feedbackKey} message={feedbackData.message} alertType={feedbackData.type} extraClasses="fixed-top text-center" /> : (null)}
    </>

  );
}

export default Header;
