import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './shared/admin.component';
import { ContactComponent } from './shared/contact.component';
import { ErrorComponent } from './shared/error.component';
import { HomeComponent } from './shared/home.component';

const routes: Routes = [                    //order is important
  {path:'' , redirectTo : '/home', pathMatch:'full'},       // pathmatch is for if its completely empty, only then match as its a ''
  {path:'home' , component : HomeComponent},           // means on clicking home, it will go to HomeComponent
  {path:'contact' , component : ContactComponent}, 
  {path:'admin' , component : AdminComponent}, 
  { path: 'products', loadChildren: () =>
  import('./products/products.module')
  .then(m => m.ProductsModule) },
{path:'**' , component:ErrorComponent}           // incase of navigation error
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
