import React, { useEffect } from 'react';
import { useUser } from '../context/userContext';
import { Navigate, Outlet } from 'react-router-dom';
import { useFeedback } from '../context/FeedbackContext';
import Loading from '../components/Loading';

function RequireAuth() {
    const { loadingUser, userLoggedIn } = useUser();
    const { updateFeedbackData } = useFeedback();

    useEffect(() => {
        if (!userLoggedIn()){
            updateFeedbackData({message: "You must log into an account", type: "danger", source: "redirect"});
        }
    }, [loadingUser])

    return loadingUser ? <Loading /> : userLoggedIn() ? <Outlet /> : <Navigate to='/account' replace />
}

export default RequireAuth;