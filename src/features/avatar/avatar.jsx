import React from 'react';
import './avatar.css';

const Avatar = ({ userName }) => {
    return (
        <div>
            <img src={`https://api.adorable.io/avatars/10/${userName}`} 
            alt={`${userName}'s Profile`} 
            className="avatar-profile-image" />
            <p className="avatar-username">{userName}</p>
        </div>
    );
};

export default Avatar;