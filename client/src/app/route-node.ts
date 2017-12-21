export class RouteNode {
    public children: RouteNode[];

    constructor(public fullName: string, public pathName: string, public placement?: string) {
        this.children = [];
    }
}
