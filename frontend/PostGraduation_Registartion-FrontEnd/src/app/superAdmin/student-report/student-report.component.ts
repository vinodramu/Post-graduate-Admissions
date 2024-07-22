import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridApi } from 'ag-grid-community';
import { ActionCellRendererComponent } from './action-cell-renderer/action-cell-renderer.component';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit {
  private gridApi!: GridApi;

  columnDefs = [
    { headerName: 'Student ID', field: 'studentId' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'GPA', field: 'gpa' },
    { headerName: 'Enrollment Date', field: 'enrollmentDate' },
    { headerName: 'Actions', cellRenderer: 'actionRenderer' }
  ];

  rowData: any[] = [];
  paginationPageSize = 5;
  currentPage = 1;
  totalRecords = 0;

  frameworkComponents = {
    actionRenderer: ActionCellRendererComponent
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get<any>(`http://192.168.0.102:4000/superAdmin/list/students?page=${this.currentPage}&limit=${this.paginationPageSize}`)
      .subscribe(data => {
        console.log('Fetched data:', data); // Check the response
        this.rowData = data.students;
        this.totalRecords = data.total;
      });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
  }

  onPageChanged(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.fetchData();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalRecords / this.paginationPageSize);
  }
}
