import { IHouseAttributes } from './../../Models/house.model';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from "../../UI-components/breadcrumb/breadcrumb.component";
import { StoreService } from '../../Store/store.service';


@Component({
  selector: 'app-update-house',
  imports: [BreadcrumbComponent],
  templateUrl: './update-house.component.html',
  styleUrl: './update-house.component.css'
})
export class UpdateHouseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(StoreService);
  houseNumber!:string|null;

  ngOnInit(): void {
     const houseNumber =  this.route.snapshot.paramMap.get('id');
     this.houseNumber = houseNumber
     if(houseNumber){
      const data = this.store.getHouseById(houseNumber);
      console.log(data)
     };

 
  }
  
}
