import React, { Component } from "react";

interface FiltersProps {
  formRef: React.MutableRefObject<any>;
  values: any;
  change: any;
  children: any;

  handleClearFilters: Function;
}

class Filters extends Component<FiltersProps> {
  componentDidUpdate() {}

  onClickClearFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.handleClearFilters(e);
  };

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {
        /*  showSidebarFilters: this.props.showSidebarFilters, */
        triggerfieldchange: this.props.change,
        values: this.props.values,
      })
    );
    return <>{childrenWithProps}</>;
  }
}

export default Filters;
