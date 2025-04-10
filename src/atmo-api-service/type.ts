export type AtmoSite = {
  id: string;
  label: string;
};

export type AtmoMesure = {
  date: Date;
  valeur: number;
  validation: boolean;
  site_id: string;
  site_label: string;
  type_appareil_label: string;
  code_polluant: string;
  label_polluant: string;
  label_court_polluant: string;
  unite: string;
  label_unite: string;
};
