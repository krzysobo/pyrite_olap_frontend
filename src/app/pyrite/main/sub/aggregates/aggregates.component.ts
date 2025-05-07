import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AggregateService } from '../../../_utils/services/aggregate-service';

@Component({
  selector: 'app-pyrite-main-aggregates',
  standalone: false,
  templateUrl: './aggregates.component.html',
  styleUrl: './aggregates.component.scss',
})
export class AggregatesComponent implements OnInit, OnDestroy {
  constructor(private aggregateService: AggregateService) {

  }

  get aggregate_service(): AggregateService {
    return this.aggregateService;
  }

  init_aggregate_data_from_endpoint(aggregate_data: any) {
    this.aggregateService.init_aggregate_data_from_endpoint(aggregate_data);
  }

  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {}
}
