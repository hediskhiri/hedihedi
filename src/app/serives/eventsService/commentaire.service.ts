import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
 

  constructor(private http: HttpClient ) { }
  private url ='http://127.0.0.1:8090/commentaires'; // Mettez à jour l'URL du backend



  getCommentairesByEventId(eventId: any) {
    return this.http.get(`/api/commentaires/event/${eventId}`);
  }

 // Modifier le contenu d'un commentaire
// modifierCommentaire(commentaireId: string, nouveauContenu: string): Observable<any> {
 // return this.http.put<any>(`/api/commentaires/${commentaireId}`, { contenu: nouveauContenu });
//}

// Supprimer un commentaire
//supprimerCommentaire(commentaireId: string): Observable<any> {
  //return this.http.delete<any>(`/api/commentaires/${commentaireId}`);
//}
//afficherCommentaires(eventId: string): Observable<any[]> {
  //return this.http.get<any[]>(`/api/evennements/${eventId}/commentaires`);
//}
}
