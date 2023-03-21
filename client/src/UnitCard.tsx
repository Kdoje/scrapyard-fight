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
    index: number
    refCallback: (key: string, ref: React.RefObject<HTMLDivElement>) => void
}


export class UnitCard extends React.Component<UnitCardProps> {
    private myRef: React.RefObject<HTMLDivElement>;
    constructor(props: UnitCardProps) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount(): void {
        this.props.refCallback(this.props.name, this.myRef!);
    }

    render() {
        let isGold = this.props.value === "G"
        let cardImage = "unit-card.png";
        if (this.props.value === "G") {
            cardImage = "unit-card-gold.png";
        }

        let injuryMarkers: JSX.Element[] = []
        let healthValues = this.props.health.split('|');
        let initialHealth = healthValues[0];
        if (healthValues.length > 1) {
            console.log("health meets params");
            const imageClassNameBase = "injury-marker-";
            const textClassNameBase = "injury-marker-text-"
            healthValues.map((curHealth, index) => {
                if (index >= 1) { 
                    injuryMarkers.push(<img key={"marker-" + index} className={imageClassNameBase + index} src="injury-marker.png"></img>)
                    injuryMarkers.push(<div key={"marker-text-" + index} className={textClassNameBase + index}>{curHealth}</div>)
                }
            })
        }

        // TODO parse out `|`s in the health of units to mark injury status
        if (!isGold || (isGold && PRINT_GOLD)) {
            // TODO update this to instead create a single button that allows the download of all card images as a zip
            let elt = <div ref={this.myRef} className="card-container">
                <img className="portrait-image" src=""></img>
                <div className="title-text">{this.props.name}</div>
                <div className="cost-text">{this.props.cost}</div>
                <div className="type-text">{this.props.type} - {this.props.subtype}</div>
                <div className="description-text">{this.props.description}</div>
                <div className="move-text">{this.props.move}</div>
                {injuryMarkers.map(marker => marker)}
                <div className="health-text">{initialHealth}</div>
                <div className="value-text">{this.props.value}</div>
                <div className="attack-text">{this.props.attack}</div>
                <img className="card-image" src={cardImage}></img>
            </div>;
           
            return elt;
        }
    }
}

