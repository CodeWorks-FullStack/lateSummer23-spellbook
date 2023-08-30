import { AppState } from "../AppState.js"
import { Pop } from "../utils/Pop.js"



// NOTE this model is for spells in the sandbox
export class Spell {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.description = data.description || data.desc.join('\n\n')
    // NOTE q1 ? q2 ? tt : tf : ff
    this.damage = data.damage ? data.damage.damage_type ? data.damage.damage_type.name : data.damage : 'n/a'
    this.level = data.level
    this.range = data.range
    this.material = data.material || 'none'
    this.ritual = data.ritual
    this.concentration = data.concentration
    this.castingTime = data.castingTime || data.casting_time
    this.duration = data.duration
    // NOTE q ? t : f
    this.components = data.components
    // NOTE these next two are exclusive to the sandbox
    this.prepared = data.prepared
    this.creatorId = data.creatorId
  }


  get activeTemplate() {
    return `
        <div class="card p-3 sticky-top">
        <div class="d-flex justify-content-between">
          <h1 class="text-success">${this.name}</h1>
            ${this.addSpellButton}
        </div>
          <div class="bg-secondary">
            <div>${this.level} | ${this.ritual} | ${this.concentration}</div>
            <div>${this.castingTime} | ${this.duration} | ${this.range} | ${this.damage}</div>
            <div>${this.material} | ${this.components}</div>
          </div>
          <p class="text-start">${this.description}</p>
        </div>`
  }

  get ListTemplate() {
    return `
    <div class="d-flex">
    ${this.preparedCheckbox}
    <p onclick="app.SandboxSpellsController.setActiveSpell('${this.id}')" class="selectable p-1 rounded mb-1">${this.name}</p>
    
    </div>`
  }

  // NOTE static exists on the definition of the class, and not an instance of it. in this case we would use Spell.SpellListTemplate to access this method.
  static SpellListTemplate(spell) {
    return `
    <p class="selectable text-light py-1 rounded mb-0" onclick="app.DndSpellsController.getOneSpell('${spell.index}')" >${spell.name}</p>
    `
  }

  static SpellCount() {
    let spellMax = 10
    let preparedSpells = AppState.mySpells.filter(spell => spell.prepared)
    if (preparedSpells.length <= spellMax) {
      return `<h3 class="text-success">Prepared Spells ${preparedSpells.length}/${spellMax}</h3>`
    } else {
      Pop.toast("YOU'VE VIOLATED THE LAW!", 'warning', 'center', 10000)
      return `<h3 class="text-danger">Prepared Spells ${preparedSpells.length}/${spellMax}</h3>`
    }
  }

  get addSpellButton() {
    let inList = AppState.mySpells.find(spell => spell.name == this.name)
    if (AppState.account && !inList) { // use account or user to determine if someone is logged in or not when hiding buttons
      return `<button class="btn btn-success" onclick="app.SandboxSpellsController.saveSpell()"> + add spell</button> `
    }
    return ''
  }

  get preparedCheckbox() {
    if (this.prepared) {
      return `<input type="checkbox" checked onchange="app.SandboxSpellsController.prepareSpell('${this.id}')">`
    } else {
      return `<input type="checkbox" onchange="app.SandboxSpellsController.prepareSpell('${this.id}')">`
    }
  }
}