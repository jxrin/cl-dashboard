import React from "react";
import Options from "./Options";
import "./index.css";
import axios from "axios";

let submitted = false; // add a condition for when the week resets

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      active: "",
      value: 0
      // map week number and submitted (t/f) to ensure one submit / week
    };
  }

  // set value with button
  handleClick = (e, key) => {
    this.setState({
      value: key,
      active: key
    });
    this.saveData(key);
  };

  saveData(score) {
    alert(this.props.prompt);
    axios.post("/submit-evaluation", {
      week: "test week",
      prompt: this.props.prompt,
      score: score
    });
  }

  render() {
    return (
      <div className="item">
        <p>{this.props.prompt}</p>
        <section>
          {Options.map((option, index) => (
            <button
              className={
                this.state.active === index ? "selected" : "likert-option"
              }
              key={index}
              disabled={submitted}
              onClick={e => this.handleClick(e, index)}
            >
              {option}
            </button>
          ))}
        </section>
        {/* <p> score: {this.state.value}</p> */}
      </div>
    );
  }
}

export default Option;
