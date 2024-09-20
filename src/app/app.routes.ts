import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './custom/auth.guard';
import { ProductFormComponent } from './pages/product-form/product-form.component';

export const routes: Routes = [

    { path: "", component: LoginComponent },
    { path: "Home", component: HomeComponent, canActivate: [authGuard] },
    { path: "register-product", component: ProductFormComponent, canActivate: [authGuard] }

];
