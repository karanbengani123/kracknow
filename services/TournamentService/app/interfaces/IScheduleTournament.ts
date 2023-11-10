export interface IScheduleTournament {
  exam: {
    startTime: Date;
    endTime: Date;
    examTime: string;
    examUUID: string;
    examScheduleUUID: string;
  }[];
  timeZone: string;
  tournamentUUID?: string;
  tournamentScheduleUUID?: string;
}
