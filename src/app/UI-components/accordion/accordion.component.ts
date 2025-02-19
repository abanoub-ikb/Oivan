import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-accordion',
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {
  @Input() isCollapsed:boolean = true;
  @Input() header:string = ''

  toggleColabse(){
    this.isCollapsed = !this.isCollapsed
  };
}
