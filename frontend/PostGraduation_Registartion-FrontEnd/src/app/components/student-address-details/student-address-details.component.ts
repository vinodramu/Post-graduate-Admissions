import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentAddress } from 'src/app/models/studentAddress.model';
import { CommonService } from 'src/app/services/common.service';
import { StudentAddressService } from 'src/app/services/student-address.service';

@Component({
  selector: 'app-student-address-details',
  templateUrl: './student-address-details.component.html',
  styleUrls: ['./student-address-details.component.scss']
})
export class StudentAddressDetailsComponent implements OnInit {
  isStudentAddressPresent = false;
  submitted = false;
  studentAddressForm!: FormGroup;
  countries: string[] = [];
  states: string[] = [];
  cities: string[] = ['11', 'bangalore'];
  pincodes: string[] = ['517257'];
  studentAddress!: StudentAddress;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private studentAddressService: StudentAddressService,
    private router: Router
  ) {}

  ngOnInit() {
    this.studentAddressForm = this.formBuilder.group({
      permanentAddress: ['', Validators.required],
      correspondenseAddress: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      country: ['', Validators.required],
    });

    this.fetchDropdownData();
    this.getStudentAddressDetailsByStudentId();
  }

  fetchDropdownData() {
    // get countries
    this.commonService.getAllCountries().subscribe(data => {
      this.countries = data.map((country: any) => country.name);
    }, error => {
      console.error('Error fetching college data:', error);
    });
  }

  onCountryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedCountry = target.value;

    this.commonService.getStatesByCountry(selectedCountry).subscribe(state => {
      this.states = state;
      console.log('States:', this.states);
      this.studentAddressForm.controls['state'].setValue('');
    });
  }

  private mapFormToStudentAddressData(formValue: any): void {
    this.studentAddress = {
      studentId: localStorage.getItem('studentId') as string,
      correspondenseAddress: formValue.correspondenseAddress,
      permanentAddress: formValue.permanentAddress,
      state: formValue.state,
      city: formValue.city,
      pincode: formValue.pincode,
      country: formValue.country
    };
  }

  get f() { return this.studentAddressForm.controls; }

  getStudentAddressDetailsByStudentId() {
    this.studentAddressService.getStudentAddressByStudentId().subscribe((data: StudentAddress) => {
      this.studentAddress = data;
      if (this.studentAddress != null) {
        this.isStudentAddressPresent = true;
        this.studentAddressForm.patchValue(this.studentAddress);
      } 
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.studentAddressForm.valid) {
      this.mapFormToStudentAddressData(this.studentAddressForm.value);

      if (this.isStudentAddressPresent) {
        // Update API
        this.studentAddressService.updateStudentAddressData(this.studentAddress)
          .subscribe(response => {
            console.log('Data updated successfully:', response);
            this.router.navigate(['/studentUniversityRegistration/studentEducationalDeatialsForm']);
          }, error => {
            console.error('Error updating data:', error);
          });
      } else {
        // Create API
        this.studentAddressService.saveStudentAddressData(this.studentAddress)
          .subscribe(response => {
            console.log('Data saved successfully:', response);
            this.router.navigate(['/studentUniversityRegistration/studentEducationalDeatialsForm']);
          }, error => {
            console.error('Error saving data:', error);
          });
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
