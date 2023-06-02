import React, { Component, SyntheticEvent } from "react";
import { SwitchInput } from "../../forms";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Dropdown, { DropdownButton, DropdownMenu } from "../../dropdown/dropdown";

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  userSelect: "none",
  background: isDragging ? "var(--backgrounds-02)" : "",
  ...draggableStyle,
});

interface TableConfigurationProps {
  columns: any[];
  defaultColumns: any[];
  changeColumns: Function;
  handleResetTable?: Function;
}
export interface IState {
  [others: string]: any;
}
class TableConfigurationDropdown extends Component<TableConfigurationProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      defaultColumns: this.props.defaultColumns,
      columns: this.props.columns,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result: any) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const currentState: any = this.state;
    const columns = this.reorder(currentState.columns, result.source.index, result.destination.index);

    this.changeColumns(columns);
  }

  onToggle(item: any, e: SyntheticEvent) {
    const self = this;

    if (typeof item.displayed === "undefined" || item.displayed === true) {
      item.displayed = false;
    } else {
      item.displayed = true;
    }
    const currentState: any = self.state;
    const columns = currentState?.columns;
    const indexOfElementToReplace = currentState?.columns?.findIndex((el: any) => el.columnKey === item.columnKey);
    if (indexOfElementToReplace !== -1) {
      columns[indexOfElementToReplace] = item;
    }

    this.changeColumns(columns);
  }

  changeColumns(columns: any) {
    const self = this;
    this.setState(
      {
        columns,
      },
      function () {
        if (typeof self.props.changeColumns === "function") {
          self.props.changeColumns(columns);
        }
      }
    );
  }

  reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  render() {
    const currentState: any = this.state;
    return (
      <Dropdown className="mla" keepShown>
        <DropdownButton className="toggle-table-view">
          <span className="material-icons">table_view</span>
          Table View
        </DropdownButton>
        <DropdownMenu>
          <ul>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provide) => (
                  <div {...provide.droppableProps} ref={provide.innerRef}>
                    {currentState.columns &&
                      currentState.columns?.map((item: any, index: number) => (
                        <Draggable key={item.columnKey} draggableId={item.columnKey} index={index}>
                          {(provided, snapshot) => (
                            <li
                              className={`table-configuration-item dropdown-item-icon ${item.title ? "" : "hidden"}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            >
                              <span className="material-icons">drag_indicator</span>

                              <SwitchInput
                                small
                                checked={typeof item.displayed === "undefined" || item.displayed === true}
                                label={item.title}
                                value={item.columnKey}
                                onChange={(e: any) => this.onToggle(item, e)}
                              />
                            </li>
                          )}
                        </Draggable>
                      ))}
                    {provide.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </ul>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default TableConfigurationDropdown;
