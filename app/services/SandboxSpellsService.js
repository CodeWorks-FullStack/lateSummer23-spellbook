import { AppState } from "../AppState.js"
import { Spell } from "../models/Spell.js";
import { api } from "./AxiosService.js";



class SandboxSpellsService {
  async getMySpells() {
    const res = await api.get('api/spells')
    console.log('My Spells', res.data);
    // NOTE when converting an array to a new model. You need to run .map ON the array. res.data is the level where the array is
    let mySpells = res.data.map(spell => new Spell(spell))
    AppState.mySpells = mySpells
  }

  async saveSpell() {
    const spell = AppState.activeSpell // was a class Spell
    console.log('Saving', spell);
    const res = await api.post('api/spells', spell)
    console.log('Saved Spell', res.data); // res.data does not keep the spell class through api activity
    AppState.mySpells.push(new Spell(res.data)) // reclass res.data into a spell
    AppState.emit('mySpells')
  }
  setActiveSpell(spellId) {
    let spell = AppState.mySpells.find(spell => spell.id == spellId)
    AppState.activeSpell = spell
  }
  async prepareSpell(spellId) {
    // you could check for prepared length and just skip all this if at max
    const spell = AppState.mySpells.find(spell => spell.id == spellId)
    spell.prepared = !spell.prepared

    const res = await api.put(`api/spells/${spellId}`, spell)
    console.log('Prepared spell', res.data);
    AppState.emit('mySpells')

  }

}

export const sandboxSpellsService = new SandboxSpellsService()