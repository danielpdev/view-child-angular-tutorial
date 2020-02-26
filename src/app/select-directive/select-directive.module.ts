
import { AfterViewInit, Component, Directive, ViewChild, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Directive({selector: 'child-directive'})
class ChildDirective {
  @Input() id! :number;
  public childName = 'childName';
  ngAfterViewInit() {
    console.log("ngAfterViewInit child");
  }
}

@Component({
  selector: 'select-directive',
  template: `
    <child-directive id="1"></child-directive>
  `
})
class SelectDirectiveComponent implements AfterViewInit {
  @ViewChild(ChildDirective, { static: false}) child: ChildDirective;
  @Input('log')
  set logger(log) {
    this._log = log;
    setTimeout(() => {
      this._log.next(this.logging.join(' -> \n'));
    })
  } 
  _log!: Subject<string>;
  logging = ['Select directive'];
  ngOnInit() {
    this.logging.push(`ngOnInit, ${this.child}`);
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
    SelectDirectiveComponent, 
    ChildDirective
  ],
  exports: [
    SelectDirectiveComponent
  ]
})
export class SelectDirectiveModule{}