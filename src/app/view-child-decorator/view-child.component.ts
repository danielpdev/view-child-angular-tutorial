import {Component, Input, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'example-view-child',
  template: `
    <ng-container [ngSwitch]="activeDirective">
      <select-directive [log]="log" *ngSwitchCase="'select-directive'"></select-directive>
      <select-directive-read [log]="log" *ngSwitchCase="'select-directive-read'">></select-directive-read>
      <select-element [log]="log" 
      *ngSwitchCase="'select-element'"></select-element>
    </ng-container>
    <button (click)="next(activeDirective)">Toggle next</button>

    <pre> {{log | async}}</pre>
  `,
})
export class ParentComponent {
  activeDirective = 'select-directive';
  log = new Subject('');
  directives = [
    'select-directive',
    'select-directive-read',
    'select-element'
  ];
  next(activeDirective: string) {
    const activeDirectiveIndex = this.directives.indexOf(activeDirective);
    this.activeDirective = this.directives[activeDirectiveIndex + 1] ||
    this.directives[0];
  }
}

