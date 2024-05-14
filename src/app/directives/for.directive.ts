import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFor][appForIn]',
})
export class ForDirective {
  @Input() appForIn!: any[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.appForIn?.forEach((item, index) => {
      this.viewContainerRef.createEmbeddedView(this.templateRef, {
        $implicit: item,
        index: index,
        first: index === 0,
        last: index === this.appForIn.length - 1,
        odd: (index + 1) % 2 != 0,
        even: (index + 1) % 2 == 0,
      });
    });
  }
}
