
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../UI-components/breadcrumb/breadcrumb.component';
import { InputComponent } from '../../UI-components/input/input.component';
import { SelectInputComponent } from '../../UI-components/select-input/select-input.component';
import { StoreService } from '../../Store/store.service';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { ErrorService } from '../../Shared/services/errorService/error.service';
import { HousesService } from '../../API/houses.api/houses.service';

@Component({
  selector: 'app-create-house',
  imports: [BreadcrumbComponent, InputComponent, SelectInputComponent, AsyncPipe, ReactiveFormsModule],
  templateUrl: './create-house.component.html',
  styleUrl: './create-house.component.css'
})
export class CreateHouseComponent implements OnInit, OnDestroy {
  private store = inject(StoreService);
  private errService = inject(ErrorService);
  private fb = inject(FormBuilder);
  private housesService = inject(HousesService);
  private destroy$ = new Subject<void>();

  models$ = this.store.models$;
  existedHouses: Set<string> = new Set();
  houseForm!: FormGroup;
  status = ['Available', 'Booked'];
  houseType = ['Apartment', 'Townhouse', 'Villa'];

  ngOnInit(): void {
    this.houseForm = this.fb.group({
      house_number: ['', [Validators.required], [this.houseNumberValidator.bind(this)]],
      block_number: ['', Validators.required],
      land_number: ['', Validators.required],
      model: ['', Validators.required],
      house_type: ['Apartment', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      status: ['Available', Validators.required]
    });

    this.store.houses
      .pipe(
        takeUntil(this.destroy$),
        map(houses => new Set(houses.map(el => el.attributes.house_number)))
      )
      .subscribe(housesSet => (this.existedHouses = housesSet));
  };

  houseNumberValidator(control: any) {
    return new Promise(resolve => {
      const houseNumber = control.value;
      if (this.existedHouses.has(houseNumber)) {
        resolve({ houseNumberExists: true });
      } else {
        resolve(null);
      }
    });
  }


  onSubmit(): void {
    if (!this.houseForm.valid) {
      this.errService.setError('PLease Fill all required fields');
      return;
    };
    const newHouse = this.houseForm.value;
    const reqObject = {
      data:{
        "type": "houses",
        "attributes":newHouse
      }
    };
    this.housesService.createHouse(reqObject).subscribe(res=>this.houseForm.reset())
  };

  getErrorMessage(controlName: string): string {
    const control = this.houseForm.get(controlName);
    if (control?.touched || control?.dirty) {
      if (control.hasError('required')) {
        return `${controlName.replace('_', ' ')} is required`;
      }
      if (controlName === 'house_number' && control.hasError('houseNumberExists')) {
        return 'House Number Already Exists';
      }
    }
    return '';
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

