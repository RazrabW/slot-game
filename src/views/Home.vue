<template>
    <slot-machine
        :list="list"
        :trigger="trigger"
        :height="300"
        :width="300"
        @onComplete="onComplete">
    </slot-machine>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {text: '1', color: '#668CFF'},
                {text: '2', color: '#FF6666'},
                {text: '3', color: '#B366FF'},
            ],
            trigger: null,
        };
    },
    methods: {
        start() { // Trigger to let the machine start
            this.trigger = new Date();
        },
        onComplete(data) { // Run complete callback
            console.log(data);
        }
    }
}
</script>