import ChildComponent from '@/core/component/child.component'
import styles from './actions.module.scss'
import template from './actions.template.html'
import renderService from '@/core/services/render.service';
import { Store } from '@/core/store/store';
import { CardService } from '@/api/card.service';
import { NotificationService } from '@/core/services/notification.service';
import { Field } from '@/components/ui/field/field.component';
import { Button } from '@/components/ui/button/button.component';
import { $R } from '@/core/rquery/rquery.lib';

export class Actions extends ChildComponent {
  constructor(){
    super()

    this.store = Store.getInstance().state
    this.cardService = new CardService()
    this.notificationService = new NotificationService()
  }

  render() {
    this.element = renderService.htmlToElement(template, 
    [
      new Field({
        name: 'amount',
        placeholder: 'Enter amount:',
        type: 'number'
      })
    ], 
    styles
  )

    $R(this.element)
      .find('#action-buttons')
      .append(
        new Button({
          children: 'Top-up',
          variant: 'green'
        }).render()
      )
      .append(
        new Button({
          children: 'Withdrawal',
          variant: 'purple'
        }).render()
      )

    return this.element;
  }
}