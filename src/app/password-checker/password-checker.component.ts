import { Component } from '@angular/core';

@Component({
  selector: 'app-password-checker',
  templateUrl: './password-checker.component.html',
  styleUrls: ['./password-checker.component.css']
})
export class PasswordCheckerComponent {
  password: string = '';
  strength: string = '';
  strengthScore: number = 0;
  strengthClass: string = 'progress-bar bg-danger';

  personalDetails = {
    firstName: '',
    lastName: '',
    birthDate: ''
  };

  top10Passwords = ['123456', 'password', '123456789', '12345678', '12345', '1234567', '123123', '000000', 'qwerty', 'abc123'];

  checkPassword() {
    this.checkTop10Passwords();
  }

  checkBasicLevel() {
    const hasUpperCase = /[A-Z]/.test(this.password);
    const hasLowerCase = /[a-z]/.test(this.password);
    const hasNumbers = /\d/.test(this.password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
    const length = this.password.length;

    let strengthScore = 0;
    if (hasUpperCase) strengthScore += 20;
    if (hasLowerCase) strengthScore += 20;
    if (hasNumbers) strengthScore += 20;
    if (hasSpecialChars) strengthScore += 20;
    if (length >= 8) strengthScore += 20;

    this.strengthScore = strengthScore;
    this.updateStrengthMeter();
  }

  checkTop10Passwords() {
    if (this.top10Passwords.includes(this.password)) {
      this.strength = 'Very Weak (Common Password)';
      this.strengthScore = 20;
      this.strengthClass = 'progress-bar bg-danger';
    } else {
      this.checkBasicLevel();
    }
  }

  generatePassword() {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let generatedPassword = '';
    for (let i = 0; i < 8; i++) {
      generatedPassword += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    generatedPassword += this.personalDetails.firstName.charAt(0);
    generatedPassword += this.personalDetails.lastName.charAt(0);
    generatedPassword += this.personalDetails.birthDate.split('-')[0].slice(-2);

    this.password = generatedPassword;
    this.checkTop10Passwords(); // Check the generated password strength
  }

  updateStrengthMeter() {
    if (this.strengthScore <= 40) {
      this.strength = 'Weak';
      this.strengthClass = 'progress-bar bg-danger';
    } else if (this.strengthScore <= 60) {
      this.strength = 'Medium';
      this.strengthClass = 'progress-bar bg-warning';
    } else if (this.strengthScore <= 80) {
      this.strength = 'Strong';
      this.strengthClass = 'progress-bar bg-info';
    } else {
      this.strength = 'Very Strong';
      this.strengthClass = 'progress-bar bg-success';
    }
  }
}
