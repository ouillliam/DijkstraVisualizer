import { Node } from "./Node"

export interface NodePathData{
    node:Node;
    distanceFromStart:number;
    previousNode:Node;

}