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
  show() {
    this.entry.createEmbeddedView(this.tmpl, {
      $implicit: 'Kyo',
      age: 24,
    });
  }
}
