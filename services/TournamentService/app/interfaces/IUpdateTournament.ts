export interface IUpdateTournament {
  title: string;
  description: string;
  studentLimit: number;
  categoryUUID: string;
  isFree: boolean;
  joinFee: number;
  joinDelay: number;
  marksPerQuestion: number;
  isFeatured: boolean;
  winningPrice: number;
  allowPrimarySelection: boolean;
  allowSecondarySelection: boolean;
  webBanner: string;
  phoneBanner: string;
  serialNo: number;
  timePerQuestion: number;
  tournamentRankingFactor: any[];
  tournamentCities: any[];
  tournamentKeywords: any[];
  tournamentExams: any[];
  tournamentPrize: any[];
}