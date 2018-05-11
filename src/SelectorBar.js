import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SelectorBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      selected: [],
      gradeEnable: true
    }

    this.mapSelectOption = this.mapSelectOption.bind(this);

    this.enableGrade = this.enableGrade.bind(this);
    this.disableGrade = this.disableGrade.bind(this);
    this.toggleGradeEnable = this.toggleGradeEnable.bind(this);

    this.selectAllHomeforms = this.selectAllHomeforms.bind(this);
    this.deselectAllHomeforms = this.deselectAllHomeforms.bind(this);

    this.handleSelectionChange = this.handleSelectionChange.bind(this);

    this.loadHomeforms = this.loadHomeforms.bind(this);
    this.getParameterFlags = this.getParameterFlags.bind(this);
  }

  mapSelectOption(option) {
    return {value: option, label: option};
  }

  enableGrade() {
    let newState = this.state;
    newState.gradeEnable = true;

    this.setState(newState);
  }

  disableGrade() {
    let newState = this.state;
    newState.gradeEnable = false;

    this.setState(newState);
  }

  toggleGradeEnable() {
    if (this.state.gradeEnable) {
      this.disableGrade();
    } else {
      this.enableGrade();
    }
  }

  selectAllHomeforms() {
    let newState = this.state;
    newState.selected = this.state.options.map(this.mapSelectOption);

    this.setState(newState);
  }

  deselectAllHomeforms() {
    let newState = this.state;
    newState.selected = [];

    this.setState(newState);
  }

  handleSelectionChange(e) {
    let newState = this.state;
    newState.selected = e;

    this.setState(newState);
  }

  getParameterFlags() {
    let params = [];

    for (var i = 0; i < this.state.options.length; i++) {
      params.push(false);
    }

    for (i = 0; i < this.state.selected.length; i++) {
      let selectedParam = this.state.selected[i].value;
      let paramIndex = this.state.options.indexOf(selectedParam);

      params[paramIndex] = true;
    }

    return {
      grade: this.state.gradeEnable,
      homeforms: params
    };
  }

  loadHomeforms(homeformsList) {
    let newState = this.state;
    newState.options = homeformsList;
    newState.selected = homeformsList.map(this.mapSelectOption);

    this.setState(newState);
  }

  render() {
    return (
      <div className="selectorBar">
        <div className="divButton"
             onClick={this.toggleGradeEnable}
        >
          {this.props.name}
        </div>
        <div className="selectorContent">
          <div className="gradeSelector">
            <input type="checkbox"
                   checked={this.state.gradeEnable}
                   onChange={this.toggleGradeEnable}
            />
          </div>
          <div className="homeformSelector">
            <Select multi={true}
                    closeOnSelect={false}
                    options={this.state.options.map(this.mapSelectOption)}
                    value={this.state.selected}
                    onChange={this.handleSelectionChange}
            />       
          </div>
          <div className="selectorUtils">
	    <div className="buttonFrame">
              <button className="selectorEnableAll"
                      type="button"
                      onClick={this.selectAllHomeforms}
	      >Select All</button>
            </div>
	    <div className="buttonFrame">
              <button className="selectorDisableAll"
                      type="button"
                      onClick={this.deselectAllHomeforms}
	      >Clear</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectorBar;
