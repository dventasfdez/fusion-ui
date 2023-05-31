import React, { Component } from "react";

interface FiltersSummaryProps {
  filterValues: any;
  clearFieldValue: Function;
}
class FiltersSummary extends Component<FiltersSummaryProps> {
  handleRenderArray = (filterKey: any, value: any) => {
    const allSpans: any[] = [];
    if (value && value.length) {
      value.forEach((item: any) => {
        const data = [filterKey, item];
        const textToShow = typeof item === "string" ? item : JSON.stringify(item);
        allSpans.push(
          <div key={filterKey + item} className="chip-item">
            <button type="button" onClick={(e) => this.props.clearFieldValue(data)} data-key={""} className="chip">
              {filterKey}: <strong>{textToShow}</strong>
              <span className="material-icons right">close</span>
            </button>
          </div>
        );
      });
    }

    return allSpans;
  };

  render() {
    const arr = [];
    if (this.props.filterValues) {
      for (let key in this.props.filterValues) {
        if (this.props.filterValues.hasOwnProperty(key)) {
          const value = this.props.filterValues[key];
          if (key && key.indexOf("_label") === -1) {
            if (value) {
              if (typeof value === "object") {
                arr.push(this.handleRenderArray(key, value));
              } else {
                arr.push(
                  <div key={key} className="chip-item">
                    <button
                      type="button"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.props.clearFieldValue((e.currentTarget.attributes as any)["data-key"].value)}
                      data-key={key}
                      className="chip"
                    >
                      {key}: <strong>{typeof value === "string" ? value : JSON.stringify(value).replace(/(['"])/g, "")}</strong>
                      <span className="material-icons right">close</span>
                    </button>
                  </div>
                );
              }
            }
          }
        }
      }
      return <div className="chips-group">{arr}</div>;
    }
    return null;
  }
}

export default FiltersSummary;
