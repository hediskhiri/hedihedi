import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../comments/comments.service';

@Component({
  selector: 'app-ajouter-commentaire',
  templateUrl: './ajoutercommentaire.component.html',
  styleUrls: ['./ajoutercommentaire.component.css']
})
export class AjouterCommentaireComponent implements OnInit {
  eventId: any;
  newComment: string = '';

  constructor(private commentaireService: CommentsService, private router: Router,private route: ActivatedRoute) {
   }
   ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      this.eventId = params['id'];
    });
  }
  ajouterCommentaire() {
    console.log(this.eventId)
    if (!this.eventId) {
      console.error("Identifiant de l'événement non défini.");
      return;
    }
    const newCommentObj = {
      //User: "1", //waiting for User implementaion for using  real data
      date: new Date(),
      contenu: this.newComment
      // eventId : Number(this.eventId)

    };
    this.commentaireService.ajouterCommentaire(newCommentObj, this.eventId).subscribe(
      (res: any) => {
        console.log("Commentaire ajouté avec succès :", res);
        // Réinitialiser le formulaire après l'ajout réussi
        this.newComment = "";
        // Rediriger vers la page event-details
      },
      (err: any) => {
        console.error("Erreur lors de l'ajout du commentaire :", err);
      }
    );
  }
}
