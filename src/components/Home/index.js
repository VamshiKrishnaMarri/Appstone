import { Component } from "react";

import Item from "../Item";

//import Loader from "react-loader-spinner";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  failure: "FAILURE",
  success: "SUCCESS",
  inProgress: "INPROGRESS"
};

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    resultsList: []
  };

  onClickDelete = (id) => {
    const { resultsList } = this.state;
    const updatedResults = resultsList.filter((eachItem) => eachItem.id !== id);

    this.setState({ resultsList: updatedResults });
  };

  componentDidMount() {
    this.getItems();
  }

  getItems = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const path = "https://reqres.in/api/users?page=1";
    const options = {
      method: "GET"
    };
    const response = await fetch(path, options);
    if (response.ok === true) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.data.map((each) => ({
        id: each.id,
        avatar: each.avatar,
        firstName: each.first_name,
        lastName: each.last_name,
        email: each.email
      }));
      console.log(response);
      console.log(fetchedData);
      this.setState({
        resultsList: updatedData,
        apiStatus: apiStatusConstants.success
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderSuccessView = () => {
    const { resultsList } = this.state;

    return (
      <ul className="list-items">
        {resultsList.map((each) => (
          <Item
            itemDetails={each}
            key={each.id}
            onClickDelete={this.onClickDelete}
          />
        ))}
      </ul>
    );
  };

  renderFailureView = () => (
    <div className="app-container">
      <h1 className="error">Something Went Wrong Please Try Again </h1>
    </div>
  );

  renderLoadingView = () => (
    <div className="app-container">
      <h1 className="error">Loading...</h1>;
    </div>
  );

  renderViews = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="app-container">
        <ul className="items">{this.renderViews()}</ul>
      </div>
    );
  }
}

export default Home;
