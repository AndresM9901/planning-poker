import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { RoomGameComponent } from './pages/room-game/room-game.component';

const routes: Routes = [
  {
    path: 'create-room',
    component: CreateRoomComponent
  },
  {
    path: 'room-game/:id',
    component: RoomGameComponent
  },
  {
    path: '**',
    redirectTo: 'create-room',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
