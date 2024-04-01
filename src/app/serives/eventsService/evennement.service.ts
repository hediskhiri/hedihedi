import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EvennementService {
  
  registerUserToEvent(eventId: number, userId: number): Observable<any> {
    return this.http.post(`${this.url}evennements/${eventId}/register/${userId}`, {})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            return throwError('Erreur de validation');
          } else if (error.status === 404) {
            return throwError('Evennement non trouvé');
          }
          return throwError('Erreur inconnue');
        })
      );
  }
  
  private url = 'http://127.0.0.1:8090/';

  constructor(private http: HttpClient) { }

  

  verifierDateOccupee(date: string): Observable<boolean> {
    // Convertir la date en format "yyyy-MM-dd"
    const formattedDate = new Date(date).toISOString().split('T')[0];

    return this.http.get<boolean>(`${this.url}evennements/verifierDateOccupee/${formattedDate}`)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 400 && error.error === 'Date occupée') {
                    return throwError('Date occupée');
                } else if (error.status === 404) {
                    return throwError('Date non trouvée');
                }
                return throwError('Erreur inconnue');
            })
        );
}


  getEvennementByDate(date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}evennements/date/${date}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not found');
        }
        return throwError('Something went wrong');
      })
    );
  }

  ajouterEvennement(evennement: any) {
    return this.http.post(`${this.url}evennements/ajouterevent`, evennement);
  }

  getAllEvennements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}evennements/allevent`);
  }

  supprimerEvennement(id: number): Observable<any> {
    return this.http.delete(`${this.url}evennements/${id}`);
  }
  

  getEvennementById(id: number): Observable<any> {
    return this.http.get(`${this.url}evennements/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not found');
        }
        return throwError('Something went wrong');
      })
    );
  }

  mettreAJourEvennement(evennement: any): Observable<any> {
    // Convertir la date en format "yyyy-MM-dd"
    const formattedDate = new Date(evennement.date).toISOString().split('T')[0];

    return this.http.put(`${this.url}evennements/updateevent`, { ...evennement, date: formattedDate })
        .pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 400 && error.error === 'Date occupée') {
                    return throwError('Date occupée');
                } else if (error.status === 404) {
                    return throwError('Evennement non trouvé');
                } else if (error.status === 400) {
                    return throwError('Erreur de validation');
                }
                return throwError('Erreur inconnue');
            })
        );
}
}
