import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const myToken = localStorage.getItem("Angular17Token") || "";
  const router = inject(Router);

  if (myToken != "") {
    return true
  }
  else {
    router.navigateByUrl("");
    return false;
  }
};
