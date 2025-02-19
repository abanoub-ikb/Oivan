import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = new BehaviorSubject(false);
  isLoading$ = this.isLoading.asObservable();

  load(action: boolean) {
    this.isLoading.next(action)
  };

}
