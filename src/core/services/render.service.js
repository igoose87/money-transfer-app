import ChildComponent from "../component/child.component"

// 21
class RenderService {
  
  /**
   * @param {string} html
   * @param {Array} components
   * @param {Object} [styles]
   * @returns {HTMLElement}
   */
  htmlToElement(html, components = [], styles){
    const template = document.createElement('template')
    template.innerHTML = html.trim()
    const element = template.content.firstChild

    if (styles) {
      this.#applyModuleStyles(styles, element)
    }
    
    this.#replaceComponentTags(element, components)
    
    return element
  }

  /**
     * @param {HTMLElement} parentElement
     * @param {Array}  components
  */
  #replaceComponentTags(parentElement, components) {
    // pattern for search tags (ex: component-heading, component-card-info)
    const componentTagPattern = /^component-/                   // regular expr from ^(beginning of the string) to comment-
    const allElements = parentElement.getElementsByTagName('*') // find all tags

    for (const element of allElements){                         // check tags for pattern
      const elementTagName = element.tagName.toLowerCase()
      if (componentTagPattern.test(elementTagName)) {           // if ok clear from tag and get component name (ex: heading)
        const componentName = element.tagName                   
        .toLowerCase()
        .replace(componentTagPattern, '')                       // delete component
        .replace(/-/g, '')                                      // delete -

        const foundComponent = components.find(Component => {   // find component by component name
          const instance = 
            Component instanceof ChildComponent ? Component : new Component() // check is it instance

          return instance.constructor.name.toLowerCase() === componentName // name - className in lower case
        })

        if (foundComponent) {                                    // if component ok -> render, else - create instance -> render
          const componentContent = 
            foundComponent instanceof ChildComponent
              ? foundComponent.render()
              : new foundComponent().render()
          element.replaceWith(componentContent)
        } else {
          console.error(
            `Component "${componentName}" not found in the provided components array.`
          )
        }
      }
    }
  }

  /** 
   * @param {Object} moduleStyles
   * @param {string} element
   * @returns {void}
  */

  // get module styles with done classes, element (parent block [101 str, home div])
  #applyModuleStyles(moduleStyles, element) {
    if (!element)                                               // if not element return
      return

    // take element
    const applyStyles = element => {
      for (const [key, value] of Object.entries(moduleStyles)){ // run for loop of styles
        if (element.classList.contains(key)){                   // if element has class update for new class
          element.classList.remove(key)
          element.classList.add(value)
        }
      }
    }
    
    // element - parent element, if has class attribute - apply styles
    if (element.getAttribute('class')) {
      applyStyles(element)
    }

    // apply styles for all child elements (parent element)
    const elements = element.querySelectorAll('*')
    elements.forEach(applyStyles)
  }
}

export default new RenderService()

{
  /* 
  <div class='home'>
    <h1 class='text'></h1>
    <component-heading></component-heading>
    <component-card-info></component-card-info>
  </div>
  */
}