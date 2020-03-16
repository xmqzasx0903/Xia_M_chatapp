export default {
    props: ['open'],

    template: `
        <transition name="fade">
            <div v-if="open" class="modal-container">
                <div class="modal-dialog" @click.stop="preventClose">
                    <div class="input-container">
                        <input placeholder="please input your nickname" class="username" type="text" v-model="username" />
                        <button @click.stop="onOk">OK</button>
                    </div>
                    <p>Left empty input treat as anonymous</p>
                </div>
            </div>
        </transition>
    `,

    data() {
        return {
            username: ''
        }
    },

    methods: {
        onOk() {
            this.$emit('getusername', this.username);
        },

        preventClose() {
            return false;
        }
    }
}