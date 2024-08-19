import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, ButtonDirective, ButtonGroupComponent, CollapseDirective, ContainerComponent, DropdownComponent, DropdownDividerDirective, DropdownHeaderDirective, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, FormControlDirective, FormDirective, NavbarBrandDirective, NavbarComponent, NavbarNavComponent, NavbarTogglerDirective, NavItemComponent, NavLinkDirective, ThemeDirective, PageItemDirective, PageLinkDirective, PaginationComponent } from '@coreui/angular';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RowComponent, 
    ColComponent, 
    TextColorDirective, 
    CardComponent, 
    CardHeaderComponent, 
    CardBodyComponent, 
    TableDirective, 
    TableColorDirective, 
    TableActiveDirective, 
    BorderDirective, 
    AlignDirective, 
    ButtonDirective,
    ButtonGroupComponent,
    CollapseDirective,
    ContainerComponent,
    DropdownComponent,
    DropdownDividerDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
    FormControlDirective,
    FormDirective,
    NavbarBrandDirective,
    NavbarComponent,
    NavbarNavComponent,
    NavbarTogglerDirective,
    NavItemComponent,
    NavLinkDirective,
    TextColorDirective,
    ThemeDirective,
    RouterLink,
    PaginationComponent,
    PageItemDirective,
    PageLinkDirective
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
