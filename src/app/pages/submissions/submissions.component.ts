import { Component } from '@angular/core';
import { SubmissionsService } from '../../services/submissions/submissions.service';

@Component({
  selector: 'app-submissions',
  standalone: true,
  imports: [],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.css',
})
export class SubmissionsComponent {
  submissionList: Submission[] = [];

  constructor(private readonly submissions: SubmissionsService) {
    this.submissions.callback.subscribe((res: Submission) => {
      console.log(res);
      this.addToList(res);
    });
  }

  addToList(submission: Submission) {
    const alreadyIn = this.submissionList.find(
      (s) => s.idSubmission === submission.idSubmission,
    );

    if (!alreadyIn) {
      this.submissionList.push(submission);
    } else {
      this.submissionList = this.submissionList.map((s) => {
        if (s.idSubmission === submission.idSubmission) {
          return submission;
        }
        return s;
      });
    }
  }
}

interface Submission {
  idSubmission: string;
  idProblem: string;
  idUser: number;
  status: string;
}
