export class Report {
  public reportNumber?: string;
  public company?: string;
  public tag?: string;
  public inspectionDate?: string;
  public examExpirationDate?: string;
  public recommendations?: string;

  public static getMock(): Report[] {
    return [
      {
        reportNumber: "REL-0001",
        company: "Sergio Lumelino LTDA",
        tag: "EXT-01",
        inspectionDate: "2026-01-15",
        examExpirationDate: "2026-07-15",
        recommendations: "Perform new inspection in 6 months."
      },
      {
        reportNumber: "REL-0002",
        company: "Erika Gambeti ME",
        tag: "VASO-02",
        inspectionDate: "2026-02-10",
        examExpirationDate: "2026-08-10",
        recommendations: "Replace safety valve."
      },
      {
        reportNumber: "REL-0003",
        company: "Alpha Construction",
        tag: "BOILER-05",
        inspectionDate: "2026-01-28",
        examExpirationDate: "2026-04-28",
        recommendations: "Equipment within standards."
      },
      {
        reportNumber: "REL-0004",
        company: "Beta Metallurgy",
        tag: "COMP-09",
        inspectionDate: "2026-02-01",
        examExpirationDate: "2026-05-01",
        recommendations: "Check maximum allowed pressure."
      }
    ]
  }
}
