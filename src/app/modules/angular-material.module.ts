import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatDividerModule, MatCardModule, MatInputModule],
  exports: [MatDividerModule, MatCardModule, MatInputModule],
})
export class AngularMaterialModule {}
