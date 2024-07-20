import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../models/userData.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  form: FormGroup;
  otpForm: FormGroup;
  showOtpPopup = false;
  showSuccessPopup = false;
  showErrorPopup = false;
  showResendOtp = false;
  user1!: UserData;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required, this.matchPassword.bind(this)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  matchPassword(control: FormControl): { [key: string]: boolean } | null {
    if (this.form && control.value !== this.form.get('password')?.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onUserFormSubmit() {
    if (this.form.valid) {
      this.user1 = this.form.value;
      this.user1.phone='+91'+this.form.value.phone;
      console.log(this.user1)
      this.userService.saveDeviceItemRule(this.user1).subscribe(
        response => {
          console.log('Rule saved successfully', response);
        },
        error => {
          console.error('Error saving rule', error);
        });

      this.showOtpPopup = true;
    }
  }

  onOtpSubmit() {
    if (this.otpForm.valid) {
      const otpValid = true;
      if (otpValid) {
        this.showOtpPopup = false;
        this.showSuccessPopup = true;
      } else {
        this.showOtpPopup = false;
        this.showErrorPopup = true;
      }
    }
  }

  OtpSuccess() {
    this.showSuccessPopup = false;
    this.router.navigate(['']);
  }

  closeErrorPopup() {
    this.showErrorPopup = false;
    this.showOtpPopup = true;
  }
  ResendOTP() {
    this.showResendOtp = true;
  }
}
