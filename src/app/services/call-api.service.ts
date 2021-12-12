import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { meter } from '../models/meter';
import { room } from '../models/room';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  constructor(public http: HttpClient) { }


  // Room
  public getAllRoom(){
    return this.http.get<room>(`${environment.apiUrl}Room/GetAllRoom`)
  }

  public getRoomById(roomId : string){
    return this.http.get<room>(`${environment.apiUrl}Room/GetRoomById/${roomId}`)
  }

  public createRoom(room : room ){
    return this.http.post<room>(`${environment.apiUrl}Room/CreateRoom`, room)
  }
  public editRoom(roomId : string , room : room){
    return this.http.put<room>(`${environment.apiUrl}Room/EditRoom/${roomId}`,room)
  }
  public deleteRoom(roomId : string){
    return this.http.get<room>(`${environment.apiUrl}Room/DeleteRoom/${roomId}`)
  }

  // User

  public getAllUser(){
    return this.http.get<user>(`${environment.apiUrl}User/GetAllUser`)
  }
  public getUserById(userId : string){
    return this.http.get<user>(`${environment.apiUrl}User/GetUserById/${userId}`)
  }
  public createUser(user : user ){
    return this.http.post<user>(`${environment.apiUrl}User/CreateUser`, user)
  }
  public editUser(userId : string , user : user){
    return this.http.put<user>(`${environment.apiUrl}User/EditUser/${userId}`,user)
  }
  public deleteUser(userId : string){
    return this.http.get<user>(`${environment.apiUrl}User/DeleteUser/${userId}`)
  }
  // Meter

  public getAllMeter(){
    return this.http.get<meter>(`${environment.apiUrl}Meter/GetAllMeter`)
  }
  public getMeterById(meterId : string){
    return this.http.get<meter>(`${environment.apiUrl}Meter/GetMeterById/${meterId}`)
  }
  public createMeter(meter : meter ){
    return this.http.post<meter>(`${environment.apiUrl}Meter/CreateMeter`, meter)
  }
  public editMeter(meterId : string , meter : meter){
    return this.http.put<meter>(`${environment.apiUrl}Meter/EditMeter/${meterId}`,meter)
  }
  public deleteMeter(meterId : string){
    return this.http.get<meter>(`${environment.apiUrl}Meter/DeleteMeter/${meterId}`)
  }

}
