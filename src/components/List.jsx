import React from "react";
import styled from "styled-components";

const ListCard = styled.div`
  padding: 10px;
  margin: 10px;
  width: 100%;
  border: 1px solid red;
`;

const AddButton = styled.div`
  right: 0;
`;
// simple to do

const List = props => (
  <ul>
    {props.items.map((item, index) => (
      <div key={index}>
        <li>{item}</li>
        <button onClick={e => props.remove(e, index)}>x</button>
      </div>
    ))}
  </ul>
);

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      value: ""
      // array of items
      //   text: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  x;

  // set value to input
  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  // append item
  handleSubmit(e) {
    if (!this.state.value.replace(/\s/g, "").length) {
      alert("Cannot add empty task.");
      return;
    }

    this.setState({
      items: [...this.state.items, this.state.value],
      value: ""
    });
  }

  onKeyPress = e => {
    if (e.key === "Enter") {
      this.handleSubmit(e);
    }
  };

  remove = (e, id) => {
    // alert(id);
    const { items } = this.state;
    var index = id;
    if (index !== -1) {
      items.splice(index, 1);
    }
    this.setState({
      items: items
    });
  };

  render() {
    return (
      <ListCard>
        <label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
            onKeyPress={this.onKeyPress}
          />
        </label>
        <input
          type="button"
          value="+"
          onClick={this.handleSubmit}
          className="AddButton"
        />
        <List remove={this.remove} items={this.state.items} />
      </ListCard>
    );
  }
}

export default Form;