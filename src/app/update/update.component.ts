import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassingService } from './../datapassing.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  myForm: any=[];
  showId: any=[];
  id:any;
  cities: any=[];
  state: any=[];
  selectedState:any=[]
  images: any=[];
  image: any=[];
  currentimage: any;
  birthdate: any;
  age: any;
  abc: any;

  constructor(private activatedRoute: ActivatedRoute,public fb : FormBuilder, public passing : DatapassingService, public route: Router, public http : HttpClient,public decimalPipe: DecimalPipe ) {
    this.activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
          this.id = params['id'];
      } else {
          this.id = '';

      }
     console.log(this.id)
  });
  console.log(this.getStates());
   
   }

  ngOnInit(): void {
    this.dataById();
    this.myForm= this.fb.group({
      'middlename': new FormControl('', Validators.required),
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'address':  new FormControl('', Validators.required),
      'mobile': new FormControl('', [Validators.required, Validators.pattern("(?:(?:\\+|0{0,2})91(\\s*[\\- ]\\s*)?|[0 ]?)?[6789]\\d{9}|(\\d[ -]?){10}\\d")]),
      'zip':  new FormControl('', [Validators.required,Validators.minLength(6), Validators.maxLength(6)]),
      'birthday':  new FormControl('', Validators.required),
      'city':  new FormControl('', Validators.required),
      'state':  '',
      
      'marks':  new FormControl('', Validators.required),
      'total':  new FormControl('', Validators.required),
      'percentage': '',
      'age': '',
      'image':'',
      'prefix': '',
      'bloodgroup': '',
      'height': '',
      'weight': ''

    })
  }
  dataById(){
    this.passing.getDatabyId(this.id)
    .subscribe(data =>{ 
     
        
        this.showId=data;
        console.log("this.showId",this.showId)
this.currentimage=this.showId[0].url;
// console.log("this.showId[0].percentagethis.showId[0].percentage",this.showId[0].percentage)
this.myForm.setValue({

  'middlename': this.showId[0].middlename,
  'firstname': this.showId[0].firstname,
  'lastname': this.showId[0].lastname,
  'address':  this.showId[0].address,
  'mobile': this.showId[0].mobile,
  'zip':  this.showId[0].zip,
  'birthday':  this.showId[0].birthday,
  
  'state':  this.showId[0].state,
  'city':this.showId[0].city,
  'marks':  this.showId[0].marks,
  'total':  this.showId[0].total,
  'percentage': this.showId[0].percentage,
  'age': this.showId[0].age,
  'image':this.showId[0].url,
  'prefix':this.showId[0].prefix,
  'bloodgroup':this.showId[0].bloodgroup,
      'height': this.showId[0].height,
      'weight': this.showId[0].weight
})
console.log(this.getCity(this.showId[0].state))
// this.myForm.patchValue({
//   'city':this.showId[0].city
 
//    })
    }
      );

}
onUpdate(){
  var body={
    id: this.id,
    firstname: this.myForm.value.firstname,
    lastname: this.myForm.value.lastname,
    middlename: this.myForm.value.middlename,
    city: this.myForm.value.city,
    birthday: this.myForm.value.birthday,
    state: this.myForm.value.state,
    mobile: this.myForm.value.mobile,
    zip:this.myForm.value.zip,
    image: this.currentimage

   
      

  }
  this.passing.updateServerData(body)
  .subscribe(data => console.log(data))

 this.route.navigateByUrl('displayform')
  
}
selectImage(event: any) {
  this.images = [];
  if (event.target.files.length > 0) {

    for (let i = 0; i < event.target.files.length; i++) {
      this.images.push(event.target.files[i]);
    }
  }
  console.log(this.images[0])
}
onUpload(){
 const formdata = new FormData();

  for (var i = 0; i < this.images.length; i++) {
    formdata.append('files', this.images[i]);
  }

  console.log(formdata)
  this.http.post<any>('http://localhost:3000/uploadimage', formdata)
    .subscribe(
      (res) => {
        this.image = res;
         console.log("lllllllllllllll", this.image);
         this.currentimage=this.image.url

      },
      (err) => console.log(err)
    );
}
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
      this.myForm.patchValue({
        'city':  this.showId[0].city,
      })
     
    });
}
CalculateAge(e: any) {
  // e= moment()
 console.log(moment(e).format('YYYY-MM-DD')) 
 this.birthdate = moment(e).format('YYYY-MM-DD')

  
 this.age=moment().diff(this.birthdate, 'years')
 this.myForm.patchValue({
  'age':this.age 
 
   })
  console.log(this.age)
}
percentages() {
  this.myForm.value.percentage = (this.myForm.value.marks / this.myForm.value.total) * 100;
  console.log("fffffff", this.myForm.value.percentage);
  // this.myForm.setValue({
  //   'percentage':this.myForm.value.percentage
  // })
  this.abc = this.decimalPipe.transform(this.myForm.value.percentage,"1.0-0")
  this.myForm.patchValue({
 'percentage':this.abc 

  })
}
}




