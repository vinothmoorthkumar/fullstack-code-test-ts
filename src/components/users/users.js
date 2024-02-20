import React, { useState } from 'react';
import Loading from '../shared/loading/loading';
const Users = () => {
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
    }, 3000);

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <h1>Content Loaded</h1>
            )}
        </div>
    );
}

export default Users;
