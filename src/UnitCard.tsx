import React, { RefObject } from "react";
import { PRINT_GOLD } from "./consts";
import {exportComponentAsPNG} from "react-component-export-image"
import exportAsImage from "./exportAsImage";

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
    private myRef = React.createRef<HTMLDivElement>();
    render() {
        let isGold = this.props.value === "G"
        let cardImage = "unit-card.png";
        if (this.props.value === "G") {
            cardImage = "unit-card-gold.png";
        }
        // TODO parse out `|`s in the health of units to mark injury status
        if  (!isGold || (isGold && PRINT_GOLD)) {
            // TODO update this to instead create a single button that allows the download of all card images as a zip
            return <div><button onClick={() => exportAsImage(this.myRef.current!!, "test.png")}>
            Export As PNG</button><div ref={this.myRef} className="card-container">
                <img className="portrait-image" src=""></img>
                <div className="title-text">{this.props.name}</div>
                <div className="cost-text">{this.props.cost}</div>
                <div className="type-text">{this.props.type} - {this.props.subtype}</div>
                <div className="description-text">{this.props.description}</div>
                <div className="move-text">{this.props.move}</div>
                <img className="injury-marker-1" src="injury-marker.png"></img>
                <img className="injury-marker-2" src="injury-marker.png"></img>
                <div className="injury-marker-text-1">4</div>
                <div className="injury-marker-text-2">2</div>
                <div className="health-text">{this.props.health}</div>
                <div className="value-text">{this.props.value}</div>
                <div className="attack-text">{this.props.attack}</div>
                <img className="card-image" src={cardImage}></img>
            </div>

          </div>;
        }
    }
}

