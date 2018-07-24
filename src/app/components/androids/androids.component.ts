import {Component, OnInit} from '@angular/core';
import {AndroidService} from "../../services/android.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-androids',
  templateUrl: './androids.component.html',
  styleUrls: ['./androids.component.css']
})
export class AndroidsComponent implements OnInit {
  androids;

  constructor(private androidService: AndroidService, private httpClient: HttpClient) {
  }

  async ngOnInit() {
    await this.androidService.loadAndroids().then(androids => {
      this.androids = androids;
    })
  }

  getAndroids() {

  }

  async onDelete(id){
    this.androids = await this.androidService.deleteAndroid(id);
  }


}
