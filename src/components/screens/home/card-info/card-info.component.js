import ChildComponent from '@/core/component/child.component'
import RenderService from '@/core/services/render.services'

import styles from './card-info.module.scss'
import template from './card-info.template.html'

export class CardInfo extends ChildComponent {
  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    return this.element;
  }
}