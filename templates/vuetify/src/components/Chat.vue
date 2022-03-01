<template>
  <div class="chat">
    <h3 :key="this.ChatTitle">{{ ChatTitle }}</h3>
    <div class="messages">
      <div v-for="mess in messages" :key="mess.id" class="row message">
        <img class="icon" :src="mess.icon" />
        <span class="userName">{{ mess.user }}</span>
        <span class="messageSeparator"> : </span>
        <span class="userMessage">{{ mess.message }}</span>
      </div>
    </div>
    <div class="bottom">
      <div>
        <textarea v-model="newChat" placeholder="Enter your message"></textarea>
      </div>
      <div>
        <button @click="addMessage()">Chat</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myApp-Chat",
  data() {
    return {
      newChat: "",
      ChatTitle: "Ceci n'est pas un cat",
      messages: [
        {
          id: "xd",
          icon: "https://picsum.photos/200",
          user: "Luclys",
          message: "12:12",
        },
        {
          id: "op",
          icon: "https://picsum.photos/seed/picsum/200",
          user: "Paladin",
          message: "GG",
        },
      ],
    };
  },
  props: {
    backgroundColor: String,
  },
  watch: {
    backgroundColor: {
      immediate: true,
      deep: true,
      handler(newVal) {
        var chat = document.querySelector(":root");
        chat.style.setProperty("--chat-background-color", newVal);
        this.update();
      },
    },
  },
  methods: {
    addMessage() {
      this.messages.push({
        id: Date.now(),
        user: "You",
        message: this.newChat,
      });
    },
    update() {
      this.$forceUpdate();
    },
  },
};
</script>

<style>
:root {
  --chat-background-color: grey;
  --chat-width: 25%;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messages {
  background: var(--chat-background-color);
  border: 1px solid;
}

.bottom {
  text-align: center;
}

.message {
  margin: 5px;
}

.icon {
  max-height: 1em;
  max-width: 1em;
  margin-right: 0.5em;
}

h3 {
  margin: 40px 0 0;
}

.chat {
  background: gray;
  text-align: left;
}

a {
  color: #42b983;
}
</style>
