import { Component, EventEmitter, ViewChild, Output, Input, AfterViewInit } from '@angular/core';
import { MarkerComponent, MapComponent as MaplibreMapComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  
  @Output() positionSelected = new EventEmitter<[number, number]>();
  @ViewChild(MaplibreMapComponent) map: MaplibreMapComponent | undefined;
  mapStyle = 'https://api.maptiler.com/maps/streets/style.json?key=XOPRv4nM6CkWqrmf3hkx';
  @Input() mapCenter: [number, number] = [16.62662018, 49.2125578];
  zoomLevel: [number] = [14];
  selectedPosition: [number, number] = [0,0];
  @Input() markers: { lngLat: [number, number], id: string }[] = []; // Input property for markers

  constructor() {}

  ngAfterViewInit() {
    // Vérifier si this.map est défini
    console.log(this.mapCenter)
    if (this.map) {
      const imageURL = 'assets/images/atm_11.png'; // Remplacez par l'URL réelle de votre image
      const img = new Image();
      img.onload = () => {
        // Vérifier à nouveau si this.map est défini
        if (this.map) {
          this.map.mapInstance.addImage('atm_11', img);
        }
      };
      img.src = imageURL;
    }
  }

  onMapClick(event: any) {
    const lngLat = event.lngLat.wrap();
    this.selectedPosition = [lngLat.lng, lngLat.lat];
    this.positionSelected.emit(this.selectedPosition);
  
    // Ajouter un nouveau point sur la carte
    const newMarker = {
      lngLat: this.selectedPosition,
      id: Math.random().toString(36).substr(2, 9) // Génère un ID aléatoire pour chaque marqueur
    };
    this.markers.push(newMarker); // Ajouter le marqueur à la liste des marqueurs
  }
}
