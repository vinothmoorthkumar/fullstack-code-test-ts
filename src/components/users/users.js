import React, { useState, useEffect, useRef } from 'react';
import apiService from '../service/user';

import Loading from '../shared/loading/loading';
const Users = () => {
    // const [isLoading, setIsLoading] = useState(true);

    // setTimeout(() => {
    //     setLoading(false);
    // }, 3000);

    // return (
    //     <div>
    // {loading ? (
    //     <Loading />
    // ) : (
    //     <h1>Content Loaded</h1>
    // )}
    //     </div>
    // );




    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const loader = useRef(null);


    setTimeout(() => {
        setLoading(false);
        loadMoreUsers();
    }, 3000);

    const loadMoreUsers = async () => {
        setLoading(true);
        const data = await apiService.fetchUsers(page, 20);
        if(data?.data.length===0){
            setLoading(false);
        }else{
            setUsers((prevUsers) => [...prevUsers, ...data.data]);
            setPage((prevPage) => prevPage + 1);
            setLoading(false);
        }
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMoreUsers();
            }
        }, options);

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, []);

    return (
        <div>

            {loading ? (
                <Loading />
            ) : (
                <div>
                    <h1>User List</h1>
                    <ul>
                        {users.map((user, index) => (
                            <li key={index}>{user.first_name}</li>
                        ))}
                    </ul>
                    <div ref={loader}></div>
                </div>
            )}


        </div>
    );
}

export default Users;
