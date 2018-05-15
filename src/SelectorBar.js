import React, { Component } from 'react';
import Select from 'react-select';
import './react-select.css';

import './SelectorBar.css';
import './GenericComponents.css';

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
             id="gradeSelector"
             data-selected={this.state.gradeEnable}
             onClick={this.toggleGradeEnable}
        >
          <p>{this.props.name}</p>
        </div>
        <Select multi={true}
                closeOnSelect={false}
                options={this.state.options.map(this.mapSelectOption)}
                value={this.state.selected}
                onChange={this.handleSelectionChange}
        />       
        <div className="divButton"
             data-selected={true}
             onClick={this.selectAllHomeforms}
        >
          <p>Select All</p>
        </div>
        <div className="divButton"
             data-selected={true}
             onClick={this.deselectAllHomeforms}
        >
          <p>Clear</p>
        </div>
      </div>
    );
  }
}

export default SelectorBar;
