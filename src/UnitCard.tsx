import React from "react";

export type UnitCardProps = {
    name: string
    cost: string
    type: string
    subtype: string
    description: string
    move: string
    health: string
    value: string
    attack: string
}


export class UnitCard extends React.Component<UnitCardProps> {
    render() {
        return <div className="card-container">
            <img className="portrait-image" src="musk-portrait.png"></img>
            <div className="title-text">{this.props.name}</div>
            <div className="cost-text">{this.props.cost}</div>
            <div className="type-text">{this.props.type} - {this.props.subtype}</div>
            <div className="description-text">{this.props.description}</div>
            <div className="move-text">{this.props.move}</div>
            <div className="health-text">{this.props.health}</div>
            <div className="value-text">{this.props.value}</div>
            <div className="attack-text">{this.props.attack}</div>
            <img className="card-image" src="unit-card.png"></img>

        </div>;
    }
}

