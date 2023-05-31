import _ from "lodash";
import React from "react";
import { toLiteral } from "../../../../helper/locale-utils";
import { checkIfFunction } from "../../../../helper/object-helper";

interface IStatusText {
  type: string;
  class: string;
  text: string;
  icon?: string;
}
export interface IProps {
  onClick: Function;
  isLoading?: boolean;
  totalErrors: number;
  emptyFormat?: boolean;
}

export interface IState {
  display: boolean;
  hasAnalize: boolean;
}

class WysiwygInclusiveInfomation extends React.Component<IProps, IState> {
  timeout: any;
  constructor(props: any) {
    super(props);
    this.state = {
      display: true,
      hasAnalize: false,
    };
  }
  componentDidUpdate(prevProps: any) {
    if (!this.state.hasAnalize && prevProps.isLoading === undefined && _.isBoolean(this.props.isLoading)) {
      this.setState({ hasAnalize: true });
    }
    // Reset show text
    if (prevProps.isLoading !== this.props.isLoading || prevProps.totalErrors !== this.props.totalErrors) {
      // Clean and show
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.setState({ display: true }, () => {
        // Hide text when change from loading true to false and have errors
        if (this.props.isLoading === false) {
          this.timeout = setTimeout(() => {
            this.setState({ display: false });
          }, 3000);
        }
      });
    }
  }

  getStatusText(): IStatusText {
    const statusText = { type: "", class: "", text: "", icon: "" };
    if (this.props.isLoading) {
      statusText.type = "analizing";
      statusText.class = "status-warning";
      statusText.text = "Analizing";
      statusText.icon = "far bold fa-sync-alt";
    } else if (this.props.totalErrors > 0) {
      statusText.type = "insights";
      statusText.class = "status-warning";
      statusText.text = "Insights found ";
      statusText.icon = this.getClassErrors();
    } else if (this.props.totalErrors === 0) {
      statusText.type = "correct";
      statusText.class = "status-ok";
      statusText.text = "Text ok";
      statusText.icon = "far bold fa-check-circle";
    }
    return statusText;
  }

  getClassErrors(): string {
    let iconClass = "far fa-number-insights";
    if (this.props.totalErrors >= 10) {
      iconClass += " small-number";
    }
    return iconClass;
  }

  render() {
    const statusText = this.state.hasAnalize ? this.getStatusText() : ({} as IStatusText);
    return (
      <>
        {statusText.text && (
          <div className={`editor-inclusive-status-text ${statusText.class} ${this.props.emptyFormat ? "top-150" : ""}`} onClick={(e) => checkIfFunction(this.props.onClick) && this.props.onClick(e)}>
            <span className={`editor-inclusive-status-text-info ${!this.state.display ? "hide" : ""}`}>{toLiteral({ id: statusText.text })}</span>
            {statusText.icon && (
              <i className={`editor-inclusive-status-icon ${statusText.icon}`} title={toLiteral({ id: "Tooltip.total.findings" })}>
                {statusText.type === "insights" && this.props.totalErrors}
              </i>
            )}
          </div>
        )}
      </>
    );
  }
}
export default WysiwygInclusiveInfomation;
