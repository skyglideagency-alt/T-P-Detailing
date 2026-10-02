export type VehicleSize = 'sedan' | 'truck' | 'suv';

export interface DetailingPackage {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  popular?: boolean;
  prices: {
    sedan: number;
    truck: number;
    suv: number;
  };
  duration: string;
  features: string[];
  recommendedFor: string;
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
  description: string;
  iconName: string;
}

export interface TransformationItem {
  id: string;
  title: string;
  category: string;
  vehicle: string;
  problem: string;
  solution: string;
  beforeImg: string;
  afterImg: string;
  highlightStat: string;
}

export interface BookingSubmission {
  id: string;
  packageId: string;
  packageName: string;
  vehicleSize: VehicleSize;
  vehicleYearMakeModel: string;
  addOnIds: string[];
  selectedDate: string;
  selectedTime: string;
  serviceType: 'mobile' | 'dropoff';
  address: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  totalEstimatedPrice: number;
  createdAt: string;
}
