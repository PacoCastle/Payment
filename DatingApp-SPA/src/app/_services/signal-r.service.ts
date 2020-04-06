import { Injectable, EventEmitter } from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { Plc } from '../_models/plc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class SignalRService {
  
  baseUrl = environment.apiUrl+'signalHub';
  private hubConnection: signalR.HubConnection;
  signalReceived = new EventEmitter<Plc>();

  constructor() {
    this.buildConnection();
    this.startConnection();
  }

  private buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder() 
    
    //var comillaSimple =`mi texto en comilla Simple  es '${texto}'`;
      .withUrl("/signalHub") //use your api adress here and make sure you use right hub name.
      .configureLogging(signalR.LogLevel.Information)
      //.withUrl("http://localhost:5000/signalHub")      
      .build();
  };

  private startConnection = () => {
    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection Started...");
        this.registerSignalEvents();
      })
      .catch(err => {
        console.log("Error while starting connection: " + err);

        //if you get error try to start connection again after 3 seconds.
        setTimeout(function() {
          this.startConnection();
        }, 3000);
      });
  };

  private registerSignalEvents() {
    this.hubConnection.on("SignalMessageReceived", (data: Plc) => {
      this.signalReceived.emit(data);
    });
  }
}
