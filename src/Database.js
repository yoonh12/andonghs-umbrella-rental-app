import React from "react";
export default class AddBook extends React.Component {
  constructor() {
    super();
    this.state = {
      bookname: "",
    };
  }

  updateInfo = (event) => {
    let fieldName = event.target.name;
    let fieldValue = event.target.value;
    if (fieldName === "test") {
      this.setState({ bookname: fieldValue });
    }
  };

  addBook = (e) => {
    let { bookname } = this.state;
    fetch("http://localhost:3001/tests", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fetchVal: bookname,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.alert(data);
        console.log(bookname);
        //Do anything else like Toast etc.
      });
  };

  render() {
    return (
      <div className="add_book">
        <div>
          <label>Input</label>
          <input
            onChange={this.updateInfo}
            name="test"
            value={this.state.bookname}
          />
        </div>

        <button onClick={this.addBook}>Add</button>
      </div>
    );
  }
}
