import React, { Component } from 'react';
import SelectorBar from './SelectorBar.js';
import IndexSelector from './IndexSelector.js';

class MugsReaderContentPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectors: {
        grade9: React.createRef(),
        grade10: React.createRef(),
        grade11: React.createRef(),
        grade12: React.createRef(),
        other: React.createRef()
      }
    };

    this.reloadHomeforms = this.reloadHomeforms.bind(this);
  }

  reloadHomeforms(homeformsLists) {
    let selectorNames = ["grade9", "grade10", "grade11", "grade12", "other"];

    for (var i = 0; i < selectorNames.length; i++) {
      let selectorName = selectorNames[i];
      let selector = this.state.selectors[selectorName].current;

      selector.loadHomeforms(homeformsLists[selectorName]);
    }
  }

  render() {
    return (
      <div>
        <IndexSelector onChange={this.reloadHomeforms}/>
        <ul>
          <SelectorBar name="Grade 9"
                       ref={this.state.selectors.grade9}
          />
          <SelectorBar name="Grade 10"
                       ref={this.state.selectors.grade10}
          />
          <SelectorBar name="Grade 11"
                       ref={this.state.selectors.grade11}
          />
          <SelectorBar name="Grade 12"
                       ref={this.state.selectors.grade12}
          />
          <SelectorBar name="Other"
                       ref={this.state.selectors.other}
          />
        </ul>
      </div>
    );
  }
}

export default MugsReaderContentPane;
