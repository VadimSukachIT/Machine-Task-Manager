import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AndroidService} from "../../services/android.service";
import {Subscription} from "rxjs/internal/Subscription";
import {AssignService} from "../../services/assign.service";
import {JobsService} from "../../services/jobs.service";

@Component({
  selector: 'app-androids',
  templateUrl: './androids.component.html',
  styleUrls: ['./androids.component.css']
})
export class AndroidsComponent implements OnInit, OnDestroy {
  androids;

  @Output() onAndroidEdit = new EventEmitter<{}>();
  subscription: Subscription;

  constructor(private assignService: AssignService, private androidService: AndroidService, private jobService: JobsService) {
    this.subscription = this.assignService.getAssign().subscribe(async ({android, job}) => {
      if (android.assignedJob === job._id){
        this.assignService.changeMode(false);
        return
      }
      this.updateStatus(android, job._id);
      await androidService.assignAndroid(android, job);
      this.assignService.changeMode(false);
    });
  }

  private updateStatus(android: any, jobId) {
    if (android.reliability > 1) {
      android.reliability = --android.reliability;
    } else if (android.reliability === 1) {
      android.reliability = 0;
      android.status = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onEnableEdit(android) {
    this.onAndroidEdit.emit(android);
  }

  async ngOnInit() {
    await this.androidService.loadAndroids().then(androids => {
      this.androids = androids;

    });
  }

  async onDelete(id) {
    this.androids = await this.androidService.deleteAndroid(id);
  }


}
