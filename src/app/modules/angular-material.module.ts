import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatDividerModule, MatCardModule, MatInputModule,MatButtonModule,MatTabsModule,MatIconModule,MatProgressBarModule,MatDialogModule],
  exports: [MatDividerModule, MatCardModule, MatInputModule,MatButtonModule,MatTabsModule,MatIconModule,MatProgressBarModule,MatDialogModule],
})
export class AngularMaterialModule {}
