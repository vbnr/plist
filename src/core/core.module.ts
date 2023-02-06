import { NgModule } from '@angular/core';
import { SaveResourceUrlPipe } from './pipes/save-resource-url.pipe';
import { SubStrPipe } from './pipes/sub-str.pipe';

@NgModule({
  declarations: [SubStrPipe, SaveResourceUrlPipe],
  exports: [SubStrPipe, SaveResourceUrlPipe],
})
export class CoreModule {}
