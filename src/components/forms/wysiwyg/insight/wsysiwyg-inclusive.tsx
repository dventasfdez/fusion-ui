import _ from "lodash";
import React from "react";
import { IInsight } from "../../../../helper/inclusive-insights-helper";
import { toLiteral } from "../../../../helper/locale-utils";
import { getArrayLength } from "../../../../helper/object-helper";
import { CYCLE_INSIGHT } from "../../../candidate-sourcing/candidate-sourcing-constants";

import WysiwygInclusiveHelp from "./wsyiwyg-inclusive-help";

export interface IProps {
  type: string | undefined;
  errors: IInsight[];
  totalErrors: number;
  helpSeeMore: boolean;
  indexWhenClose: number;
  indexWasChanged: Function;
  clickHelp: Function;
  cycleDimension: Function;
}

export interface IState {
  index: number;
}

class WysiwygInclusiveFooter extends React.Component<IProps, IState> {
  element: React.RefObject<any>;
  cycleToPrevious: boolean = false;

  constructor(props: any) {
    super(props);
    this.state = {
      index: this.getDefaultIndex(),
    };
    this.element = React.createRef();
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    // Reset index when type or errors change
    if (prevProps.type !== this.props.type || !_.isEqual(prevProps.errors, this.props.errors)) {
      let index = 0;
      // In case cycle previous put the last error of new type
      if (this.cycleToPrevious) {
        index = this.props.errors.length - 1;
      }
      this.setIndex(index);
    }
    if (prevProps.type !== this.props.type || prevState.index !== this.state.index) {
      this.scrollIntoView(this.state.index);
    }
    // Reset click anyway
    this.cycleToPrevious = false;
  }

  // Avoid lose index when close
  getDefaultIndex(): number {
    let index = 0;
    // Index it is 0-2 length is 3
    if (this.props.indexWhenClose <= getArrayLength(this.props.errors) - 1) {
      index = this.props.indexWhenClose || 0;
    }
    return index;
  }

  // Scroll into view
  scrollIntoView(index: number) {
    const element = this.element?.current || null;
    const parent = element ? element.closest(".editor-container") : null;
    const fakeTextarea = parent ? parent.querySelector(".editor-content") : null;
    const elementToScroll = fakeTextarea ? fakeTextarea.querySelector(`[data-key="${index}"]`) : null;
    if (elementToScroll) elementToScroll.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }

  // PARENT CALLS
  setIndex(index: number) {
    // Only refresh when change index, index its 0 or more and index less that errors.lenght
    const errorsLenght = getArrayLength(this.props.errors);
    if (index >= 0 && index < errorsLenght && index !== this.state.index) {
      this.setState({ index }, this.indexWasChanged);
    }
  }
  getIndex() {
    return this.state.index;
  }
  indexWasChanged() {
    const index = this.getIndex();
    this.props.indexWasChanged(index);
  }

  // NEXT
  hasNext() {
    return this.props.errors.length - 1 > this.state.index;
  }
  nextText() {
    if (this.hasNext()) {
      const _index = this.hasNext() ? this.state.index + 1 : this.props.errors.length - 1;
      this.setIndex(_index);
    } else {
      this.props.cycleDimension(CYCLE_INSIGHT.NEXT);
    }
  }
  // Previous
  hasPrevious() {
    return this.state.index > 0;
  }
  previousText() {
    if (this.hasPrevious()) {
      const _index = this.hasPrevious() ? this.state.index - 1 : 0;
      this.setIndex(_index);
    } else {
      this.cycleToPrevious = true;
      this.props.cycleDimension(CYCLE_INSIGHT.PREVIOUS);
    }
  }
  getCurrentError() {
    return this.state.index < this.props.errors.length ? this.props.errors[this.state.index] : this.props.errors[this.props.errors.length - 1];
  }

  disabledArrow(type: number) {
    if (type === CYCLE_INSIGHT.PREVIOUS) {
      return !this.hasPrevious() && this.props.totalErrors === this.props.errors.length;
    } else if (type === CYCLE_INSIGHT.NEXT) {
      return !this.hasNext() && this.props.totalErrors === this.props.errors.length;
    }
  }

  render() {
    const error = this.getCurrentError();
    const infoError = toLiteral({ id: error?.info }) || <i>{toLiteral({ id: "Not message" })}</i>;

    return (
      !_.isEmpty(this.props.errors) && (
        <div ref={this.element} className="editor-inclusive editor-container-child">
          <div className="editor-inclusive-text">
            <div className="editor-inclusive-main">
              <div className="editor-inclusive-icon">
                <img src={require("../../../../assets/images/candidate-sourcing/bulb-icon.svg")?.default} alt="suggestion" />{" "}
              </div>
              <div className="editor-inclusive-text-group">
                <div className="editor-inclusive-text-title">
                  <span className="inclusive-type">{toLiteral({ id: `${this.props.type}` })}: </span>
                  <span className="inclusive-text">{infoError}</span>
                </div>
                <div className="inclusive-help-button space" onClick={(e) => this.props.clickHelp(e, !this.props.helpSeeMore)}>
                  {toLiteral({ id: this.props.helpSeeMore ? "See less" : "See more" })}
                </div>
              </div>
              <div className={`editor-inclusive-count ${this.props.errors.length === 1 ? "not-border-right" : ""}`}>
                <div className="editor-inclusive-count-text">
                  {this.state.index + 1}/{this.props.errors.length} {toLiteral({ id: "Insights" })}
                </div>
              </div>
            </div>
            <div>{this.props.helpSeeMore && <WysiwygInclusiveHelp error={error} />}</div>
          </div>
          {this.props.totalErrors > 1 && (
            <div className="editor-inclusive-info">
              <div className="editor-inclusive-navigation">
                <div className={`editor-inclusive-up${this.disabledArrow(CYCLE_INSIGHT.PREVIOUS) ? " disabled" : ""}`} onClick={this.previousText}>
                  <img className="img-icon" src={require("../../../../assets/images/candidate/next.png")?.default} alt="previous" />{" "}
                </div>
                <div className={`editor-inclusive-down${this.disabledArrow(CYCLE_INSIGHT.NEXT) ? " disabled" : ""}`} onClick={this.nextText}>
                  <img className="img-icon" src={require("../../../../assets/images/candidate/next.png")?.default} alt="next" />{" "}
                </div>
              </div>
            </div>
          )}
        </div>
      )
    );
  }
}
export default WysiwygInclusiveFooter;
