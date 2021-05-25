/**
 * <bullet-entry> custom component
 * to be subclassed later by notes, tasks, events, etc.
 * It uses the template with id="bulletTemplate" in crud.html
 */
class BulletEntry extends HTMLElement {
  constructor (title, type, date, description, tag) {
    super()

    // set the member vars
    this.id = new Date().getTime() / 1000 // automatic generation up to nearest second, hidden from user
    this.title = title // user selection
    this.type = type // user selection, this is the specific type of bullet
    this.date = date // user selected date, the one actually displayed to the user
    this.description = description // user input
    this.tag = tag // user selection

    // templated HTML content
    const template = document.getElementById('bulletTemplate')

    // get the clone
    const clone = template.content.cloneNode(true)

    // now we make the necessary changes to the clone
    // const articleElement = clone.querySelector('.bulletEntry'); // not sure if we actually need this reference

    const titleElement = clone.querySelector('.bulletTitle')
    const typeElement = clone.querySelector('.bulletType')
    const dateElement = clone.querySelector('.bulletDate')
    const descriptionElement = clone.querySelector('.bulletDescription')
    const tagElement = clone.querySelector('.bulletTag')

    titleElement.innerHTML = title
    typeElement.innerHTML = type
    dateElement.innerHTML = date
    descriptionElement.innerHTML = description
    tagElement.innerHTML = tag

    // create a shadow root for this web component
    this.attachShadow({ mode: 'open' })

    // attach cloned content of template to shadow DOM
    this.shadowRoot.appendChild(clone)
  }

  get id () {
    return this.id
  }

  get title () {
    return this.title
  }

  get type () {
    return this.type
  }

  get date () {
    return this.date
  }

  get description () {
    return this.description
  }

  get tag () {
    return this.tag
  }

  // id doesn't change so it doesn't seed a setter method

  set title (title) {
    this.title = title

    // get the root of the shadow that was attached to this element
    const shadow = this.shadowRoot

    shadow.querySelector('.bulletTitle').innerHTML = title
  }

  set type (type) {
    this.type = type

    // get the root of the shadow that was attached to this element
    const shadow = this.shadowRoot

    shadow.querySelector('.bulletType').innerHTML = type
  }

  set date (date) {
    this.date = date

    // get the root of the shadow that was attached to this element
    const shadow = this.shadowRoot

    shadow.querySelector('.bulletDate').innerHTML = date
  }

  set description (description) {
    this.description = description

    // get the root of the shadow that was attached to this element
    const shadow = this.shadowRoot

    shadow.querySelector('.bulletDescription').innerHTML = description
  }

  set tag (tag) {
    this.tag = tag

    // get the root of the shadow that was attached to this element
    const shadow = this.shadowRoot

    shadow.querySelector('.bulletTag').innerHTML = tag
  }
}

customElements.define('bullet-entry', BulletEntry)
