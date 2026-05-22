import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SelectedService {
  id: string;
  name: string;
  duration: number;
  price: number;
  type: "INDIVIDUAL" | "WORKSHOP";
}

export interface SelectedSlot {
  id?: string;
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
  workshopId?: string; // For workshop registration
}

export interface ClientData {
  name: string;
  email: string;
  phone: string;
  patientName?: string;
  patientAge?: number;
  notes?: string;
}

interface BookingState {
  currentStep: number;
  selectedService: SelectedService | null;
  selectedDate: string | null; // ISO string format YYYY-MM-DD
  selectedSlot: SelectedSlot | null;
  clientData: ClientData;
  paymentMethod: "TRANSFER" | "GATEWAY" | null;
  
  // Actions
  setCurrentStep: (step: number) => void;
  setSelectedService: (service: SelectedService | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedSlot: (slot: SelectedSlot | null) => void;
  setClientData: (data: Partial<ClientData>) => void;
  setPaymentMethod: (method: "TRANSFER" | "GATEWAY" | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const initialClientData: ClientData = {
  name: "",
  email: "",
  phone: "",
  patientName: "",
  patientAge: undefined,
  notes: "",
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      currentStep: 1,
      selectedService: null,
      selectedDate: null,
      selectedSlot: null,
      clientData: initialClientData,
      paymentMethod: null,

      setCurrentStep: (step) => set({ currentStep: step }),
      setSelectedService: (service) =>
        set({
          selectedService: service,
          // Reset subsequent steps if service changes
          selectedDate: null,
          selectedSlot: null,
        }),
      setSelectedDate: (date) =>
        set({
          selectedDate: date,
          selectedSlot: null,
        }),
      setSelectedSlot: (slot) => set({ selectedSlot: slot }),
      setClientData: (data) =>
        set((state) => ({
          clientData: { ...state.clientData, ...data },
        })),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      reset: () =>
        set({
          currentStep: 1,
          selectedService: null,
          selectedDate: null,
          selectedSlot: null,
          clientData: initialClientData,
          paymentMethod: null,
        }),
    }),
    {
      name: "psicopedagogia-valdivia-booking",
    }
  )
);
