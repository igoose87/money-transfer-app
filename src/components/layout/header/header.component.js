import ChildComponent from '@/core/component/child.component'

import styles from './header.module.scss'
import template from './header.template.html'
import renderService from '@/core/services/render.service';

import { Logo } from './logo/logo.component';
import { LogoutButton } from './logout-button/logout-button.component';
import { Search } from './search/search.component';
import { UserItem } from '@/components/ui/user-item/user-item.component';

export class Header extends ChildComponent {
  constructor({router}){
    super()
    this.router = router
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
        new UserItem({
          avatarPath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE4qaVzeEg9j60I9z2eR77MY6ilKM9l1J82A&usqp=CAU',
          name: 'igoose87'
        })
      ], 
    styles)

    return this.element;
  }
}