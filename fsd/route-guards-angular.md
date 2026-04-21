# 1. Create a Guard

## File: `auth.guard.ts`

```typescript
import { CanActivateFn } from '@angular/router';

let isLoggedIn = false; // simulate auth

export const authGuard: CanActivateFn = (route, state) => {
  return isLoggedIn;
};
```

---

# 2. Define Routes

## File: `app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AdminComponent } from './admin.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [authGuard]  // 👈 guard applied
  }
];
```

# 3. Bootstrap Router

## File: `main.ts` (standalone)

```ts id="g3"
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
```

---

# 4. Add Navigation

## File: `app.component.html`

```html id="g4"
<a routerLink="/home">Home</a>
<a routerLink="/admin">Admin</a>

<router-outlet></router-outlet>
```

# 🔥 Real-world Guard (with redirect)

## File: `auth.guard.ts`

```ts id="g5"
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  let isLoggedIn = false;

  if (!isLoggedIn) {
    router.navigate(['/home']); // redirect
    return false;
  }

  return true;
};
```
