import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { MatIconModule } from '@angular/material/icon';
import { user } from 'src/app/models/user';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  formRoom: any
  formUser: any
  userAllData: any
  userAllDataExport: user []=[]
  roomAllData: any
  getDataUserById: any
  getDataRoomById: any
  searchFilter:any
 
  fileExcelName = "ExcelSheet.xlsx"

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

      })
  }

  ngOnInit() {
    this.getAllUser()
  }

  patchValue(receiveUser: user) {
    this.formUser.patchValue({
      userId: receiveUser.userId,
      userName: receiveUser.userName,
      userAge: receiveUser.userAge,
      userIdCard: receiveUser.userIdCard,
      userRoomNumber: receiveUser.userRoomNumber,
      userTel: receiveUser.userTel,
      userAddress: receiveUser.userAddress,
      userEmail: receiveUser.userEmail,
      userFloorNumber: receiveUser.userFloorNumber
    })
  }



  // ----------------------------------------------Room----------------------------------------------

  getAllRoom() {
    this.callapi.getAllRoom().subscribe(data => {
      this.roomAllData = data;
      console.log(this.roomAllData);
    })
  }
  // ----------------------------------------------User----------------------------------------------

  getAllUser() {
    this.callapi.getAllUser().subscribe(data => {
      this.userAllData = data;
      console.log(this.userAllData);

    })
  }

  getUserById(userId: string) {
    this.callapi.getUserById(userId).subscribe(data => {
      this.getDataUserById = data;
      console.log(this.getDataUserById);
      this.patchValue(this.getDataUserById);
    })
  }

  onCreateUser() {
    if(this.formUser.valid){
      this.callapi.createUser(this.formUser.value).subscribe(data => {
        Swal.fire({
          position: "center",
          icon: 'success',
          title: "เพิ่มสมาชิกสำเร็จ",
          showConfirmButton: false,
          timer: 1000
        })
        console.log(data);
        this.getAllUser();
      })
    }
  }

  onEditUser(userId: string) {
    if(this.formUser.valid){
      this.formUser.value.status = "Open"
      this.callapi.editUser(userId, this.formUser.value).subscribe(data => {
        Swal.fire({
          position: "center",
          icon: 'success',
          title: "แก้ไขสมาชิกสำเร็จ",
          showConfirmButton: false,
          timer: 1000
        })
        console.log(data);
        this.getAllUser();
      })
      for (let room = 0; room < this.roomAllData.length; room++) {
        if (this.formUser.value.userRoomNumber == this.roomAllData[room].roomNumber) {
          this.formUser.value.roomId = this.roomAllData[room].roomId
            this.roomAllData[room].userId = this.formUser.value.roomId 
            this.callapi.editRoom(userId, this.roomAllData[room]).subscribe(i => {
              console.log(i);
              this.getAllRoom();
              // window.location.reload();
            })
            this.getAllRoom();
        }
      }
    }
  }
  onDeleteUser(userId: string) {
    Swal.fire({
      position: 'center',
      text: "ต้องการลบข้อมูลนี้หรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'ใช่, ฉันต้องการลบข้อมูล'
    }).then((result) => {
      if (result.isConfirmed) {
        this.callapi.deleteUser(userId).subscribe(data => { })
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'ลบสำเร็จ',
          showConfirmButton: false,
          timer: 1000
        })
        this.getAllUser();
      }
      
    })
  }

  getAllUserToExport():void {
      let element= document.getElementById('export-data-to-excel');
      const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      XLSX.writeFile(wb, this.fileExcelName);
 
  }

}
