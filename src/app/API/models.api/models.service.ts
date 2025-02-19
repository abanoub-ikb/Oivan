import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IHouseModel } from '../../Models/house-model.model';
import { map, tap } from 'rxjs';
import { StoreService } from '../../Store/store.service';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  private http = inject(HttpClient);
  private store = inject(StoreService);
  private apiUrl = 'https://vn-fe-test-api.iwalabs.info/house_models';

  getModels(){
    return this.http.get<{data:IHouseModel[]}>(this.apiUrl).pipe(
      map(res=>res.data),
      tap(models=>this.store.setHouseModels(models))
    );
  };
  
}
