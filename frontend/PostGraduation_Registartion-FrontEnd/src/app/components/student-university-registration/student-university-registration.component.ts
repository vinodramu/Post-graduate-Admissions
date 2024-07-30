import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-university-registration',
  templateUrl: './student-university-registration.component.html',
  styleUrls: ['./student-university-registration.component.scss']
})
export class StudentUniversityRegistrationComponent implements OnInit {
  selectedTab = 0;
  tabsVisible = false;
  menuVisible = false; // Track menu visibility

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Subscribe to route changes to handle tab selection based on URL
    this.route.firstChild?.url.subscribe(urlSegments => {
      if (urlSegments.length > 0) {
        this.tabsVisible = true;
        switch (urlSegments[0]?.path) {
          case 'studentPersonalDeatialsForm':
            this.selectedTab = 0;
            break;
          case 'studentAddressDeatialsForm':
            this.selectedTab = 1;
            break;
          case 'studentEducationalDeatialsForm':
            this.selectedTab = 2;
            break;

          case 'studentCourseDeatialsForm':
            this.selectedTab = 3;
            break;
          case 'studentDocumentForm':
            this.selectedTab = 4;
            break;
          default:
            this.selectedTab = 0; // Default tab
        }
      }
    });
  }

  onTabChange(index: number) {
    this.selectedTab = index;
    switch (index) {
      case 0:
        this.router.navigate(['studentPersonalDeatialsForm'], { relativeTo: this.route });
        break;

      case 1:
        this.router.navigate(['studentAddressDeatialsForm'], { relativeTo: this.route });
        break;

      case 2:
        this.router.navigate(['studentEducationalDeatialsForm'], { relativeTo: this.route });
        break;   
      case 3:
        this.router.navigate(['studentCourseDeatialsForm'], { relativeTo: this.route });
        break;
      case 4:
        this.router.navigate(['studentDocumentForm'], { relativeTo: this.route });
        break;
    }
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  showTabs() {
    this.tabsVisible = true;
    this.menuVisible = false; // Hide the menu when tabs are shown
    this.selectedTab = 0; // Default to the first tab (Personal Details)
    this.router.navigate(['studentPersonalDeatialsForm'], { relativeTo: this.route }); // Navigate to the default tab
  }
}
