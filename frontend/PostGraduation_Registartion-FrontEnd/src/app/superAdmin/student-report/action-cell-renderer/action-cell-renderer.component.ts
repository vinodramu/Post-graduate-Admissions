import { Component } from '@angular/core';

@Component({
  selector: 'app-action-cell-renderer',
  template: `
    <button (click)="onEdit()">Edit</button>
    <button (click)="onDelete()">Delete</button>
  `,
  styles: [`
    button {
      margin-right: 5px;
      padding: 5px 10px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    button:first-child {
      background-color: #007bff;
      color: white;
    }
    button:first-child:hover {
      background-color: #0056b3;
    }
    button:last-child {
      background-color: #dc3545;
      color: white;
    }
    button:last-child:hover {
      background-color: #c82333;
    }
  `]
})
export class ActionCellRendererComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  onEdit(): void {
    this.params.onEdit(this.params.data.studentId);
  }

  onDelete(): void {
    this.params.onDelete(this.params.data.studentId);
  }
}
