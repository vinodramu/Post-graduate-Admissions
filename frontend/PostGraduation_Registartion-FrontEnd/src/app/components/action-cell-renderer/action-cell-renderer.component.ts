import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-cell-renderer',
  template: `
    <button (click)="onEdit()">Edit</button>
    <button (click)="onDelete()">Delete</button>
  `,
  styles: [`
    button {
      margin-right: 5px;
    }
  `]
})
export class ActionCellRendererComponent {

  params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onEdit() {
    this.params.context.componentParent.editAdmin(this.params.data);
  }

  onDelete() {
    this.params.context.componentParent.deleteAdmin(this.params.data._id);
  }

  // params: any;

  // agInit(params: any): void {
  //   this.params = params;
  // }

  // onEdit(): void {
  //   this.params.onEdit(this.params.data.studentId);
  // }

  // onDelete(): void {
  //   this.params.onDelete(this.params.data.studentId);
  // }
}
