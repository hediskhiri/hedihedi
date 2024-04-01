import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvennementService } from '../../serives/eventsService/evennement.service';
import { GeocodingService } from '../../serives/eventsService/geocoding.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  eventId: any;
  eventDetails: any;
  placeName: string = '';
  errorMessage: string = '';
  userId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evennementService: EvennementService,
    private geocodingService: GeocodingService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
      this.userId = params['userId']; 
      this.loadEventDetails();
    });
  }

  loadEventDetails() {
    this.evennementService.getEvennementById(this.eventId).subscribe(
      (res: any) => {
        this.eventDetails = res;
        this.getPlaceName(this.eventDetails.lat, this.eventDetails.lng);
        console.log(this.eventDetails.lat, this.eventDetails.lng)
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getPlaceName(latitude: number, longitude: number): void {
    this.geocodingService.getPlaceName(latitude, longitude).subscribe(
      (data: any) => {
        if (data && data.display_name) {
          this.placeName = data.display_name;
        } else {
          this.placeName = 'Nom de la place non disponible';
        }
      },
      err => {
        console.log('Erreur lors de la récupération du nom de la place:', err);
        this.placeName = 'Erreur lors de la récupération du nom de la place';
      }
    );
  }

  participer(): void {
    if (this.userId && typeof this.userId === 'number' && this.eventId && typeof this.eventId === 'number') {
      this.evennementService.registerUserToEvent(this.eventId, this.userId).subscribe(
        (response: any) => {
          alert("Vous avez été inscrit avec succès à l'événement. Merci!");
          // Rediriger l'utilisateur vers une autre page ou recharger la page actuelle
          this.router.navigate(['/afficherevennementfront']);
        },
        (error: any) => {
          this.errorMessage = error.error;
        }
      );
    } else {
      console.log("UserId ou EventId est undefined ou n'est pas un nombre");
      // Gérer le cas où userId ou eventId est undefined ou n'est pas un nombre
    }
  }
  
}
