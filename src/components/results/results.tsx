import _ from "lodash";
import React, { Component } from "react";

import { serializeForm } from "../forms/utilities/serialize";
import { objectIsClearOrEmpty } from "../../utilities/objects";
import { objectToQueryString, queryStringToObject } from "../../utilities/url";
import { FiltersResults, ResultsI } from "./constants";

import { Form } from "../forms";
// import { LoadingMessage } from "../messages";
import Filters from "./filters/filters";
import GridView from "./viewHandler/gridView/grid-view";
import FiltersSummary from "./filters/filters-summary/filters-summary";
import TableConfiguration from "./table-configuration/table-configuration";
import Paginator from "../paginator/paginator";
import Notification, { NotificationBody, NotificationHeader } from "../notification/notification";
import Loader from "../loader/loader";

export const ResultsContext = React.createContext({});

interface ResultsProps {
  clientFiltering?: boolean; //if you want to do the filtering on the client side and not the backend
  defaultColumns: any[]; //the list of all the possible colums
  columns: any[]; //the list of collumns that the user has selected to show
  fetchResults: Function; //the function that retrieves the data that will be displayed in the results
  filterOnChange?: boolean; //if you want the results to refresh when any input inside it changes or only when submit is triggered
  updateColumnsConfiguration?: Function; //callback to save the columns configuration
  children?: any; //these are the components dispayed inside the result form but above the table/grid
  renderItems?: Function; //method to override how the result items are rendered
  renderHeader?: Function; //method to override how the header of the table is rendered
  disableURLFilters?: boolean; //disables the URL filters, when a filter changes to add it or not to the URL
  noFiltersNoFetch?: boolean; //if the filters are empty, avoid to fetch the data and leave the table empty
  filterResults?: Function; //function to override the filtering when it's client side
  forceRefresh?: number; //force the refresh of the table, repeating a fetch. Usefull if for instance you modified or removed the data
  refresh?: number; //it's just a number that allow us to refresh, use forceRefresh instead
  defaultFiltersResults?: FiltersResults; //list of default filters when results is mounted
  customClientSideSort?: Function; //to override the shorting if it's client side
  hideTableConfiguration?: boolean; //hides the dropdown that allows the user to change the columns and their order
  hideFiltersSummary?: boolean; //hides the tags that display the selected filters
  itemsPerPage?: number[]; //how many items are in each page (for rendering the pagination)
  disablePagination?: boolean; //removes the pagination
  showTopScroll?: boolean; //shows a scroll bar on the top
  disableFilters?: boolean; //NO IDEA!
  showNestedRow?: boolean; //NO IDEA
}

interface ResultsState {
  results?: ResultsI;
  columns: any;
  filters: FiltersResults;
  cachedResults?: any;
  forceRefresh: number;
  refresh?: number;
}

export const defaultFiltersResults = { page: 1, perPage: 10 };

class Results extends Component<ResultsProps, ResultsState> {
  private _isValid = true;
  private _isMounted = false;
  private clientFiltering = this.props.clientFiltering;
  private filtersFormRef: React.RefObject<any> = React.createRef();

  constructor(props: ResultsProps) {
    super(props);
    this.state = {
      results: undefined,
      columns: [...this.props.columns],
      filters: this.getInitialFilters(),
      cachedResults: null,
      forceRefresh: this.props.forceRefresh || 0,
      refresh: this.props.refresh,
    };
    this.clientFiltering = this.props.clientFiltering;
    this.changeColumns = this.changeColumns.bind(this);
  }

  componentDidMount() {
    this.checkPageConfiguration("componentDidMount");
    this.fetchResultThenUpdate("fetchResultThenUpdate on mount");

    window?.addEventListener("popstate", (e) => {
      this.setStateBasedOnURL();
    });
  }
  async componentDidUpdate(prevProps: ResultsProps, prevState: ResultsState) {
    this.checkPageConfiguration("componentDidUpdate");
    if (
      this._isValid &&
      (JSON.stringify(prevProps.defaultColumns) !== JSON.stringify(this.props.defaultColumns) ||
        JSON.stringify(this.state.filters) !== JSON.stringify(prevState.filters) ||
        prevState.forceRefresh !== this.state.forceRefresh ||
        prevState.refresh !== this.state.refresh)
    ) {
      if (this.clientFiltering && (prevState.forceRefresh !== this.state.forceRefresh || prevState.refresh !== this.state.refresh) && this.state.cachedResults !== null) {
        this.setState({ cachedResults: null });
      }
      this.fetchResultThenUpdate("componentDidUpdate");
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    window?.removeEventListener("popstate", (e) => {
      this.setStateBasedOnURL();
    });
  }

  getDefaultFilters = () => {
    return this.props.defaultFiltersResults || { page: 1, perPage: 10 };
  };

  getInitialFilters() {
    let initialFilters = window?.location.search ? queryStringToObject(window?.location.search) : this.getDefaultFilters();

    if (!this.props.disableURLFilters || !window?.location.search) {
      if (!this.props.disableURLFilters) objectToQueryString(initialFilters);
    }
    return initialFilters;
  }

  checkPageConfiguration(_origin: string) {
    if (this.props.forceRefresh && this.props.forceRefresh !== this.state.forceRefresh) {
      const newFilters = this.getDefaultFilters();
      this.setState({
        forceRefresh: this.props.forceRefresh,
        filters: newFilters,
        results: undefined,
        columns: this.props?.columns,
      });
      if (!this.props.disableURLFilters) {
        objectToQueryString(newFilters);
      }
    }
    if (this.props.refresh !== this.state.refresh) {
      const newFilters = this.state?.filters || this.getDefaultFilters();
      this.setState({
        refresh: this.props.refresh,
        filters: newFilters,
        results: undefined,
      });
      if (!this.props.disableURLFilters) {
        objectToQueryString(newFilters);
      }
    }
  }

  setStateBasedOnURL() {
    if (!this.props.disableURLFilters) {
      if (this._isMounted) {
        const filtersNS: FiltersResults | undefined = window?.location.search
          ? queryStringToObject(window?.location.search)
          : this.props.defaultFiltersResults
          ? this.props.defaultFiltersResults
          : defaultFiltersResults;
        if (this.state.filters !== filtersNS) {
          this.setState({ filters: filtersNS });
        }
      }
    }
    this.validateForm();
  }

  checkIfDataIsFetched() {
    return this.state.columns ? true : false;
  }
  fetchResultThenUpdate = async (_origin: string) => {
    if (this.state.results) {
      this.setState({ results: undefined });
    }
    // luck await and sync setstate
    await this.validateForm();
    if (!(this.props.noFiltersNoFetch && this._isValid && objectIsClearOrEmpty(this.state.filters))) {
      //validate request query String perPage is not bigger than supported
      const filterPerPage = Math.min(this.state.filters?.perPage || 10);
      const stateFilters = { ...this.state.filters, perPage: filterPerPage };
      if (!this.clientFiltering) {
        this.props.fetchResults(stateFilters).then((response: ResultsI) => {
          const filtersAfterFetch = response?.count ? stateFilters : { ...stateFilters, page: 1 };
          if (!response?.count && stateFilters?.page !== 1) {
            //if no results, try page 1
            this.setState({ filters: filtersAfterFetch }, () => {
              this.fetchResultThenUpdate("fetchResultThenUpdate retry");
            });
          } else {
            this.setState({ results: response }, () => {
              if (!this.props.disableURLFilters) {
                objectToQueryString(filtersAfterFetch);
              }
            });
          }
        });
      } else {
        this.fetchAndCacheResults(stateFilters);
      }
    }
  };
  fetchAndCacheResults = (filters: FiltersResults) => {
    if (!this.state.cachedResults) {
      this.props.fetchResults(filters).then((response: ResultsI) => {
        this.filterAndPaginated(filters, response);
      });
    } else if (this.state.cachedResults) {
      this.filterAndPaginated(filters, this.state.cachedResults);
    }
  };

  filterAndPaginated = (filters: FiltersResults, response: any) => {
    if (filters && filters.sortBy && filters.sortDirection) {
      this.sortClientSide(filters.sortBy, filters.sortDirection, response);
    } else {
      this.paginationClientSide(response);
    }
  };
  onHandleClickPage = (page: number) => {
    this.setState({ filters: { ...this.state.filters, page: page } }, () => {
      if (!this.props.disableURLFilters) {
        objectToQueryString({ ...this.state.filters, page: page });
      }
    });
  };
  paginationClientSide = (response: ResultsI) => {
    let paginatedResults = { ...response };
    if (response) {
      let resultsFilter = response.data;
      const otherFilters: any = {};
      Object.keys(this.state.filters).forEach((key: string) => {
        if (key !== "page" && key !== "perPage" && key !== "sortBy" && key !== "sortDirection" && this.state.filters[key] !== "") {
          otherFilters[key] = this.state.filters[key];
        }
      });
      if (Object.keys(otherFilters).length && this.props.filterResults) {
        resultsFilter = this.props.filterResults(otherFilters, resultsFilter, this.state.columns);
        paginatedResults = { count: resultsFilter.length, data: resultsFilter };
      }
      if (this.state && this.state.filters && this.state?.filters?.page && this.state.filters.perPage) {
        const start = this.state.filters ? this.state?.filters?.page * this.state.filters.perPage - this.state.filters.perPage : 0;
        const end = this.state.filters ? this.state?.filters?.page * this.state.filters.perPage : 0;
        paginatedResults.data = paginatedResults.data ? paginatedResults.data.slice(start, end) : paginatedResults.data;
      } else {
        const _page = 1;
        const _perPage = this.props.disablePagination ? paginatedResults?.count : 10;
        this.setState({ filters: { ...this.state.filters, page: _page, perPage: _perPage } });
        const start = this.state.filters ? _page * _perPage - _perPage : 0;
        const end = this.state.filters ? _page * _perPage : 0;
        paginatedResults.data = paginatedResults.data ? paginatedResults.data.slice(start, end) : paginatedResults.data;
      }
      this.setState({
        results: paginatedResults,
        cachedResults: response,
      });
    }
  };

  changeSortBy = (value: string, direction: string) => {
    this.setState({ filters: { ...this.state.filters, sortBy: value, sortDirection: direction } });
    if (!this.props.disableURLFilters) {
      objectToQueryString({ ...this.state.filters, sortBy: value, sortDirection: direction });
    }
  };
  sortClientSide = (value: any, direction: any, response: any) => {
    if (response && response.data) {
      let result = response;
      result.data = typeof this.props.customClientSideSort === "function" ? this.props.customClientSideSort(result.data, value, direction) : this.sortData(result.data, value, direction);
      this.paginationClientSide(result);
    }
  };
  sortData = (data: any[], value: any, direction: any) => {
    return data.sort((a, b) => {
      let nameA = a[value],
        nameB = b[value];
      const valueA = nameA && typeof nameA === "object" ? nameA.label : nameA;
      const valueB = nameB && typeof nameB === "object" ? nameB.label : nameB;
      if (direction === "asc") {
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
      } else {
        if (valueA > valueB) return -1;
        if (valueA < valueB) return 1;
      }
      return 0;
    });
  };

  changeColumns(items: any) {
    this.setState({ columns: items });
  }
  updateColumnsWidth = (columnsWidthData: any[]) => {
    let newColumnsSet = [...this.state.columns];
    let newColumn = {};
    newColumnsSet.forEach((column, index) => {
      let thisColumn = columnsWidthData.find((a: any) => a.columnKey === column.columnKey);
      if (thisColumn) {
        newColumn = { ...column, width: thisColumn.width };
      } else {
        newColumn = column;
      }
      newColumnsSet[index] = newColumn;
    });
    this.setState({ columns: newColumnsSet });
  };

  serializeFormMapValues = (formValues: any) => {
    const serializeFormValues = serializeForm(formValues, true);
    return this.parserFormValues(serializeFormValues);
  };
  parserFormValues = (serializeFormValues: any) => {
    let parserFormValues: FiltersResults = {};
    Object.keys(serializeFormValues).forEach((formKey: string) => {
      if (formKey === "page" || formKey === "perPage") {
        parserFormValues[formKey] = parseInt(serializeFormValues[formKey]);
      } else {
        parserFormValues[formKey] = serializeFormValues[formKey];
      }
    });
    return parserFormValues;
  };
  validateForm = async () => {
    this._isValid = this.filtersFormRef && this.filtersFormRef.current ? await this.filtersFormRef.current.isValid() : true;
  };
  handleSubmitAdvanced = async (e: any) => {
    this._isValid = await (this.filtersFormRef && this.filtersFormRef.current ? this.filtersFormRef.current.isValid() : true);
    if (this._isValid) {
      const formValues = this.serializeFormMapValues(e.target);
      //only keep the filters from the state
      const filtersToRetain: FiltersResults = {};
      if (this.props.defaultFiltersResults) {
        Object.keys(this.props.defaultFiltersResults).forEach((keyDeafultProps: string) => {
          filtersToRetain[keyDeafultProps] = this.state?.filters[keyDeafultProps];
        });
      } else {
        Object.keys({ page: 1, perPage: 10 }).forEach((keyDeafult: string) => {
          filtersToRetain[keyDeafult] = this.state?.filters[keyDeafult];
        });
      }
      //Reset page
      if (!this.props.disablePagination) filtersToRetain["page"] = 1;
      const newFilters = { ...filtersToRetain, ...formValues };
      this.setState({ filters: newFilters }, () => {
        if (!this.props.disableURLFilters) {
          objectToQueryString({ ...this.state.filters, ...formValues });
        }
      });
    }
  };

  handleOnChange = async () => {
    this._isValid = await (this.filtersFormRef && this.filtersFormRef.current ? this.filtersFormRef.current.isValid() : true);
    if (this._isValid) {
      const formValues = this.parserFormValues(this.filtersFormRef.current.serialize());
      const filtersToRetain: FiltersResults = {
        ...this.state?.filters,
        page: this.props.disablePagination ? undefined : 1,
      };
      const newFilters = { ...filtersToRetain, ...formValues };
      if (JSON.stringify(newFilters) !== JSON.stringify(this.state.filters)) {
        this.setState({ filters: newFilters }, () => {
          if (!this.props.disableURLFilters) {
            objectToQueryString(newFilters);
          }
        });
      }
    }
  };

  clearFieldValue = (key: string) => {
    let value = _.cloneDeep(this.state.filters);
    if (Array.isArray(key) && value[key[0]]) {
      const index = value[key[0]].indexOf(key[1]);
      if (index > -1) {
        value[key[0]].splice(index, 1);
      }
      if (!Object.keys(value[key[0]]).length) {
        delete value[key[0]];
      }
      if (value[key[0]].length === 1) {
        value[key[0]] = value[key[0]][0];
      }
    } else {
      delete value[key];
    }
    value.page = this.props.disablePagination ? undefined : 1;
    this.setState({ filters: value }, () => {
      // if (!this.props.disableURLFilters) {
      //   objectToQueryString(value, this.props.history);
      // }
    });
  };
  getFiltersTable = () => {
    let tableFilters: FiltersResults = {};
    if (this.state.filters) {
      Object.keys(this.state.filters).forEach((filterKey: string) => {
        if (filterKey !== "page" && filterKey !== "perPage") {
          tableFilters[filterKey] = this.state.filters[filterKey];
        }
      });
    }
    return tableFilters;
  };

  getPages = (count: number, perPage: number) => {
    let pages = Math.trunc(count / perPage);
    const rest = count % perPage;
    if (rest) return pages + 1;
    return pages;
  };

  render() {
    if (this.checkIfDataIsFetched()) {
      const _currentFiltersTable = this.getFiltersTable();
      const resultsCountDefined = this.state.results?.count !== null && this.state.results?.count !== undefined;
      const displayedColumns =
        typeof this.state.columns === "object" && this.state.columns.length ? this.state.columns.filter((e: any) => typeof e.displayed === "undefined" || e.displayed === true) : this.state.columns;

      let pages = 1;
      if (this.state.results && resultsCountDefined) {
        pages = this.getPages(this.state.results.count, this.state.filters.perPage || 10);
      }

      return (
        <ResultsContext.Provider value={this}>
          <div className="data-table-wrapper results">
            {this.props?.disableFilters ? (
              <GridView
                results={this.state.results}
                columns={displayedColumns}
                sortBy={this.state.filters?.sortBy}
                sortDirection={this.state.filters?.sortDirection}
                changeSortBy={this.changeSortBy}
                updateColumnsConfiguration={this.updateColumnsWidth}
                renderHeader={this.props.renderHeader}
                renderItems={this.props.renderItems}
                // tableId={this.props.tableId}
                showTopScroll={this.props.showTopScroll}
              />
            ) : (
              <Form
                name="filtersForm"
                id="filtersForm"
                className="results-wrapper"
                loading={typeof this.state?.results === "undefined"}
                onSubmit={this.handleSubmitAdvanced}
                onChange={this.props.filterOnChange ? this.handleOnChange : undefined}
                values={this.state.filters}
                noValidate
                ref={this.filtersFormRef}
                debounceTimer={1000}
              >
                <Filters change={null} values={_currentFiltersTable} handleClearFilters={this.clearFieldValue} formRef={this.filtersFormRef}>
                  {this.props.children}
                </Filters>

                {(this.props.hideFiltersSummary !== true || this.props.hideTableConfiguration !== true) && (
                  <div className="results-summary-container">
                    {this.props.hideFiltersSummary !== true && <FiltersSummary filterValues={_currentFiltersTable} clearFieldValue={this.clearFieldValue} />}
                    {this.props.hideTableConfiguration !== true && <TableConfiguration changeColumns={this.changeColumns} columns={this.state.columns} defaultColumns={this.props.columns} />}
                  </div>
                )}

                <GridView
                  results={this.state.results}
                  columns={displayedColumns}
                  sortBy={this.state.filters?.sortBy}
                  sortDirection={this.state.filters?.sortDirection}
                  changeSortBy={this.changeSortBy}
                  updateColumnsConfiguration={this.updateColumnsWidth}
                  renderHeader={this.props.renderHeader}
                  renderItems={this.props.renderItems}
                  // tableId={this.props.tableId}
                  showTopScroll={this.props.showTopScroll}
                />

                {this._isValid && resultsCountDefined && !this.props.disablePagination && (
                  <Paginator
                    className="data-table-paginator"
                    pages={pages}
                    onChangePage={this.onHandleClickPage}
                    defaultPage={this.state.filters.page ? this.state.filters.page : 1}
                    collapsed={pages >= 100}
                    collapsedOptions={{ jump: "all" }}
                    truncate={pages < 100 ? "all" : undefined}
                  />
                )}
              </Form>
            )}
          </div>
        </ResultsContext.Provider>
      );
    } else {
      return (
        <Notification show info icon={<Loader spinner />}>
          <NotificationHeader>PONER</NotificationHeader>
          <NotificationBody>LOADING</NotificationBody>
        </Notification>
      );
    }
  }
}
export default Results;
