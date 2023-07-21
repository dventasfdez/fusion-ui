import React, { Component } from "react";
export interface IProps {
  [others: string]: any;
}
export default class Selections extends Component<IProps> {
  onRemoveItem = (item: any) => {
    this.props.onRemoveItem(item);
  };
  renderOptions() {
    if (this.props.value && this.props.value.length > 0) {
      let options: any[] = [];
      if (this.props.value && typeof this.props.value === "object") {
        this.props.value?.forEach((value: any, index: number) => {
          const item = this.props.items?.find((valueItem: any) => value === valueItem.props?.value);
          if (item) {
            let element = (
              <button
                type="button"
                key={index}
                className="chip_active mb1 mr1"
                disabled={this.props.disabled}
                onClick={() => {
                  this.onRemoveItem(item.props?.value);
                }}
                id={`selected-${item.props?.value}`}
              >
                {item.props?.label}

                <span className="material-icons right">close</span>
              </button>
            );
            if (this.props.value) {
              if ((this.props.value.length && typeof this.props.value === "object" && this.props.value.indexOf(item.props?.value) !== -1) || this.props.value === item.props?.value) {
                options.push(element);
              }
            }
          }
        });
      }

      return options;
    }
    return null;
  }
  render() {
    return <div className="select-bottom-container">{this.renderOptions()}</div>;
  }
}
