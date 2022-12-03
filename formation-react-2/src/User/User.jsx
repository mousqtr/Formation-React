import React from 'react';
import './User.css';

export default function User (props) {

    const deleteUser = () => {
        props.deleteUser(props.name);
    }

    return (
        <ul className='user'>
            <li>Name: {props.name}</li>
            <li>Level: {props.level}</li>
            <li>XP: {props.xp}</li>
            <button onClick={deleteUser}>Supprimer</button>
        </ul>
    )
}