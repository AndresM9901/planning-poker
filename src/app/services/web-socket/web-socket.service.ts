import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socketStatus: boolean = false;

  constructor(private socket: Socket) { }

  checkStatus(): void {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

    this.socket.on('connect_error', (event: any) => {
      console.log(`No se pudo conectar al servidor. ${event}`);
    });
  }

  emitEvent(event: string, data?: any, callback?: Function): void {
    this.socket.emit(event, data, callback);
  }

  listenEvent(event: string): any {
    return this.socket.fromEvent(event);
  }
}
