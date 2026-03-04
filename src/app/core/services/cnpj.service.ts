import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';

import { AbstractHttpService } from '../abstracts/service.abstract';
import { ICompany } from '../interfaces/company.interface';

@Injectable({ providedIn: 'root' })
export class CNPJService extends AbstractHttpService<ICompany> {
  protected override readonly endpoint = 'https://api.opencnpj.org';

  public findByCnpj(cnpj: string) {
    if (this.cache.has(cnpj)) {
      return of(this.cache.get(cnpj)!);
    }
    return this.get<ICompany>('/' + cnpj).pipe(tap((company) => {
      this.cache.set(cnpj, company)
    }))
  }

}
