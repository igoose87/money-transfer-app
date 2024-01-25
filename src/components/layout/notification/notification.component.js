import ChildComponent from '@/core/component/child.component'

import styles from './notification.module.scss'
import template from './notification.template.html'
import renderService from '@/core/services/render.service'
import { NotificationService } from '@/core/services/notification.service';

export class Notification extends ChildComponent {
  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    return this.element;
  }
}