import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  jobs;
  jobEditMode = false;
  skills = [];
  editedJob;

  constructor(private httpClient: HttpClient) {
    this.loadJobs();
  }

  enableJobEditMode() {
    this.jobEditMode = true;
  }

  disableJobEditMode() {
    this.jobEditMode = false;
  }

  getEditMode() {
    return this.jobEditMode;
  }

  getAndroid(index) {
    return this.jobs[index];
  }


  loadJobs() {
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:3000/api/job').subscribe((response) => {
        this.jobs = response['data'];
        resolve(response['data']);
      })
    }).catch(error => {
      console.log(error);
    })
  }

  deleteJob(id) {
    return new Promise(async (resolve, reject) => {
      this.jobs = this.removeByKey(this.jobs, {key: '_id', value: id});
      await this.httpClient.delete(`http://localhost:3000/api/job/${id}`).subscribe((response) => {
        resolve(this.jobs);
      });
    });
  }

  removeByKey(array, params) {
    array.some(function (item, index) {
      return (array[index][params.key] === params.value) ? !!(array.splice(index, 1)) : false;
    });

    return array;
  }

  createJob(job) {
    this.jobs.push(job);

    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:3000/api/job', job).subscribe((response) => {
        resolve(response['data']);
      })
    }).catch(error => {
      console.log(error);
    })
  }

  updateByKey(array, params, newAndroid) {
    array.some(function (item, index) {
      return (array[index][params.key] === params.value) ? !!(array.splice(index, 1, newAndroid)) : false;
    });
    return array;
  }

  updateJob(job) {
    const {id} = job;
    return new Promise(async (resolve, reject) => {
      this.jobs = this.updateByKey(this.jobs, {key: '_id', value: id}, job);
      await this.httpClient.put(`http://localhost:3000/api/job`, job).subscribe((response) => {
        resolve(this.jobs);
      });
    });
  }

  getJobById(jobId) {
    const job = this.jobs.find(job => job._id === jobId);
    if (job) {
      return job;
    } else return null;
  }
}
