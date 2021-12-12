import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { meter } from 'src/app/models/meter';
import { room } from 'src/app/models/room';
import { user } from 'src/app/models/user';
import { CallApiService } from 'src/app/services/call-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-plan',
  templateUrl: './room-plan.component.html',
  styleUrls: ['./room-plan.component.css']
})


export class RoomPlanComponent implements OnInit {
  _true: boolean = true
  roomAllData: any
  userAllData: any
  formRoom: any
  formUser: any
  formMeter: any
  getDataRoomById: any
  getDataUserById: user[] = []
  getDataMeterById: meter[] = []
  apply: boolean = false;
  checkStatus = "ว่าง"
  roomNumber: any
  roomUserName: any

  emptyRoom = "ว่าง"
  busyRoom = "ไม่ว่าง"
  constructor(public router: Router, public callapi: CallApiService, public fb: FormBuilder) {

    this.formRoom = fb.group({
      roomId: [null],
      roomNumber: [null],
      roomStatus: [null],
      roomFloorNumber: [null],
      userId: [null],
      status: [null]
    }),
      this.formUser = fb.group({
        userId: [null],
        userName: [null],
        userAge: [0],
        userIdCard: [0],
        userRoomNumber: [null],
        userTel: [null],
        userAddress: [null],
        userEmail: [null],
        userFloorNumber: [0],
        roomId: [null]
      }),
      this.formMeter = fb.group({
        meterId: [null],
        meterWater: [0],
        meterPower: [0],
        meterPreviousWater: [0],
        meterPreviousPower: [0],
        meterUnitWater: [0],
        meterUnitPower: [0],
        meterStatus: [null],
        selectMonth: [null],
        roomId: [null],
        status: [null]
      })

  }

  ngOnInit() {
    this.getAllRoom();
    this.getAllUser();
  }

  changeTrueFalse() {
    if (this.apply == false) {
      this.apply = true
    }
  }

  patchValue(receiveRoomId: room) {
    this.formRoom.patchValue({
      roomId: receiveRoomId.roomId,
      roomNumber: receiveRoomId.roomNumber,
      roomStatus: receiveRoomId.roomStatus,
      roomFloorNumber: receiveRoomId.roomFloorNumber,
      userId: receiveRoomId.userId,
      status: receiveRoomId.status
    })
  }

  emptyFormRoom() {
    this.formRoom.patchValue({
      roomId: "",
      roomNumber: "",
      roomStatus: "",
      roomFloorNumber: "",
      userId: "",
      status: ""
    })
  }
  emptyFormUser() {
    this.formUser.patchValue({
      userId: "",
      userName: "",
      userAge: 0,
      userIdCard: 0,
      userTel: "",
      userAddress: "",
      userEmail: "",
      userFloorNumber: 0,
      userRoomNumber: "",
      roomId: ""
    })
  }

  filter(data : string){
    
  }

  // --------------------------------------------Room------------------------------------------------

  getAllRoom() {
    this.callapi.getAllRoom().subscribe(data => {
      this.roomAllData = data;
      console.log(this.roomAllData);
    })
  }

  checkRoomIsEmpty() {

  }

  getRoomById(roomId: string) {
    this.callapi.getRoomById(roomId).subscribe(data => {
      this.getDataRoomById = data;
      console.log(this.getDataRoomById);
      this.roomNumber = data.roomNumber;
      this.patchValue(this.getDataRoomById);

      for (let user = 0; user < this.userAllData.length; user++) {
        if (this.userAllData[user].userId == data.userId) {
          this.roomUserName = this.userAllData[user].userName
        } else {
          this.roomUserName = null
        }
      }
    })
    console.log(this.roomUserName);
    this.getAllUser();
  }



  onCreateRoom() {
    this.callapi.createRoom(this.formRoom.value).subscribe(data => {
      console.log(data);
      this.formMeter.value.roomId = data.roomId;
      this.callapi.createMeter(this.formMeter.value).subscribe(i => {
        console.log(i);
        this.formRoom.value = data
        this.formRoom.value.meterId = i.meterId
        this.callapi.editRoom(data.roomId, this.formRoom.value).subscribe(j => {
          console.log(j);
          this.getAllRoom();
        })
        this.emptyFormRoom();
      })
      this.getAllRoom();
    })
    // this.callapi.createMeter(this.formMeter.value).subscribe(data => {
    //   console.log(data);
    //   this.formRoom.value.meterId = data.meterId;
    //   this.callapi.createRoom(this.formRoom.value).subscribe(i => {
    //     console.log(i);
    //     this.getAllRoom();
    //     //  window.location.reload();
    //   })
    // })
    //  this.emptyFormRoom();

  }

  onEditRoom(roomId: string) {
    this.callapi.editRoom(roomId, this.formRoom.value).subscribe(data => {
      Swal.fire({
        position: "center",
        icon: 'success',
        title: "สำเร็จ",
        showConfirmButton: false,
        timer: 1000
      })
      this.emptyFormRoom();
      console.log(this.formRoom.value);
      this.getAllRoom();
    })
  }

  onDeleteRoom(roomId: string, meterId: string) {
    this.callapi.deleteMeter(meterId).subscribe(i => {
      console.log("ลบแล้ว");
      this.callapi.deleteRoom(roomId).subscribe(data => {
        Swal.fire({
          position: "center",
          icon: 'success',
          title: "ลบห้องสำเร็จ",
          showConfirmButton: false,
          timer: 1000
        })
        console.log("ลบแล้ว");
        this.getAllRoom();
      })

    })
  }

  // ----------------------------------------------User----------------------------------------------

  getAllUser() {
    this.callapi.getAllUser().subscribe(data => {
      this.userAllData = data;
      console.log(this.userAllData);
    })
  }

  onCreateUser() {
    console.log(this.formUser.value);
    this.formUser.value.userRoomNumber = this.roomNumber;
    for (let room = 0; room < this.roomAllData.length; room++) {
      if (this.formUser.value.userRoomNumber == this.roomAllData[room].roomNumber) {
        this.formUser.value.roomId = this.roomAllData[room].roomId
        this.callapi.createUser(this.formUser.value).subscribe(data => {
          Swal.fire({
            position: "center",
            icon: 'success',
            title: "เพิ่มสมาชิกสำเร็จ",
            showConfirmButton: false,
            timer: 1000
          })
          console.log(data);
          this.roomAllData[room].userId = data.userId
          this.roomAllData[room].roomStatus = "ไม่ว่าง"
          this.callapi.editRoom(this.roomAllData[room].roomId, this.roomAllData[room]).subscribe(i => {
            console.log(i);
            this.getAllRoom();
            this.getAllUser();
            this.emptyFormRoom();
            this.emptyFormUser();
            // window.location.reload();
          })
        })
      }
    }
  }
}