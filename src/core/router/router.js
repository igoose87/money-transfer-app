import { NotFound } from '@/components/screens/not-found/not-found.component'
import { Layout } from '@/components/layout/layout.component'
import { ROUTES } from './routes.data'
import { $R } from '../rquery/rquery.lib'
import { Auth } from '@/components/screens/auth/auth.component'

export class Router {
  #routes = ROUTES
  #currentRoute = null
  #layout = null

  constructor(){
    window.addEventListener('popstate', () => {   // отлавливание событий кнопок назад и вперед
      this.#handleRouteChange()
    })
    
    this.#handleRouteChange()
    this.#handleLinks()
  }

  // to forbid page reload
  #handleLinks(){
    document.addEventListener('click', event => { // отслеживание клика по ссылке
      const target = event.target.closest('a')

      if (target) {                               // если ссылка найдена
        event.preventDefault()                    // отключение действий ссылок по-умолчанию
        this.navigate(target.href)                // переход по атрибуту из ссылки
      }
    })
  }

  getCurrentPath(){
    return window.location.pathname
  }

  navigate(path){                                 // (path) - путь по которому хотим перейти
    if (path !== this.getCurrentPath()){          // текущий путь != тому, по которому хотим перейти
      window.history.pushState({}, '', path)      // поменять историю ссылок и запушать новый url
      this.#handleRouteChange()                   // прогрузить страницу по новому url
    }
  }

  #handleRouteChange(){
    const path = this.getCurrentPath() || '/'
    let route = this.#routes.find(route => route.path === path)

    if (!route) {
      route = {
        component: NotFound
      }
    }

    this.#currentRoute = route
    this.#render()
  }

  #render(){
    const component = new this.#currentRoute.component().render()

    if(!this.#layout){
      this.#layout = new Layout({
        router: this,
        children: component
      }).render()

      $R('#app').append(this.#layout)
    } else {
      $R('#content').html('').append(component)
    }
  }
}