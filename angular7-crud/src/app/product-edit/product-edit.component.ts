import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ApiService } from "../services/api.service";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
productForm: FormGroup;
_id: string = '';
prod_name: string = '';
prod_desc: string = '';
prod_price: number = null;
prod_img: string = '';
isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['_id']);
    this.productForm = this.formBuilder.group({
      
      'prod_name' : [null, Validators.required],
      'prod_desc' : [null, Validators.required],
      'prod_price' : [null, Validators.required],
      'prod_img' : [null, Validators.required]
    });
  }

  getProduct(id) {
    this.api.getProduct(id).subscribe(data => {
      this._id = data._id;
      this.productForm.setValue({
        prod_name: data.prod_name,
        prod_desc: data.prod_desc,
        prod_price: data.prod_price,
        prod_img: data.prod_img
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateProduct(this._id, form).subscribe(res => {
      let id = res['_id'];
      this.isLoadingResults = false;
      this.router.navigate(['/product-details', id]);
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  productDetails() {
    this.router.navigate(['/product-details', this._id]);
  }

}
