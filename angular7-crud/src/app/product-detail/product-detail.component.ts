import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product = { _id: '', prod_name: '', prod_desc: '', prod_price: null, updated_at: null, prod_img:'' };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getProductDetails(this.route.snapshot.params['_id']);
  }

  getProductDetails(_id){
    this.api.getProduct(_id).subscribe(
      data => {
        this.product = data;
        console.log(this.product);
        this.isLoadingResults = false;
      });
  }

  deleteProduct(id) {
    this.isLoadingResults = true;
    this.api.deleteProduct(id).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(['/products']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
