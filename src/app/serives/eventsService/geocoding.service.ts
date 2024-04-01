import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  constructor(private http: HttpClient) {}

  // Méthode pour obtenir le nom de la place à partir des coordonnées de latitude et de longitude
  getPlaceName(latitude: number, longitude: number): Observable<any> {
    // Utilisation de l'API de géocodage de Nominatim
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    return this.http.get(apiUrl);
  }
}