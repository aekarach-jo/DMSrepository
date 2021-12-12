import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { room } from './models/room';
import { user } from './models/user';
import { CallApiService } from './services/call-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DMSweb';


  ngOnInit() {
  
    
  }
}

