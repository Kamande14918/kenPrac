import { useContext} from "react";
import {OperandContext} from './App.jsx';
function Calculator(){
    const {operand} = useContext(OperandContext);
return (
    <div>
        <div className="add-1">
            <p>Add 1</p>
            {operand + 1}
        </div>
        <div className="cubed">
          <p>Cubed</p>
          {Math.pow(operand, 3)}
        </div>
        <div className="multiply-3">
            <p>Multiply by 3</p>
            {operand * 3}
        </div>
        <div className="square-r00t">
            <p>Square root</p>
            {Math.sqrt(operand)}
        </div>
    </div>
)
}
export default Calculator;