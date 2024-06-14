import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './atomic-design/atom/input/input.component';
import { ButtonComponent } from './atomic-design/atom/button/button.component';
import { RoomGameComponent } from './pages/room-game/room-game.component';
import { CreateUserComponent } from './atomic-design/templates/create-user/create-user.component';
import { InputRadioComponent } from './atomic-design/atom/input-radio/input-radio.component';
import { CardComponent } from './atomic-design/atom/card/card.component';
import { InvitePlayersModalComponent } from './atomic-design/templates/invite-players-modal/invite-players-modal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GivePermissionModalComponent } from './atomic-design/templates/give-permission-modal/give-permission-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './atomic-design/atom/notification/notification.component';
import { ClipboardModule } from 'ngx-clipboard';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    CreateRoomComponent,
    InputComponent,
    ButtonComponent,
    RoomGameComponent,
    CreateUserComponent,
    InputRadioComponent,
    CardComponent,
    InvitePlayersModalComponent,
    GivePermissionModalComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ClipboardModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
