import { Component } from '@angular/core';
import { EvennementService } from '../../serives/eventsService/evennement.service';
import { GeocodingService } from '../../serives/eventsService/geocoding.service'; // Importez le service de géocodage

@Component({
  selector: 'app-afiicheevennementfront',
  templateUrl: './afiicheevennementfront.component.html',
  styleUrls: ['./afiicheevennementfront.component.css']
})
export class AfiicheevennementfrontComponent {

  evennements: any;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  constructor(public _shared: EvennementService , private geocodingService: GeocodingService) { }

  ngOnInit(): void {
    this.loadEvennements();
   
      }
      loadEvennements(): void {
        this._shared.getAllEvennements().subscribe(
          res => {
            this.evennements = res;
            this.getPlaceNames();
          },
          err => {
            console.log(err);
          }
        );
      }
      getPlaceNames(): void {
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
      nextPage(): void {
        this.currentPage++;
      }
    
      prevPage(): void {
        this.currentPage--;
      }
    
      getPaginatedEvents(): any[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.evennements.slice(startIndex, startIndex + this.itemsPerPage);
      }
    }