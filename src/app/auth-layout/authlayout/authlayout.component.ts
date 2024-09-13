import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthNavbarComponent } from "../../component/auth-navbar/auth-navbar.component";
import { FooterComponent } from "../../component/footer/footer.component";

@Component({
  selector: 'app-authlayout',
  standalone: true,
  imports: [RouterOutlet, AuthNavbarComponent, FooterComponent],
  templateUrl: './authlayout.component.html',
  styleUrl: './authlayout.component.scss'
})
export class AuthlayoutComponent {

}
