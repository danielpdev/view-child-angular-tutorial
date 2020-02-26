
import { AfterViewInit, Component, Directive, ViewChild, Input, NgModule, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { InjectionToken, Inject } from '@angular/core';
export const TestInjectable = new InjectionToken<Inject>('someToken');

interface InjectValue {
  val: string;
}
@Directive({selector: 'child-directive',
providers:[{ provide: TestInjectable, useValue: {val: 'someValue'}}]})
class ChildDirective {
  @Input() id! :number;
  public childName = 'childName';
  ngAfterViewInit() {
    console.log("ngAfterViewInit child");
  }
}

@Component({
  selector: 'select-directive-read',
  template: `
    <child-directive id="1"></child-directive>
  `
})
class SelectDirectiveReadComponent implements AfterViewInit {
  @ViewChild(ChildDirective, { read: TestInjectable}) child: Inject;
  @ViewChild(ChildDirective, { read: ElementRef}) childTypeElementRef: ElementRef;
  @ViewChild(ChildDirective, { read: ChildDirective}) childTypeChildrenDirective: ChildDirective;
  @Input('log')
  set logger(log) {
    this._log = log;
    setTimeout(() => {
      this._log.next(this.logging.join(' -> \n'));
    })
  } 
  _log!: Subject<string>;
  logging = ['Select directive read'];
  constructor() {

  }
  ngAfterViewInit() {
    this.logging.push(`ngAfterViewInit, ${JSON.stringify(this.child)}`);
    this.logging.push(`ngAfterViewInit, ${JSON.stringify(this.childTypeElementRef)}`);
    this.logging.push(`ngAfterViewInit, ${JSON.stringify( this.childTypeChildrenDirective)}`);
  }
}


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SelectDirectiveReadComponent, 
    ChildDirective
  ],
  exports: [
    SelectDirectiveReadComponent
  ]
})
export class SelectDirectiveReadModule{}