import React, { useState, useEffect, useRef } from 'react';
import apiService from '../service/user';

import Loading from '../shared/loading/loading';
const Users = () => {
    // const [isLoading, setIsLoading] = useState(true);

    // setTimeout(() => {
    //     setIsLoading(false);
    // }, 3000);

    // return (
    //     <div>
    //         {isLoading ? (
    //             <Loading />
    //         ) : (
    //             <h1>Content Loaded</h1>
    //         )}
    //     </div>
    // );




    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const loader = useRef(null);

    const loadMoreUsers = async () => {
        setLoading(true);
        const data = await apiService.fetchUsers(page, 20); 
        setUsers((prevUsers) => [...prevUsers, ...data.data]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log("ttttttt")
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
            <h1>User List</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.first_name}</li>
                ))}
            </ul>
            {loading && <p>Loading...</p>}
            <div ref={loader}></div>
        </div>
    );
}

export default Users;
