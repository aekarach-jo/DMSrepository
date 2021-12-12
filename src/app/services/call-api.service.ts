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
    return this.http.get<room>(`https://localhost:5001/api/Room/GetAllRoom`)
  }

  public getRoomById(roomId : string){
    return this.http.get<room>(`https://localhost:5001/api/Room/GetRoomById/${roomId}`)
  }

  public createRoom(room : room ){
    return this.http.post<room>(`https://localhost:5001/api/Room/CreateRoom`, room)
  }
  public editRoom(roomId : string , room : room){
    return this.http.put<room>(`https://localhost:5001/api/Room/EditRoom/${roomId}`,room)
  }
  public deleteRoom(roomId : string){
    return this.http.get<room>(`https://localhost:5001/api/Room/DeleteRoom/${roomId}`)
  }

  // User

  public getAllUser(){
    return this.http.get<user>(`https://localhost:5001/api/User/GetAllUser`)
  }
  public getUserById(userId : string){
    return this.http.get<user>(`https://localhost:5001/api/User/GetUserById/${userId}`)
  }
  public createUser(user : user ){
    return this.http.post<user>(`https://localhost:5001/api/User/CreateUser`, user)
  }
  public editUser(userId : string , user : user){
    return this.http.put<user>(`https://localhost:5001/api/User/EditUser/${userId}`,user)
  }
  public deleteUser(userId : string){
    return this.http.get<user>(`https://localhost:5001/api/User/DeleteUser/${userId}`)
  }
  // Meter

  public getAllMeter(){
    return this.http.get<meter>(`https://localhost:5001/api/Meter/GetAllMeter`)
  }
  public getMeterById(meterId : string){
    return this.http.get<meter>(`https://localhost:5001/api/Meter/GetMeterById/${meterId}`)
  }
  public createMeter(meter : meter ){
    return this.http.post<meter>(`https://localhost:5001/api/Meter/CreateMeter`, meter)
  }
  public editMeter(meterId : string , meter : meter){
    return this.http.put<meter>(`https://localhost:5001/api/Meter/EditMeter/${meterId}`,meter)
  }
  public deleteMeter(meterId : string){
    return this.http.get<meter>(`https://localhost:5001/api/Meter/DeleteMeter/${meterId}`)
  }

}
