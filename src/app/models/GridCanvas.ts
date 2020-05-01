export class GridCanvas{
    

    cellSize:number;
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D;
    row:number;
    col:number;

    constructor(cellSize:number){
        this.cellSize = cellSize;
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.col = this.canvas.width/cellSize;
        this.row = this.canvas.height/cellSize;
    }

}