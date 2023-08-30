import { AboutController } from "./controllers/AboutController.js";
import { DndSpellsController } from "./controllers/DndSpellsController.js";
import { HomeController } from "./controllers/HomeController.js";
import { SandboxSpellsController } from "./controllers/SandboxSpellsController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";

/**
 * Register your routes for the application here
 * @type {Route[]}
 */
export const router = [
  {
    path: '',
    controller: [DndSpellsController, SandboxSpellsController],
    view: /*html*/`
    <div class="container-fluid">
    <section class="row" >
    <div id="spell-list" class="col-3 bg-grey"></div>
    <div id="active-spell" class="col-6"></div>
    <div class="col-3 bg-grey text-light">
      <div class="text-success" id="spell-count"> </div>
      <div id="my-spells"></div>
    </div>
    </section>
    </div>
    `
  },
  {
    path: '#/about',
    controller: [AboutController, ValuesController],
    view: AboutView
  }
]






/**
 * Supporting types for the router
 * NOTE Controllers must be non instantiated 
 * @typedef {{[x:string]:any}} controller
 * @typedef {{path: string, controller?:controller |controller[], view?: string, target?: string}} Route
 */