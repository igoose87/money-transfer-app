import ChildComponent from '@/core/component/child.component'
import RenderService from '@/core/services/render.services'

import styles from './button.module.scss'
import template from './button.template.html'
import { $R } from '@/core/rquery/rquery.lib'

export class Button extends ChildComponent {
  constructor({children, onClick, variant}){
    super()

    if(!children) throw new Error('Children is empty!')
    this.children = children
    this.onClick = onClick
    this.variant = variant
  }

  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    $R(this.element).html(this.children).click(this.onClick)

    return this.element;
  }
}