import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowMenuComponent } from './receive-orders/show-menu/show-menu.component';


const routes: Routes = [
  {path:'',component : ShowMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
