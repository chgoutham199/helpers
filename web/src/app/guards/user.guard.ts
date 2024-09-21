import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const userGuard: CanActivateFn = async(route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const access=await authService.getAccess()
  console.log(access)
   if (access == 'user') {
    return true;
   } else {
    router.navigate(['/login']);
    return false;
   }
};