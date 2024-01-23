import ChildComponent from '@/core/component/child.component'
import RenderService from '@/core/services/render.services'

import styles from './[FTName].module.scss'
import template from './[FTName].template.html'

export class [FTName | pascalcase] extends ChildComponent {
  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    return this.element;
  }
}