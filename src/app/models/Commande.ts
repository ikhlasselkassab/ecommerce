import {LignePanier} from './LignePanier';

export class Commande {
  userId:string;
  dateCommande:Date;
  details:Array<LignePanier>
  montant: number;

  constructor(userId: string, dateCommande: Date, details: Array<LignePanier>, montant: number) {
    this.userId = userId;
    this.dateCommande = dateCommande;
    this.details = details;
    this.montant = montant;
  }
  calculerMontant(): number {
    this.montant = this.details.reduce((total, ligne) => total + ligne.product.price * ligne.qte, 0);
    return this.montant;
  }

}
