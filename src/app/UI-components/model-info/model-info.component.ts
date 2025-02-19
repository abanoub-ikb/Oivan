import { Component, Input } from '@angular/core';
import { IMedia, ModelInfo } from '../../Models/house-model.model';

@Component({
  selector: 'app-model-info',
  imports: [],
  templateUrl: './model-info.component.html',
  styleUrl: './model-info.component.css'
})
export class ModelInfoComponent {
@Input() modelInfo!:Partial<IMedia>

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/model-placeholder.jpg'; 
  }
}
