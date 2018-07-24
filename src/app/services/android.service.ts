import {EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {promise} from "selenium-webdriver";
import {error} from "util";
import {reject} from "q";

@Injectable({
  providedIn: 'root'
})
export class AndroidService {
  androids;

  constructor(private httpClient: HttpClient) {
  }

  getAndroid(index) {
    return this.androids[index];
  }

  addAndroid(android) {
    this.androids.push(android);
    this.httpClient.post('http://localhost:3000/api/androids', android);
  }

  loadAndroids() {
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:3000/api/androids').subscribe((response) => {
        this.androids = response['data'];
        resolve(response['data']);
      })
    }).catch(error => {
      console.log(error);
    })
  }

  deleteAndroid(id) {
    return new Promise(async (resolve, reject) => {
      this.androids = this.removeByKey(this.androids, {key: '_id', value: id});
      await this.httpClient.delete(`http://localhost:3000/api/androids/android/${id}`).subscribe((response) => {
      });
    });
  }

  removeByKey(array, params) {
    array.some(function (item, index) {
      return (array[index][params.key] === params.value) ? !!(array.splice(index, 1)) : false;
    });

    return array;
  }

  createAndroid(android) {
    this.androids.push(android);

    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:3000/api/androids', android).subscribe((response) => {
        resolve(response['data']);
      })
    }).catch(error => {
      console.log(error);
    })
  }
}
