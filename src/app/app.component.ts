import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'FactorE';
  constructor(public router: Router) { }
  isFullscreenPage(){
    switch(this.router.url){
      case '/login':
      case '/register':
      case '/forgotPassword':
        return false
    }
    return true
  }
}
