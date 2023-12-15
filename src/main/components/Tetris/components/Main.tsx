import React from "react";

import Stage from "./Stage/Stage";
import Display from "./Display/Display";
import StartButton from "./StartButton/StartButton";
import { StyledTetris, StyledTetrisWrapper } from "./Main.styles";
import { createStage } from "../GameHelper";

export const Main: React.FC = () => {

    const [dropTime, setDropTime] = React.useState<null | number>(null);
   const [gameOver, setGameOver] = React.useState(true);
   
    return (

        <StyledTetrisWrapper role='button' tabIndex={0}>

            <StyledTetris>

                <div className="display">
                    {gameOver ? (
                        <>
                            <Display gameOver={gameOver} text="Game Over" />
                            <StartButton callback={() => null}/>
                        
                        </>
                    ) : (

                        <>
                            <Display text={`Score: `} />
                            <Display text={`Rows: `} />
                            <Display text={`Level: `} />

                        </>

                    )


                    }


                </div>
                <Stage stage={createStage()}/>
            </StyledTetris>

        </StyledTetrisWrapper>
    )
}