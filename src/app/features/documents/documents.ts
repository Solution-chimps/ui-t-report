import { Component, signal } from '@angular/core';

import { Report } from '../../core/models/report.model';
import { Tooltip } from '../../shared/components/tooltip/tooltip';

@Component({
  selector: 'ui-documents',
  imports: [Tooltip],
  templateUrl: './documents.html',
  styleUrl: './documents.scss',
})
export class Documents {

  public readonly reports = signal(Report.getMock());

}
