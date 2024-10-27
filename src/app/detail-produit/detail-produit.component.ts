import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ProductItemComponent} from '../product-item/product-item.component';
import {PanierService} from '../services/panier.service';
import {NavebarComponent} from '../navebar/navebar.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Review} from '../models/Review';

@Component({
  selector: 'app-detail-produit',
  standalone: true,
  templateUrl: './detail-produit.component.html',
  imports: [
    NgIf, ProductItemComponent, NavebarComponent, NgForOf, ReactiveFormsModule, NgClass
  ],
  providers: [ProductService],
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {
  productId!: number;
  product: any;
  reviewForm!: FormGroup;
  showReviewForm: boolean = false;


  constructor(private route: ActivatedRoute, private productService: ProductService, private panierService: PanierService) {

    this.reviewForm = new FormGroup({
      username: new FormControl('', { nonNullable: true }),
      date: new FormControl('', { nonNullable: true }),
      rating: new FormControl(1, { nonNullable: true }),
      comment: new FormControl('', { nonNullable: true })
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductDetails();
  }

  getProductDetails(): void {
    this.productService.getProductById(this.productId).subscribe(
      (response: any) => {
        this.product = response;
      },
      (error: any) => {
        console.error('Error fetching product details', error);
      }
    );
  }

  addToCart(product: any): void {
    this.panierService.addProduct(product);
    alert(`${product.title} ajouté au panier avec succès !`);
  }

  toggleReviewForm(): void {
    this.showReviewForm = !this.showReviewForm;
  }


  submitReview(): void {
    if (this.reviewForm.invalid) {
      return;
    }


    const newReview = {
      username: this.reviewForm.get('username')?.value,
      date: this.reviewForm.get('date')?.value,
      rating: this.reviewForm.get('rating')?.value,
      comment: this.reviewForm.get('comment')?.value
    };


    this.product.reviews.push(newReview);


    this.reviewForm.reset({
      username: '',
      date: '',
      rating: 1,
      comment: ''
    });
    this.showReviewForm = false;
  }


  setNewReviewRating(rating: number): void {
    this.reviewForm.get('rating')?.setValue(rating);
  }

}


