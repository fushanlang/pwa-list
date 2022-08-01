export type CardApp = {
  id: string;
  name: string;
  nameLowercase: string;
  icon: string;
  category: string;
  tag1: string;
  tag2: string;
  tag3: string;
  description: string;
};

export type submissionTableApp = {
  id: string;
  icon: string;
  isPublic: boolean;
  isRejected: boolean;
  name: string;
  nameLowercase: string;
  rejectionMessage: string;
};

export type App = {
  id: string;
  category: string;
  description: string;
  icon: string;
  imageMobile1: string;
  imageMobile2: string;
  imageMobile3: string;
  imagePc1: string;
  imagePc2: string;
  imagePc3: string;
  isFeatured: boolean;
  isNewApp: boolean;
  isPublic: boolean;
  isRejected: boolean;
  link: string;
  name: string;
  nameLowercase: string;
  newAppOrder: number | null | "";
  rejectionMessage: string;
  tag1: string;
  tag1Lowercase: string;
  tag2: string;
  tag2Lowercase: string;
  tag3: string;
  tag3Lowercase: string;
  userId: string;
};
