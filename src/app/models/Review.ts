export class Review {
  username: string;
  date: Date;
  comment: string;
  rating: number;

  constructor(username: string, comment: string, rating: number) {
    this.username = username;
    this.date = new Date();
    this.comment = comment;
    this.rating = rating;
  }
}

