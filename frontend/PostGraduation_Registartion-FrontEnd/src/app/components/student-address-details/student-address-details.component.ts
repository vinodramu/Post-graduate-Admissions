import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentAddress } from 'src/app/models/studentAddress.model';
import { CommonService } from 'src/app/services/common.service';
import { StudentAddressService } from 'src/app/services/student-address.service';
 
@Component({
  selector: 'app-student-address-details',
  templateUrl: './student-address-details.component.html',
  styleUrls: ['./student-address-details.component.scss'],
})
export class StudentAddressDetailsComponent implements OnInit {
  isStudentAddressPresent = false;
  submitted = false;
  studentAddressForm!: FormGroup;
  countries: string[] = [];
  states: string[] = [];
  cities: string[] = [];
  @Input()
  pincodes: string[] = ['560017'];
  studentAddress!: StudentAddress;
  personalId: string | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private studentAddressService: StudentAddressService,
    private router: Router,
    private route: ActivatedRoute
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
    this.personalId = localStorage.getItem('studentId');
    this.fetchDropdownData();
    if (localStorage.getItem('role') === 'admin') {
      this.route.paramMap.subscribe((params) => {
        this.personalId = params.get('PersonalId');
      });
    }
    if (this.personalId) {
      this.isStudentAddressPresent = true;
      this.getStudentAddressDetailsByStudentId(this.personalId);
    } else {
      console.error('No PersonalId provided in route');
    }
  }
 
  fetchDropdownData() {
    // Get countries
    this.commonService.getCountries().subscribe(
      (data) => {
        console.log('Countries data:', data); // Log the response data
        this.countries = data.map((country: any) => country.country_name);
      },
      (error) => {
        console.error('Error fetching country data:', error);
      }
    );
  }
 
  onCountryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedCountry = target.value;
 
    this.commonService.getStatesByCountry(selectedCountry).subscribe(
      (data) => {
        console.log('States data:', data); // Log the response data
        this.states = data.map((state: any) => state.state_name);
        this.studentAddressForm.controls['state'].setValue('');
        this.cities = []; // Clear cities when country changes
      },
      (error) => {
        console.error('Error fetching state data:', error);
      }
    );
  }
 
  onStateChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedState = target.value;
 
    this.commonService.getCitiesByState(selectedState).subscribe(
      (data) => {
        console.log('Cities data:', data); // Log the response data
        this.cities = data.map((city: any) => city.city_name);
        this.studentAddressForm.controls['city'].setValue('');
      },
      (error) => {
        console.error('Error fetching city data:', error);
      }
    );
  }
  onCityChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedCity = target.value;
 
    this.commonService.getPincodesByCity(selectedCity).subscribe(
      (data) => {
        console.log('Pincodes data:', data); // Log the response data
        this.pincodes = data;
        this.studentAddressForm.controls['pincode'].setValue('');
      },
      (error) => {
        console.error('Error fetching pincode data:', error);
      }
    );
  }
 
  private mapFormToStudentAddressData(formValue: any): void {
    this.studentAddress = {
      studentId: localStorage.getItem('studentId') as string,
      correspondenseAddress: formValue.correspondenseAddress,
      permanentAddress: formValue.permanentAddress,
      state: formValue.state,
      city: formValue.city,
      pincode: formValue.pincode,
      country: formValue.country,
    };
  }
 
  get f() {
    return this.studentAddressForm.controls;
  }
 
  getStudentAddressDetailsByStudentId(personalId: string) {
    this.studentAddressService
      .getStudentAddressByStudentId(personalId)
      .subscribe((data: StudentAddress) => {
        this.studentAddress = data;
        if (this.studentAddress != null) {
          this.isStudentAddressPresent = true;
          // Update the form with the received data
          this.studentAddressForm.patchValue(this.studentAddress);
          // Fetch states for the stored country
          this.commonService
            .getStatesByCountry(this.studentAddress.country)
            .subscribe((stateData) => {
              this.states = stateData.map((state: any) => state.state_name);
              this.studentAddressForm.controls['state'].setValue(
                this.studentAddress.state
              );
            });
          // Fetch cities for the stored state
          this.commonService
            .getCitiesByState(this.studentAddress.state)
            .subscribe((cityData) => {
              this.cities = cityData.map((city: any) => city.city_name);
              this.studentAddressForm.controls['city'].setValue(
                this.studentAddress.city
              );
            });
        }
      });
  }
 
  onSubmit(): void {
    this.submitted = true;
 
    if (this.studentAddressForm.valid) {
      this.mapFormToStudentAddressData(this.studentAddressForm.value);
 
      if (this.isStudentAddressPresent) {
        // Update API
        this.studentAddressService
          .updateStudentAddressData(this.studentAddress)
          .subscribe(
            (response) => {
              console.log('Data updated successfully:', response);
              this.router.navigate([
                '/studentUniversityRegistration/studentEducationalDeatialsForm',
                this.personalId,
              ]);
            },
            (error) => {
              console.error('Error updating data:', error);
            }
          );
      } else {
        // Create API
        this.studentAddressService
          .saveStudentAddressData(this.studentAddress)
          .subscribe(
            (response) => {
              console.log('Data saved successfully:', response);
              this.router.navigate([
                '/studentUniversityRegistration/studentEducationalDeatialsForm',
                this.personalId,
              ]);
            },
            (error) => {
              console.error('Error saving data:', error);
            }
          );
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
 
 