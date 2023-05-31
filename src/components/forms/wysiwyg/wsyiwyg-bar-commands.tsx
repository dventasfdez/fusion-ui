import React, { Component } from "react";
import { getBrowserDetails } from "../utilities/devices";
import Dropdown, { DropdownButton, DropdownMenu } from "../../dropdown/dropdown";

export interface ICommandsProps {
  key?: string;
  name?: string;
  type?: string;
  className?: string;
  value?: string;
  disabled?: boolean;
  label?: string;
  errors?: string[];
  validations?: Function[];
  validateOnChange?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  placeholder?: string;
  autoComplete?: string;
  tooltip?: string;
  undo?: boolean;
  redo?: boolean;
  headers?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  justifyLeft?: boolean;
  justifyFull?: boolean;
  justifyCenter?: boolean;
  justifyRight?: boolean;
  indent?: boolean;
  outdent?: boolean;
  unorderedList?: boolean;
  orderedList?: boolean;
  link?: boolean;
  unlink?: boolean;
  image?: boolean;
  table?: boolean;
  customFunction?: Function;
  customCommand?: { title: string; icon: string };
  emptyFormat?: boolean;
}

// PROPS
interface IProps extends ICommandsProps {
  editor?: any;
  onCommandChange?: Function;
}
interface IState {
  tableCol: number;
  tableRow: number;
  tablePicker: JSX.Element;
  enviroment: any;
  buttonSelected: number;
}

const _enviromentData: any = {};

class WysiwygBarCommands extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      tableCol: 0,
      tableRow: 0,
      tablePicker: <table></table>,
      enviroment: _enviromentData,
      buttonSelected: 0,
    };
  }

  componentDidMount() {
    let enviroment: any = getBrowserDetails();
    this.setState({ enviroment: enviroment });
    this.buildTablePicker();
  }

  // BUILD
  buildTablePicker = () => {
    let rows = [];
    for (let i = 0; i < 10; i++) {
      let cols = this.buildCols(i + 1);
      let row = React.createElement("tr", { key: i }, cols);
      rows.push(row);
    }
    const tablePicker = React.createElement("table", {}, React.createElement("tbody", {}, rows));
    this.setState({ tablePicker: tablePicker });
  };
  buildCols = (row: any) => {
    let cols = [];
    for (let i = 0; i < 10; i++) {
      let classTd = "";
      let col = i + 1;
      if (row <= this.state.tableRow && col <= this.state.tableCol) {
        classTd += "td-table-picker selected";
      } else {
        classTd += "td-table-picker";
      }

      let colElement = (
        <td className={classTd} key={i}>
          <button
            type="button"
            className="button-table-picker"
            data-command="insertHTML"
            data-row={row}
            data-col={col}
            onClick={this.clickBtnTableCommand}
            onMouseMove={this.mouseMoveTableGrid}
          ></button>
        </td>
      );
      cols.push(colElement);
    }
    return cols;
  };
  mouseMoveTableGrid = (event: any) => {
    const rows = parseInt(event.currentTarget.dataset.row, 10);
    const cols = parseInt(event.currentTarget.dataset.col, 10);
    this.setState({ tableCol: cols, tableRow: rows, tablePicker: <></> });
    this.buildTablePicker();
  };

  // TABLE COMMANDS
  clickBtnTableCommand = (event: any) => {
    let command = event.currentTarget.dataset.command;
    const rows = parseInt(event.currentTarget.dataset.row, 10);
    const cols = parseInt(event.currentTarget.dataset.col, 10);

    let table = '<table border="1"><tbody>';
    for (let i = 0; i < rows; i++) {
      table += "<tr>";
      for (let j = 0; j < cols; j++) {
        table += "<td></td>";
      }
      table += "</tr>";
    }
    table += "</tbody></tabla>";
    if (this.props.editor?.focus) this.props.editor?.focus();
    document.execCommand(command, false, table);
  };
  clickBtnInsertImageCommand = (event: any) => {
    const enviroment: any = this.state.enviroment;

    const _self = this;
    _self.props.editor?.focus();
    if (enviroment.browser !== "Microsoft Internet Explorer") {
      if (event.currentTarget.files && event.currentTarget.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          if (e.target && e.target.result) {
            document.execCommand("InsertImage", false, e.target.result as string);
            setTimeout(() => {
              const htmlElement: any = document.getElementById(_self.props.name + "_inputImage");
              htmlElement.value = null;
            }, 500);
          }
        };
        reader.readAsDataURL(event.currentTarget.files[0]);
      }
    }
  };

  // BUTTON COMMANDS
  customCommand = (event: any) => {
    this.props.customFunction && this.props.customFunction(event);
  };

  clickBtnCommand = (event: any, key: number) => {
    this.setState({ buttonSelected: key });
    let command = event.currentTarget.dataset.command;
    if (this.props.editor?.focus) this.props.editor.focus();
    if (command === "CreateLink") {
      let link = prompt("Value for link", "");
      if (link) {
        document.execCommand(command, false, link);
      }
    } else {
      if (typeof document.execCommand === "function") {
        document.execCommand(command, false, "");
      }
    }
    this.props.onCommandChange && this.props.onCommandChange(event);
  };

  clickBtnHeadingCommand = (event: any) => {
    let command = `<${event.currentTarget.dataset.command}>`;
    if (this.props.editor?.focus) this.props.editor.focus();
    document.execCommand("formatBlock", false, command);
  };

  renderToolBarButtons = () => {
    let key = 0;
    let controls = [];
    if (this.props.undo === true) {
      controls.push(
        <button type="button" key={key} title="Undo" className="button-secondary small" data-command="undo" onClick={(e: any) => this.clickBtnCommand(e, key)}>
          <span className="material-icons">undo</span>
        </button>
      );
      key++;
    }
    if (this.props.redo === true) {
      controls.push(
        <button type="button" key={key} title="Redo" className="button-secondary small" data-command="redo" onClick={(e: any) => this.clickBtnCommand(e, key)}>
          <span className="material-icons">redo</span>
        </button>
      );
      key++;
    }
    if (this.props.headers === true) {
      controls.push(
        <Dropdown>
          <DropdownButton>
            <button type="button" className="button-secondary small" title="headers">
              <span className="material-icons">title</span>
            </button>
          </DropdownButton>
          <DropdownMenu>
            <ul>
              <li className="dropdown-item" data-command="H1" onClick={this.clickBtnHeadingCommand}>
                H1
              </li>
              <li className="dropdown-item" data-command="H2" onClick={this.clickBtnHeadingCommand}>
                H2
              </li>
              <li className="dropdown-item" data-command="H3" onClick={this.clickBtnHeadingCommand}>
                H3
              </li>
              <li className="dropdown-item" data-command="H4" onClick={this.clickBtnHeadingCommand}>
                H4
              </li>
              <li className="dropdown-item" data-command="H5" onClick={this.clickBtnHeadingCommand}>
                H5
              </li>
              <li className="dropdown-item" data-command="H6" onClick={this.clickBtnHeadingCommand}>
                H6
              </li>
            </ul>
            {/* <button type="button" className="button-secondary small" >
              H1
            </button>
            <button type="button" className="button-secondary small" >
              H2
            </button>
            <button type="button" className="button-secondary small" >
              H3
            </button>
            <button type="button" className="button-secondary small" >
              H4
            </button>
            <button type="button" className="button-secondary small" >
              H5
            </button>
            <button type="button" className="button-secondary small" >
              H6
            </button> */}
          </DropdownMenu>
        </Dropdown>
        // <div className="editor-dropdown-container" key={key}>
        //   <button type="button" className="button-secondary small" title="headers">
        //     <span className="fas fa-heading"></span>
        //   </button>
        //   <div className="editor-dropdown">
        //     <div>
        //       <button type="button" className="btn-secondary small" data-command="H1" onClick={this.clickBtnHeadingCommand}>
        //         <span>H1</span>
        //       </button>
        //       <button type="button" className="btn-secondary small" data-command="H2" onClick={this.clickBtnHeadingCommand}>
        //         <span>H2</span>
        //       </button>
        //       <button type="button" className="btn-secondary small" data-command="H3" onClick={this.clickBtnHeadingCommand}>
        //         <span>H3</span>
        //       </button>
        //       <button type="button" className="btn-secondary small" data-command="H4" onClick={this.clickBtnHeadingCommand}>
        //         <span>H4</span>
        //       </button>
        //       <button type="button" className="btn-secondary small" data-command="H5" onClick={this.clickBtnHeadingCommand}>
        //         <span>H5</span>
        //       </button>
        //       <button type="button" className="btn-secondary small" data-command="H6" onClick={this.clickBtnHeadingCommand}>
        //         <span>H6</span>
        //       </button>
        //     </div>
        //   </div>
        // </div>
      );
      key++;
    }
    if (this.props.bold === true) {
      const newKey = key;
      controls.push(
        <button
          type="button"
          key={key}
          title="Bold"
          className={`button-secondary small ${this.state.buttonSelected === key ? "active" : ""}`}
          data-command="bold"
          onClick={(e: any) => this.clickBtnCommand(e, newKey)}
        >
          <span className="material-icons">format_bold</span>
        </button>
      );
      key++;
    }
    if (this.props.italic === true) {
      controls.push(
        <button
          type="button"
          key={key}
          title="Italic"
          className={`button-secondary small ${this.state.buttonSelected === key ? "active" : ""}`}
          data-command="italic"
          onClick={(e: any) => this.clickBtnCommand(e, key)}
        >
          <span className="material-icons">format_italic</span>
        </button>
      );
      key++;
    }
    if (this.props.underline === true) {
      controls.push(
        <button
          type="button"
          key={key}
          title="Underline"
          className={`button-secondary small ${this.state.buttonSelected === key ? "active" : ""}`}
          data-command="underline"
          onClick={(e: any) => this.clickBtnCommand(e, key)}
        >
          <span className="material-icons">format_underlined</span>
        </button>
      );
      key++;
    }
    if (this.props.strikeThrough === true) {
      controls.push(
        <button type="button" key={key} title="Strike Through" className="button-secondary small" data-command="strikeThrough" onClick={(e: any) => this.clickBtnCommand(e, key)}>
          <span className="fa fa-strikethrough"></span>
        </button>
      );
      key++;
    }
    if (this.props.justifyLeft === true && this.state.enviroment.browser !== "Microsoft Internet Explorer") {
      controls.push(
        <button type="button" key={key} title="Justify Left" className="button-secondary small" data-command="justifyLeft" onClick={(e: any) => this.clickBtnCommand(e, key)}>
          <span className="material-icons">format_align_left</span>
        </button>
      );
      key++;
    }
    if (this.props.justifyCenter === true && this.state.enviroment.browser !== "Microsoft Internet Explorer") {
      controls.push(
        <button type="button" key={key} title="Justify Center" className="button-secondary small" data-command="justifyCenter" onClick={(e: any) => this.clickBtnCommand(e, key)}>
          <span className="material-icons">format_align_center</span>
        </button>
      );
      key++;
    }

    if (this.props.justifyRight === true && this.state.enviroment.browser !== "Microsoft Internet Explorer") {
      controls.push(
        <button type="button" key={key} title="Justify Right" className="button-secondary small" data-command="justifyRight" onClick={(e: any) => this.clickBtnCommand(e, key)}>
          <span className="material-icons">format_align_right</span>
        </button>
      );
      key++;
    }
    if (this.props.justifyFull === true && this.state.enviroment.browser !== "Microsoft Internet Explorer") {
      controls.push(
        <button type="button" key={key} title="Justify Full" className="button-secondary small" data-command="justifyFull" onClick={(e: any) => this.clickBtnCommand(e, key)}>
          <span className="material-icons">format_align_justify</span>
        </button>
      );
      key++;
    }
    if (this.props.indent === true && this.state.enviroment.browser !== "Microsoft Internet Explorer") {
      controls.push(
        <button type="button" key={key} title="Justify Indent" className="button-secondary small" data-command="indent" onClick={(e: any) => this.clickBtnCommand(e, key)}>
          <span className="material-icons">format_indent_increase</span>
        </button>
      );
      key++;
    }
    if (this.props.outdent === true && this.state.enviroment.browser !== "Microsoft Internet Explorer") {
      controls.push(
        <button type="button" key={key} title="Justify Outdent" className="button-secondary small" data-command="outdent" onClick={(e: any) => this.clickBtnCommand(e, key)}>
          <span className="material-icons">format_indent_decrease</span>
        </button>
      );
      key++;
    }
    if (this.props.unorderedList === true) {
      controls.push(
        <button type="button" key={key} title="Insert Unordered List" className="button-secondary small" data-command="insertUnorderedList" onClick={(e: any) => this.clickBtnCommand(e, key)}>
          <span className="material-icons">format_list_bulleted</span>
        </button>
      );
      key++;
    }
    if (this.props.orderedList === true) {
      controls.push(
        <button type="button" key={key} title="Insert Ordered List" className="button-secondary small" data-command="insertOrderedList" onClick={(e: any) => this.clickBtnCommand(e, key)}>
          <span className="material-icons">format_list_numbered</span>
        </button>
      );
      key++;
    }
    if (this.props.table === true && this.state.enviroment.browser !== "Microsoft Internet Explorer") {
      controls.push(
        // <div className="editor-dropdown-container" key={key}>
        <Dropdown key={key}>
          <DropdownButton>
            <button type="button" className="button-secondary small" title="headers">
              <span className="material-icons">table_view</span>
            </button>
          </DropdownButton>
          <DropdownMenu className="p1">
            {this.state.tablePicker}
            <div className="text_center">
              <span>
                {this.state.tableRow}x{this.state.tableCol}
              </span>
            </div>
          </DropdownMenu>
        </Dropdown>

        //   <div className="editor-dropdown">

        //   </div>
        // </div>
      );
      key++;
    }

    if (this.props.link === true) {
      controls.push(
        <button type="button" key={key} title="Create Link" className="button-secondary small" data-command="CreateLink" onClick={(e: any) => this.clickBtnCommand(e, key)}>
          <span className="material-icons">link</span>
        </button>
      );
      key++;
    }
    if (this.props.unlink === true) {
      controls.push(
        <button type="button" key={key} title="Unlink" className="button-secondary small" data-command="unlink" onClick={(e: any) => this.clickBtnCommand(e, key)}>
          <span className="material-icons">link_off</span>
        </button>
      );
      key++;
    }
    if (this.props.image === true && this.state.enviroment.browser !== "Microsoft Internet Explorer") {
      controls.push(
        <button
          type="button"
          key={key}
          title="Insert Image"
          className="button-secondary small"
          onClick={() => {
            const element = document && document.getElementById(this.props.name + "_inputImage");
            if (element) {
              element.click();
            }
          }}
        >
          <span className="material-icons">image</span>
        </button>
      );
      key++;
    }
    if (this.props.customCommand) {
      controls.push(
        <button type="button" key={key} title={this.props.customCommand.title} className="button-secondary small" onClick={(e: any) => this.clickBtnCommand(e, key)}>
          <span className={this.props.customCommand.icon}></span>
        </button>
      );
    }

    return controls;
  };

  // RENDER
  render() {
    return (
      <div className="editor-toolbar">
        {!this.props.emptyFormat ? (
          <span className="editor-commands">
            <input hidden={true} type="file" id={this.props.name + "_inputImage"} data-command="insertImage" onChange={(e: any) => this.clickBtnCommand(e, 0)} />
            <code>{this.renderToolBarButtons()}</code>
          </span>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default WysiwygBarCommands;
