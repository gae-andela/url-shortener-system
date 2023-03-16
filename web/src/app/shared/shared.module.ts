import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { TruncatePipe } from '@src/shared/pipes';
import { CopyClipboardBtnComponent } from '@src/shared/components';

@NgModule({
  declarations: [TruncatePipe, CopyClipboardBtnComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgChartsModule,
  ],
  exports: [
    // Modules
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgChartsModule,

    // Pipes
    TruncatePipe,

    // Components
    CopyClipboardBtnComponent,
  ],
})
export class SharedModule {}
