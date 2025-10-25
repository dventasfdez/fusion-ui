import React, { Component, SyntheticEvent } from "react";
import { SwitchInput } from "../../forms";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Dropdown, { DropdownButton, DropdownMenu } from "../../dropdown/dropdown";

const SortableItem: React.FC<{
  item: any;
  index: number;
  onToggle: (item: any, e: SyntheticEvent) => void;
}> = ({ item, onToggle }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.columnKey });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: "none",
    background: isDragging ? "var(--backgrounds-02)" : "",
  };

  return (
    <li
      className={`table-configuration-item dropdown-item-icon ${item.title ? "" : "hidden"}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <span className="material-icons">drag_indicator</span>
      <SwitchInput
        small
        checked={typeof item.displayed === "undefined" || item.displayed === true}
        label={item.title}
        value={item.columnKey}
        onChange={(e: any) => onToggle(item, e)}
      />
    </li>
  );
};

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

  onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const currentState: any = this.state;
    const fromIndex = currentState.columns.findIndex((c: any) => c.columnKey === active.id);
    const toIndex = currentState.columns.findIndex((c: any) => c.columnKey === over.id);
    if (fromIndex === -1 || toIndex === -1) return;

    const columns = this.reorder(currentState.columns, fromIndex, toIndex);
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
            <DndContext onDragEnd={this.onDragEnd} collisionDetection={closestCenter}>
              <SortableContext
                items={(currentState.columns || []).map((c: any) => c.columnKey)}
                strategy={verticalListSortingStrategy}
              >
                {currentState.columns &&
                  currentState.columns?.map((item: any, index: number) => (
                    <SortableItem key={item.columnKey} item={item} index={index} onToggle={(it, e) => this.onToggle(it, e)} />
                  ))}
              </SortableContext>
            </DndContext>
          </ul>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default TableConfigurationDropdown;
