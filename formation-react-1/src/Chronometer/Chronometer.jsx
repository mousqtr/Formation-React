import React from 'react';

export default class Chronometer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			time : 4
		}
	}

	componentDidMount() {
        let cpt = this.state.time;
        setInterval(() => {
            this.setState({ time: cpt++ });
        }, 1000);
    }       

	render() {
        return (
            <div>
   			    <p>{this.props.title}</p>
                <p>{this.state.time}</p>
            </div>
        );
	}
}