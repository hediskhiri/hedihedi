import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvennementService } from '../../serives/eventsService/evennement.service';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'app-modifierevennement',
  templateUrl: './modifierevennement.component.html',
  styleUrls: ['./modifierevennement.component.css']
})
export class ModifierevennementComponent {

  showMapPopup: boolean = false;

  @ViewChild(MapComponent) mapComponent!: MapComponent;
  evennement: any;
  id: any;
  dateOccupee: boolean = false;

  constructor(private act: ActivatedRoute, private shared: EvennementService, private router: Router) { }
  onPositionSelected($event: [number,number]) {
    // Mettre à jour les coordonnées de l'événement avec la nouvelle position sélectionnée
    this.evennement.lat = $event[1];
    this.evennement.lng = $event[0];
    // Centrer la carte sur la nouvelle position
    this.mapComponent.mapInstance.flyTo({
      center: $event,
      zoom: 14
    });
  }
  openMapPopup() {
    this.showMapPopup = true;
  }

  closeMapPopup() {
    this.showMapPopup = false;
  }
  update() {
    // Validation des champs
    if (!this.evennement.nomevennement || !this.evennement.discription || !this.evennement.date || !this.evennement.placeMax || !this.evennement.lng ||!this.evennement.lat || !this.evennement.image || !this.evennement.etat || !this.evennement.type) {
      alert("Veuillez remplir tous les champs.");
      return;
  }

    // Appel de la méthode du service pour vérifier la date
    this.shared.verifierDateOccupee(this.evennement.date)
      .subscribe(
        (dateOccupee: boolean) => {
          if (dateOccupee) {
            // La date est occupée, affichez le message et ne continuez pas la modification
            this.dateOccupee = true;
          } else {
            // La date n'est pas occupée, continuez avec la modification
            this.dateOccupee = false;

            this.shared.mettreAJourEvennement(this.evennement)
              .subscribe(
                res => {
                  console.log(res);
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

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id');

    this.shared.getEvennementById(this.id)
      .subscribe(
        res => {
          this.evennement = res;
        },
        err => {
          console.log(err);
        }
      );
  }
}
