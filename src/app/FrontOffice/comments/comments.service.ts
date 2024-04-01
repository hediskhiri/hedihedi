import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  url : string = 'http://localhost:8090/api/commentaires/';

  constructor(private http: HttpClient) { }


  ajouterCommentaire(commentaire: any , eventId: any) {
    return this.http.post(`${this.url}event/${eventId}/add-comment`, commentaire); // Mettez à jour l'URL de la requête
  }
  
  listeComment(eventId:any):Observable<any>{
    return this.http.get<any>(this.url+"event/"+eventId+"/comments")
  }
  
  supprimerComment(id:any):Observable<any>{
    return this.http.delete<any>(this.url+"remove-comment/"+id)
  }
  modifierComment(comment:any):Observable<any>{
    return this.http.put<any>(this.url+"update-comment",comment)
  }
}
