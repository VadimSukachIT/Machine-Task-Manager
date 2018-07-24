import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  jobs;

  constructor(private httpClient: HttpClient) {
  }

  createJob(job) {
    this.jobs.push(job);
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:3000/api/androids', job).subscribe((response) => {
        resolve
      })
    })
  }

  loadJobs() {
    return new Promise(async (resolve, reject) => {
      await this.httpClient.get('http://localhost:3000/api/androids').subscribe((response) => {
        this.jobs = response['data'];
        resolve(response['data']);
      })
    }).catch(error => {
      console.log(error);
    })
  }

  deleteJob(id) {
     return new Promise(async (resolve, reject) => {
      // this.jobs = this.removeByKey(this.jobs, {key: '_id', value: id});
      await this.httpClient.delete(`http://localhost:3000/api/jobs/job/${id}`).subscribe((response) => {
        console.log(response);
      });
    });
  }

  removeByKey(array, params) {
    array.some(function (item, index) {
      return (array[index][params.key] === params.value) ? !!(array.splice(index, 1)) : false;
    });

    return array;
  }
}
