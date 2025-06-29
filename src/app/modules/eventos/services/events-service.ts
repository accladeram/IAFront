import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEvent } from '../interfaces/event-interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {


    baseUrl = `/api`;
   form: FormGroup = new FormGroup({});
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  }

  getHistorical(filter: IEvent): Observable<any> {
    const url = `${this.baseUrl}/historico-eventos`;
    return this.http.get<IEvent>(url);
  }

  getAllRecommended(): Observable<IEvent> {
      const url = `${this.baseUrl}/eventos`;
      return this.http.get<IEvent>(url);
  }

}
