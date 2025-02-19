import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errMsg = new BehaviorSubject<string | null>(null);
  errMsg$ = this.errMsg.asObservable();

  setError(msg:string){
    this.errMsg.next(msg)
  };

  clearError(){
    this.errMsg.next(null)
  }
}
