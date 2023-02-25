import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field/form-field.component';
import { AngularMaterialModule } from 'src/app/modules/angular-material.module';



@NgModule({
  declarations: [
    FormFieldComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class SharedModule { }
