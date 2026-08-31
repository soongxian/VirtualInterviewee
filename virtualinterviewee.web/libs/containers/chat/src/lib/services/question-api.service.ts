import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AskInterviewQuestionResponse {
  answer: string;
}

const API_BASE_URL = 'http://localhost:8808/api';

@Injectable({ providedIn: 'root' })
export class QuestionApiService {
  private readonly http = inject(HttpClient);

  question(question: string): Observable<AskInterviewQuestionResponse> {
    return this.http.post<AskInterviewQuestionResponse>(
      `${API_BASE_URL}/question`,
      {
        question,
      },
    );
  }
}
