import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AndroidService} from "../../services/android.service";

@Component({
  selector: 'app-androids',
  templateUrl: './androids.component.html',
  styleUrls: ['./androids.component.css']
})
export class AndroidsComponent implements OnInit {
  androids;

  @Output() onAndroidEdit = new EventEmitter<{}>();

  constructor(private androidService: AndroidService) {
  }

  onEnableEdit(android) {
    this.onAndroidEdit.emit(android);
  }

  async ngOnInit() {
    await this.androidService.loadAndroids().then(androids => {
      this.androids = androids;

    });
  }


  getAndroids() {

  }

  async onDelete(id){
    this.androids = await this.androidService.deleteAndroid(id);
    console.log(this.androids);
  }


}
