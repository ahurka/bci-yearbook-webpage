import React, { Component } from 'react';
import TextIOPane from './TextIOPane.js';
import IndexSelector from './IndexSelector.js';
import SelectorBar from './SelectorBar.js';

class MugsReaderContentPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectors: {
        index: React.createRef(),
        grade9: React.createRef(),
        grade10: React.createRef(),
        grade11: React.createRef(),
        grade12: React.createRef(),
        other: React.createRef()
      }
    };

    this.reloadHomeforms = this.reloadHomeforms.bind(this);
    this.collectSearchParams = this.collectSearchParams.bind(this);
  }

  reloadHomeforms(homeformsLists) {
    let selectorNames = ["grade9", "grade10", "grade11", "grade12", "other"];

    for (var i = 0; i < selectorNames.length; i++) {
      let selectorName = selectorNames[i];
      let selector = this.state.selectors[selectorName].current;

      selector.loadHomeforms(homeformsLists[selectorName]);
    }
  }

  collectSearchParams() {
    let searchData = {
      indexName: this.state.selectors.index.current.getCurrentIndex(),
      params: [
        this.state.selectors.grade9.current.getParameterFlags(),
        this.state.selectors.grade10.current.getParameterFlags(),
        this.state.selectors.grade11.current.getParameterFlags(),
        this.state.selectors.grade12.current.getParameterFlags(),
        this.state.selectors.other.current.getParameterFlags()
      ]
    };

    return searchData;
  }

  render() {
    return (
      <div>
        <IndexSelector onChange={this.reloadHomeforms}
                       ref={this.state.selectors.index}
        />
        <TextIOPane collectSearchParams={this.collectSearchParams}/>
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
