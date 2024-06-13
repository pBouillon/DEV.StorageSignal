import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fromStorage } from '../../../storage-signal/src/lib/from-storage.function';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div>
      <article [attr.data-theme]="preferredTheme1()">
        <header><code>preferredTheme1</code> signal</header>
        <code>preferredTheme1: {{ preferredTheme1() | json }}</code>
        <footer>
          <button (click)="togglePreferredTheme()">Toggle theme</button>
        </footer>
      </article>

      <article [attr.data-theme]="preferredTheme2()">
        <header><code>preferredTheme2</code> signal</header>
        <code>preferredTheme2: {{ preferredTheme2() | json }}</code>
        <footer>
          <button (click)="togglePreferredTheme()">Set white theme</button>
        </footer>
      </article>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly preferredTheme1 = fromStorage('preferred-theme');
  togglePreferredTheme(): void {
    this.preferredTheme1.update(current => current === 'light' ? 'dark' : 'light');
  }

  readonly preferredTheme2 = fromStorage('preferred-theme');
  setLightTheme(): void {
    this.preferredTheme2.set('light');
  }
}
