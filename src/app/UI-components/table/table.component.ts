import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { AuthService } from '../../Shared/services/auth/auth.service';
import { IHouse, IHouseAttributes } from '../../Models/house.model';
import { PagesCountPipe } from '../../pipes/pages-count.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DecimalPipe, AsyncPipe, RouterLink, PagesCountPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges {
  @Input() tableData: IHouse[] = [];
  private authService = inject(AuthService);
  isAdmin$ = this.authService.isAdmin$;
  currentPage$= new BehaviorSubject(1);
  tableHeader$ = this.isAdmin$.pipe(
    map((isAdmin) =>
      isAdmin
        ? ['House No', 'Block No', 'Land No', 'Price', 'Status', 'Actions']
        : ['House No', 'Block No', 'Land No', 'Price', 'Status']
    )
  );

  private tableDataSubject = new BehaviorSubject<IHouseAttributes[]>([]);
  tableData$ = this.tableDataSubject.asObservable();

  private sortState$ = new BehaviorSubject<'asc' | 'desc'>('desc');
  private defaultSortProperty: keyof IHouseAttributes = 'price';

  sortedData$: Observable<IHouseAttributes[]> = combineLatest([
    this.tableData$,
    this.sortState$,
    this.currentPage$
  ]).pipe(
    map(([data, direction,currentPage]) => {
      let filteredData = data;
      return [...filteredData].sort((a, b) => {
        if (a[this.defaultSortProperty] < b[this.defaultSortProperty])
          return direction === 'asc' ? -1 : 1;
        if (a[this.defaultSortProperty] > b[this.defaultSortProperty])
          return direction === 'asc' ? 1 : -1;
        return 0;
      }).slice((currentPage - 1) * 5,((currentPage - 1) * 5) + 5)
    }),

  );

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData'] && this.tableData) {
      this.tableDataSubject.next(this.tableData.map((el) => el.attributes));
    }
  }

  sort(property: keyof IHouseAttributes, direction: 'asc' | 'desc') {
    this.defaultSortProperty = property;
    this.sortState$.next(direction);
  };



  setActivePage(page: number) {
    this.currentPage$.next(page);
    
  }
}

