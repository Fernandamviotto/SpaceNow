import { Component, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.css'
})
export class TabGroupComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  @Output() selectedTabChange = new EventEmitter<number>();
  
  selectedIndex = 0;

  ngAfterContentInit() {
    // Ativa a primeira tab por padrão
    const tabsArray = this.tabs.toArray();
    if (tabsArray.length > 0) {
      tabsArray[0].active = true;
    }
  }

  selectTab(index: number) {
    this.selectedIndex = index;
    const tabsArray = this.tabs.toArray();
    tabsArray.forEach((tab, i) => {
      tab.active = i === index;
    });
    this.selectedTabChange.emit(index);
  }
}
