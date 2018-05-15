import React, { Component } from 'react';
import axios from 'axios';

class TextIOPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportGrade: false,
      reportHomeform: false,
      matchScrollBars: false,
      searchText: "",
      searchDisplayText: "",
      searchResults: ""
    };

    this.toggleReportGrade = this.toggleReportGrade.bind(this);
    this.toggleReportHomeform = this.toggleReportHomeform.bind(this);

    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    this.submitSearchForm = this.submitSearchForm.bind(this);
    this.sendSearchRequest = this.sendSearchRequest.bind(this);

    this.booleanToString = this.booleanToString.bind(this);
    this.clearTextPanes = this.clearTextPanes.bind(this);
    this.matchScrollers = this.matchScrollers.bind(this);
  }

  componentDidMount() {
    this.matchScrollers();
  }

  toggleReportGrade(e) {
    let newState = this.state;
    newState.reportGrade = !this.state.reportGrade;

    this.setState(newState);
  }

  toggleReportHomeform(e) {
    let newState = this.state;
    newState.reportHomeform = !this.state.reportHomeform;

    this.setState(newState);
  }

  handleSearchQueryChange(e) {
    let newState = this.state;
	  
    newState.searchText = e.target.value;
    newState.searchDisplayText = e.target.value;
    newState.matchScrollBars = false;
    this.setState(newState);
  }

  submitSearchForm(e) {
    e.preventDefault();

    let searchData = this.props.collectSearchParams();
    let indexName = searchData.indexName;
    let paramsData = searchData.params;

    let params = [
      !(this.state.reportGrade || this.state.reportHomeform),
      this.state.reportGrade,
      this.state.reportHomeform
    ];

    for (var i = 0; i < paramsData.length; i++) {
      console.log(paramsData[i].grade);
      params.push(paramsData[i].grade);
    }

    for (i = 0; i < paramsData.length; i++) {
      for (var m = 0; m < paramsData[i].homeforms.length; m++) {
        console.log(paramsData[i]);
        params.push(paramsData[i].homeforms[m]);
      }
    }

    let paramsCount = params.length;
    let paramsString = this.booleanToString(params);
    this.sendSearchRequest(indexName, paramsString, paramsCount);
  }

  sendSearchRequest(indexName, params, paramsCount) {
    let url = "http://localhost:8080/MugsReaderAPI/search";

    let requestBody = {
      indexFile: indexName,
      requestParams: params,
      requestParamsCount: paramsCount,
      requestPayload: this.state.searchText
    }

    axios.post(url, requestBody)
         .then(response => {
             let inputNames = response.data.input.split(response.data.separator);
             let outputNames = response.data.output.split(response.data.separator);

             let inputHeader = "\n\n";
             let outputHeader = "Showing " + inputNames.length + " results\n\n";

             let newState = this.state;
             newState.searchDisplayText = inputHeader + inputNames.join("\n");
             newState.searchResults = outputHeader + outputNames.join("\n");
             newState.matchScrollBars = true;

             this.setState(newState);
             document.querySelector(".scrollShare").scrollTop = 0;
    });
  }          

  booleanToString(params) {
    let paramString = "";
    let charCode = 0;
    let i;

    for (i = 0; i < params.length; i++) {
      if (params[i]) {
        charCode |= (1 << (i % 8));
      }

      if (i % 8 === 7) {
        paramString += String.fromCharCode(charCode);
        charCode = 0;
      }
    }

    if (i % 8 !== 0) {
      paramString += String.fromCharCode(charCode);
    }

    return paramString;
  }

  clearTextPanes(e) {
    let newState = this.state;
    newState.searchDisplayText = "";
    newState.searchText = "";
    newState.searchResults = "";

    this.setState(newState);
  }

  matchScrollers() {
    let scrollPanes = document.querySelectorAll(".scrollShare");
    let scroller1 = scrollPanes[0];
    let scroller2 = scrollPanes[1];

    scroller1.addEventListener('scroll', e => {
        if (this.state.matchScrollBars) {
          scroller2.scrollTop = scroller1.scrollTop;
        }}, false);

    scroller2.addEventListener('scroll', e => {
        if (this.state.matchScrollBars) {
          scroller1.scrollTop = scroller2.scrollTop;
        }}, false);
  }

  render() {
    return (
      <div className="textIOPane">
        <div className="textIOContents">
          <textarea className="scrollShare"
                    value={this.state.searchDisplayText}
                    onChange={this.handleSearchQueryChange}
          />
          <textarea className="scrollShare"
                    value={this.state.searchResults}
                    readOnly
          />
        </div>
        <div className="textIOUtils">
          <div className="searchForm">
            <div className="divButton"
                 data-selected={true}
                 onClick={this.submitSearchForm}>
              <p>Search</p>
	    </div>
            <div className="labelledCheckbox">
              <input id="grade"
                     type="checkbox"
                     onClick={this.toggleReportGrade}
              />
              <label>Report Grade</label>
            </div>
            <div className="labelledCheckbox">
              <input id="homeform"
                     type="checkbox"
                     onClick={this.toggleReportHomeform}
              />
              <label>Report Homeform</label>
            </div>
          </div>
          <div className="divButton"
               data-selected={true}
               onClick={this.clearTextPanes}>
            <p>Clear</p>
          </div>
        </div>
      </div>
    );
  }
}

export default TextIOPane;
