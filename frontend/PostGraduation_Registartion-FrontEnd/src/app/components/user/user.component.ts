import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/userData.model';
import { UserService } from 'src/app/services/user.service';
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
      this.user1.phone = '+91' + this.form.value.phone;
      console.log(this.user1)
      this.userService.saveUser(this.user1).subscribe(
        (response: any) => {
          console.log('User saved successfully', response);
          this.userService.sendOtp(this.user1.phone).subscribe(
            (response: any) => {
              this.showOtpPopup = true;
              console.log('otp sent successfully', response);
            },
            (error: any) => {
              console.error('Error saving User', error);
            });
        },
        (error: any) => {
          console.error('Error while saving User', error);
        });
    }
  }

  onOtpSubmit() {
    if (this.otpForm.valid) {
      this.userService.otpVarification(this.otpForm.value.otp, this.user1.phone).subscribe(
        (response: boolean) => {
          if (response) {
            this.showOtpPopup = false;
            this.showSuccessPopup = true;
          }
          else {
            this.showOtpPopup = false;
            this.showErrorPopup = true;
          }
          console.log(response)
        },
        (error: any) => {
          this.showOtpPopup = false;
          this.showErrorPopup = true;
          console.error('Error saving rule', error);
        });
    }
  }

  OtpVarifiedSuccessfully() {
    this.showSuccessPopup = false;
    this.router.navigate(['']);
  }

  closeErrorPopup() {
    this.showErrorPopup = false;
    this.showOtpPopup = true;
  }
  ResendOTP() {
    this.userService.sendOtp(this.user1.phone).subscribe(
      (response: any) => {
        this.showOtpPopup = true;
        console.log('otp sent successfully', response);
      },
      (error: any) => {
        console.error('Error saving rule', error);
      });
    this.showResendOtp = true;
  }
}
