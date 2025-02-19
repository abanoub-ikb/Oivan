import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./Shared/components/loader/loader.component";
import { ErrorModalComponent } from "./Shared/components/error-modal/error-modal.component";
import { ToastComponent } from "./Shared/components/toast/toast.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, ErrorModalComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {}
