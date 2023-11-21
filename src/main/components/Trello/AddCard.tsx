import React, { useState } from "react";
import { nanoid } from 'nanoid';


export const AddCard = (props:any) => {

    const [Text, setText] = useState("");
    const [isAdding, setAdding] = useState(false);


    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setText(e.target.value);
      };
    
      const handleClick = () => {
        setAdding(!isAdding);
      }
    
      const cancelClick = () => {
        setAdding(false);
      }
    
      const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        props.addTask(Text);
        setText("");
        setAdding(false);
    
        
      };


      const newCard = (
        <div className="" onSubmit={handleSubmit}>
          <form>
            <input

              value={Text}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary btn-sm mt-2 px-2 ">
              ➕ Save
            </button>
            <button className="btn btn-secondary btn-sm px-2 mt-2 ms-1" onClick={cancelClick}>Cancel</button>
    
          </form>
        </div>
      );

      const setAdd = (
        <div>
          <form>
            <button type="submit" onClick={handleClick} className="btn btn-primary btn-sm px-2 ">
              ➕ Add new card
            </button>
          </form>
        </div>
      );

    return isAdding ? newCard : setAdd;
}