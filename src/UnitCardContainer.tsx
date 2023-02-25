import React from "react";
import { SHOULD_PRINT } from "./consts";
import exportAsImage from "./exportAsImage";
import { UnitCard, UnitCardProps } from "./UnitCard";

export type UnitCardContainerProps = {
   cards: UnitCardProps[]
}


export class UnitCardContainer extends React.Component<UnitCardContainerProps> {
    private cardRefs: Map<string, React.RefObject<HTMLDivElement>>; 

    constructor(props: UnitCardContainerProps) {
        super(props);
        this.cardRefs = new Map<string, React.RefObject<HTMLDivElement>>();
    }
    
    // use an arrow function here to ensure that `this` refers to the container class, not the 
    // unit card class
    refCallback = (key: string, ref:  React.RefObject<HTMLDivElement>) => {
      this.cardRefs.set(key, ref);
    }

    componentDidMount(): void {
        console.log(this.cardRefs + " is the stuff after everything is mounted");
        this.cardRefs.forEach((card, key) => {
            if (card.current !== null) {
                if(SHOULD_PRINT) {
                    exportAsImage(card.current!, "card " + key);
                }
            }
        })
    }

    render() {
        let propsIndex = 0;
        return <React.StrictMode>
        <div className="card-grid">
          {this.props.cards.map(unitData => {
            if (unitData.name !== "") {
                unitData.refCallback = this.refCallback;
                return <UnitCard key={unitData.name} {...unitData} />;
            }
          }
          )}
        </div>
      </React.StrictMode>
    }
}