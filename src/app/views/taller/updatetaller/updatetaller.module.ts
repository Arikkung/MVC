import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateuserPageRoutingModule } from './updatetaller-routing.module';

import { UpdatetallerPage } from './updatetaller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateuserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdatetallerPage]
})
export class UpdateuserPageModule {}
