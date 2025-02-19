import { ModelsService } from './API/models.api/models.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HousesService } from './API/houses.api/houses.service';
import { LoaderComponent } from "./Shared/components/loader/loader.component";
import { ErrorModalComponent } from "./Shared/components/error-modal/error-modal.component";
import { ToastComponent } from "./Shared/components/toast/toast.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, ErrorModalComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private ms = inject(ModelsService);
  private hs = inject(HousesService);

  ngOnInit(): void {
      this.ms.getModels().subscribe();
      this.hs.getHouses().subscribe();
  }
}
