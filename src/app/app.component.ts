

import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'form';
  myForm: any;

  constructor(public fb: FormBuilder,private http: HttpClient, private route:Router){}

  ngOnInit(): void {
  
}








adr(){
  this.route.navigate(["/displayform"]);

}
fr(){
  this.route.navigate(['/form']);
}
}
