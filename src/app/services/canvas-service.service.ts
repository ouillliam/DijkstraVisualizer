import { Injectable,EventEmitter } from '@angular/core';
import {GridCanvas} from '../models/GridCanvas'
import { Graph } from '../models/Graph';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  updateCanvas(grid:GridCanvas,graph:Graph):void{

    grid.ctx.clearRect(0, 0, grid.canvas.width, grid.canvas.height)
    
    for(let j=0; j < grid.row; j++){
      for(let i=0; i < grid.col; i++){

        let currNode = graph.nodes[j][i];
        
        if(currNode.isWall){
          grid.ctx.fillStyle = "black";
          grid.ctx.fillRect(i*grid.cellSize,j*grid.cellSize,grid.cellSize,grid.cellSize);
        }

        if(currNode.id == graph.startId){
          grid.ctx.fillStyle = "green";
          grid.ctx.fillRect(i*grid.cellSize,j*grid.cellSize,grid.cellSize,grid.cellSize); 
        }
        else if(currNode.id == graph.targetId){
          grid.ctx.fillStyle = "red";
          grid.ctx.fillRect(i*grid.cellSize,j*grid.cellSize,grid.cellSize,grid.cellSize);
        }
        
        grid.ctx.strokeRect(i*grid.cellSize,j*grid.cellSize,grid.cellSize,grid.cellSize);


      }
    }
  }


  updateNode(grid:GridCanvas,graph:Graph,event:MouseEvent, clickState:string):number{ //Returns lastClickedNode

    let col = Math.floor(event.offsetX/grid.cellSize);
    let row = Math.floor(event.offsetY/grid.cellSize);
    let clickedNode =  graph.nodes[row][col];

    switch(clickState){

      case "Start Node": 
        clickedNode.isWall = false;
        graph.startId = clickedNode.id;
      break;
      
      case "Target Node": 
        clickedNode.isWall = false;
        graph.targetId = clickedNode.id;
      break;
      
      case "Wall": 
        if(clickedNode.id == graph.startId)
          graph.startId = null;
        else if(clickedNode.id == graph.targetId)
          graph.targetId = null;
      
        clickedNode.isWall = !graph.nodes[row][col].isWall;
      break;
      
      default : break;
    }

    return clickedNode.id;

  }

  updateToPlace(graph:Graph, emitter:EventEmitter<string[]>){
    if(graph.startId == null)
      emitter.emit(["Start Node","seagreen"]);
    else if(graph.targetId == null)
      emitter.emit(["Target Node","red"]);
    else
      emitter.emit(["Walls","black"]);
  }


  clearCanvas(graph:Graph){
    for(let row in graph.nodes){
      for(let col in graph.nodes[row])
        graph.nodes[row][col].isWall = false;
    }
  }


}
