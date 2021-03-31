import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { DatapassingService } from '../datapassing.service';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment';
import { DecimalPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm: any = [];
  images: any = [];
  image: any = [];
  selectedState: any;
  cities: any = [];
  states: any = [];
  citiess: any = [];
  birthdate: any;
  age: any;

  abc: any;
  state: any = [];
  myDateValue: any;
  minDate: any;
  maxDate:any;
  string: any;
  toastRef: any;


  constructor(public passing: DatapassingService, public route: Router, public fb: FormBuilder, public http: HttpClient, private decimalPipe: DecimalPipe, public toastr: ToastrService) {
    this.getStates();
    // this.getCity();

  }

  ngOnInit(): void {
    // this.toastr.success('Hello world!', 'Toastr fun!');
    this.myDateValue = new Date();
    this.myForm = this.fb.group({
      'middlename': new FormControl('', Validators.required),
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'address':  new FormControl('', Validators.required),
      'mobile': new FormControl('', [Validators.required, Validators.pattern("(?:(?:\\+|0{0,2})91(\\s*[\\- ]\\s*)?|[0 ]?)?[6789]\\d{9}|(\\d[ -]?){10}\\d")]),
      'zip':  new FormControl('', [Validators.required,Validators.minLength(6), Validators.maxLength(6)]),
      'birthday':  new FormControl('', Validators.required),
      'city':  new FormControl('', Validators.required),
      'state':  new FormControl('', Validators.required),
      
      'marks':  new FormControl('', Validators.required),
      'total':  new FormControl('', Validators.required),
      'percentage': '',
      'age': '',
      'prefix': '',
      'bloodgroup':'',
      'height': '',
      'weight':''

    })

  }

  onSubmit() {
    console.log(this.myForm.value);
    const formdatagg = new FormData();
    // formdatagg.append('formData',  body)
    var body = {
      data: this.myForm.value,
      image: this.image.url
    }
    console.log(this.image)
    // formdatagg.append('formData',this.myForm.value.birthday)

    this.http.post<any>('http://localhost:3000/savedata', body).subscribe(data => {



    })
    //  console.log(formdata)
    //  const formdata= new FormData();

    //   for(var i=0;i<  this.images.length;i++){
    //     formdata.append('files', this.images[i]);
    //   }

    // console.log(formdata)
    //   this.http.post<any>('http://localhost:3000/uploadimage', formdata)
    //   .subscribe(
    //     (res)=> console.log(res),
    //     (err)=> console.log(err)
    //   );
    this.route.navigateByUrl('displayform')
    this.toastr.success('SUBMITTED')
  }
  unique(){
    var body ={
      data: this.myForm.value.firstname
      
    }
    // console.log("unique", this.myForm.value.firstname)
    this.http.post<any>('http://localhost:3000/uniquevalidation', body).subscribe(
      (res) => {
       
        this.string = res; console.log("lllllllllllllll", this.string);
        //  this.toastr.success("okok");
        
      },
      (err) => console.log(err)
    );
    // this.toastr.success("okok")
    // console.log('asd', this.string)
    
    }


  selectImage(event: any) {
    this.images = [];
    if (event.target.files.length > 0) {

      for (let i = 0; i < event.target.files.length; i++) {
        this.images.push(event.target.files[i]);
      }
    }
    console.log(this.image[0])
  }
  onUpload() {

    const formdata = new FormData();

    for (var i = 0; i < this.images.length; i++) {
      formdata.append('files', this.images[i]);
    }

    console.log(formdata)
    this.http.post<any>('http://localhost:3000/uploadimage', formdata)
      .subscribe(
        (res) => {
          this.image = res; console.log("lllllllllllllll", this.image);
        },
        (err) => console.log(err)
      );
  }

  // imageData(){

  //   this.passing.getImageData()
  //   .subscribe(data => 
  //     {
  //       this.image= data;
  //       console.log("jjjjjjjjjjjjjjjjj",this.image)
  //     });




  // }
  onSelectState(e: any) {
    console.log(e, ",state_id")
    console.log((e.target as HTMLInputElement).value);
    this.selectedState = (e.target as HTMLInputElement).value;
    // this.cities = this.citiess.filter((item:any) => {
    // return item.state_id == this.selectedState
    // });
    this.getCity(this.selectedState)
    console.log("this.cites", this.cities)
  }
  getStates() {


    this.passing.getStateData()
      .subscribe(data => {
        this.state = data;
        // console.log("get states", this.state)
      });

  }
  getCity(state: any) {
    this.passing.getCityData(state)
      .subscribe(data => {
        this.cities = data;
        console.log("get cities", this.cities)
      });
  }
  percentage() {
    this.myForm.value.percentage = (this.myForm.value.marks / this.myForm.value.total) * 100;
    console.log("fffffff", this.myForm.value.percentage);
    // this.myForm.setValue({
    //   'percentage':this.myForm.value.percentage
    // })
    this.abc = this.decimalPipe.transform(this.myForm.value.percentage,"1.0-0")
  }
  // percentage(){
  // var n1 = parseInt(document.getElementById(n1: Number).value) ;
  // var n2 =  parseInt(document.getElementById('n2').value) ;



  // }
  CalculateAge(e: any) {
    // e= moment()
   console.log(moment(e).format('YYYY-MM-DD')) 
   this.birthdate = moment(e).format('YYYY-MM-DD')

    
   this.age=moment().diff(this.birthdate, 'years')
    console.log(this.age)
  }
  onDateChange(newDate: Date) {
    console.log(newDate);
  }
  get f() { return this.myForm.controls; }



  showToast() {
    this.toastr.error('everything is broken', 'Major Error', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar : true,
      closeButton: true,
      
    });



}

}



