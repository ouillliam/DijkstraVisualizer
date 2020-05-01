import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { TestBed } from '@angular/core/testing';
import { CanvasComponent } from '../canvas/canvas.component';
import { DijkstraService } from '../../services/dijkstra.service';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  @ViewChild("canvasComponent") canvasComponent: CanvasComponent;

  clickStateValue:string;
  toPlace:string;

  constructor(private dijkstraService:DijkstraService) { }

  ngOnInit(): void {
  }

  onClickStateChange(clickStateChange:MatButtonToggleChange){
    let newClickStateValue:string = clickStateChange.value;
    this.clickStateValue = newClickStateValue;
  }

  onToPlaceEvent(event:string){
    this.toPlace = event;
  }

}
