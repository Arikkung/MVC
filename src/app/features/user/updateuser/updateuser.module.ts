import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateuserPageRoutingModule } from './updateuser-routing.module';

import { UpdateuserPage } from './updateuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateuserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateuserPage]
})
export class UpdateuserPageModule {}
