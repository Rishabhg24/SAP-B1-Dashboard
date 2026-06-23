export interface BPFiscalTaxIDCollection {
  taxId0: string;
}

export interface CreateBusinessPartnerDto {
  series: number;
  cardCode?: string;
  cardName: string;
  cardType: string;
  phone1?: string;
  emailAddress?: string;
  gstin?: string;

  bpFiscalTaxIDCollections: BPFiscalTaxIDCollection[];
}