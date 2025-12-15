import {useState, useContext, useEffect} from 'react';
import {OperandContext} from './App.jsx';

function Form(){
    const {operand, setOperand} = useContext(OperandContext);
    const [workingOperand, setWorkingOperand] = useState(0);

    useEffect(() =>{
        setWorkingOperand(operand)
    },[operand]);

    function handleSubmit(e){
        e.preventDefault();
         if(workingOperand !==""){
            setOperand(parseFloat(workingOperand))
         }
    }
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="value">Calculate with:</label>
            <input
                 type="number"
                 id="value"
                 value={workingOperand}
                 onChange={(e) => setWorkingOperand(e.target.value)}
                 />
                 <button type="submit">Submit</button>
        </form>
    )
}

export default Form;