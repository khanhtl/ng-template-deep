import {
  Directive,
  Input,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appSwitchCase]',
})
export class SwitchCaseDirective {
  value: any;

  @Input() set appSwitchCase(value: any) {
    this.value = value;
    this._switchDirective.addCase(value);
    this._viewContainerRef.clear();
    if (this._switchDirective.value === this.value) {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
  }
  constructor(
    private _templateRef: TemplateRef<any>,
    private _switchDirective: SwitchDirective,
    private _viewContainerRef: ViewContainerRef
  ) {}
}

@Directive({
  selector: '[appSwitchDefault]',
})
export class SwitchDefaultDirective {
  constructor(
    private _templateRef: TemplateRef<any>,
    private _switchDirective: SwitchDirective,
    private _viewContainerRef: ViewContainerRef
  ) {}
  ngOnInit() {
    this._viewContainerRef.clear();
    let isDefaultCase = this._switchDirective.cases.every(
      (value) => value !== this._switchDirective.value
    );
    this._viewContainerRef.clear();
    if (isDefaultCase) {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
  }
}

@Directive({
  selector: '[appSwitch]',
})
export class SwitchDirective {
  value: any;
  @Input() set appSwitch(value: any) {
    this.value = value;
    this._viewContainerRef.clear();
    this._viewContainerRef.createEmbeddedView(this._templateRef);
  }
  cases: any[] = [];

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainerRef: ViewContainerRef
  ) {}
  addCase(value: any) {
    this.cases.push(value);
  }
}
