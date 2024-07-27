import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentAddress } from 'src/app/models/studentAddress.model';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-student-address-details',
  templateUrl: './student-address-details.component.html',
  styleUrls: ['./student-address-details.component.scss']
})
export class StudentAddressDetailsComponent implements OnInit {
  submitted=false;
  studentAddressForm!: FormGroup;
  countries = [];
  states: string[] = [];
  cities: string[] = [];
  pincodes: string[] = [];
  studentAddress!:StudentAddress;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.studentAddressForm = this.formBuilder.group({
      permanentAddress: ['', Validators.required],
      correspondenseAddress: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.fetchDropdownData()
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
    });
  }

  private mapFormToStudentAddressData(formValue: any): void{
    this.studentAddress.correspondenseAddress=formValue.correspondenseAddress;
    this.studentAddress.permanentAddress=formValue.permanentAddress;
    this.studentAddress.state=formValue.state;
    this.studentAddress.city=formValue.city;
    this.studentAddress.pincode=formValue.pincode;
    this.studentAddress.country=formValue.country;
  }

  get f() { return this.studentAddressForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('Form submitted:');
  }
}
