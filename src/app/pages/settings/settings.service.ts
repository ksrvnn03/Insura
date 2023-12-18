import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  apiBase = environment.apiUrl;
  token: any;
  headers: any;
  constructor(private http: HttpClient) {
    this.token = 'Bearer ' + localStorage.getItem('token');
    this.headers = new HttpHeaders({
      "Authorization": this.token
    });
  }

  get adminList() {
    return this.http.get(this.apiBase + "admin/users", { headers: this.headers });
  }

  deleteAdmin(id: any) {
    return this.http.delete(this.apiBase + "admin/users/" + id, { headers: this.headers });
  }

  createAdmin(body: any) {
    return this.http.post(this.apiBase + "admin/users", body, { headers: this.headers });
  }

  retrieveUser(id: any) {
    return this.http.get(this.apiBase + "admin/users/" + id, { headers: this.headers });
  }

  updateUser(body: any, id: any) {
    return this.http.post(this.apiBase + "admin/users/" + id, body, { headers: this.headers });
  }
}
