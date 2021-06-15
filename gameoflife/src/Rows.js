import { Component } from 'react';

import CellComp from './CellComp.js';

class Rows extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  };

  testfunction = (Col, Row) =>{
    this.props.onCellClick(Col, Row);
  };

  render(){
    return (
      <div className="Rows">
        { this.props.value.map((Element, index) => <CellComp indexRow={this.props.indexRow} indexCol={index} value={Element} onCellClick={this.testfunction}/>) }
      </div>
    )
  };

}

export default Rows;
