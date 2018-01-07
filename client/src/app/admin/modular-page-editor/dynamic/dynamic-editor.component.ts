import { Subject } from 'rxjs/Subject';

export abstract class DynamicEditorComponent {
    context: any;
    contextModifiedEmitter: Subject<boolean>;
}
