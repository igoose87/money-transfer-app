import { BaseScreen } from "@/core/component/base-screen.component";
import renderService from "@/core/services/render.service";
import template from './home.template.html'
import styles from './home.module.scss'
import { Field } from "@/components/ui/field/field.component";
export class Home extends BaseScreen {
  constructor(){
    super({ title: 'Home' })
  }
  
  render(){
    const element  = renderService.htmlToElement(
      template, 
      [
        new Field({
          name: 'test',
          placeholder: 'Enter email',
          variant: 'green'
        })
      ], 
      styles)


    return element
  }
}