import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		money: 100,
		win_count: 0,
		defeat_count: 0
	},
	mutations: {
		win: (state, data) => { //data -> {coef: [number]; rate: [number]}
			state.money += data.coef * data.rate;
			state.win_count++;
		},
		defeat: (state, data) => {
			state.money -= data.rate
			state.defeat_count++;
		},
    	setState: function (state, data) {
    		this.replaceState(data)
    	}
	},
  actions,
  modules: {
  }
})
