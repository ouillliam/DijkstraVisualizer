import { Injectable } from '@angular/core';
import { GridCanvas } from '../models/GridCanvas';
import { NodePathData } from '../models/NodePathData';
import { Node } from '../models/Node';
import { Graph } from '../models/Graph';
import { resolve } from 'dns';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class AnimatePathService {

  speed:number;
  timeouts:NodeJS.Timeout[];
  constructor() { }





  animateAlgorithm(grid:GridCanvas,visited:NodePathData[],shortestPath:Node[]){
    this.timeouts = [];
    if(visited){
      visited.forEach((data:NodePathData,index:number) => {
        if(index===visited.length-1 && shortestPath){
          this.timeouts.push(setTimeout(() => {
          console.log('la ca doit animer');
          this.animateShortestPath(grid,shortestPath);
        },this.speed*index));
          return;
        }
        if(index!=0 && index!=visited.length-1){
          this.timeouts.push(setTimeout( () => {
            const id = data.node.id;
            grid.ctx.fillStyle = 'yellow';
            const x = id % grid.row * grid.cellSize;
            const y = Math.floor(id/grid.row) * grid.cellSize;
            grid.ctx.fillRect(x+1,y+1,grid.cellSize-2,grid.cellSize-2);
          },this.speed*index))
        };
     })
        
    }
  }


  animateShortestPath(grid:GridCanvas,shortestPath:Node[]){
    console.log('je suis dans la fonction');
    console.log(shortestPath);
    if(shortestPath){
      shortestPath.forEach( (node:Node,index:number) => {
        console.log('je suis un node du path');
        if(index!=0 && index != shortestPath.length-1){
          this.timeouts.push(setTimeout( () => {
            const id = node.id;
            grid.ctx.fillStyle = 'orange';
            console.log('j\'anime')
            const x = id % grid.row * grid.cellSize;
            const y = Math.floor(id/grid.row) * grid.cellSize;
            grid.ctx.fillRect(x+1,y+1,grid.cellSize-2,grid.cellSize-2);
          },this.speed*index))
        };
      })
    }
  }

  clearTimeouts(){
    if(this.timeouts){
      this.timeouts.forEach( (timeout) => clearTimeout(timeout));
    }
  }
}
