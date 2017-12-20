export class RouteNode {
    public children: RouteNode[];

    constructor(public fullName: String, public pathName: String) {
        this.children = [];
    }
}
