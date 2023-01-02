import React from "react";

export type StratagemCardProps = {
    name: string
    cost: string
    type: string
    subtype: string
    description: string
    value: string
}


export class StratagemCard extends React.Component<StratagemCardProps> {
    render() {
        let typeLineText = this.props.type;
        if (this.props.subtype && this.props.subtype.length > 0) {
            typeLineText += " - " + this.props.subtype;
        }
        console.log(this.props.subtype)
        return <div className="card-container">
            <img className="portrait-image" src="musk-portrait.png"></img>
            <div className="title-text">{this.props.name}</div>
            <div className="cost-text">{this.props.cost}</div>
            <div className="type-text">{typeLineText}</div>
            <div className="description-text">{this.props.description}</div>
            <div className="value-text">{this.props.value}</div>
            <img className="card-image" src="stratagem-card.png"></img>

        </div>;
    }
}

