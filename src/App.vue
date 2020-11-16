<template>
  <div id="app">
    <p class="nes-container is-centered">
        Ставка - <span class="nes-text is-primary">{{ form.rate }}</span> 
        Баланс - <span class="nes-text is-primary">{{ $store.state.money }}</span>
    </p>

    <slot-machine
        :list="list"
        :responsive="true"
        :trigger="trigger"
        @onComplete="onComplete">
    </slot-machine>

    <div class="control">
        <button type="button" v-bind:class="isActive" class="nes-btn is-primary" @click="start('less')"><5 [x2]</button>
        <button type="button" v-bind:class="isActive" class="nes-btn is-primary" @click="start('equally')">=5 [x10]</button>
        <button type="button" v-bind:class="isActive" class="nes-btn is-primary" @click="start('more')">>5 [x2]</button>
    </div>

    <button type="button" class="nes-btn is-success stat-btn" @click="open_stat">Статистика</button>

    <Modal ref="rate" id="rate">
        <p class="title">Ставка</p>
        <p>Ваш баланс - <span class="nes-text is-primary">{{ $store.state.money }}</span></p>
        
        <div class="nes-field is-inline">
            <label for="inline_field">Ставка </label>
            <input type="text" id="inline_field" v-model="form.rate" @keyup="checkVatId" class="nes-input" placeholder="10">

        </div>
        <p class="error" v-if="form.vatError">{{ form.vatErrorMsg }}</p>

        <button type="button" class="nes-btn is-success" v-if="form.vatError" @click="play">Играть!</button>
    </Modal>

    <Modal ref="result">
        <p class="title">Результат</p>
        <p>Итог - {{  }}</p>
        <button type="button" class="nes-btn is-success" @click="close_result">Сыграть ещё!</button>
    </Modal>

    <Modal ref="stat">
        <p class="title">Статистика</p>
        <p>Побед - {{ $store.state.win_count }}</p>
        <p>Поражений - {{ $store.state.defeat_count }}</p>
        <p></p>
        <button type="button" class="nes-btn is-success" @click="close_stat">Закрыть</button>
    </Modal>

  </div>
</template>

<script>
    import Modal from './components/Modal.vue'
    import store from './store'
    import api from '@/api/idb.js'

    export default {
        name: 'App',
        data() {
            return {
                list: [],
                trigger: false,
                isActive: '',
                form: {
                    rate: '',
                    vatError: false, 
                    vatErrorMsg: ''
                },
                current_number: 0,
                current_button: '',

                result_message: '', //сообщение выводимое при различных исходах
                result_rate: 0

            };
    },
    components: { Modal },
    methods: {
        open_stat: function () {
            this.$refs.stat.$el.style.display = 'block';
        },
        close_stat: function () {
            this.$refs.stat.$el.style.display = 'none';
        },
        close_rate: function () {
            this.$refs.rate.$el.style.display = 'none';
        },
        open_rate: function () {
            this.$refs.rate.$el.style.display = 'block';
        },
        play: function () {
            this.close_rate();

        },
        close_result: function () {
            this.$refs.result.$el.style.display = 'none';

            this.open_rate();
        },
        checkVatId() {
            var vatIdRegex = /^[1-9]\d*$/;
            
            if (this.form.rate == ''){
                this.form.vatError = false;

            } else if(!vatIdRegex.test(this.form.rate)) {
                this.form.vatError = false;
                console.log(1)
            } else {
                if (this.form.rate <= store.state.money) {
                    this.form.vatError = true;
                } else {
                    this.form.vatError = false;
                }
            }
        },
        start(data) { // Trigger to let the machine start
            if (this.isActive != 'is-disabled') {
                this.trigger = !this.trigger;
                this.isActive = 'is-disabled';

                this.current_button = data;
            }
        },
        onComplete(data) { // Run complete callback

            setTimeout(() => {
            this.current_number = data.text;
                switch (this.current_button) {
                    case 'less':
                        if (this.current_number < 5) {
                            store.commit('win', {coef: 2, rate: this.form.rate});
                            this.result_message = 'Поздравляем, вы виграли!';
                            this.result_rate = 2 * this.form.rate;
                            this.open_rate();
                        } else {
                            store.commit('defeat', {rate: this.form.rate});
                            this.open_rate();
                            console.log('Поражение');
                        }
                    break;
                    case 'equally':
                        if (this.current_number == 5) {
                            store.commit('win', {coef: 5, rate: this.form.rate});
                            this.result_message = 'Поздравляем, вы виграли!'
                            this.result_rate = 5 * this.form.rate;
                            this.open_rate();
                        } else {
                            store.commit('defeat', {rate: this.form.rate});
                            this.open_rate();
                            console.log('Поражение');
                        }
                    break;
                    case 'more':
                        if (this.current_number > 5) {
                            store.commit('win', {coef: 2, rate: this.form.rate});
                            this.result_message = 'Поздравляем, вы виграли!'
                            this.result_rate = 2 * this.form.rate;
                            this.open_rate();
                        } else {
                            store.commit('defeat', {rate: this.form.rate});
                            this.open_rate();
                            console.log('Поражение');
                        }
                    break;
                }

                //this.$refs.result.$el.style.display = 'block';
                this.isActive = '';
            }, 1500);
        }
    },
    created: function () {
        while (this.list.length < 11) { // выводит 0, затем 1, затем 2
            this.list.push({text: this.list.length, color: '#B366FF'})

        }
    },
    mounted: function () {
        store.dispatch('load');
    }
}

setInterval(function() {
    store.dispatch('save');
}, 100);

window.onload = () => {
    document.querySelector('#rate').style.display = 'block';
}

</script>

<style>
    .control {
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    .control > button {
        margin: 10px;
        flex-grow: 3;
    }

    .stat-btn {
        width: 100%;
    }
</style>