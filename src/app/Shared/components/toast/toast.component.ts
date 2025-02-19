import { Component, inject, Input } from '@angular/core';
import { ToastService } from '../../services/successToastService/toast.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  imports: [AsyncPipe]
})
export class ToastComponent {
  @Input() message: string = 'Success';
  toastService = inject(ToastService);
  isVisible$ = this.toastService.isVisible$;

  hide() {
    this.toastService.hideToast()
  };

}