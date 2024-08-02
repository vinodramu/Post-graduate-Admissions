import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { GridApi, Column } from 'ag-grid-community';
import { ActionCellRendererComponent } from '../../action-cell-renderer/action-cell-renderer.component';


@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.scss']
})
export class ManageAdminsComponent {

  admins: any[] = [];
  newAdmin = { name: '', email: '', password: '', roles: ['Admin'] };
  editAdminData = { id: '', name: '', email: '', password: '', roles: ['Admin'] };

  columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Roles', field: 'roles', valueGetter: (params: { data: { roles: any[]; }; }) => params.data.roles.join(', ') },
     { headerName: 'Actions', cellRenderer: 'actionCellRenderer' }
  ];

  frameworkComponents = {
    actionCellRenderer: ActionCellRendererComponent
  };

  pageSize = 5;
  currentPage = 0;
  totalPages = 0;
  gridApi!: GridApi;
  columnApi!: Column;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadAdmins();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.loadAdmins();
  }

  createAdmin() {
    this.adminService.createAdmin(this.newAdmin).subscribe(response => {
      this.loadAdmins();  // Refresh the admin list
    }, error => {
      console.error(error);
    });
  }

  loadAdmins(page = 1, limit: number = this.pageSize) {
    this.adminService.getAdmins(page, limit).subscribe(data => {
      this.admins = data.items || [];
      this.totalPages = Math.ceil(data.total / limit);
      this.currentPage = page - 1; // Adjust for zero-based index
      (this.gridApi as any).setRowData(this.admins);
    }, error => {
      console.error(error);
    });
  }

  updateAdmin() {
    this.adminService.updateAdmin(this.editAdminData.id, this.editAdminData).subscribe(response => {
      this.loadAdmins(this.currentPage + 1);  // Refresh the admin list
    }, error => {
      console.error(error);
    });
  }

  deleteAdmin(id: string) {
    this.adminService.deleteAdmin(id).subscribe(response => {
      this.loadAdmins(this.currentPage + 1);  // Refresh the admin list
    }, error => {
      console.error(error);
    });
  }

  editAdmin(admin: any) {
    this.editAdminData = { ...admin };
  }

  onCellClicked(event: any) {
    if (event.colDef.headerName === 'Actions') {
      const target = event.event.target as HTMLElement;
      if (target.tagName === 'I' || target.tagName === 'BUTTON') {
        const action = target.classList.contains('fa-edit') ? 'Edit' : 'Delete';
        if (action === 'Edit') {
          this.editAdmin(event.data);
        } else if (action === 'Delete') {
          this.deleteAdmin(event.data._id);
        }
      }
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadAdmins(this.currentPage + 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadAdmins(this.currentPage + 1);
    }
  }

  onPaginationChanged(event: any) {
    // Optional: handle additional pagination events if needed
  }


   actionCellRenderer(params : any) {
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fa fa-edit"></i>';
    editButton.className = 'btn btn-primary';
    editButton.addEventListener('click', (event) => {
      event.stopPropagation();
      params.context.onEdit(params.data);
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
    deleteButton.className = 'btn btn-danger';
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      params.context.onDelete(params.data);
    });
  
    // Create a container for the buttons
    const container = document.createElement('div');
    container.appendChild(editButton);
    container.appendChild(deleteButton);
  
    return container;
  }
}
