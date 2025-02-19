import { forkJoin, Observable } from "rxjs";
import { HousesService } from "./API/houses.api/houses.service";
import { ModelsService } from "./API/models.api/models.service";

export function initializeApp(ms: ModelsService, hs: HousesService): () => Observable<any> {
    return () => forkJoin([
      ms.getModels(),
      hs.getHouses()
    ]);
  }