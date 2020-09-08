import { x, y } from '../types'; 
 
export interface IGroup {
    key: string,
    repeat: number,
    setXY: { x: x, y: y, stepX: number }
}