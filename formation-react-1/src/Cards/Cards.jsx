import React from 'react';
import Card from '../Card/Card';
import { EqptContext } from './../contexts';
import './Cards.css';

const cards = [
    {
        slot: 'LT1',
        modele: 'NGLT-A',
        status: 'en service'
    },
    {
        slot: 'LT2',
        modele: 'NGLT-A',
        status: 'réservé'
    }
];
export default class Cards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards : cards,
            newSlot: '',
            newModele: '',
            newStatus: '',
            filter: {
                type: 'slot',
                value: ''
            },
            sortedBy: 'slot'
		}
        this.newSlotRef = React.createRef();
	}

    addCard = () => {
        if (this.state.newSlot === '') {
            this.newSlotRef.current.style.border = '2px solid red';
        } else {
            this.newSlotRef.current.style.border = '2px inset grey';
            let newCards = [...this.state.cards];
            newCards.push({
                slot: this.state.newSlot,
                modele: this.state.newModele,
                status: this.state.newStatus
            });
            this.setState({cards: newCards});
        }
    }

    deleteCard = (index) => {
        let newCards = [...this.state.cards];
        if (index > -1) {
            newCards.splice(index, 1);
        }
        this.setState({cards: newCards});
    }

    applyFilter = (cardsList) => {
        let cardsFiltered = [];
        let type = this.state.filter.type;
        cardsList.forEach(card => {
            if (this.state.filter.value === '' || card[type].includes(this.state.filter.value)) {
                cardsFiltered.push(card);
            }
        });
        return cardsFiltered;
    }

    applySort = (cardsList) => {
        return cardsList.sort(this.compare);
    }

    compare = ( a, b ) => {
        if ( a[this.state.sortedBy].toLowerCase() < b[this.state.sortedBy].toLowerCase()){
            return -1;
        }
        if ( a[this.state.sortedBy].toLowerCase() > b[this.state.sortedBy].toLowerCase()){
            return 1;
        }
        return 0;
    }

    render() {
        let cardsList;
        if (this.state.cards.length === 0) {
            cardsList = <div><i>Aucune carte</i></div>;
        } else {
            cardsList = this.applySort(this.applyFilter(this.state.cards)).map((c, index) =>
                <Card
                    key={index}
                    index={index}
                    slot={c.slot}
                    modele={c.modele}
                    status={c.status}
                    deleteCard={this.deleteCard}/>
            )
        }
        return (
            <div>
                <EqptContext.Consumer>
                    {value => <p>{value}</p>}
                </EqptContext.Consumer>
                <p>Gestionnaire de cartes</p>
                <div className='filters'>
                    <label>Filtres :</label>
                    <select value={this.state.filter.type} onChange={(e) => this.setState({filter: {type : e.target.value, value: ''}})}>
                        <option value="slot">Slot</option>
                        <option value="modele">Modèle</option>
                        <option value="status">Status</option>
                    </select>
                    <input value={this.state.filter.value} onChange={(e) => this.setState({filter: {type : this.state.filter.type, value: e.target.value}})} />
                </div>
                <div className='tri'>
                    <label>Trier par :</label>
                    <select value={this.state.sortedBy} onChange={(e) => this.setState({sortedBy: e.target.value})}>
                        <option value="slot">Slot</option>
                        <option value="modele">Modèle</option>
                        <option value="status">Status</option>
                    </select>
                </div>
                    {cardsList}
                <div className='addCard'>
                    <ul>
                        <li><label>Slot</label><input ref={this.newSlotRef} onChange={(e) => this.setState({newSlot: e.target.value})} /></li>
                        <li><label>Modèle</label><input onChange={(e) => this.setState({newModele: e.target.value})} /></li>
                        <li><label>Status</label><input onChange={(e) => this.setState({newStatus: e.target.value})} /></li>
                    </ul>
                    <button onClick={this.addCard}>Ajouter</button>
                </div>
            </div>
        )
    }
}