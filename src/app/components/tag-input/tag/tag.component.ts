import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  skill;
  @Input() newSkill;
  @Output() deleteSkill = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.skill = this.newSkill;
  }

  onDelete() {
    this.deleteSkill.emit(this.skill);
  }

}
