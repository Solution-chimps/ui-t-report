import { Component, signal } from '@angular/core';

import { AbstractTable } from '../../core/abstracts/table.abstract';
import { Report } from '../../core/models/report.model';
import { TableButton } from '../../core/models/table/buttons.model';
import { TableDataBuilderContent } from '../../core/models/table/table-builder-content.model';

@Component({
  selector: 'ui-documents',
  template: '',
})
export class Documents extends AbstractTable<Report> {

  protected override readonly items = signal(Report.getMock());

  public override title(): string {
    return 'Lista de Relatórios'
  }

  protected override buildContent(): TableDataBuilderContent<Report>[] {
    return TableDataBuilderContent.builder<Report>()
      .appendHeader('Nº Relatório')
      .content((item) => item.reportNumber)
      .appendHeader('Empresa')
      .content((item) => item.company)
      .appendHeader('Tag')
      .content((item) => item.tag)
      .appendHeader('Dt. Inspeção')
      .content((item) => item.inspectionDate)
      .appendHeader('Venc. Exame')
      .content((item) => item.examExpirationDate)
      .appendHeader('Recomendações')
      .content((item) => item.recommendations)
      .build();
  }

  protected override buttons(): TableButton<Report>[] {
    return TableButton.builder()
      .append('edit')
      .withTooltip('Editar')
      .append('delete')
      .withClass('text-feedback-danger-500')
      .withTooltip('Excluir')
      .build()
  }

}
