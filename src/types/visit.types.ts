export interface Visit {
    _id: string;
    name: string;
    document: string;
    visitImage?: string;
    vehicleImage?: string;
    qrId: string;
    createdAt: string;
    updatedAt: string;
    authorization: Authorization;
    registry: Registry;
}

interface Authorization {
    resident: visitResident;
    state: string;
    reason: string;
    date: string;
    exp: string;
}

interface Registry {
    entryGuard: visitGuard;
    entryDate: string;
    exitGuard: visitGuard;
    exitDate: string;
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

export interface VisitData {
  name: string;
  document: string;
  resident: string;
  visitImage?: string;
  vehicleImage?: string;
  reason?: string;
}