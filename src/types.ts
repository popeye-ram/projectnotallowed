export interface Unit {
  id: string;
  label: string;
}

export interface ConversionType {
  id: string;
  label: string;
  units: Unit[];
}