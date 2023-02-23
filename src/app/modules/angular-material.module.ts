import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatDividerModule, MatCardModule, MatInputModule,MatButtonModule,MatTabsModule,MatIconModule],
  exports: [MatDividerModule, MatCardModule, MatInputModule,MatButtonModule,MatTabsModule,MatIconModule],
})
export class AngularMaterialModule {}
