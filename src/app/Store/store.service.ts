import { BehaviorSubject, bindNodeCallback, combineLatest, map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { IHouseModel } from '../Models/house-model.model';
import { IHouse } from '../Models/house.model';
import { AuthService } from '../Shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private houseModels = new BehaviorSubject<IHouseModel[]>([]);
  private auth = inject(AuthService);
  private isAdmin$ = this.auth.isAdmin$;

  houseModels$ = this.houseModels.asObservable();
  models$ = this.houseModels.asObservable().pipe(map(models => models.map(model => model?.attributes?.model)));
  houses = new BehaviorSubject<IHouse[]>([]);

  houses$: Observable<IHouse[]> = combineLatest([this.houses, this.isAdmin$]).pipe(
    map(([data, isAdmin]) => {
      if (!isAdmin) {
        return data.filter((house) => house.attributes.status === 'Available' || house.attributes.status === 'available');
      }
      return data;
    })
  );

  blocks$ = this.houses$.pipe(map(houses => houses.map(house => house?.attributes?.block_number)), map(bN => [...new Set(bN)]));
  lands$ = this.houses$.pipe(map(houses => houses.map(house => house?.attributes?.land_number)), map(lN => [...new Set(lN)]));

  minToMaxPrices$ = this.houses$.pipe(
    map((houses) => {
      const prices = houses
        .map((house) => house?.attributes?.price)
        .filter((price) => price !== undefined) as number[];
      return prices.sort((a, b) => a - b);
    }), map(prices => [...new Set(prices)])
  );

  MaxToMinPrices$ = this.houses$.pipe(
    map((houses) => {
      const prices = houses
        .map((house) => house?.attributes?.price)
        .filter((price) => price !== undefined) as number[];
      return prices.sort((a, b) => b - a);
    }), map(prices => [...new Set(prices)])
  );

  setHouseModels(models: IHouseModel[]) {
    this.houseModels.next(models);
  };

  setHouses(houses: IHouse[]) {
    this.houses.next(houses)
  };

  addHouse(house: IHouse): void {
    const currentHouses = this.houses.value;
    this.houses.next([...currentHouses, house]);
  };

  updateHouse(updatedHouse: IHouse): void {
    const currentHouses = this.houses.value;
    const updatedHouses = currentHouses.map((house) =>
      house.id === updatedHouse.id ? updatedHouse : house
    );
    this.houses.next(updatedHouses);
  };

  getHouseById(houseNumber: string | null): IHouse | undefined {
    if(houseNumber){
      return this.houses.value.find((house) => house.attributes.house_number == houseNumber);
    };
    return undefined
  };
}
