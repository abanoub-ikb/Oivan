import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loaderService/loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  private loaderService = inject(LoaderService);
  isLoading$ = this.loaderService.isLoading$
}
