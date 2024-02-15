import ChildComponent from '@/core/component/child.component'

import styles from './auth-required-message.module.scss'
import template from './auth-required-message.template.html'
import renderService from '@/core/services/render.service';

export class AuthRequiredMessage extends ChildComponent {
  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    return this.element;
  }
}