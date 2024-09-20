import { Component, inject } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private accessService = inject(AccessService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  Log_in() {
    if (this.formLogin.invalid) return;

    const login: Login = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    }

    this.accessService.login(login).subscribe({
      next: (data) => {
        if (data.status) {
          localStorage.setItem('Angular17Token', data.jwt)
          this.router.navigate(['Home'])
        }
        else {
          alert("Invalid Credentials")
        }
      },
      error: (error) => {
        console.log(error.message);
      }
    })
  }

}
