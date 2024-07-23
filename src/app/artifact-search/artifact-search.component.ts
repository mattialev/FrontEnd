import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artifact-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './artifact-search.component.html',
  styleUrls: ['./artifact-search.component.css']
})
export class ArtifactSearchComponent {
  groupId: string = '';
  artifactId: string = '';
  artifactsList: any[] = [];

  invalidInput: boolean = false;

  httpResponseError: boolean = false;
  httpResponseErrorMsg: string = '';

  constructor(private http: HttpClient) {}

  public search(): void {
    if (!this.inputsAreValid()) {
      this.invalidInput = true;
      this.artifactsList = [];
    } else {
      this.invalidInput = false;
      this.http.get<any[]>(`http://localhost:8080/api/artifacts/versions?groupId=${this.groupId}&artifactId=${this.artifactId}&rows=100`)
        .subscribe({
          next: (retrievedData) => {
            this.httpResponseError = false;
            this.httpResponseErrorMsg = "";
            this.artifactsList = retrievedData;
          },
          error: (err: HttpErrorResponse) => {
            this.httpResponseError = true;
            this.httpResponseErrorMsg = err.error;
            this.artifactsList = [];
          }
        });
    }
  }

  public inputsAreValid(): boolean {
    if (this.groupId == '' || this.groupId == null || this.artifactId == '' || this.artifactId == null)
      return false;
    else
      return true;
  }

  public unsetErrorMsg(): void {
    this.invalidInput = false;
    this.httpResponseError = false;
  }

  public reset(): void {
    this.groupId = '';
    this.artifactId = '';
    this.invalidInput = false;
    this.httpResponseError = false;
    this.httpResponseErrorMsg = "";
    this.artifactsList = [];
  }
}