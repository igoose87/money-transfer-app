export class NotFound extends NotFound{
  constructor(){
    super({title: 'Not found'})
  }
  render(){
    return '<p>Not found!</p>'
  }
}