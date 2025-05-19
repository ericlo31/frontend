// Respuesta de la Request de Reporte
export interface ReportResponse {
    metadata: Metadata;
    userInfo?: UserInfo;
    statistics: Statistics;
    topRecords: TopRecords;
}


// Data de la Request de Reporte
export interface ReportData {
    start: Date;
    end?: Date;
    resident?: string;
    guard?: string;
}

interface Metadata {
    type: 'general' | 'resident' | 'guard';
    startDate: Date;
    endDate: Date;
}

interface UserInfo {
    name: string;
    email?: string;
    shift?: 'matutina' | 'vespertina' | 'nocturna';
    apartment?: string;
    telephone?: string;
}

interface Statistics {
    // General
    totalResidents?: number;
    totalGuards?: number;
    averageEntryHourGeneral?: string;
    averageExitHourGeneral?: string;
    // Resident & Guard - Common
    mostFrequentEntryHour?: string;
    mostFrequentExitHour?: string;
    // Resident
    totalAuthorizations?: number;
    invertalAuthorizations?: number;
    averageVisitDuration?: string;
    // Guard
    totalEntries?: number;
    intervalEntries?: number;
    totalExits?: number;
    intervalExits?: number;
}

interface TopRecords {
    // Common
    topVisits: TopVisit[];
    // General
    topResidents?: TopResident[];
    topGuards?: TopGuard[];
    // Resident
    mostActiveGuard?: TopGuard;
    //Guard
    mostActiveResident?: TopResident;
}

interface TopResident {
    name: string;
    apartment: string;
    count: number;
}

interface TopGuard {
    name: string;
    count: number;
}

interface TopVisit {
    name: string;
    document: string;
    count: number;
}