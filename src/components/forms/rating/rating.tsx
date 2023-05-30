import React from "react";
import BaseInput from "../base-input";
import { FormContext } from "../form";
import HiddenInput from "../hidden-input";

//   /**
//    * Define amount of stars
//    */
//   amount: number;
//   /**
//    * Define on rate callback
//    */
//   onRate: (amount: number) => void;
//   /**
//    * Label for the rating
//    */
//   ratingLabel?: { left: string; right: string };

class Rating extends BaseInput {
  type = "Rating";

  handleRateChange = (rate: number) => {
    this.setState({ value: rate.toString() });
    this.props.onRate(rate);
  };
  render() {
    return (
      <div className={`rating ${this.props.className}`}>
        <div className="rating-container">
          {Array.from({ length: this.props.amount + 1 }, (_, i) => (
            <button className={`rating-button ${this.state.value === i.toString() ? "active" : ""}`} type="button" key={i + "rating-button"} onClick={() => this.handleRateChange(i)}>
              {i}
            </button>
          ))}
        </div>
        <HiddenInput placeholder={this.props.placeholder} name={this.props.name} value={this.state.value} />
        {this.props.ratingLabel && (
          <div className="rating-label">
            <small>{this.props.ratingLabel?.left}</small>
            <small>{this.props.ratingLabel?.right}</small>
          </div>
        )}
      </div>
    );
  }
}

Rating.contextType = FormContext;

export default Rating;
