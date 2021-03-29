import React from "react";
import ReactDOM from "react-dom";
import "./accordion.css";

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
    };

    this.myRef = React.createRef();
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  componentDidMount() {
    window.setTimeout(() => {
      const el = ReactDOM.findDOMNode(this); // findDOMNode is deprecated, replace with refs later
      const height = el.querySelector(".panel__inner").scrollHeight;
      this.setState({
        height,
      });
    }, 333);
  }

  forceUpdateHandler() {
    setTimeout(() => {
      this.forceUpdate();
    }, 20);
  }

  // make component re-render if number of elements has chagned
  // turn code fragements into components which receive render props?

  render() {
    const { label, id, activeTab, index, activateTab } = this.props;
    const { height } = this.state;
    const isActive = activeTab === index;
    const contentHeight = this.myRef.current
      ? this.myRef.current.scrollHeight
      : null;

    const innerStyle = isActive
      ? contentHeight
        ? { height: contentHeight }
        : { height: height }
      : { height: "0px" };

    return (
      // eslint-disable-next-line
      <div className="panel" role="tabpanel" aria-expanded={isActive}>
        <button className="panel__label" role="tab" onClick={activateTab}>
          {label}
        </button>
        <div
          className="panel__inner"
          style={innerStyle}
          aria-hidden={!isActive}
        >
          <div className="panel__content" ref={this.myRef}>
            {React.cloneElement(this.props.children, {
              update: this.forceUpdateHandler,
            })}
            <div className="nextContainer">
              <button
                form={id ? id : ""}
                type="submit"
                className="next"
                onClick={() => {
                  this.props.nextTab();
                }}
              >
                <span style={{ cursor: "pointer", outline: "none" }}>Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
    };

    this.activateTab = this.activateTab.bind(this);
    this.nextTab = this.nextTab.bind(this);
  }

  activateTab(index) {
    this.setState((prev) => ({
      activeTab: prev.activeTab === index ? -1 : index,
    }));
  }
  nextTab() {
    this.activateTab(this.state.activeTab + 1);
  }

  render() {
    const { panels } = this.props;
    const { activeTab } = this.state;
    return (
      <div className="accordion" role="tablist">
        {panels.map((panel, index) => (
          <Panel
            key={index}
            activeTab={activeTab}
            index={index}
            {...panel}
            activateTab={this.activateTab.bind(null, index)}
            nextTab={this.nextTab}
          >
            {panel.component}
          </Panel>
        ))}
      </div>
    );
  }
}

export default Accordion;
