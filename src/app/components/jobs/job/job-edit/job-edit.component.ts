import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {JobsService} from "../../../../services/jobs.service";

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {
  @Input() job;
  @Output() cancelJobEdit = new EventEmitter<void>();
  complexityLevels = ['easy', 'normal', 'hard', 'impossible'];
  selectedValue;

  @ViewChild('form') myForm;
  @ViewChild('select') selectComplexity;

  constructor(private jobsService: JobsService) {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      'name': new FormControl(this.job.name, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      'description': new FormControl(this.job.description, Validators.maxLength(255)),
      'complexityLevel': new FormControl()
    });
  }

  async onSubmit() {
    if (this.myForm.valid) {
      this.job.name = this.myForm.value.name;
      this.job.description = this.myForm.value.description;
      this.job.complexityLevel = this.selectComplexity.nativeElement.value;
      await this.jobsService.updateJob(this.job);
      this.cancelJobEdit.emit();
    }
  }


  onCancelCreation() {
    this.cancelJobEdit.emit();
  }


}
