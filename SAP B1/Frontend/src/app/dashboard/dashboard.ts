import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  BusinessPartnerService
} from '../services/business-partner.service';

import { MatPaginatorModule } from '@angular/material/paginator';

import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule
  ],

  templateUrl: './dashboard.html',

  styleUrls: ['./dashboard.css']
})

export class DashboardComponent
implements OnInit {

  // =========================
  // TABLE DATA
  // =========================

  businessPartners: any[] = [];

  // =========================
  // SEARCH VARIABLES
  // =========================

  searchText = '';

  filteredPartners: any[] = [];

  allBusinessPartners: any[] = [];

  paginatedData: any[] = [];
  
  pageSize = 5;
  
  currentPage = 0;
  
  totalRecords = 0;

  selectedPartner: any = null;

  selectedAddressType = 'bo_BillTo';

  filteredAddresses: any[] = [];



  // =========================
  // LOADER VARIABLES
  // =========================

  isLoadingAll = false;

  isLoadingById = false;

  // =========================
  // FORM DATA
  // =========================

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

    private bpService:
      BusinessPartnerService,

    private cdr:
      ChangeDetectorRef

  ) {}

  // =========================
  // PAGE LOAD
  // =========================

  ngOnInit(): void {

    this.loadBusinessPartners();
  }

  // =========================
  // LOAD ALL BUSINESS PARTNERS
  // =========================

  loadBusinessPartners() {

    this.isLoadingAll = true;

    this.bpService
      .getBusinessPartners()

      .subscribe({

        next: (res: any) => {

          console.log('API RESPONSE');

          console.log(res);

          // NEW ARRAY REFERENCE

          this.allBusinessPartners = [
            ...(res.value || [])
          ];

          this.businessPartners = [
            ...this.allBusinessPartners
          ];

          this.totalRecords = this.businessPartners.length;
          
          this.updatePaginatedData();

          console.log(this.businessPartners);

          // SAFE UI REFRESH

          setTimeout(() => {

            this.isLoadingAll = false;

            this.cdr.detectChanges();

          });
        },

        error: (err) => {

          console.error('API ERROR');

          console.error(err);

          setTimeout(() => {

            this.isLoadingAll = false;

            this.cdr.detectChanges();

          });
        }
      });
  }

  // =========================
  // SEARCH SUGGESTIONS
  // =========================

  searchSuggestions() {

  const search =
    this.searchText
      .toLowerCase()
      .trim();

  // EMPTY INPUT

  if (!search) {

    // CLEAR SUGGESTIONS

    this.filteredPartners = [];

    // RESTORE FULL TABLE

    this.businessPartners = [
      ...this.allBusinessPartners
    ];

    return;
  }

  // FILTER ARRAY

  this.filteredPartners =
    this.allBusinessPartners.filter((bp: any) =>

      bp.CardCode
        ?.toLowerCase()
        .includes(search)

      ||

      bp.CardName
        ?.toLowerCase()
        .includes(search)
    );

  // UPDATE TABLE

  this.businessPartners = [
    ...this.filteredPartners
  ];
}

///modole



openPartnerModal(bp: any) {

  this.selectedPartner = bp;

  this.selectedAddressType =
    'bo_BillTo';

  this.filterAddresses();
}



filterAddresses() {

  if (!this.selectedPartner?.BPAddresses) {

    this.filteredAddresses = [];

    return;
  }

  this.filteredAddresses =
    this.selectedPartner.BPAddresses.filter(

      (address: any) =>

        address.AddressType ===
        this.selectedAddressType
    );
}
  // =========================
  // GET BUSINESS PARTNER BY ID
  // =========================

  getElementById() {

    const cardCode =
      this.bpData.cardCode?.trim();

    if (!cardCode) {

      alert('Please Enter Card Code');

      return;
    }

    this.isLoadingById = true;

    this.bpService
      .getBusinessPartnerById(cardCode)

      .subscribe({

        next: (res: any) => {

          console.log(res);

          // SINGLE RECORD

          this.businessPartners = [

            {
              CardCode: res.CardCode,

              CardName: res.CardName,

              Phone1: res.Phone1
            }
          ];

          // SAFE UI REFRESH

          setTimeout(() => {

            this.isLoadingById = false;

            this.cdr.detectChanges();

          });
        },

        error: (err) => {

          console.error(err);

          this.businessPartners = [];

          const message =

            err?.error?.error?.message?.value

            ||

            'Business Partner Not Found';

          alert(message);

          setTimeout(() => {

            this.isLoadingById = false;

            this.cdr.detectChanges();

          });
        }
      });
  }

  updatePaginatedData() {

  const startIndex =
    this.currentPage
    * this.pageSize;

  const endIndex =
    startIndex + this.pageSize;

  this.paginatedData =
    this.businessPartners.slice(
      startIndex,
      endIndex
    );
}

onPageChange(event: PageEvent) {
  this.currentPage =
    event.pageIndex;

  this.pageSize =
    event.pageSize;

  this.updatePaginatedData();
}

}