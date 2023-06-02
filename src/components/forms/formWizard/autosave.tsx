import React from "react";

export interface IProps {
  onSaveAsDraft: Function;
  status: string;
}
export interface IState {
  lastTimeAutosave?: Date;
}
class Autosave extends React.Component<IProps, IState> {
  intervalId: any;
  interval = 2 * 60 * 1000; // Each 2 minutes
  constructor(props: IProps) {
    super(props);
    this.state = {
      lastTimeAutosave: undefined,
    };
    this.autosave = this.autosave.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.onSaveAsDraft === "function") this.intervalId = setInterval(this.autosave, this.interval);
  }
  componentWillUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  async autosave() {
    if (typeof this.props.onSaveAsDraft === "function") {
      await this.props.onSaveAsDraft();
      this.setState({ lastTimeAutosave: new Date() });
    }
  }

  render() {
    return <>{this.state.lastTimeAutosave && <div className="autosave">Changes saved automatically at: {this.state.lastTimeAutosave.toLocaleTimeString()}</div>}</>;
  }
}

export default Autosave;
