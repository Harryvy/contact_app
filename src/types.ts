// src/types.ts
export interface Contact {
    id: string;
    name: string;
    email: string;
    status: 'active' | 'inactive';
    phoneNumber: string;
  }
  