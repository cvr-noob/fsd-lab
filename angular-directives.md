# Directives in Angular

Directives are classes that add additional behavior to elements in your Angular applications.

Types: \
1. **Components** - Basic building block of the UI: \
   Structure:
   - Template (HTML) → what you see
   - Class (TypeScript) → how it behaves
   - Styles (CSS) → how it looks

2. **Attribute Directives** - listen to and modify the behavior of other HTML elements, attributes, properties, and components.
   1. **NgClass:**
      - Adds and removes a set of CSS classes.
      - Dynamic Classes
      - Import it:
      ```typescript
      import {NgClass} from '@angular/common';
      @Component({
         /* ... */
         imports: [NgClass],
      })
      ```
      - Usage: 
      ```html
      <div [ngClass]="isSpecial ? 'special' : ''">This div is special</div>
      ```
   
   2. **NgStyle:**
      - Adds and removes a set of HTML styles.
      - Dynamic CSS
      - Import it:
      ```typescript
      import {NgStyle} from '@angular/common';
      @Component({
         /* ... */
         imports: [NgStyle],
      })
      export class AppComponent {
         currentSyles = { 'color': 'black' };
      }
      ```
      - Usage:
      ```html
      <div [ngStyle]="currentStyles">
      ```
   
   3. **NgModel:**
      - Adds two-way data binding to an HTML form element.
      - Special
      - Import `FormsModule`:
      ```typescript
      import {FormsModule} from '@angular/forms';
      @Component({
         /* ... */
         imports: [FormsModule],
      })
      export class AppComponent {
         taskName: string = '';
      }
      ```
      - Usage:
      ```html
      <input [(ngModel)]="taskName" />
      ```

3. **Structural Directives** - change the structure of the DOM (add/remove elements)
   - Starts with an asterisk `*`, e.g.: `*ngIf`
   - Structural directives are directives applied to an `<ng-template>` element that conditionally or repeatedly render the content of that `<ng-template>` \
      E.g.:
      ```html
      <ng-template [ngIf]="condition">
         <div></div>
      </ng-template>
      ```

   1. **`*ngIf`**
      - Conditionally includes a template based on the value of an expression coerced to Boolean.
      ```html
      <div *ngIf="isLoggedIn">
         Welcome
      </div>
      ```
      - For else:
      ```html
      <ng-template #elseBlock>
         <p>Not logged in</p>
      </ng-template>
      ```
   
   2. **`*ngFor`**
      - Renders a template for each item in a collection.
      ```html
      <li *ngFor="let item of items; index as i">
         {{i}} - {{item}}
      </li>
      ```
   
   3. **`*ngSwitch`**
      - `*ngIf` but with switch-case.
      - Directive on a container specifies an expression to match against.
      - The expressions to match are provided by `ngSwitchCase` directives on views within the container.
      - Every view that matches is rendered.
      - If there are no matches, a view with the `ngSwitchDefault` directive is rendered.
      ```html
      <div [ngSwitch]="role">
         <p *ngSwitchCase="'admin'">Admin</p>
         <p *ngSwitchCase="'user'">User</p>
         <p *ngSwitchDefault>Guest</p>
      </div>
      ```

