import React from "react";
import { PRINT_GOLD } from "./consts";

export type UnitCardProps = {
    name: string
    cost: string
    type: string
    subtype: string
    description: string
    attack: string
    health: string
    move: string
    value: string
}


export class UnitCard extends React.Component<UnitCardProps> {
    render() {
        let isGold = this.props.value === "G"
        let cardImage = "unit-card.png";
        if (this.props.value === "G") {
            cardImage = "unit-card-gold.png";
        }
        if  (!isGold || (isGold && PRINT_GOLD)) {
            return <div className="card-container">
                <img className="portrait-image" src=""></img>
                <div className="title-text">{this.props.name}</div>
                <div className="cost-text">{this.props.cost}</div>
                <div className="type-text">{this.props.type} - {this.props.subtype}</div>
                <div className="description-text">{this.props.description}</div>
                <div className="move-text">{this.props.move}</div>
                <div className="health-text">{this.props.health}</div>
                <div className="value-text">{this.props.value}</div>
                <div className="attack-text">{this.props.attack}</div>
                <img className="card-image" src={cardImage}></img>

            </div>;
        }
    }
}

