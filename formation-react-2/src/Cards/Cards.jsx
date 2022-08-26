import { useState, useEffect, useCallback, useMemo, useContext, useRef } from 'react';
import { EqptContext } from './../contexts';
import './Cards.css';

export default function Cards () {

    const [cards, setCards] = useState([]);
    const [newSlot, setNewSlot] = useState('');
    const [newModele, setNewModele] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const newSlotRef = useRef(null);

    const equipment = useContext(EqptContext);

    const addCard = useCallback(() => {
        if (newSlot === '') {
            newSlotRef.current.style.border = '2px solid red';
        } else {
            newSlotRef.current.style.border = '2px inset grey';
            let newCards = [...cards];
            newCards.push({
                slot: newSlot,
                modele: newModele,
                status: newStatus
            });
            setCards(newCards);
        }
    }, [cards, newSlot, newModele, newStatus]);

    const handleEnterKeydown = useCallback(event => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            addCard();
        }
    }, [addCard]);

    useEffect(() => {
        document.addEventListener('keydown', handleEnterKeydown);                   // Ajout de l'évènement
        return () => document.removeEventListener('keydown', handleEnterKeydown);   // Suppression de l'évènement
    }, [handleEnterKeydown]);

    const nbCards = useMemo(() => {
        let result = cards.length // Calcul super long
        return result;
    }, [cards]);

    return (
        <div>
            <p>{equipment}</p>
            <p>Gestionnaire de cartes [{nbCards}]</p>
            {
                cards.map((card, index) =>
                    <ul className='card' key={index}>
                        <li>Slot: {card.slot}</li>
                        <li>Modèle: {card.modele}</li>
                        <li>Status: {card.status}</li>
                    </ul>
                )
            }
            <div className='addCard'>
                <ul>
                    <li><label>Slot</label><input ref={newSlotRef} onChange={(e) => setNewSlot(e.target.value)} /></li>
                    <li><label>Modèle</label><input onChange={(e) => setNewModele(e.target.value)} /></li>
                    <li><label>Status</label><input onChange={(e) => setNewStatus(e.target.value)} /></li>
                </ul>
                <button onClick={addCard}>Ajouter</button>
            </div>
        </div>
    )
}