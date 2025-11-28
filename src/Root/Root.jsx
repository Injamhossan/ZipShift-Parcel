import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './../components/Navbar/Navbar';
import Footer from './../components/Footer/Footer';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import useAuthStore from '../store/authStore';

const Root = () => {
    const setToken = useAuthStore((state) => state.setToken);

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const token = await currentUser.getIdToken();
                    setToken(token);
                } catch (error) {
                    console.error("Failed to get token", error);
                }
            }
        });

        return () => unsubscribe();
    }, [setToken]);

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />       
        </div>
    );
};

export default Root;