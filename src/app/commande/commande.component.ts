import {Component, OnInit} from '@angular/core';
import {CommandeService} from '../services/commande.service';
import {Commande} from '../models/Commande';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {CommandeDTO} from '../models/CommandeDTO';
import {AuthService} from '../services/auth.service';
import {NavebarComponent} from '../navebar/navebar.component';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    NavebarComponent
  ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit {
  commandes: CommandeDTO[] = [];
  userId: string | null = null;
  date : Date=new Date();

  constructor(
    private commandeService: CommandeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.afAuth.authState.subscribe(user => {
      if (user && user.uid) {
        this.userId = user.uid;
        this.fetchCommandes(this.userId);
      } else {
        this.userId = null;
        console.error('Utilisateur non connecté');
      }
    });
  }

  fetchCommandes(userId: string): void {
    this.commandeService.getAllCommandes().subscribe(
      (commandes: CommandeDTO[]) => {
        const userCommandes = commandes.filter(commande => commande.userId === userId);


        this.commandes = userCommandes.map((commande, index) => ({
          ...commande,
          orderNumber: index + 1
        }));
      },
      error => {
        console.error('Erreur lors de la récupération des commandes:', error);
      }
    );
  }
}
