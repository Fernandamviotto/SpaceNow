// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Andar } from '../models/andar.model';

// @Injectable({ providedIn: 'root' })
// export class AndarService {
//   private baseUrl = 'http://localhost:5000/api/andares';

//   constructor(private http: HttpClient) {}

//   getAll(): Observable<Andar[]> {
//     return this.http.get<Andar[]>(this.baseUrl);
//   }

//   getByPredio(predioId: number): Observable<Andar[]> {
//     return this.http.get<Andar[]>(`${this.baseUrl}/predio/${predioId}`);
//   }
// }