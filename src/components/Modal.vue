<template>
		<div class="window nes-dialog is-rounded">
            <form method="dialog" class="dialog-form">
                <div class="nes-container dialog-form is-centered with-title">
                	<slot></slot>
                </div>
            </form>
        </div>
</template>

<script>
	export default {
		name: 'Modal'
	}
</script>

<style scoped>

.window {
    display: none;
    left: 0px;
    right: 0px;
    width: -webkit-fit-content;
    height: -webkit-fit-content;
    color: -internal-light-dark(black, white);
    margin: auto;
    border-width: initial;
    border-style: solid;
    border-color: initial;
    border-image: initial;
    padding: 1em;
    background: -internal-light-dark(white, black);
    top: 100px;
    z-index: 100;
    background: white;
    box-shadow:1px 1px 0px 100000px rgba(0,0,0,0.27);
    -webkit-box-shadow:1px 1px 0px 1000000px rgba(0,0,0,0.27);
    -moz-box-shadow:1px 1px 0px 100000px rgba(0,0,0,0.27);
    position: fixed;
    width: 60%;
}

@media (max-width: 640px) {
    .window {
        width: 100%;
        height: 100%;
        top: 0;
    }
    .dialog-form {
        height: 100%;
    }

    .nes-container.with-title.is-centered > .title {
        margin: -3.6rem auto 1rem;
    }
    .close-btn {
        width: 100px;
        position: absolute;
        bottom: 10px;
        left: 50%;
        margin: 0 -50px !important;
    }
}
</style>