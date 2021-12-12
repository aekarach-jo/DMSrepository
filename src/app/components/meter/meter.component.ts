import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { meter } from 'src/app/models/meter';
import { room } from 'src/app/models/room';
import { CallApiService } from 'src/app/services/call-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.css']
})
export class MeterComponent implements OnInit {
  roomAllData: any;
  meterAllData: any;
  formMeter: any;
  getDataMeterByid: any;
  getDataRoomById: any;
  showRoomNumber: any;
  showRoomNumberOnCard: any;
  roomDataForLoop: any;
  totalWaterPrice: any;
  totalPowerPrice: any;

  formMulti: any
  showFormMulti: any[] = []

  recorded = "recorded"
  unrecorded = "unrecorded"

  constructor(public callapi: CallApiService, public fb: FormBuilder, public router: Router) {
    this.formMeter = fb.group({
      meterId: [null],
      meterWater: [null],
      meterPower: [null],
      meterPreviousWater: [null],
      meterPreviousPower: [null],
      meterUnitWater: [null],
      meterUnitPower: [null],

      selectMonth: Date,
      roomId: [null],
      status: [null]
    })
  }

  ngOnInit() {
    this.getAllRoom();

  }

  patchValue(receiveMeter: meter) {
    this.formMeter.patchValue({
      meterId: receiveMeter.meterId,
      meterWater: receiveMeter.meterWater,
      meterPower: receiveMeter.meterPower,
      meterPreviousWater: receiveMeter.meterPreviousWater,
      meterPreviousPower: receiveMeter.meterPreviousPower,
      meterUnitWater: receiveMeter.meterUnitWater,
      meterUnitPower: receiveMeter.meterUnitPower,
      meterStatus: receiveMeter.meterStatus,
      selectMonth: receiveMeter.selectMonth,
      roomId: receiveMeter.roomId,
      status: receiveMeter.status
    })
  }
  emptyMeter() {
    this.formMeter.patchValue({
      meterId: "",
      meterWater: 0,
      meterPower: 0,
      meterPreviousWater: 0,
      meterPreviousPower: 0,
      meterUnitWater: 0,
      meterUnitPower: 0,
      meterStatus: "",
      selectMonth: Date,
      roomId: "",
      status: ""
    })
  }

  calculateMeter() {
    this.getDataMeterByid.meterUnitWater = this.formMeter.value.meterWater - this.formMeter.value.meterPreviousWater
    this.getDataMeterByid.meterUnitPower = this.formMeter.value.meterPower - this.formMeter.value.meterPreviousPower
    this.totalWaterPrice = this.getDataMeterByid.meterUnitWater * 20;
    this.totalPowerPrice = this.getDataMeterByid.meterUnitPower * 5;
    console.log(this.getDataMeterByid.meterUnitWater);
    console.log(this.getDataMeterByid.meterUnitPower);
    this.patchValue(this.getDataMeterByid)
  }
  // --------------------------------------------Room------------------------------------------------

  getAllRoom() {
    this.callapi.getAllRoom().subscribe(data => {
      this.roomAllData = data;
      this.roomDataForLoop = data;
      console.log(this.roomDataForLoop);
      this.getAllMeter()
    })
  }

  getRoomById(roomId: string) {
    this.callapi.getRoomById(roomId).subscribe(data => {
      this.getDataRoomById = data;
      console.log(this.getDataRoomById);
      this.patchValue(this.getDataRoomById)
    })
  }

  // --------------------------------------------Meter------------------------------------------------

  getAllMeter() {
    this.callapi.getAllMeter().subscribe(data => {
      this.meterAllData = data
      console.log(data);
    })
  }
  getMeterById(meterId: string) {
    this.callapi.getMeterById(meterId).subscribe(data => {
      this.getDataMeterByid = data;
      this.patchValue(this.getDataMeterByid)
      console.log(this.showRoomNumber);
      console.log(this.getDataMeterByid);
      for (let index = 0; index < this.roomDataForLoop.length; index++) {
        console.log(this.roomDataForLoop);
        if (this.roomDataForLoop[index].roomId == this.getDataMeterByid.roomId) {
          this.showRoomNumber = this.roomDataForLoop[index].roomNumber
          console.log(this.showRoomNumber);

        }
      }
    })
  }

  onEditMeter() {
    // this.formMeter.value.meterUnitWater = this.formMeter.value.meterWater - this.formMeter.value.meterPreviousWater
    // this.formMeter.value.meterUnitPower = this.formMeter.value.meterPower - this.formMeter.value.meterPreviousPower
    console.log(this.formMeter.value.meterId);
    this.formMeter.value.meterStatus = "recorded"
    this.callapi.editMeter(this.formMeter.value.meterId, this.formMeter.value).subscribe(data => {
      Swal.fire({
        position: "center",
        icon: 'success',
        title: "บันทึกแล้ว",
        showConfirmButton: false,
        timer: 1000
      })
      console.log("OK");
      this.getAllRoom();
    })
    // window.location.reload();
  }

}

