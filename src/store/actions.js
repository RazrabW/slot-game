import api from '@/api/idb.js'

export default {
	save: async function (context, data) {
		return await api.save(context.state);
	},
	load: async function (context) {
		await api.load().then(
			result => {
					context.commit('setState', result)
			});
	}
}