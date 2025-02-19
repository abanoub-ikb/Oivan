import { IHouse, IHouseAttributes } from './../../Models/house.model';
import { Component, inject, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from "../../UI-components/breadcrumb/breadcrumb.component";
import { StoreService } from '../../Store/store.service';
import { SelectInputComponent } from "../../UI-components/select-input/select-input.component";
import { InputComponent } from "../../UI-components/input/input.component";
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HousesService } from '../../API/houses.api/houses.service';
import { ErrorService } from '../../Shared/services/errorService/error.service';


@Component({
  selector: 'app-update-house',
  imports: [BreadcrumbComponent, SelectInputComponent, InputComponent, AsyncPipe, ReactiveFormsModule],
  templateUrl: './update-house.component.html',
  styleUrl: './update-house.component.css'
})
export class UpdateHouseComponent implements OnInit,OnDestroy {
  private route = inject(ActivatedRoute);
  private store = inject(StoreService);
  private fb = inject(FormBuilder);
  private housesService = inject(HousesService);
  private errService = inject(ErrorService);
  private destroy$ = new Subject<void>();

  status = ['Available', 'Booked'];
  houseType = ['Apartment', 'Townhouse', 'Villa'];
  models$ = this.store.models$;
  houseData:IHouse | undefined | null = null;
  houseNumber!: string | null;
  houseForm!: FormGroup;

  ngOnInit(): void {
    const houseNumber = this.route.snapshot.paramMap.get('id');
    this.houseNumber = houseNumber
      const data = this.store.getHouseById(houseNumber);
      this.houseData = data;
      console.log(data)

    if(data){
      this.status = [...new Set([...this.status,data.attributes.status])];
      this.houseType = [...new Set([...this.houseType,data.attributes.house_type])];
      this.houseForm = this.fb.group({
        house_number: [data.attributes.house_number, [Validators.required]],
        block_number: [data.attributes.block_number, Validators.required],
        land_number: [data.attributes.land_number, Validators.required],
        model: [data.attributes.model, Validators.required],
        house_type: [data.attributes.house_type, Validators.required],
        price: [data.attributes.price, [Validators.required, Validators.min(1)]],
        status: [data.attributes.status, Validators.required]
      });
    }

  };

  onSubmit(): void {
    if (!this.houseForm.valid) {
      this.errService.setError('PLease Fill all required fields');
      return;
    };
    const houseRecordId = this.houseData?.id
    const houseObj = this.houseForm.value;
    const reqObject = {
      data:{
        "type": "houses",
        "id":houseRecordId,
        "attributes":houseObj
      }
    };
    this.housesService.updateHouse(houseRecordId,reqObject)?.subscribe();
  };

  getErrorMessage(controlName: string): string {
    const control = this.houseForm.get(controlName);
    if (control?.touched || control?.dirty) {
      if (control.hasError('required')) {
        return `${controlName.replace('_', ' ')} is required`;
      }
    }
    return '';
  };

  ngOnDestroy(): void {
      
  }

}
