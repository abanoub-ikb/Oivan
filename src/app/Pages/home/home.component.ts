import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TableComponent } from "../../UI-components/table/table.component";
import { AccordionComponent } from "../../UI-components/accordion/accordion.component";
import { StoreService } from '../../Store/store.service';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { SelectInputComponent } from "../../UI-components/select-input/select-input.component";
import { BehaviorSubject, map, combineLatest, Subject, takeUntil } from 'rxjs';
import { IHouse, IHouseAttributes } from '../../Models/house.model';
import { FormsModule } from '@angular/forms';
import { ModelInfo } from '../../Models/house-model.model';
import { ModelInfoComponent } from "../../UI-components/model-info/model-info.component";

type Filters = Partial<IHouseAttributes> & { min: number | string, max: number | string };

@Component({
  selector: 'app-home',
  imports: [TableComponent, AccordionComponent, AsyncPipe, KeyValuePipe, SelectInputComponent, FormsModule, ModelInfoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private store = inject(StoreService);
  private destroy$ = new Subject<void>();

  houses$ = new BehaviorSubject<IHouse[]>([]);
  blocks$ = this.store.blocks$;
  landNumbers$ = this.store.lands$;
  minToMaxPrices$ = this.store.minToMaxPrices$;
  MaxToMinPrices$ = this.store.MaxToMinPrices$;
  modelInfoMap: ModelInfo | null = null;

  filters: Filters = {
    block_number: '',
    land_number: '',
    min: '',
    max: '',
  };

  filteredHousesByModel$ = combineLatest([this.houses$, this.store.houseModels$]).pipe(
    map(([houses, models]) => {
      const filteredHouses = this.applyFilters(houses, this.filters);
      const grouped: { [key: string]: IHouse[] } = {};

      filteredHouses.forEach(house => {
        const model = house.attributes?.model;
        if (model) {
          if (!grouped[model]) {
            grouped[model] = [];
          }
          grouped[model].push(house);
        }
      });

      return grouped;
    })
  );

  ngOnInit(): void {
    this.store.houses$.pipe(takeUntil(this.destroy$)).subscribe(val => this.houses$.next(val));

    this.store.houseModels$.pipe(
      takeUntil(this.destroy$),
      map(models => {
        const grouped: ModelInfo = {};
        models.forEach(model => {
          const modelName = model.attributes?.model;
          if (modelName) {
            grouped[modelName] = {
              banner: model.attributes.media.banner,
              title: model.attributes.media.title,
              description: model.attributes.media.description,
            };
          }
        });
        return grouped;
      })
    ).subscribe(groupedModels => this.modelInfoMap = groupedModels);
  }

  private applyFilters(houses: IHouse[], filters: Filters): IHouse[] {
    return houses.filter(house => {
      return (!filters.block_number || house.attributes?.block_number === filters.block_number) &&
             (!filters.land_number || house.attributes?.land_number === filters.land_number) &&
             (!filters.min || house.attributes?.price >= Number(filters.min)) &&
             (!filters.max || house.attributes?.price <= Number(filters.max));
    });
  }



  filterHouses() {
    this.houses$.next(this.houses$.value);
  };



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}