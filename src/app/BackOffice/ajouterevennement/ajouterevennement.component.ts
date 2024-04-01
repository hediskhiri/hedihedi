
import { Router } from '@angular/router';
import { EvennementService } from '../../serives/eventsService/evennement.service';
import { Component, ViewChild } from '@angular/core';
import { MapComponent } from '../../FrontOffice/shared/map/map.component';
@Component({
  selector: 'app-ajouterevennement',
  templateUrl: './ajouterevennement.component.html',
  styleUrls: ['./ajouterevennement.component.css']
})
export class AjouterevennementComponent {
    showMapPopup: boolean = false;

    @ViewChild(MapComponent) mapComponent!: MapComponent;
  dateOccupee: boolean = false;
  
  constructor(public evennementService: EvennementService, private router: Router) { }
  openMapPopup() {
    this.showMapPopup = true;
  }

  closeMapPopup() {
    this.showMapPopup = false;
  }
  
  evennement = {
    nomevennement: '',
    discription: '',
    date: new Date(),
    placeMax: 0,
    lat: 0,
    lng: 0,
    image: '',
    etat: '',
    type: '' 
  };
  onPositionSelected(position: [number, number] ) {
    console.log(position);
    this.evennement.lat = position[0];
    this.evennement.lng = position[1];
  }
  ajouterEvennement() {
    // Validation des champs
    if (!this.evennement.nomevennement || !this.evennement.discription || !this.evennement.date || !this.evennement.placeMax || !this.evennement.lng ||!this.evennement.lat || !this.evennement.image || !this.evennement.etat || !this.evennement.type) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Convertir la chaîne en objet Date
    const selectedDate = new Date(this.evennement.date);

    // Appel de la méthode du service pour vérifier la date
    this.evennementService.verifierDateOccupee(selectedDate.toISOString())
        .subscribe(
            (dateOccupee: boolean) => {
                if (dateOccupee) {
                    // La date est occupée, affichez le message et ne continuez pas l'ajout
                    this.dateOccupee = true;
                } else {
                    // La date n'est pas occupée, continuez avec l'ajout
                    this.dateOccupee = false;
                    this.evennementService.ajouterEvennement(this.evennement)
                        .subscribe(
                            res => {
                                // Réinitialisation du formulaire après l'ajout réussi
                                this.evennement = {
                                    nomevennement: '',
                                    discription: '',
                                    date: new Date(),
                                    placeMax: 0,
                                    lat: 0,
                                    lng: 0,
                                    image: '',
                                    etat: '',
                                    type: ''
                                };
                                // Redirection vers la liste des événements après l'ajout
                                this.router.navigate(['/admin/listeEvennement']);
                            },
                            err => {
                                console.log(err);
                            }
                        );
                }
            },
            err => {
                console.log(err);
            }
        );
}
}