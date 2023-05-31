import React from "react";
import { IInsight } from "../../../../helper/inclusive-insights-helper";
import { toLiteral } from "../../../../helper/locale-utils";

import helpWYSIWYG from "../../../candidate-sourcing/tenantsData/wysiwygHelp";

interface IHelpInsight {
  description: string;
  notAllowed: string;
  allowed: string;
}

export interface IProps {
  error?: IInsight;
}

export interface IState {}

class WysiwygInclusiveHelp extends React.Component<IProps, IState> {
  getExample(): IHelpInsight {
    let help: IHelpInsight = { description: "", notAllowed: "", allowed: "" };
    if (this.props.error?.info) {
      const helpTexts = helpWYSIWYG as any;
      const info = this.props.error.info.toLowerCase();
      if (helpTexts && helpTexts[info]) {
        help = (helpWYSIWYG as any)[info];
      }
    }
    return help;
  }
  render() {
    const example = this.getExample();
    return (
      <>
        <div className="inclusive-help-text">
          <div className="inclusive-help-desc">{toLiteral({ id: example.description })}</div>
          {(example.allowed || example.notAllowed) && (
            <div className="inclusive-help-example">
              <div className="inclusive-help-example-title mt-2">{toLiteral({ id: "Example" })}:</div>
              <div className="inclusive-help-example-phrases">
                <div className="inclusive-help-example-text inclusive-help-example-ko">
                  <div className="inclusive-help-icon">
                    <i className="fas fa-times-circle"></i>
                  </div>
                  <div>
                    <span>{toLiteral({ id: "Not allowed" })}: </span>
                    <span>"{toLiteral({ id: example.notAllowed })}"</span>
                  </div>
                </div>
                <div className="inclusive-help-example-text inclusive-help-example-ok">
                  <div className="inclusive-help-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div>
                    <span>{toLiteral({ id: "Allowed" })}: </span>
                    <span>"{toLiteral({ id: example.allowed })}"</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
export default WysiwygInclusiveHelp;
