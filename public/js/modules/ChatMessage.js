// the export statement means that everything inside the curly braces 
// will be made public when you import this file into another via the import statement

export default {
    props: ['msg'],

    template: `
        <div class="msg">
            <p v-if="!newUser && !left" class="new-message" :class="{'my-message': matchedID}">
                <span class="username">{{ msg.message.name }}</span>
                <span class="message-content">{{ msg.message.content }}</span>
            </p>
            <p v-if="newUser" class="new">---------- {{ name }} add to the group chat ----------</p>
            <p v-if="left" class="new">---------- {{ name }} left the group chat ----------</p>
        </div>

    `,

    data() {
        return {
            name: this.msg.message.name,
            message: "hello from the template",
            matchedID: this.$parent.$parent.socketID == this.msg.id,
            newUser: this.msg.message.newUser,
            left: this.msg.message.left
        };
    }

}