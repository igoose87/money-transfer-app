import { NotFound } from '@/components/screens/not-found/not-found.component'
import { Layout } from "@/components/layout/layout.component";
import { ROUTES } from "./routes.data";


export class Router {
  #routes = ROUTES
  #currentRoute = null
  #layout = null

  constructor(){
    // отлавливание событий кнопок назад и вперед
    window.addEventListener('popstate', () => {
      this.#handleRouteChange()
    })
    
    this.#handleRouteChange()
    this.#handleLinks()
  }

  #handleLinks(){
    document.addEventListener('click', event => {
      const target = event.target.closest('a')

      if (target){
        event.preventDefault() // выключаем поведение ссылок по умолчанию
        this.navigate(target.href)
      }
    })
  }

  getCurrentPath(){
    return window.location.pathname
  }

  navigate(path){
    if (path !== this.getCurrentPath()){
      window.history.pushState({}, '', path)
      this.#handleRouteChange()
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
    const component = new this.#currentRoute.component()

    if(!this.#layout){
      this.#layout = new Layout({
        router: this,
        child: component.render()
      })
      document.getElementById('app').innerHTML = this.#layout.render()
    } else {
      document.querySelector('main').innerHTML = component.#render()
    }
  }
}