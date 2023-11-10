export interface ICreateTournament {
  title: string;
  serialNo: number;
  description: string;
  categoryUUID: string;
  allowPrimarySelection: boolean;
  allowSecondarySelection: boolean;
  timePerQuestion: number;
  marksPerQuestion: number;
  studentLimit: number;
  isFree: boolean;
  joinDelay: number;
  joinFee: number;
  isFeatured: boolean;
  winningPrice: number;
  webBanner: string;
  phoneBanner: string;
  tournamentCities: any[];
  tournamentKeywords: any[];
  tournamentExams: any[];
  tournamentPrize: any[];
  tournamentRankingFactor: any[];
}
