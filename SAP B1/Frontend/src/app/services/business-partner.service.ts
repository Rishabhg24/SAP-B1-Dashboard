import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

import { CreateBusinessPartnerDto } from '../Models/business-partner.model';
import { UpdateBusinessPartnerDto } from '../Models/update-business-partner.model';

export interface ApiResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class BusinessPartnerService {

  // Base API URL
  private apiUrl = `${environment.apiUrl}/BusinessPartner`;

  constructor(
    private http: HttpClient
  ) { }

  // =====================================
  // CREATE BUSINESS PARTNER
  // =====================================
  createBusinessPartner(
    data: CreateBusinessPartnerDto
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      data,
      {
        responseType: 'text' as 'json'
      }
    );
  }

  // =====================================
  // GET ALL BUSINESS PARTNERS
  // =====================================
  getBusinessPartners(): Observable<any> {

    return this.http.get<any>(
      this.apiUrl
    );
  }

  // =====================================
  // GET BUSINESS PARTNER BY ID
  // =====================================
  getBusinessPartnerById(
    cardCode: string
  ): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${cardCode}`
    );
  }

  // =====================================
  // UPDATE BUSINESS PARTNER
  // =====================================
  updateBusinessPartner(
    cardCode: string,
    data: UpdateBusinessPartnerDto
  ): Observable<any> {

    return this.http.patch(
      `${this.apiUrl}/${cardCode}`,
      data,
      {
        responseType: 'text' as 'json'
      }
    );
  }

}