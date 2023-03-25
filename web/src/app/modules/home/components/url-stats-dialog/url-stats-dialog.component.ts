import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UrlsService } from '@src/core/services/api';
import { UserUrl, UserUrlStats } from '@src/types/models';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-url-stats-dialog',
  templateUrl: './url-stats-dialog.component.html',
  styleUrls: ['./url-stats-dialog.component.scss'],
})
export class UrlStatsDialogComponent {
  userUrlStats: UserUrlStats[] = [];
  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
  };
  chartType: ChartType = 'polarArea';
  chartTypes: ChartType[] = ['polarArea', 'pie', 'radar'];
  chartTypesNames: Record<string, string> = {
    polarArea: 'Polar area',
    pie: 'Pie',
    radar: 'Radar',
  };
  chartLabels: string[] = [];
  chartData: any = [{ data: [], label: 'N/A' }];

  private _userUrl!: UserUrl;

  constructor(
    public activeModal: NgbActiveModal,
    private _urlsService: UrlsService
  ) {}

  get userUrl(): UserUrl {
    return this._userUrl;
  }
  set userUrl(userUrl: UserUrl) {
    this._userUrl = userUrl;
    this._fetchStats();
  }

  onClose(): void {
    this.activeModal.close();
  }

  onChangeType(chartType: ChartType): void {
    this.chartType = chartType;
  }

  private _fetchStats(): void {
    this._urlsService
      .readStats(this.userUrl.id)
      .subscribe((response: UserUrlStats[]) => {
        this.userUrlStats = response;
        this._prepareData();
      });
  }

  /**
   * Useful for transforming raw UsrUrlStats data into objects compatible
   * with the used chart component
   */
  private _prepareData(): any {
    const data = this.userUrlStats.reduce(
      (result: Record<string, number>, item: UserUrlStats) => ({
        ...result,
        [item.referrer]: (result[item.referrer] || 0) + 1,
      }),
      {}
    );
    const labels = Object.keys(data);
    this.chartLabels = labels;
    this.chartData = [{ data: Object.values(data), label: 'Referrers' }];
  }
}
