import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatapassingService } from './../datapassing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-displayform',
  templateUrl: './displayform.component.html',
  styleUrls: ['./displayform.component.css']
})
export class DisplayformComponent implements OnInit {
  formData: any=[];
  images: any=[];
  image: any=[]
  p: any=1;

  constructor(public passing: DatapassingService, public route: Router, public http: HttpClient) {this.getServerData() }

  ngOnInit(): void {
  }


  getServerData(){
    this.passing.getFormData()
    .subscribe(data => this.formData= data);
    console.log(this.formData);
  }

  formDelete(id:any){
    // console.log(id)
    this.passing.deleteFormData(id)
    .subscribe(data => console.log(""));
    // console.log(this.serverData);
    this.getServerData()
    


  }

  formUpdate(id: any){
    
    
    this.route.navigateByUrl("/update"+'/'+id)
}

imageData(){
      
  this.passing.getImageData()
  .subscribe(data => 
    {
      this.image= data;
      console.log("llllllllllllllllll",this.image)
    });
  
}
adr(){
  this.route.navigateByUrl('form')
}


}

