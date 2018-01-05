import { RouteNode } from '../../route-node';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
    selector: 'app-navigation-editor-group',
    templateUrl: './navigation-editor-group.component.html',
    styleUrls: ['./navigation-editor-group.component.scss']
})
export class NavigationEditorGroupComponent implements OnInit {

    @Output()
    save: EventEmitter<string[]>;

    @Input()
    public isChildren: boolean;

    @Input()
    public path: RouteNode;

    constructor() {
        this.save = new EventEmitter();
    }

    ngOnInit() {
    }

    private updateName(name: string, index: number): void {
        this.path.children[index].fullName = name;
    }

    private updatePath(path: string, index: number): void {
        this.path.children[index].pathName = path;
    }

    private updateCategory(value: string, index: number): void {
        this.path.children[index].placement = value;
    }

    private newPage(): void {
        this.path.children.push(new RouteNode('name', 'path'));
    }

    private delete(index: number): void {
        this.path.children.splice(index, 1);
    }
}
