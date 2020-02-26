
import { AfterViewInit, Component, Directive, ViewChild, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'select-element',
  template: `
    <div #div>
    </div>
  `
})
class SelectElementComponent implements AfterViewInit {
  @ViewChild('div', { static: true}) child: HTMLElement;
  @Input('log')
  set logger(log) {
    this._log = log;
    setTimeout(() => {
      this._log.next(this.logging.join(' -> \n'));
    })
  } 
  _log!: Subject<string>;
  logging = ['Select element'];
  ngOnInit() {
     this.logging.push(`ngOnInit, ${JSON.stringify(this.child)}`);
  }

  ngAfterViewInit() {
    this.logging.push(`ngAfterViewInit, ${JSON.stringify(this.child)}`);
  }
}


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SelectElementComponent, 
  ],
  exports: [
    SelectElementComponent
  ]
})
export class SelectElementModule{}