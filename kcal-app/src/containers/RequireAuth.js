import { useEffect } from 'react';
import { useUser } from '../context/userContext';
import { Navigate, Outlet } from 'react-router-dom';
import { useFeedback } from '../context/FeedbackContext';
import Loading from '../components/Loading';

function RequireAuth() {
    const { loadingUser, userLoggedIn } = useUser();
    const { updateFeedbackData, feedbackData } = useFeedback();

    useEffect(() => {

        if (loadingUser) {
            // If the user is still loading, we don't want to show any feedback yet
            return;
        } else if (!userLoggedIn() && feedbackData.source !== "redirect") {
            updateFeedbackData({message: "You must log into an account", type: "danger", source: "redirect"});
        }
    }, [loadingUser, userLoggedIn, updateFeedbackData, feedbackData.source]);

    return loadingUser ? <Loading /> : userLoggedIn() ? <Outlet /> : <Navigate to='/account' replace />
}

export default RequireAuth;