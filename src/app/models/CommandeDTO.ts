import { Commande } from './Commande';
import { Timestamp } from 'firebase/firestore';

export class CommandeDTO {
  dateCommande?: Date;
  userId: string;
  montant: number;
  items: Array<{ productTitle: string; quantity: number; price: number }>;
  orderNumber?: number;



  constructor(
    userId: string,
    montant: number,
    items: Array<{ productTitle: string; quantity: number; price: number }>,
    dateCommande?: Timestamp
  ) {
    this.dateCommande = dateCommande ? dateCommande.toDate() : new Date;
    this.userId = userId;
    this.montant = montant;
    this.items = items;

  }

  static fromCommande(commande: Commande): CommandeDTO {
    const items = commande.details.map(detail => ({
      productTitle: detail.product.title,
      quantity: detail.qte,
      price: detail.product.price,
    }));

    // Ensure dateCommande is converted to a Timestamp if needed
    const dateCommande =
      commande.dateCommande instanceof Date
        ? Timestamp.fromDate(commande.dateCommande)
        : commande.dateCommande; // Use it directly if already a Timestamp

    return new CommandeDTO(
      commande.userId,
      commande.calculerMontant(),
      items,
      dateCommande
    );
  }
}
