import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JobsService} from "../../../../services/jobs.service";

@Component({
  selector: 'app-job-creation',
  templateUrl: './job-creation.component.html',
  styleUrls: ['./job-creation.component.css']
})
export class JobCreationComponent implements OnInit {
  job;
  @Output() cancelJobCreation = new EventEmitter<void>();

  complexityLevels = ['easy', 'normal', 'hard', 'impossible'];
  selectedValue = 'easy';

  constructor(private jobService: JobsService) {
  }

  ngOnInit() {
  }

  async onSubmit(form) {
    console.log(form.value.name);
    console.log(form.value.description);
    console.log(form.value.complexityLevel);
    if (form.valid) {
      this.job = {
        name: form.value.name,
        description: form.value.description,
        complexityLevel: this.selectedValue
      };
      await this.jobService.createJob(this.job);
      this.cancelJobCreation.emit();
    }
  }

  onCancelCreation() {
    this.cancelJobCreation.emit();
  }
}
