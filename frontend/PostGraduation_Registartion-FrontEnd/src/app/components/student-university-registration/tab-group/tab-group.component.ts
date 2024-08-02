import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  encapsulation: ViewEncapsulation.None // Disable view encapsulation
})
export class TabGroupComponent {
  private _selectedTab: number = 0;

  @Input()
  get selectedTab(): number {
    return this._selectedTab;
  }
  
  set selectedTab(value: number) {
    this._selectedTab = value;
    this.selectedTabChange.emit(this._selectedTab);
  }

  @Output() selectedTabChange = new EventEmitter<number>();
  @Output() tabChange = new EventEmitter<number>();

  tabs = [
    { label: 'Student Personal Details', path: 'studentPersonalDeatialsForm', active: true },
    { label: 'Student Address Details', path: 'studentAddressDeatialsForm', active: false },
    { label: 'Student Educational Details', path: 'studentEducationalDeatialsForm',active: false },
    { label: 'Student Course Details', path: 'studentCourseDeatialsForm',active: false },
    { label: 'Student Document Details', path: 'studentDocumentForm',active: false }
  ];

  onTabSelected(index: number) {
    this.selectedTab = index;
    this.tabChange.emit(index);
  }

  changeTab(index: number) {
    this.tabs = this.tabs.map((tab, i) => i === index ? { ...tab, active: true } : { ...tab, active: false });
    this.selectedTab = index;
    this.tabChange.emit(index);
  }

  setActiveTabByLabel(label: string) {
    const index = this.tabs.findIndex(tab => tab.label === label);
    if (index !== -1) {
      this.onTabSelected(index);
    }
  }
}