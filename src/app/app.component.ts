import {
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('tmpl') tmpl!: TemplateRef<any>;
  @ViewChild('entry', { read: ViewContainerRef }) entry!: ViewContainerRef;

  isShowContent = true;
  item = 1;

  increase() {
    this.item++;
  }
  decrease() {
    if (this.item == 1) {
      return;
    }
    this.item--;
  }
  reset() {
    this.item = 1;
  }

  toggle() {
    this.isShowContent = !this.isShowContent;
  }
  show() {
    this.entry.createEmbeddedView(this.tmpl, {
      $implicit: 'Kyo',
      age: 24,
    });
  }
}
