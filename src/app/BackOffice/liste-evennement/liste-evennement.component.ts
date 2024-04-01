import { Component, OnInit } from '@angular/core';
import { EvennementService } from '../../serives/eventsService/evennement.service';
import { GeocodingService } from '../../serives/eventsService/geocoding.service'; // Importez le service de géocodage
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-liste-evennement',
  templateUrl: './liste-evennement.component.html',
  styleUrls: ['./liste-evennement.component.css']
})
export class ListeEvennementComponent implements OnInit {
  evennements: any;
  searchTerm: string = '';

  constructor(private evennementService: EvennementService, 
              private geocodingService: GeocodingService, // Injectez le service de géocodage
              private router: Router) {}

  ngOnInit(): void {
    this.evennementService.getAllEvennements()
      .subscribe(
        res => {
          console.log(res);
          this.evennements = res;
          this.getPlaceNames();         
        },
        err => {
          console.log(err);
        }
      ); 
  }
 // Méthode pour obtenir les noms de lieu pour chaque événement
 getPlaceNames() {
  this.evennements.forEach((event: any) => {
    this.geocodingService.getPlaceName(event.lat, event.lng)
      .subscribe(
        (data: any) => {
          if (data && data.display_name) {
            event.placeName = data.display_name;
          } else {
            event.placeName = 'Nom de la place non disponible';
          }
        },
        err => {
          console.log('Erreur lors de la récupération du nom de la place:', err);
          event.placeName = 'Erreur lors de la récupération du nom de la place';
        }
      );
  });
}
  delete(id: number) {
    console.log("Suppression de l'événement avec l'ID:", id);
    this.evennementService.supprimerEvennement(id)
      .subscribe(
        res => {
          console.log(res);
          // Mettez à jour la liste d'événements après la suppression
          this.evennements = this.evennements.filter((eve: { id: number; }) => eve.id !== id);
        },
        err => {
          console.log(err);
        }
      ); 
  }
  
  buttonAjouter() {
    this.router.navigate(['admin/ajouterEvennement']);
  }
  
  buttonModifier(id: any) {
    this.router.navigate(['admin/modifierEvennement/' + id]);
  }
  
  filterEvents() {
    if (this.evennements) {
      return this.evennements.filter((event: { nomevennement: string }) =>
        event.nomevennement.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.nomevennement.toString().includes(this.searchTerm)
      );
    } else {
      return [];
    }
  }
}
