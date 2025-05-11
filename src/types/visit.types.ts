export interface VisitData {
  name: string;
  email: string;
  document: string;
  resident: string;
  visitImage?: string;
  vehicleImage?: string;
  reason?: string;
}

export interface VisitResponse {
    _id: string;
    visit: Visit;
    authorization: Authorization;
    registry?: Registry;
    qrId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Visit {
    name: string;
    email: string;
    document: string;
    visitImage?: string;
    vehicleImage?: string;
}

interface Authorization {
    resident: visitResident;
    state: string;
    reason: string;
    date: Date;
    exp: Date;
}

interface Registry {
    entryGuard?: visitGuard;
    entryDate?: Date;
    exitGuard?: visitGuard;
    exitDate?: Date;
}

interface visitGuard {
    _id: string;
    name: string;
}

interface visitResident {
    _id: string;
    name: string;
    apartment: string;
}