import React, { Component } from "react";
interface IFormStep {
  [others: string]: any;
}
export default class FormStep extends Component<IFormStep> {
  render() {
    return <>{this.props.children}</>;
  }
}
