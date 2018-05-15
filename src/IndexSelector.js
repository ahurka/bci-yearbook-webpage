import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

import './react-select.css';

class IndexSelector extends Component {
  constructor(props) {
    super(props);

    this.mapSelectOption = this.mapSelectOption.bind(this);
    this.fetchHomeforms = this.fetchHomeforms.bind(this);

    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);

    this.getCurrentIndex = this.getCurrentIndex.bind(this);

    this.state = {
      indexChoices: [],
      currentIndex: ""
    };
  }

  componentDidMount() {
    let url = "http://localhost:8080/MugsReaderAPI/index";

    axios.get(url)
         .then(response => {
             let newState = this.state;
             newState.indexChoices = response.data.indices.reverse();

             this.setState(newState);
             this.fetchHomeforms(this.state.indexChoices[0]);
    });
  }

  mapSelectOption(option) {
    return {value: option, label: option};
  }

  fetchHomeforms(indexName) {
    let url = "http://localhost:8080/MugsReaderAPI/index/" + indexName;

    axios.get(url)
         .then(response => {
             let newState = this.state;
             newState.currentIndex = indexName;

             this.setState(newState);
             this.props.onChange(response.data.homeforms);
    });
  }

  handleFileUpload(e) {
    e.preventDefault();
    let url = "http://localhost:8080/MugsReaderAPI/index";
    let file = e.target.files[0];
    let formData = new FormData();

    formData.append("file", file);

    axios.post(url, formData)
         .then(response => {
             let newState = this.state;
             newState.indexChoices.splice(0, file.name);
             newState.currentIndex = file.name;

             this.setState(newState);
             this.fetchHomeforms(file.name);
    });
  }

  handleFileChange(e) {
    this.fetchHomeforms(e.value);
  }

  getCurrentIndex() {
    return this.state.currentIndex;
  }

  render() {
    return (
      <div className="indexSelector">
        <div className="fileSubmit">
          <label>+ Add New</label>
          <input type="file" name="file" onChange={this.handleFileUpload}/>
        </div>
        <div className="fileSelect">
          <Select value={this.state.currentIndex}
                  options={this.state.indexChoices.map(this.mapSelectOption)}
                  onChange={this.handleFileChange}
          />
        </div>
      </div>
    );
  }
}

export default IndexSelector;
