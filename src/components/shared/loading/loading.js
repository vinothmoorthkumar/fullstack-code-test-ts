import React from 'react';
import './loading.css'

const Loading = () => {
    return (
        <div className="LoadingContainer">
            <div className="circle delay1"></div>
            <div className="circle delay2"></div>
            <div className="circle delay3"></div>
        </div>
    );
}

export default Loading;