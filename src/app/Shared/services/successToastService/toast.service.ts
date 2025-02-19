import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // BehaviorSubject to manage toast visibility
  private isVisible = new BehaviorSubject<boolean>(false);
  private timer: ReturnType<typeof setTimeout> | null = null;
  isVisible$ = this.isVisible.asObservable();


  showToast() {

    this.isVisible.next(true);
    if (this.timer) {
      clearTimeout(this.timer);
    };

    this.timer = setTimeout(() => {
      this.hideToast();
    }, 5000);
  }


  hideToast() {
    this.isVisible.next(false);
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    };
  }
}