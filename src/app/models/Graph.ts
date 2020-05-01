import { GridCanvas } from './GridCanvas';
import { Node } from './Node';

export class Graph{

    nodes:Node[][];
    startId:number;
    targetId:number;

    constructor(grid:GridCanvas){

        this.nodes = [];

        for(let j=0; j < grid.row; j++){

            this.nodes.push([]);

            for(let i=0; i < grid.col; i++){

                let node:Node = { 
                                    id: grid.col*j + i, 
                                    isWall: false
                                }

                this.nodes[j].push(node);
                
            }
        }
    }

}