import ChildComponent from '@/core/component/child.component'

import styles from './header.module.scss'
import template from './header.template.html'
import renderService from '@/core/services/render.service';

import { Logo } from './logo/logo.component';
import { LogoutButton } from './logout-button/logout-button.component';
import { Search } from './search/search.component';
import { UserItem } from '@/components/ui/user-item/user-item.component';
import { Store } from '@/core/store/store';
import { $R } from '@/core/rquery/rquery.lib';

export class Header extends ChildComponent {
  constructor({router}){
    super()

    this.store = Store.getInstance()
    this.store.addObserver(this)

    this.router = router

    this.UserItem = new UserItem({
      avatarPath: '/',
      name: 'igoose87'
    })
  }

  update(){
    this.user = this.store.state.user

    const authSideElement = $R(this.element).find('#auth-side')
    
    if(this.user){
      authSideElement.show()
      this.UserItem.update(this.user)
      this.router.navigate('/')
    } else {
      authSideElement.hide()
    }
  }

  render() {
    this.element = renderService.htmlToElement(
      template, 
      [
        Logo, 
        new LogoutButton({
          router: this.router
        }), 
        Search, 
        this.UserItem
      ], 
    styles)
    this.update()

    return this.element;
  }
}