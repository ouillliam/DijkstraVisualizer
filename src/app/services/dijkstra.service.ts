import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { Graph } from '../models/Graph';
import { Node } from '../models/Node';
import { Edge } from '../models/Edge';
import { NodePathData} from '../models/NodePathData';

@Injectable({
  providedIn: 'root'
})

export class DijkstraService {

  shortestPath:Node[];
  visited:NodePathData[];
  unvisited:NodePathData[];
  error:boolean;
  

  constructor() { }

  private initialization(graph:Graph){

    this.shortestPath=[];
    this.unvisited=[];
    this.visited=[];
    this.error=false;
    for(let j=0; j<graph.nodes.length ; j++){
      for(let i=0; i<graph.nodes[j].length; i++){
        if(!graph.nodes[j][i].isWall)
          this.unvisited.push({
            node:graph.nodes[j][i],
            distanceFromStart:9999,
            previousNode:null
          });
      }
    }
    
    //set distance from start node to itself = 0
    this.unvisited.find((data:NodePathData) => data.node.id == graph.startId ).distanceFromStart= 0; 
  }

  private getNeighboursOf(node:Node,graph:Graph):Edge[]{
    
    const nodeY=Math.floor(node.id/graph.nodes[0].length);
    const nodeX=node.id % graph.nodes[0].length;
    const neighbours:Edge[] = [];

    
    if( nodeY!=0 && !graph.nodes[nodeY-1][nodeX].isWall)
      {
      neighbours.push({
        nodes: [node, graph.nodes[nodeY-1][nodeX]],
        weight: 1
      });
    }

      if( nodeY!=graph.nodes[0].length-1 && !graph.nodes[nodeY+1][nodeX].isWall)
        {
      neighbours.push({
        nodes: [node, graph.nodes[nodeY+1][nodeX]],
        weight: 1
      });
    }

      if( nodeX!=0 && !graph.nodes[nodeY][nodeX-1].isWall)
        {
        neighbours.push({
        nodes: [node, graph.nodes[nodeY][nodeX-1]],
        weight: 1
      });
    }

      if( nodeX!=graph.nodes.length-1 && !graph.nodes[nodeY][nodeX+1].isWall)
        {
        neighbours.push({
        nodes: [node, graph.nodes[nodeY][nodeX+1]],
        weight: 1
      });
    }

    return neighbours;

  }

  private getNodeToVisitData():NodePathData{
    let min = 9999;
    let nodeToVisitData:NodePathData;
    this.unvisited.forEach( (data:NodePathData) => {
      if(data.distanceFromStart < min){
        min = data.distanceFromStart;
        nodeToVisitData=data;
      }
    })
    return nodeToVisitData;
  }

  //returns 1 if run correctly or -1 if error
  private updateDistances(graph: Graph):number{
    
    if(this.visited.some( (data:NodePathData) => data.node.id == graph.targetId) ){
      return 1;
    }
    else{
      let NodeToVisitData:NodePathData;
      try{
        NodeToVisitData = this.getNodeToVisitData();
        if(!NodeToVisitData){
          throw new TypeError("Target unreachable");
        }
      }
      catch(e){
        this.error=true;
        return -1;
      }
      this.getNeighboursOf(NodeToVisitData.node, graph).forEach((neighbour: Edge) => {
        let neighbourNodeData = this.unvisited.find((data: NodePathData) => data.node == neighbour.nodes[1]);//Get Data of neighbour node
        if(neighbourNodeData){
          let newDist = NodeToVisitData.distanceFromStart + neighbour.weight;
          if (newDist < neighbourNodeData.distanceFromStart) {
            neighbourNodeData.distanceFromStart = newDist;
            neighbourNodeData.previousNode = NodeToVisitData.node;
          }
      }
    });
    this.visited.push(NodeToVisitData);
    this.unvisited = this.unvisited.filter((data: NodePathData) => data != NodeToVisitData);
    this.updateDistances(graph);
  }
    
}

  private findShortestPath(graph:Graph):void{
    let nodeData:NodePathData;
    const targetData = this.visited.find( (data:NodePathData) => data.node.id == graph.targetId);
    this.shortestPath.push(targetData.node);
    nodeData = targetData;
    while(nodeData.previousNode){
      this.shortestPath.push(nodeData.previousNode);
      nodeData=this.visited.find( (data:NodePathData) => data.node == nodeData.previousNode);
    }
    this.shortestPath.reverse();
  }

  run(graph:Graph){
    if(graph.startId!=null && graph.targetId!=null){
      this.initialization(graph);
      this.updateDistances(graph);
      if(this.updateDistances(graph)===1){
        this.findShortestPath(graph);
      }
    }   
  }
}
