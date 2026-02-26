import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { SessionStorage } from '../../core/models/session-storage.model';
import { User } from '../../core/models/user.model';
import { Input } from '../../shared/components/input/input';

@Component({
  selector: 'ui-login',
  imports: [ReactiveFormsModule, Input],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  public readonly form = new FormBuilder().group({
    user: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
  });

  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  public ngOnInit(): void {
    SessionStorage.logout();
  }

  public handleLogin(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { password, user } = this.form.getRawValue();
    const loginUser = User.getUsers().find(data => data.user === user && data.password === password);
    if (loginUser) {
      SessionStorage.setUser(loginUser);
      this.toastr.success(`Bem vindo ${User.getUserLogged()?.name || User.getUserLogged()?.user}`)
      this.router.navigateByUrl('');
    } else {
      this.toastr.error('Usuario não encontrado')
    }
  }
}
