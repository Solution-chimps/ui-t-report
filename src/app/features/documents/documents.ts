import { Component, signal } from '@angular/core';

import { Report } from '../../core/models/report.model';

@Component({
  selector: 'ui-documents',
  imports: [],
  templateUrl: './documents.html',
  styleUrl: './documents.scss',
})
export class Documents {

  public readonly reports = signal(Report.getMock());

}
