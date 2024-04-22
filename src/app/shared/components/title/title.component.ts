import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  templateUrl: './title.component.html',
})
export class TitleComponent {
  /** Variables globales */
  @Input() tittle!: string;
}
