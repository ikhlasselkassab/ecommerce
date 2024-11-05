import { Injectable } from '@angular/core';
import {Commande} from '../models/Commande';
import {LignePanier} from '../models/LignePanier';
import {PanierService} from './panier.service';
import {
  Firestore,
  collection,
  CollectionReference,
  DocumentData,
  addDoc,
  collectionData,
  doc,
  getDoc,
  updateDoc,
  deleteDoc, getDocs, getFirestore
} from '@angular/fire/firestore';
import {CommandeDTO} from '../models/CommandeDTO';

import {AuthService} from './auth.service';
import {from, map, Observable} from 'rxjs';

import { Timestamp } from 'firebase/firestore';




@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private id:any;
  private commandsCollection!: CollectionReference<DocumentData>;
  private db = getFirestore();



  constructor(private firestore: Firestore) {
    // Initialisez la collection en tant que `CollectionReference<DocumentData>`
    this.commandsCollection = collection(this.firestore, 'orders') as CollectionReference<DocumentData>;
  }


  addCommande(userId: string, details: Array<LignePanier>, montant: number): Promise<void> {
    const commandeData = {
      userId: userId,
      dateCommande: new Date(),
      details: details,
      montant: montant
    };
    const collectionInstance = collection(this.firestore, 'commandes');
    return addDoc(collectionInstance, commandeData)
      .then(() => console.log("Commande ajoutée avec succès"))
      .catch(error => console.error("Erreur lors de l'ajout de la commande: ", error));
  }
  getAllCommandes(): Observable<CommandeDTO[]> {
    const commandesCollection = collection(this.db, 'orders');

    return from(getDocs(commandesCollection)).pipe(
      map(commandesSnapshot =>
        commandesSnapshot.docs.map(doc => {
          const data = doc.data() as Omit<CommandeDTO, 'id' | 'dateCommande'>;

          console.log('Données de la commande:', data);

          return {
            id: doc.id,
            userId: data.userId || '',
            montant: data.montant || 0,
            items: data.items || []
          } as CommandeDTO;
        })
      )
    );
  }






  getOrderId(id:string){
    const collectionInstance = collection(this.firestore,'commandes')

    const docinstance = doc(this.firestore,'commandes',id)

    return getDoc(docinstance)


  }

  updateOrder(id:string){
    const docinstance = doc(this.firestore,'commandes',id)
    const updatedOrder : any= {name : "updated name", montant : 1000}
    updateDoc(docinstance,updatedOrder)
      .then(()=>console.log(`Order with ${id} updated successfully ! `))
      .catch(error=>console.log(error))
  }

  deleteOrder(id:string){
    const docinstance = doc(this.firestore,'commandes',id)
    deleteDoc(docinstance)
      .then(()=>console.log('data deleted !'))
      .catch(error=>console.log(error))
  }

  addOrder(items: Array<{ productTitle: string; quantity: number; price: number }>, amount: number, userId: string) {
    const orderData = {
      userId,
      montant: amount,
      items
    };
    const collectionInstance = collection(this.firestore, 'orders');

    return addDoc(collectionInstance, orderData)
      .then(() => console.log("Order saved successfully"))
      .catch(error => console.log("Error saving order:", error));
  }


}




