import { Component } from '@angular/core';
//import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BusinessPartnerService } from '../services/business-partner.service';

@Component({
  selector: 'app-add',

  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    //RouterLink
  ],

  templateUrl: './add.html',

  styleUrls: ['./add.css']
})
export class AddComponent {
  businessPartners: any[] = [];

  bpData = {
    series: 1,
    cardCode: '',
    cardName: '',
    cardType: 'C',
    phone1: '',
    emailAddress: '',
    gstin: '',
    bpFiscalTaxIDCollections: [
      {
        taxId0: ''
      }
    ]
  };


  constructor(
    private bpService: BusinessPartnerService
  ) {}



  // CREATE
  createBP() {

    this.bpService
      .createBusinessPartner(this.bpData)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert(res);
          
          //this.loadBusinessPartners();
        },
        error: (err) => {
          console.error(err);
          alert(err);
        }
      });
  }

  // GET ALL
  loadBusinessPartners() {

    this.bpService
      .getBusinessPartners()
      .subscribe({
        next: (res) => {

          console.log(res);

          // SAP response may return value array
          this.businessPartners =
            res.value || [];
        },
        error: (err) => {
          console.error(err);
        }
      });
  }



  updateBP() {

  const updateData = {
    cardCode: this.bpData.cardCode,
    cardName: this.bpData.cardName,
    phone1: this.bpData.phone1,
    emailAddress: this.bpData.emailAddress,
    gstin: this.bpData.gstin
  };

  this.bpService
    .updateBusinessPartner(
      this.bpData.cardCode,
      updateData
    )
    .subscribe({

      next: (res) => {

        console.log(res);

        alert('Updated Successfully');

        this.loadBusinessPartners();
      },

      error: (err) => {

        console.error(err);

        const message =
          err?.error?.error?.message?.value
          || 'Update Failed';

        alert(message);
      }
    });
}



getElementById() {

  const cardCode = this.bpData.cardCode?.trim();

  if (!cardCode) {
    alert('Please Enter Card Code');
    return;
  }

  this.bpService
    .getBusinessPartnerById(cardCode)
    .subscribe({

      next: (res: any) => {

        console.log(res);

        // Clear old data first
        this.businessPartners = [];

        // Add searched BP to table
        this.businessPartners.push({
          CardCode: res.CardCode,
          CardName: res.CardName,
          Phone1: res.Phone1
        });
      },

      error: (err) => {

        console.error(err);

        this.businessPartners = [];

        const message =
          err?.error?.error?.message?.value
          || 'Business Partner Not Found';

        alert(message);
      }
    });
}

}