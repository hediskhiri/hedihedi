import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/Patient';

@Component({
  selector: 'app-home-front',
  templateUrl: './home-front.component.html',
  styleUrls: ['./home-front.component.css']
})
export class HomeFrontComponent implements OnInit{

 
patient_Connecter!: Patient;



  ngOnInit(): void {
   const UserConnected_String = localStorage.getItem('Patient');
   const UserConnected = UserConnected_String ? JSON.parse(UserConnected_String) : null;
   this.patient_Connecter ={
    idpatient: UserConnected.idpatient,
    user: UserConnected.user,
    typePatient: UserConnected.typePatient,
    archiver: UserConnected.archiver,
    poid :UserConnected.poid,
    longueur:UserConnected.longueur,
    sexe:UserConnected.sexe,
    dateDeNaissance:UserConnected.dateDeNaissance

}
console.log("----- USER PATIENT------");
console.log(this.patient_Connecter);

   }


  


}
