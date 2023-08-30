import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { dndSpellsService } from "../services/DndSpellsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";


function _drawActiveSpell() {
  let activeSpell = AppState.activeSpell
  if (activeSpell) {
    setHTML('active-spell', activeSpell.activeTemplate)
  }
}

function _drawSpellsList() {
  let spells = AppState.spellList
  let listContent = ''
  spells.forEach(s => listContent += Spell.SpellListTemplate(s))
  setHTML('spell-list', listContent)
}


export class DndSpellsController {
  constructor() {
    this.getSpells()
    AppState.on('spellList', _drawSpellsList)
    AppState.on('activeSpell', _drawActiveSpell)
    AppState.on('user', _drawActiveSpell)
    AppState.on('mySpells', _drawActiveSpell)
  }

  async getSpells() {
    try {
      await dndSpellsService.getSpells()
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  async getOneSpell(index) {
    try {
      console.log(index);
      await dndSpellsService.getOneSpell(index)
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }
}