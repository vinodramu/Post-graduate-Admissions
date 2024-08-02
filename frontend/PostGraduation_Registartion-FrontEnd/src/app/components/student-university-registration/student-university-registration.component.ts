import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TabGroupComponent } from './tab-group/tab-group.component';

@Component({
  selector: 'app-student-university-registration',
  templateUrl: './student-university-registration.component.html',
  styleUrls: ['./student-university-registration.component.scss']
})
export class StudentUniversityRegistrationComponent implements OnInit {
  @ViewChild(TabGroupComponent) tabGroup!: TabGroupComponent;
  selectedTab = 0;
  tabsVisible = false;
  menuVisible = false;
  isComponentVisible = false; // Controls component visibility

  tabs = [
    { label: 'Student Personal Details', path: 'studentPersonalDeatialsForm' },
    { label: 'Student Address Details', path: 'studentAddressDeatialsForm' },
    { label: 'Student Educational Details', path: 'studentEducationalDeatialsForm' },
    { label: 'Student Course Details', path: 'studentCourseDeatialsForm' },
    { label: 'Student Document Details', path: 'studentDocumentForm' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      if (this.isPathInTabs(url)) {
        this.isComponentVisible = true;
        this.tabsVisible = true;
        this.setActiveTabByPath(url);
      } else {
        this.isComponentVisible = false;
        this.clearTabState();
      }
    });

    // this.initializeDefaultTab();
  }

  isPathInTabs(path: string): boolean {
    return this.tabs.some(t => path.includes(t.path));
  }

  setActiveTabByPath(path: string) {
    const tab = this.tabs.find(t => path.includes(t.path));
    if (tab) {
      const index = this.tabs.indexOf(tab);
      this.selectedTab = index;
      if (this.tabGroup) {
        this.tabGroup.changeTab(index);
      }
    } else {
      this.clearTabState();
    }
  }

  clearTabState() {
    this.tabsVisible = false;
    this.menuVisible = false;
    this.selectedTab = 0;
  }

  onTabChange(index: number) {
    this.selectedTab = index;
    this.router.navigate([this.tabs[index].path], { relativeTo: this.route });
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  showTabs() {
    this.tabsVisible = true;
    this.menuVisible = false;
    this.selectedTab = 0; // Optionally set the default tab index
    this.router.navigate([this.tabs[0].path], { relativeTo: this.route }); // Navigate to the default tab's path
  }

  initializeDefaultTab() {
    if (this.tabs.length > 0) {
      const defaultPath = this.tabs[0].path;
      this.router.navigate([defaultPath], { relativeTo: this.route });
      this.setActiveTabByPath(defaultPath);
    }
  }
}
