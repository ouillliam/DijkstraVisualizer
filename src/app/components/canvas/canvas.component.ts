import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CanvasService } from '../../services/canvas-service.service';
import { GraphService } from '../../services/graph-service.service';
import { DijkstraService } from '../../services/dijkstra.service';
import {GridCanvas} from '../../models/GridCanvas';
import {Graph} from '../../models/Graph';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { AnimatePathService } from 'src/app/services/animate-path.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit {


  @Input() clickState:string;

  @Output() toPlaceEmitter: EventEmitter<string> = new EventEmitter();


  grid:GridCanvas;
  graph:Graph;
  mousePressed:boolean;
  lastClickedNode:number;
 

  constructor(private canvasService:CanvasService,
              private graphService:GraphService,
              private dijkstraService:DijkstraService,
              private animateService:AnimatePathService) { }

  ngOnInit(): void {

    this.grid = new GridCanvas(20);
    this.graph = new Graph(this.grid);
    this.canvasService.updateCanvas(this.grid,this.graph)
    this.canvasService.updateToPlace(this.graph,this.toPlaceEmitter)

    
  }

  onMouseDown(event:MouseEvent){
    
    this.lastClickedNode = this.canvasService.updateNode(this.grid,this.graph,event,this.clickState);
    this.canvasService.updateCanvas(this.grid,this.graph);
    this.canvasService.updateToPlace(this.graph,this.toPlaceEmitter);
    this.animateService.clearTimeouts();
    this.mousePressed = true;

    
  }

  onMouseMove(event:MouseEvent){

    let currNode = this.graph.nodes[Math.floor(event.offsetY/this.grid.cellSize)][Math.floor(event.offsetX/this.grid.cellSize)].id;
    if(this.mousePressed && currNode != this.lastClickedNode){
      this.lastClickedNode = this.canvasService.updateNode(this.grid,this.graph,event,this.clickState);
      this.canvasService.updateCanvas(this.grid,this.graph);
      this.canvasService.updateToPlace(this.graph,this.toPlaceEmitter);
      this.animateService.clearTimeouts();

    }
  }

  onMouseUp(event:MouseEvent){
    this.mousePressed = false;
  }

  clear(){
    this.canvasService.clearCanvas(this.graph);
    this.canvasService.updateCanvas(this.grid,this.graph);
    this.animateService.clearTimeouts();
  }

  visualizeDijkstra(){
    this.dijkstraService.run(this.graph);
    console.log(this.dijkstraService.shortestPath);
    this.animateService.speed=10;
    this.animateService.animateAlgorithm(this.grid,this.dijkstraService.visited,this.dijkstraService.shortestPath);
   
  }

}
