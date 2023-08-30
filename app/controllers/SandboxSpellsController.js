import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { sandboxSpellsService } from "../services/SandboxSpellsService.js";
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js";

function _drawMySpellList() {
  const spells = AppState.mySpells
  let listContent = ''
  spells.forEach(s => listContent += s.ListTemplate)
  setHTML('my-spells', listContent)

  let countContent = Spell.SpellCount()
  setHTML('spell-count', countContent)
}



export class SandboxSpellsController {
  constructor() {
    console.log('sandbox spells controller')
    // this.getMySpells() can't get spells on load, have to get them after i log in
    AppState.on('user', this.getMySpells) // watching the user lets us know when the user is logged in
    AppState.on('mySpells', _drawMySpellList)
  }

  async getMySpells() {
    try {
      await sandboxSpellsService.getMySpells()
    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }


  async saveSpell() {
    try {
      await sandboxSpellsService.saveSpell()
    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }

  setActiveSpell(spellId) {
    sandboxSpellsService.setActiveSpell(spellId)
  }

  async prepareSpell(spellId) {
    try {
      await sandboxSpellsService.prepareSpell(spellId)
    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }
}