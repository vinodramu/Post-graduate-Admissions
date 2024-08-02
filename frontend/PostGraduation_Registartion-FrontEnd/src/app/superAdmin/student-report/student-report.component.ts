import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridApi, GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/app/environment';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit {
  columnDefs: any[] = [
    { headerName: 'Student ID', field: '_id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Actions', cellRenderer: 'actionCellRenderer' }
  ];
  
  private apiUrl = this.enviironment.baseUrl1;
  rowData: any[] = [];

  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: 'clientSide',
    paginationPageSize: 10,
    context: { 
      onView: this.onView.bind(this),
      router: this.router // Pass router to context
    },
    components: {
      actionCellRenderer: this.actionCellRenderer.bind(this)
    }
  };

  gridApi!: GridApi;

  constructor(private router: Router, private http: HttpClient,  private enviironment: Environment) { }

  ngOnInit(): void {
    this.loadStudentData();
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    params.api.setRowData(this.rowData);
  }

  loadStudentData(): void {
    this.http.get<any[]>(`${this.apiUrl}/admin/students`).subscribe(
      (data) => {
        this.rowData = data;
        if (this.gridApi) {
          (this.gridApi as any).setRowData(this.rowData);
        }
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  onView(studentId: string): void {
    console.log('Navigating to student-view with ID:', studentId); // Debugging line
    this.router.navigate(['/student-view', studentId]);
  }

  actionCellRenderer(params: any): HTMLElement {
    const eGui = document.createElement('div');
    eGui.innerHTML = `
      <select class="action-dropdown">
        <option value="">More Information</option>
        <option value="profile"><i class="fas fa-eye"></i> Profile Details</option>
        <option value="education"><i class="fas fa-edit"></i> Educational Details</option>
        <option value="document"><i class="fas fa-trash"></i> Documents</option>
      </select>
    `;

    const selectElement = eGui.querySelector('.action-dropdown') as HTMLSelectElement;
    selectElement.addEventListener('change', (event: Event) => {
      const action = (event.target as HTMLSelectElement).value;
      const studentId = params.data._id; // Use _id from API response

      if (action === 'profile') {
        (params.context.router as Router).navigate(['/studentPersonalDetailsForm', studentId]);
      } else if (action === 'education') {
        (params.context.router as Router).navigate(['/studentEducationalDeatialsForm', studentId]);
      } else if (action === 'document') {
        (params.context.router as Router).navigate(['/student-documents', studentId]);
      }
    });

    return eGui;
  }
}
