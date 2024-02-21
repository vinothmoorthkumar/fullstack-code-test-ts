import React, { useState, useEffect, useRef } from 'react';
import apiService from '../service/user';
import Loading from '../shared/loading/loading';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


const Users = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [allUsersLoaded, setAllUsersLoaded] = useState(false);


    const fetchData = async () => {
        setLoading(true);
        try {
            if (!allUsersLoaded) {
                const response = await apiService.fetchUsers(page, 200, 10);
                if (response?.data?.length === 0) {
                    setAllUsersLoaded(true)
                } else {
                    setUsers(prevData => [...prevData, ...response.data]);
                }
                setLoading(false);
            } else {
                setLoading(false);
                setOpen(true);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };


    useEffect(() => {
        if (page > 1) {
            fetchData();
        }
    }, [page]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight
        ) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchData()
            setLoading(false)
        }, 3000);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <div>
            {loading ? (
                <div><Loading /></div>
            ) : (
                <div>
                    <h1>User List</h1>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {users.map((user, index) => (
                            <div key={index}>
                                <ListItem sx={{ maxWidth: 'xl' }} alignItems="flex-start" >
                                    <ListItemAvatar>
                                        <Avatar alt={user.avatar} src={user.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.first_name + +user.last_name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {user.email}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </div>
                        ))}
                    </List>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>No Users Available</DialogTitle>
                        <DialogContent>
                            <p>There are no users available.</p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}
        </div>

    );
}

export default Users;
