export class Layout {
  constructor({router, child}){
    this.router = router
    this.child = child
  }

  render(){
    const headerHTML = `<header>
      Header
      <nav>
        <a href="/">Home</a>
        <a href="/auth">Auth</a>
      </nav>
    </header>`

    return `
      ${headerHTML}
      <main>
      ${this.child}
      </main>
    `
  } 
}