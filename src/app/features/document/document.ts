import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

import { CNPJService } from '../../core/services/cnpj.service';
import { TEL_LENTGH } from '../../core/validators/phone.validator';
import { UiValidators } from '../../core/validators/validators';
import { Input } from '../../shared/components/input/input';

@Component({
  selector: 'ui-document',
  imports: [ReactiveFormsModule, Input, RouterLink],
  templateUrl: './document.html',
  styleUrl: './document.scss',
})
export class Document implements OnInit {

  public readonly form = new FormBuilder().group({
    company: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    abbreviation: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(90)]],
    cnpj: ['', [UiValidators.cnpj]],
    cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    neighborhood: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    number: ['', [Validators.required, Validators.maxLength(10)]],
    tel: ['', [Validators.required, Validators.maxLength(20), UiValidators.phone]],
    ddd: ['', [Validators.required, Validators.maxLength(2), UiValidators.ddd]],
    st: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
  });

  public readonly maskTelefone = signal('0000-00009')
  private readonly cnpjService = inject(CNPJService);
  private readonly destroyRef = inject(DestroyRef);


  public ngOnInit(): void {
    this.listenCNPJValueChanges();
    this.form.get('tel')?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef), filter(tel => (tel || '').length >= TEL_LENTGH)).subscribe((phone) => {
      if (phone!.length <= TEL_LENTGH) {
        this.maskTelefone.set('0000-00009');
        return;
      }
      this.maskTelefone.set('0 0000-0000');
    })
  }

  private listenCNPJValueChanges(): void {
    this.form.get('cnpj')?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      map((cnpj) => cnpj?.replace(/\D/g, '')),
      filter((cnpj) => !!this.form.get('cnpj')?.valid && !!cnpj), switchMap((cnpj) => this.cnpjService.findByCnpj(cnpj!))).subscribe((company) => {
        if (company) {
          this.form.patchValue({
            company: company.razao_social,
            abbreviation: company.razao_social.split(' ').map(word => word.at(0)).join(''),
            cep: company.cep,
            neighborhood: company.bairro,
            number: company.numero,
            st: company.logradouro,
            tel: company.telefones.at(0)?.numero
          });
        }
      });
  }
}
