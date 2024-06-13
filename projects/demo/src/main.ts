import { bootstrapApplication } from '@angular/platform-browser';

import { provideStorage } from '../../storage-signal/src/lib';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideStorage(localStorage)],
}).catch((err) => console.error(err));
