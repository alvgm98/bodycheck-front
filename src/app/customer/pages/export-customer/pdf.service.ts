import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { PdfRequest } from '../../../shared/models/pdf-request';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

    constructor(
      private http: HttpClient
    ) { }

  downloadPdf(pdfRequest: PdfRequest) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${environment.apiPdf}/generate`, pdfRequest, {
      headers,
      responseType: 'blob'
    })
  }
}
