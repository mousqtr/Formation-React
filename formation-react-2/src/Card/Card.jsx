import React from 'react';
import './Card.css';

export default class Card extends React.Component {

    deleteCard = () => {
        this.props.deleteCard(this.props.index);
    }

    render() {
        return (
            <ul className='card'>
                <li>Slot: {this.props.slot}</li>
                <li>Modèle: {this.props.modele}</li>
                <li>Status: {this.props.status}</li>
                <button onClick={this.deleteCard}>Supprimer</button>
            </ul>
        )
    }
}