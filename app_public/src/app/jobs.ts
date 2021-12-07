export class Location {
    _id: string;
    name: string;
    distance: number;
    address: string;
    rating: number;
    facilities: string[];
    reviews: Review[];
    coords: number[];
    openingTimes: OpeningTimes[];
  }
  
  class OpeningTimes {
    days: string;
    opening: string;
    closing: string;
    closed: boolean;
  }
  
  export class Review {
    author: string;
    rating: number;
    reviewText: string;
    createdOn: Date;
  }

  export class Jobs{
    _id: string;
    jobTitle:string;
    jobDescription: string;
    primarySkills: string;
    requiredSkills: string;
    jobSalary: string;
    jobLocation: string;
    experience: string;
    jobStatus: string;
    hRName: string;
    hREmail: string;
    benefits: string;
  }

  export class UserJobHistory{
    jobID: string;
    status: string;
    remarks: string;
  }


    