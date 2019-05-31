import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'List of products' }
  },
  {
    path: 'product-add',
    component: ProductAddComponent,
    data: { title: 'Add product'}
  },
  {
    path: 'product-details/:_id',
    component: ProductDetailComponent,
    data: { title: 'Product details '}
  },
  {
    path: 'product-edit/:_id',
    component: ProductEditComponent,
    data: {title: 'Edit product'}
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
