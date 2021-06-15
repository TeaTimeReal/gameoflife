import { PureComponent } from 'react';
// Pure component to make the code run faster in the browser.
class CellComp extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
    }
  }



  render(){
    return (
      <div className="CellDiv">
        <svg width="5px" height="5px"style={this.props.value ? { backgroundColor:'white' } : { backgroundColor:'black'}} onClick={() => this.props.onCellClick(this.props.indexCol, this.props.indexRow)}></svg>
      </div>
    )
  }

}

export default CellComp;

