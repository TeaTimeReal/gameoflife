import './App.css';
import { Component } from 'react';
import Rows from './Rows.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gridArray: [],

      gridXLength: 10,//prompt("length"),
      gridYLength: 10,//prompt("height"),

      isRunning: false,
    }
  }

  // When clicked on a Cell, then switch that cells status.
  onCellClick = (indexCol, indexRow) => {
    let gridTMP = this.state.gridArray;
    gridTMP[indexRow][indexCol] = !gridTMP[indexRow][indexCol];

    this.setState({gridArray: gridTMP});
  }

  // Function to call when the button is clicked.
  Cycle(){
    
    
    if(this.state.isRunning === false){
      let intervalVar = setInterval(() => this.calculateNextGeneration(), 20);

      this.setState({isRunning: true});
      this.setState({interval: intervalVar});
      console.log("PLAY");
    }

    else{
      clearInterval(this.state.interval);
      this.setState({isRunning: false});
      console.log("PAUSE");

    }
  }


  // Function to calculate the next generation of hte current grid,
  // according to the rules of the game of life.
  calculateNextGeneration(){
    let gridTMP = this.state.gridArray;
    let newgridTMP = this.state.gridArray;

    let biggerGrid = [];

    let index1;

    // Fill the bigger Grid with the original grid and an outer line of cells with false.
    for (index1 = 0; index1 < this.state.gridYLength + 2; index1++){
      let index2;
      let row = [];
      for (index2 = 0; index2 < this.state.gridXLength + 2; index2++){
        
        // If the current cell is on the outermost loop of the bigger grid, fill it with false.
        if(index1 === 0 || (index1 === this.state.gridYLength+1) || index2 === 0 || (index2 === this.state.gridXLength+1)){
          row.push(false);
        }

        // If the current cell is NOT on the outermost loop of the bigger grid, fill it with the content the the grid.
        else{
          row.push(gridTMP[index1-1][index2-1]);
        }
      }
      biggerGrid.push(row)

    }


    for (index1 = 0; index1 < this.state.gridYLength + 2; index1++){
      let index2;
      let row = [];
      for (index2 = 0; index2 < this.state.gridXLength + 2; index2++){
        
        // If the current cell is NOT on the outermost loop of the bigger grid, do the game of life things.
        if(!(index1 === 0 || (index1 === this.state.gridYLength+1) || index2 === 0 || (index2 === this.state.gridXLength+1))){
          let GridAroundCurrentCell3x3 = [];

          let index3;
          for (index3 = 0; index3 < 3; index3++){
            let index4;
            let row = [];
            for (index4 = 0; index4 < 3; index4++){
              row.push(biggerGrid[index1-1+index3][index2-1+index4]);
            }     
            GridAroundCurrentCell3x3.push(row);
          }

          let cellsAlive = 0;

          // Count the number of alive cells in the current 3x3 grid.
          for (index3 = 0; index3 < 3; index3++){
            let index4;
            for (index4 = 0; index4 < 3; index4++){
              if(GridAroundCurrentCell3x3[index3][index4] === true){
                cellsAlive++;
              }
            }     
          }

          // Simply reduce number of Cells alive by one if the current cell is alive itself.
          if(GridAroundCurrentCell3x3[1][1] === true){
            cellsAlive--;
          }

          // Check for which rule to apply.
          if(cellsAlive < 2){
            newgridTMP[index1-1][index2-1] = false;
          }

          if(cellsAlive >= 4){
            newgridTMP[index1-1][index2-1] = false;
          }

          if(cellsAlive === 3 && GridAroundCurrentCell3x3[1][1] === false){
            newgridTMP[index1-1][index2-1] = true;
          }

          if(cellsAlive === 3 && GridAroundCurrentCell3x3[1][1] === true){
          }

          if(cellsAlive === 2){
          }
        }
      
      }
      biggerGrid.push(row)

    }


    this.setState({gridArray: newgridTMP})
    //this.setState({ gridArray: biggerGrid});  // Use this line instead of the one above, to display the bigger grid instead of the original. 


  }

  
  fillGrid = (gridXLength, gridYLength) => {
    let gridTMP = [];

    let index1;
    // Fill Grid with false.
    for (index1 = 0; index1 < gridYLength; index1++){
      let index2;
      let row = [];
      for (index2 = 0; index2 < gridXLength; index2++){
        row.push(false);
      }
      gridTMP.push(row)
    }
    
    this.setState({ gridArray: gridTMP});


  }


  componentDidMount(){
    const gridXLengthtmp = prompt("Length");
    const gridYHeigthtmp = prompt("Heigth");

    this.setState({ gridXLength: Number(gridXLengthtmp)});
    this.setState({ gridYLength: Number(gridYHeigthtmp)});

    this.fillGrid(gridXLengthtmp, gridYHeigthtmp);
  
  }


  render(){

    return (
      <div className="App">
        <header className="App-header">
        </header>
  
        <body>

            <div className="GridDiv">
              { this.state.gridArray.map((Element, index)=> <Rows indexRow={index} value={Element} onCellClick={this.onCellClick}/>) }

              <button fill="blue" width="100px" height="100px" onClick={() => this.Cycle()}> {this.state.isRunning ? "STOP": "PLAY"} </button>
            </div>

        </body>
      </div>
    );
  }

}

export default App;
