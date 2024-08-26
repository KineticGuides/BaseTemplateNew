import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Observable, of, map, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  t: any;
  uid: any;
  url: any;
  menu: any;
  user: any;
  skipper: any;
  un: any;
  role: any;
  hashBuffer: any;
  current_date: any;
  current_resource: any;
  current_patient: any;
  current_day: any;
  current_practice: any;

  constructor(private http: HttpClient) { 
    this.url='https://api.kineticcloud.ai/api/kmd_router.php';
    this.menu='https://api.kineticcloud.ai/api/kmd_menu.php';
    this.user='https://api.kineticcloud.ai/api/kmd_user.php';
    this.skipper='https://api.kineticcloud.ai/api/kmd_skipper.php';
  }

  getLocalStorage() {
    if (localStorage.getItem('uid')===null) {
      this.uid="0";
    } else {
      this.uid=localStorage.getItem('uid')
    }

    if (localStorage.getItem('un')===null) {
      this.un="";
    } else {
      this.un=localStorage.getItem('un')
    }

    if (localStorage.getItem('role')===null) {
      this.role="";
    } else {
      this.role=localStorage.getItem('role')
    }
    if (localStorage.getItem('current_date')===null) {
      this.current_date="";
    } else {
      this.current_date=localStorage.getItem('current_date')
    }
    if (localStorage.getItem('current_practice')===null) {
      this.current_practice="";
    } else {
      this.current_practice=localStorage.getItem('current_practice')
    }
    if (localStorage.getItem('current_resource')===null) {
      this.current_resource="";
    } else {
      this.current_resource=localStorage.getItem('current_resource')
    }
    if (localStorage.getItem('current_patient')===null) {
      this.current_patient="";
    } else {
      this.current_patient=localStorage.getItem('current_patient')
    }
  }


  getData(path: any, id: any, id2: any, id3: any) {
    const data = {
      "q" : path,
      "id": id,
      "id2": id2,
      "id3": id3,      
      "uid": this.uid
    }
  
  this.getLocalStorage();

  this.t= this.http.post(this.url, data);
  return this.t;

  }

  getMenu() {

    this.getLocalStorage();
    const data = {    
      "uid": this.uid
    }
  
  this.t= this.http.post(this.menu, data);
  return this.t;

  }

  getUser() {
    this.getLocalStorage();
    const data = {    
      "uid": this.uid
    }
  this.t= this.http.post(this.user, data);
  return this.t;
  }

  postData(path: any, formData: any) {
 
    this.getLocalStorage();
    const data = {
      "q" : path,
      "formData": formData,
      "uid": this.uid
    }
  this.t= this.http.post(this.url, data);
  return this.t;

  }

  postSkipper(path: any, formData: any) {
 
    this.getLocalStorage();
    const data = {
      "q" : path,
      "formData": formData,
      "uid": this.uid
    }
    this.t= this.http.post(this.skipper, data);
    return this.t;
  }


}

