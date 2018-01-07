import { Type } from '@angular/core';
import { ProgramEditorComponent } from './modular-page-editor/dynamic/program-editor/program-editor.component';
import { GenericTextEditorComponent } from './generic-text/generic-text-editor.component';
import { DynamicEditorComponent } from './modular-page-editor/dynamic/dynamic-editor.component';


export const ADMIN_COMPONENTS = new Map<string, Type<DynamicEditorComponent>>([
    ['Programme', ProgramEditorComponent],
    ['Texte', GenericTextEditorComponent]
]);

export const DEFAULT_MODULE = 'Texte';