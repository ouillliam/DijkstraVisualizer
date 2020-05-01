import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-node-menu',
  templateUrl: './node-menu.component.html',
  styleUrls: ['./node-menu.component.css']
})
export class NodeMenuComponent implements OnInit {


  @Output() clickStateOutput: EventEmitter<MatButtonToggleChange> = new EventEmitter();

  clickStates:string[] = ["Start Node","Target Node","Wall"];


  constructor() { }

  ngOnInit(): void {
  }


  setClickState(changeEvent:MatButtonToggleChange){
    this.clickStateOutput.emit(changeEvent);
  }

}
