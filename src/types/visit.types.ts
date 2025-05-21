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
    id: string;
    visit: Visit;
    authorization: Authorization;
    registry?: Registry;
    qrId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UpdateVisitData {
    visit: {
        name: string;
        email: string;
    }
    authorization: {
        reason: string;
    }
}

export interface VisitAuthorizedResponse {
    id: string;
    visit: Visit;
    authorization: Authorization;
    registry?: Registry;
    qrId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthorizedResponse {
    message: string;
    data: VisitAuthorizedResponse;
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
    entry?: Entry;
    exit?: Exit;
}

interface Entry {
    guard?: string;
    date? : Date;
}

interface Exit {
    guard?: string;
    date?: Date;
}

interface visitResident {
    _id: string;
    name: string;
    apartment: string;
}