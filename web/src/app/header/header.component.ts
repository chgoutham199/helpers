import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    

 constructor(private router: Router,private authservice:AuthService) { }

   
    handleClick(){
            this.router.navigateByUrl('/add-helper');    
    }
    handleLogout(){
            this.authservice.logout().subscribe((res)=>{
               if (res.logout){
                    this.router.navigateByUrl('/login');
               }
              })
    }


}
