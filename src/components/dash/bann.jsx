import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../auth/logoutUtil';

const Bann = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleLogoutAndRefresh();
        }, 240000);

        // Cleanup function to clear the timeout if the component is unmounted
        return () => clearTimeout(timeoutId);
    }, []);

    const handleLogoutAndRefresh = () => {
        handleLogout();
        console.log('Token removed, reloading page');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <img 
                src="https://cdn-icons-png.flaticon.com/512/3778/3778958.png" 
                alt="Illustrator Image" 
                className="w-1/2 max-w-xs mb-8 rounded-lg drop-shadow-xl"
            />
            <h1 className="text-4xl font-extrabold text-blue-900 mb-4">Akun Anda telah di bekukan🥶</h1>
            <p className="text-lg text-blue-700 mb-8">
                Harap hubungi Admin untuk informasi lebih lanjut.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300">
                Hubungi
            </button>
        </div>
    );
}

export default Bann;
