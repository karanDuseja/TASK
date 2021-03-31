import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatapassingService {

  constructor(private http: HttpClient) { }



  getFormData(): Observable<any>{
    return  this.http.get<any>("http://localhost:3000/formdata"); 

}

deleteFormData(id:any): Observable<any>{
  // console.log(id);
  var body={
    id:id
  }
  return  this.http.post<any>("http://localhost:3000/delete", body); 


}
url4: any = "http://localhost:3000/update"
updateServerData(body: any):  Observable<any>{

  return  this.http.post<any>(this.url4, body); 
}

url5: any = "http://localhost:3000/getdataid"
getDatabyId(id: any):  Observable<any>{
  console.log();
 
  return  this.http.get<any>(this.url5+'/'+id);

}
getImageData(): Observable<any>{
  return  this.http.get<any>("http://localhost:3000/displayimage"); 
}
getStateData():  Observable<any>{
  return  this.http.get<any>("http://localhost:3000/getstate"); 
}
getCityData(stateid:any):  Observable<any>{
  return  this.http.get<any>("http://localhost:3000/getcity/"+stateid); 
}




}
