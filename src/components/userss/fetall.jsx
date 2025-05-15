// hooks/useFetchUsers.js

import { useState, useEffect } from 'react';
import axios from 'axios';
// import { API_URL, ENDPOINTS } from "../auth/api.js";
// import { getTokenFromCookie } from '../auth/localdt.js';
import toast from 'react-hot-toast';
import { API_URL, ENDPOINTS } from '../../auth/api.js';
import { getTokenFromCookie, removeToken } from '../../auth/localdt.js';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../auth/logoutUtil.js';

const useFetchUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [editingUser, setEditingUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = getTokenFromCookie();
        const fetchUsers = async (page) => {
            try {
                const response = await axios.get(`${API_URL}${ENDPOINTS.ALUS}?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const fetchedUsers = response.data.users.data;
                setUsers(fetchedUsers);
                localStorage.setItem('users', JSON.stringify(fetchedUsers)); // Save users to localStorage
                setCurrentPage(response.data.users.current_page);
                setLastPage(response.data.users.last_page);
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Error fetching users:', error);
                handleLogout();
                navigate('/login');
            }
        };

        if (token) {
            fetchUsers(currentPage);
        }else{
            navigate('/login');
        }
    }, [currentPage]);

    const handleUpdate = async (id) => {
        const user = editingUser;
        if (!user) return;

        try {
            const token = getTokenFromCookie();
            await axios.post(`${API_URL}${ENDPOINTS.CHAPROFF.replace('{id}', id)}`, user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsers(prevUsers => prevUsers.map(u => 
                u.id === id ? { ...u, ...user } : u
            ));
            setEditingUser(null);
            localStorage.removeItem('users'); 
            toast.success('User data updated successfully');
        
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Error updating user:', error);
        }
    };

    const handleChange = (id, key, value) => {
        setEditingUser(prev => ({
            ...prev,
            [key]: value,
            id,
        }));
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    return {
        users,
        currentPage,
        lastPage,
        editingUser,
        setEditingUser,
        handleUpdate,
        handleChange,
        handlePageChange
    };
};

export default useFetchUsers;
