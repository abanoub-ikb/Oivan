import { Component, inject } from '@angular/core';
import { ErrorService } from '../../services/errorService/error.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-error-modal',
  imports: [AsyncPipe],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css'
})
export class ErrorModalComponent {
  private errService = inject(ErrorService);
  errMsg$ = this.errService.errMsg$;

  dismissError(){
    this.errService.clearError();
  };
}
