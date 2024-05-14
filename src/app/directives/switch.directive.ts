import {
  Directive,
  Input,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';

interface Case {
  view: TemplateRef<any>;
  value: any;
}

@Directive({
  selector: '[appSwitchCase]',
})
export class SwitchCaseDirective {
  @Input() set appSwitchCase(value: any) {
    this._switchDirective.addCase({
      view: this._templateRef,
      value: value,
    });
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
    this._switchDirective.addCase({
      view: this._templateRef,
      value: undefined,
    });
  }
}

@Directive({
  selector: '[appSwitch]',
})
export class SwitchDirective {
  value: any;
  @Input() set appSwitch(value: any) {
    this.value = value;
  }
  cases: Case[] = [];

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainerRef: ViewContainerRef
  ) {}

  addCase(item: Case) {
    this.cases.push(item);
  }

  updateView() {
    const activeCases = this.cases.filter((item) => item.value === this.value);
    if (activeCases.length) {
      activeCases.forEach((activeCase) => {
        this._viewContainerRef.createEmbeddedView(activeCase.view);
      });
      return;
    }
    const defaultCase = this.cases.find((item) => !item.value);
    if (defaultCase) {
      this._viewContainerRef.createEmbeddedView(defaultCase.view);
    }
  }

  ngOnInit(): void {
    this._viewContainerRef.createEmbeddedView(this._templateRef);
  }

  ngAfterViewInit(): void {
    this.updateView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['appSwitch'].firstChange) {
      this._viewContainerRef.clear();
      this.updateView();
    }
  }
}
