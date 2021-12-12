import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { RoomPlanComponent } from './components/room-plan/room-plan.component';
import { MeterComponent } from './components/meter/meter.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  // { path: '' , redirectTo: 'room-plan', pathMatch: 'full'},
  { path: 'room-plan', component: RoomPlanComponent},
  { path: 'meter', component: MeterComponent},
  { path: 'user', component: UserComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
