import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IHouse, IHouseReq } from '../../Models/house.model';
import { map, tap } from 'rxjs';
import { StoreService } from '../../Store/store.service';

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  private http = inject(HttpClient);
  private store = inject(StoreService);
  private apiUrl = 'https://vn-fe-test-api.iwalabs.info/houses';

  getHouses() {
    return this.http.get<{ data: IHouse[] }>(this.apiUrl).pipe(
      map(res => res.data),
      tap(houses => this.store.setHouses(houses))
    );
  };

  createHouse(data:IHouseReq){
    return this.http.post<{ data: IHouse }>(this.apiUrl,data).pipe(
      map(res => res.data),
      tap(house=>this.store.addHouse(house))
    )
  };

}
