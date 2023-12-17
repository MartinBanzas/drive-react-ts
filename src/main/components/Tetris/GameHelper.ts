import { PLAYER } from './Hooks/usePlayer';
import { STAGE } from './Hooks/useStage';
import { STAGE_WIDTH, STAGE_HEIGHT } from './Setup';
import { TETROMINOS } from './Setup';
import useSound from 'use-sound';
import tetrisOg from '../../../assets/music/tetrisgameboy.mp3';
import tecno from '../../../assets/music/Tetris (Techno Version).m4a'
import orchestral from '../../../assets/music/Tetris Theme - Contemporary Big BandClassical Fusion Version (The 8-Bit Big Band).m4a'
import piano from '../../../assets/music/Tetris Theme (Piano Version) - 400k Special.m4a'


export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));


export const randomTetromino = () => {
  const tetrominos = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'] as (keyof typeof TETROMINOS)[];
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};

export const isColliding = (
  player: PLAYER,
  stage: STAGE,
  { x: moveX, y: moveY }: { x: number, y: number }
) => {

  for (let y = 0; y < player.tetromino.length; y++) {

    for (let x = 0; x < player.tetromino[y].length; x++) {
      //comprobar que estamos en una celda con tetromino
      if (player.tetromino[y][x] !== 0) {
        //comprobar que el movimiento está dentro de la cuadrícula en  coordenadas X e Y
        // y que la celda no está para eliminarse, si se dan todas las condiciones es que  es colisión
        if (!stage[y + player.pos.y + moveY] || !stage[y + player.pos.y + moveY][x + player.pos.x + moveX]
          || stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear') {
          return true;
        }
      }

    }

  }
  return false;
  // Si todo lo anterior es falso, no hay colisión.
}