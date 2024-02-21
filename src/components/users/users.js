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
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const loader = useRef(null);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [isInitLoad, setIsInitLoad] = useState(true);
    const [allUsersLoaded, setAllUsersLoaded] = useState(false);

    const loadMoreUsers = async () => {
        console.log("page",page)
        const data = await apiService.fetchUsers(page, 200, 20);
        if (data?.data.length === 0) {
            setLoading(false);
            setAllUsersLoaded(true);
        } else {
            setUsers((prevUsers) => [...prevUsers, ...data.data]);
            setPage((prevPage) => prevPage + 1);
            setLoading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            // if (isInitLoad) {
            //     setTimeout(() => {
            //         setLoading(false);
            //         loadMoreUsers();
            //     }, 3000);

            // } else {
            //     if (entries[0].isIntersecting) {
            //         loadMoreUsers();
            //     }
            // }

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
            {!allUsersLoaded && <div ref={loader}><Loading /></div>}

        </div>
    );
}

export default Users;
