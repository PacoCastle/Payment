import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { PlcListComponent } from './plcs/plc-list/plc-list.component'
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductListResolver } from './_resolvers/product-list.resolver';
import { ProductRegisterComponent } from './products/product-register/product-register.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductEditResolver } from './_resolvers/product-edit.resolver';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        resolve: { users: MemberListResolver }
      },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver }
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      {
        path: 'messages',
        component: MessagesComponent,
        resolve: { messages: MessagesResolver }
      },
      {
        path: 'lists',
        component: ListsComponent,
        resolve: { users: ListsResolver }
      },
      {
        path: 'admin',
        component: AdminPanelComponent,
        data: {roles: ['Admin', 'Moderator']}
      },      
      {
        path: 'plcs',
        component: PlcListComponent        
      },
      {
        path: 'products',
        component: ProductListComponent,
        resolve: { products: ProductListResolver }
      },
      {
        path: 'products/product-register',
        component: ProductRegisterComponent        
      },
      {
        path: 'product/edit/:id',
        component: ProductEditComponent,
        resolve: { product: ProductEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
