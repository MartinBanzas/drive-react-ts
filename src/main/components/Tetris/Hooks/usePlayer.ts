import { STAGE_WIDTH } from "../Setup";
import { randomTetromino } from "../GameHelper";
import React from "react";

export type PLAYER = {
    pos: {x:number, y:number};
    tetromino: (string | number) [][];
    collided: boolean;
}

export const usePlayer = () => {


    const [player, setPlayer] = React.useState({} as PLAYER);
    const updatePlayerPos = ({x, y, collided}: {x:number, y:number, collided:boolean}): void => {
        setPlayer(prev=> ({...prev, 
        pos: {x: (prev.pos.x+=x), y: (prev.pos.y+y)},
        collided: collided
    
    }))
    };

    const resetPlayer = React.useCallback(
        (): void =>
        setPlayer({
            pos: {x:STAGE_WIDTH / 2-2, y:0},
            tetromino: randomTetromino().shape,
             collided: false
        }),
        []
    );
return {player, updatePlayerPos, resetPlayer};
}