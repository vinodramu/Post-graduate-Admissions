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
  isStudentAddressPresent!:boolean;
  submitted=false;
  studentAddressForm!: FormGroup;
  countries = [];
  states: string[] = [];
  cities: string[] = ['11','banglore'];
  pincodes: string[] = ['517257'];
  studentAddress!:StudentAddress;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private studentAddressService: StudentAddressService,
    private router:Router
  ) { }

  ngOnInit() {
    this.studentAddressForm = this.formBuilder.group({
      permanentAddress: [this.studentAddress?.permanentAddress || '', Validators.required],
      correspondenseAddress: [this.studentAddress?.correspondenseAddress || '', Validators.required],
      state: [this.studentAddress?.state || '', Validators.required],
      city: [this.studentAddress?.city || '', Validators.required],
      pincode: [this.studentAddress?.pincode || '', Validators.required],
      country: [this.studentAddress?.country || '', Validators.required],
    });
    this.fetchDropdownData()
    this.getStudentAddressDetailsByStudentId()
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
    this.studentAddress = {
      studentId:localStorage.getItem('studentId') as string,
      correspondenseAddress: formValue.correspondenseAddress,
      permanentAddress: formValue.permanentAddress,
      state: formValue.state,
      city: formValue.city,
      pincode: formValue.pincode,
      country: formValue.country
    };
  }

  get f() { return this.studentAddressForm.controls; }

  getStudentAddressDetailsByStudentId(){
    this.studentAddressService.getStudentAddressByStudentId().subscribe((data: StudentAddress) => {
      this.studentAddress = data;
      if (this.studentAddress !=null) {
        this.isStudentAddressPresent=true;
      } 
    });
  }

  onSubmit(): void {
    if (this.studentAddressForm.valid) {
      this.submitted = true;
      this.mapFormToStudentAddressData(this.studentAddressForm.value);
      if(this.isStudentAddressPresent!=null){
        // updtae API
      }else{
      this.studentAddressService.saveStudentAddressData(this.studentAddress)
        .subscribe(response => {
          console.log('Data saved successfully:', response);
          this.router.navigate(['/studentEducationalDeatialsForm']);
        }, error => {
          console.error('Error saving data:', error);
        });
    }}else {
      console.log('Form is invalid');
    }
  }
}
