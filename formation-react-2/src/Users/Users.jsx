import { useState, useEffect, useCallback, useMemo, useContext, useRef } from 'react';
import { TitleContext } from '../contexts';
import './Users.css';
import User from './../User/User';

export default function Users () {

    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState('');
    const [newLevel, setNewLevel] = useState(0);
    const [newXp, setNewXp] = useState(0);

    const newNameRef = useRef(null);

    const title = useContext(TitleContext);

    const addUser = useCallback(() => {
        if (newName === '') {
            newNameRef.current.style.border = '2px solid red';
        } else {
            newNameRef.current.style.border = '2px inset grey';
            let newUsers = [...users];
            newUsers.push({
                name: newName,
                level: newLevel,
                xp: newXp
            });
            setUsers(newUsers);
        }
    }, [users, newName, newLevel, newXp]);

    const handleEnterKeydown = useCallback(event => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            addUser();
        }
    }, [addUser]);

    useEffect(() => {
        document.addEventListener('keydown', handleEnterKeydown);                   // Ajout de l'évènement
        return () => document.removeEventListener('keydown', handleEnterKeydown);   // Suppression de l'évènement
    }, [handleEnterKeydown]);

    const nbUsers = useMemo(() => {
        let result = users.length // Calcul super long
        return result;
    }, [users]);

    const deleteUser = (name) => {
        const newUsers = [...users].filter(user => user.name !== name);
        setUsers(newUsers);
    }

    return (
        <div>
            <p>{title} [{nbUsers}]</p>
            {
                users.map((user, index) =>
                    <User key={index} name={user.name} level={user.level} xp={user.xp} deleteUser={deleteUser} />
                )
            }
            <div className='addUser'>
                <ul>
                    <li><label>Name</label><input ref={newNameRef} onChange={(e) => setNewName(e.target.value)} /></li>
                    <li><label>Level</label><input onChange={(e) => setNewLevel(e.target.value)} /></li>
                    <li><label>Xp</label><input onChange={(e) => setNewXp(e.target.value)} /></li>
                </ul>
                <button onClick={addUser}>Ajouter</button>
            </div>
        </div>
    )
}