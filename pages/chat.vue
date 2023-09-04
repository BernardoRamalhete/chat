<template>
    <div class="chat">
        <div class="chat-main">
            <aside 
                class="chat-main-menu" 
                :class="{ active: activeChat }"
                @mouseenter="setActiveChat(true)" 
                @mouseleave="setActiveChat(false)"
            >
                <header class="chat-main-menu-header">
                    <form 
                        v-if="showNewChatForm && activeChat"
                        class="chat-main-menu-header-form"
                        @submit.prevent="addNewChat"
                    >
                        <div>
                            <button 
                                class="cancel" 
                                type="button"
                                @click="closeNewChatForm"
                            >
                                <span class="icon">
                                    <Icon name="quill:escape" aria-hidden/>
                                </span>
                                <span class="visually-hidden">Cancel</span>
                            </button>
                            <label for="new-chat" class="visually-hidden">Email</label>
                            <input 
                                id="new-chat"
                                v-model="newChatEmail"
                                type="email" 
                                :class="{ error: newChatEmailError }"
                                placeholder="User's Email"
                                required
                            />
                            <button>
                                <span class="icon">
                                    <Icon name="quill:add" aria-hidden/>
                                </span>
                                <span class="visually-hidden">Submit</span>
                            </button>
                        </div>
                    </form>
                    <form
                        v-else-if="showNewGroupForm && activeChat"
                        class="chat-main-menu-header-form" 
                        @submit.prevent="createGroup"
                    >
                        <div>
                            <label for="new-group" class="visually-hidden">Group name</label>
                            <input 
                                id="new-group"
                                v-model="newGroupName"
                                type="text" 
                                :class="{ error: newGroupNameError }"
                                placeholder="Group Name"
                                required
                            />
                        </div>
                        <ul>
                            <li>
                                <strong>
                                    Participants
                                </strong>
                            </li>
                            <li v-for="user in usersOptions" :key="user.email">
                                <input 
                                    :id="user.email" 
                                    :checked="newGroupMembers.includes(user.email)"
                                    type="checkbox" 
                                    class="checkbox"
                                    @change="toggleGroupMemberSelection(user.email)"
                                />
                                <div>
                                    <Icon name="quill:checkmark" aria-hidden/>
                                </div>
                                <label :for="user.email">{{ user.name }}</label>
                            </li>
                            <li>
                                <label for="new-member-email" class="visually-hidden">Add new participant by email</label>
                                <input 
                                    id="new-member-email"
                                    v-model="newGroupMemberEmail"
                                    type="email" 
                                    placeholder="Add by email"
                                    :class="{ error: newGroupMemberEmailError }"
                                />
                                <button 
                                    type="button" 
                                    class="cancel"
                                    @click="addNewEmailToGroupList"
                                >
                                    <span class="icon">
                                        <Icon name="quill:add" aria-hidden/>
                                    </span>
                                    <span class="visually-hidden">Add user</span>
                                </button>
                            </li>
                        </ul>
                        <footer>
                            <button 
                                class="cancel" 
                                type="button"
                                @click="closeNewGroupForm"
                            >
                                <span class="icon">
                                    <Icon name="quill:escape" aria-hidden/>
                                </span>
                                <span class="visually-hidden">Cancel</span>
                            </button>
                            <button 
                                class="cancel"
                            >
                                <span class="icon">
                                    <Icon name="quill:checkmark" aria-hidden/>
                                </span>
                                <span class="visually-hidden">Submit</span>
                            </button>
                        </footer>
                    </form>
                    <button 
                        v-else
                        class="new" 
                        :class="{ active: activeChat }"
                        @click="openNewDropdownOptions"
                    >
                        <span class="icon">
                            <Icon name="quill:add" aria-hidden/>
                        </span>
                        <span class="text">New</span>
                    </button>
                    <ul v-if="showNewDropdownOptions && activeChat" class="dropdown">
                        <li>
                            <button @click="openNewChatForm">
                                Chat
                            </button>
                        </li>
                        <li>
                            <button @click="openNewGroupForm">
                                Group
                            </button>
                        </li>
                    </ul>
                    <div 
                        v-if="!showNewChatForm && !showNewGroupForm"
                        class="search" 
                        :class="{ active: activeChat }"
                    >
                        <label for="chat-search" class="visually-hidden">
                            Search
                        </label>
                        <input 
                            id="chat-search" 
                            v-model="searchValue"
                            type="text"
                            placeholder="Search for..."
                        />
                        <span>
                            <Icon 
                                name="quill:search-alt" 
                                aria-hidden
                            />
                        </span>
                    </div>
                </header>
                <nav 
                    class="items" 
                    :class="{ active: activeChat }"
                >
                    <ul>
                        <li v-for="chat in filteredChats">
                            <button @click="selectChat(chat)">
                                <figure :class="chat.color">
                                    <img 
                                        :src="chat.image ?? `https://ui-avatars.com/api/?name=${chat.name.charAt(0)}&background=8338ec&color=fff&length=1`" 
                                        alt=""
                                    />
                                </figure>
                                <p>
                                    <strong>{{ chat.name }}</strong>
                                    <span>{{ chat.status }}</span>
                                </p>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main v-if="selectedChat" class="chat-main-content">
                <header class="chat-main-content-header">
                    <figure :class="selectedChat.color">
                        <img :src="selectedChat.image ?? `https://ui-avatars.com/api/?name=${selectedChat.name.charAt(0)}&background=8338ec&color=fff&length=1`" alt=""/>
                    </figure>
                    <div class="chat-main-content-header-text">
                        <span>
                            <h2>{{ selectedChat.name }}</h2>
                            <p>
                                {{ selectedChat.status }}
                            </p>
                        </span>
                        <button>
                            <Icon name="quill:meatballs-h"/>
                            <span class="visually-hidden">Chat actions</span>
                        </button>
                    </div>
                </header>
                <section ref="messagesWrapper" class="chat-main-content-messages">
                    <ul>
                        <li 
                            v-for="(message, index) in selectedChat.messages" 
                            :key="message.id"
                            :class="[{ 
                                inverted: message.author.email === userData.email,
                                'same-author': selectedChat.messages[index + 1] != undefined && selectedChat.messages[index + 1].author.email === message.author.email
                            }, 'chat-message']"
                        >
                            <figure>
                                <img :src="message.author.image" alt=""/>
                            </figure>
                            <span v-html="message.content"/>
                        </li>
                    </ul>
                </section>
                <form @submit.prevent="handleSendMessage" class="chat-main-content-form">
                    <ChatMessageInputs @update:message="getMessageContent"/>
                </form>
            </main>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
})

const { create, sendMessage } = useFirebaseDb()

const messagesWrapper = ref(null)

function scrollToLastMessage() {
    if(messagesWrapper.value == undefined) return
    messagesWrapper.value.scrollTop = messagesWrapper.value.scrollHeight
}

onMounted(() => {
    scrollToLastMessage()
})

const { user } = useFirebaseAuth()
const userCookie = useCookie('user')

const userData = computed(() => {
    return user.value || userCookie.value
})

const chats = useState('chats')

const searchValue = ref('')

const filteredChats = computed(() => {
    const search = searchValue.value.toLocaleLowerCase()
    if(Array.isArray(chats.value)) {
        return chats.value.filter(chat => chat.name.toLowerCase().includes(search))
    }
    return []
})

const selectedChatId = ref(Array.isArray(chats.value) && chats.value.length > 0 ? chats.value[0].id : null)

function selectChat(chat) {
    selectedChatId.value = chat.id
    setTimeout(() => {
        scrollToLastMessage()
    }, 300)
}

const selectedChat = computed(() => {
    return chats.value.find(chat => chat.id == selectedChatId.value)
})

const colors = [
    'blue',
    'light-blue',
    'lighter-blue',
    'pink',
    'red',
    'orange',
    'yellow',
    'purple'
]
function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)

    return colors[index]
}

const activeChat = ref(false)

function setActiveChat(value) {
    activeChat.value = value
}

const showNewDropdownOptions = ref(false)
function openNewDropdownOptions() {
    showNewDropdownOptions.value = true
}
function closeNewDropdownOptions() {
    showNewDropdownOptions.value = false
}

const showNewChatForm = ref(false)
const newChatEmail = ref('')
const newChatEmailError = ref(false)
function openNewChatForm() {
    showNewChatForm.value = true
    closeNewDropdownOptions()
}
function closeNewChatForm() {
    showNewChatForm.value = false
    newChatEmail.value = ''
    newChatEmailError.value = false
}

function validateEmail(email) {
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

    const hasAdded = chats.value.filter(chat => !chat.is_group && chat.users[0].toLowerCase() == email.toLowerCase()).length > 0

    return validEmail && !hasAdded
}

function addNewChat() {
    newChatEmailError.value = false
    if(!validateEmail(newChatEmail.value)) {
        newChatEmail.value = ''
        newChatEmailError.value = true
        return

    }
    create('chats', {
        users: [ userData.value.email, newChatEmail.value ],
        messages: [],
        is_group: false,
        color: getRandomColor()
    })

    newChatEmail.value = ''
}

const usersOptions = computed(() => {
    const options = []
    chats.value.map(chat => options.push(...chat.users))
    return [...options, ...participantsAddedByEmail.value]
})

const newGroupName = ref('')
const newGroupMembers = ref([])
const newGroupMemberEmail = ref('')
const participantsAddedByEmail = ref([])
const newGroupMemberEmailError = ref(false)
const newGroupMembersError = ref(false)
const newGroupNameError = ref(false)
const showNewGroupForm = ref(false)
function openNewGroupForm() {
    showNewGroupForm.value = true
    closeNewDropdownOptions()
}
function closeNewGroupForm() {
    showNewGroupForm.value = false
    newGroupName.value = ''
    newGroupNameError.value = false
    newGroupMembers.value = []
    newGroupMembersError.value = false
    newGroupMemberEmail.value = ''
    newGroupMemberEmailError.value = false
    participantsAddedByEmail.value = []
}

function addNewEmailToGroupList() {
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newGroupMemberEmail.value)
    const usedEmail = usersOptions.value.find(user => user.email == newGroupMemberEmail.value) != undefined

    if(!validEmail || usedEmail) {
        newGroupMemberEmail.value = ''
        newGroupMemberEmailError.value = true
        console.log('foo')
        return
    }
    
    participantsAddedByEmail.value.push({ email: newGroupMemberEmail.value, name: newGroupMemberEmail.value })
    newGroupMembers.value.push(newGroupMemberEmail.value)
    newGroupMemberEmail.value = ''
}

function toggleGroupMemberSelection(email) {
    if(newGroupMembers.value.includes(email)) {
        newGroupMembers.value = newGroupMembers.value.filter(user => user != email)
        return
    }
    newGroupMembers.value.push(email)
}

function createGroup() {
    newGroupNameError.value = newGroupName.value == ''
    newGroupMembersError.value = newGroupMembers.value.length == 0

    if(newGroupMembersError.value || newGroupNameError.value) return

    create('chats', {
        users: [...newGroupMembers.value, userData.value.email],
        name: newGroupName.value,
        status: '',
        messages: [],
        is_group: true,
        color: getRandomColor()
    })

    closeNewGroupForm()
}

const message = ref('')
function getMessageContent(value) {
    message.value = value
}

function handleSendMessage() {
    const messageData = {
        author: {
            email: userData.value.email,
            image: userData.value.image
        },
        content: message.value,
        createdAt: new Date()
    }
    sendMessage(selectedChatId.value, messageData)

    document.querySelector('.ql-editor').innerHTML = ''
    setTimeout(() => {
        scrollToLastMessage()
    }, 100)
}
</script>

<style lang="scss" scoped>
.chat {
    display: flex;
    padding: 60px; 
    height: 100%;
    &-main {
        display: flex;
        max-height: 100%;
        box-shadow: -4px 4px 8px 6px rgba($lighter_blue, 0.1);
        padding: 24px;
        border-radius: 64px;
        width: 100%;
        height: 100%;
        &-menu {
            display: flex;
            flex-direction: column;
            background-color: $light_background;
            box-shadow: -4px 4px 8px 6px rgba($lighter_blue, 0.1);
            border-radius: 52px;
            padding-bottom: 24px;
            position: relative;
            max-width: 100px;
            transition: all 0.5s ease;
            &.active {
                max-width: 400px;
            }
            button {
                padding: 0;
                background-color: transparent;
                border: none;
                display: flex;
                align-items: center;
                cursor: pointer;
            }
            
        &-header {
            background-color: $primary_pink;
            padding: 20px;
            border-radius: 52px 52px 0 0;
            position: relative;
            
            &-form {
                padding-block: 20px;
                & > div {
                    display: flex;
                    align-items: center;
                }
                input {
                    padding: 8px 16px;
                    margin-inline: 12px;
                    background-color: $light_background;
                    border: none;
                    border-radius: 50px;
                    width: 100%;
                    transition: all 0.5s ease;
                    &:focus, &:hover {
                        outline: transparent;
                    }
                    &::placeholder {
                        color: rgba($light_background, 0.8);
                        color: lighten($primary_pink, 30%);
                    }
                    &.error {
                        background-color: $primary_red;
                        color: $light_background;
                        &::placeholder {
                            color: rgba($light_background, 0.8);
                        }
                    }
                }
                button {
                    padding: 0 20px;
                    background-color: $light_background;
                    color: $primary_pink;
                    border-radius: 50px;
                    font-size: 28px;
                    max-height: 40px;

                    &.cancel {
                        padding: 4px 8px;
                        font-size: 18px;
                        border-radius: 50%;
                    }
                }

                ul {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-block: 12px;
                    li {
                        display: flex;
                        align-items: center;
                        position: relative;
                        padding-inline: 12px; 
                        color: $light_background;
                        input {
                            margin-inline: 0;
                            margin-right: 8px;
                        }
                        .checkbox {
                            width: 20px;
                            aspect-ratio: 1;
                            position: absolute;
                            opacity: 0;

                            & + div {
                                width: 20px;
                                aspect-ratio: 1;
                                background-color: $light_background;
                                border-radius: 4px;
                                position: relative;
                                cursor: pointer;
                                svg {
                                    position: absolute;
                                    font-size: 20px;
                                    color: $primary_pink;
                                    opacity: 0;
                                    transition: all 0.2s ease;
                                }
                            }

                            

                            &:checked {
                                & + div {
                                    svg {
                                        opacity: 1;
                                    }
                                }
                            }
                        }

                        label {
                            color: $light_background;
                            padding-left: 8px;
                            cursor: pointer;
                        }
                    }
                }

                footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin: 24px 12px 0 12px;
                }
            }
            .new {
                border-radius: 50px;
                font-size: 24px;
                gap: 20px;
                color: $light_background;
                white-space: nowrap;
                transition: all 0.5s ease;
                padding-block: 8px;
                position: relative;
                &.active {
                    padding-inline: 12px;
                    .text {
                        width: 100% !important;
                    }
                }
                .icon {
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    font-size: 48px;
                    border-radius: 50%;
                    color: $primary_pink;
                    background-color: $light_background;
                    width: 60px;
                    aspect-ratio: 1;
                    svg {
                        position: absolute;
                    }
                }
    
                .text {
                    transition: all 0.5s ease;
                    display: block;
                    width: 0;
                    overflow: hidden;
                }
            }
            .dropdown {
                position: absolute;
                left: 40%;
                top: calc(50% - 20px);
                z-index: 10;
                background-color: $light_background;
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid $primary_pink;
                box-shadow: 0px 0px 8px 2px rgba($light_background, 0.8);
                li {
                    &:first-of-type {
                        border-bottom: 1px solid $primary_pink;
                    }
                    button {
                        width: 100%;
                        text-align: center;
                        font-size: 18px;
                        color: $primary_pink;
                        padding: 4px 8px;
                        transition: all 0.4s ease;
                        &:hover {
                            background-color: $light_pink;
                            color: $light_background;
                        }
                    }
                }
            }
        
            .search {
                display: flex;
                align-items: center;
                position: relative;
                margin-top: 24px;
                &.active {
                    input {
                        padding: 8px 40px 8px 16px !important;
                        max-width: 400px !important;
                    }
                    span {
                        right: 20px !important;
                    }
                }
                input {
                    padding: 8px 40px 8px 0;
                    max-width: 40px;
                    margin-inline: auto;
                    background-color: $light_background;
                    border: none;
                    border-radius: 50px;
                    width: 100%;
                    transition: all 0.5s ease;
                    &:focus, &:hover {
                        outline: transparent;
                    }
                    &::placeholder {
                        color: lighten($primary_pink, 30%);
                    }
                }
                span {
                    position: absolute;
                    right: 18px;
                    font-size: 24px;
                    color: $primary_pink;
                    margin-bottom: 2px;
                    transition: all 0.5s ease;
                }
            }
        } 
    
            .items {
                flex-grow: 1;
                overflow-y: auto;
                margin-top: 20px;
                &.active {
                    ul {
                        padding-inline: 20px !important;
                        li {
                            button {
                                gap: 16px !important;
                                p {
                                    width: 30ch !important;
                                }
                            }
                        }
                    }
                }
    
                ul {
                    align-items: center;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    transition: all 0.5s ease;
                    li {
                        button {
                            padding: 8px;
                            border-radius: 20px;
                            background-color: $pure_white;
                            text-align: left;
                            align-items: flex-start;
                            gap: 0;
                            box-shadow: 0px 0px 8px 2px rgba($lighter_blue, 0.1);
                            color: $text_color;
                            transition: all 0.5s ease;
    
                            figure {
                                flex-grow: 1;
                                flex-shrink: 0;
                                max-width: 52px;
                                border-radius: 12px;
                                overflow: hidden;
                                border: 4px solid;
                                &.blue {
                                    border-color: $primary_blue;
                                }
                                &.light-blue {
                                    border-color: $light_blue;
                                }
                                &.lighter-blue {
                                    border-color: $lighter_blue;
                                }
                                &.pink {
                                    border-color: $primary_pink;
                                }
                                &.red {
                                    border-color: $primary_red;
                                }
                                &.orange {
                                    border-color: $primary_orange;
                                }
                                &.yellow {
                                    border-color: $primary_yellow;
                                }
                                &.purple {
                                    border-color: $primary_purple;
                                }
    
    
                                img {
                                    object-fit: cover;
                                }
                            }
    
                            p {
                                overflow: hidden;
                                width: 0;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                transition: all 0.5s ease;
                                strong {
                                    display: block;
                                }
                                span {
                                    font-size: 14px;
                                }
                            }
                        }
                    }
                }
            }
        }
        &-content {
            width: 100%;
            padding: 12px 40px;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: visible;
            &-header {
                display: flex;
                gap: 20px;
                figure {
                    flex-grow: 1;
                    flex-shrink: 0;
                    max-width: 68px;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 4px solid;
                    &.blue {
                        border-color: $primary_blue;
                    }
                    &.light-blue {
                        border-color: $light_blue;
                    }
                    &.lighter-blue {
                        border-color: $lighter_blue;
                    }
                    &.pink {
                        border-color: $primary_pink;
                    }
                    &.red {
                        border-color: $primary_red;
                    }
                    &.orange {
                        border-color: $primary_orange;
                    }
                    &.yellow {
                        border-color: $primary_yellow;
                    }
                    &.purple {
                        border-color: $primary_purple;
                    }
                }

                &-text {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    gap: 20px;

                    span {
                        h2 {
                            font-family: 'Nunito';
                        }
                    }

                    button {
                        border: none;
                        padding: 12px;
                        background-color: transparent;
                        font-size: 24px;
                        color: $text_color;
                        transition: all 0.2s ease;
                        cursor: pointer;
                        margin-top: -12px;
                        &:hover {
                            opacity: 0.6;
                        }
                        &:focus {
                            opacity: 0.4;
                            outline: transparent;
                        }
                    }
                }
            }

            &-messages {
                overflow-y: auto;
                height: 100%;
                flex-grow: 1;
                scroll-behavior: smooth;
                ul {
                    margin-block: 52px;
                    padding-inline: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                    position: relative;
                    li {
                        display: flex;
                        justify-content: flex-start;
                        & > figure {
                            flex-grow: 1;
                            flex-shrink: 0;
                            max-height: 40px;
                            max-width: 40px;
                            border-radius: 50%;
                            overflow: hidden;
                            border: 2px solid $primary_purple;
                            position: relative;
                            top: 32px;
                            margin-right: 20px;
                        }
                        & > span {
                            display: block;
                            background-color: $primary_purple;
                            color: $light_background;
                            border-radius: 20px 20px 20px 0;
                            padding: 8px 12px;
                        }

                        &.same-author {
                            margin-right: 0px;
                            margin-left: 80px;
                            margin-bottom: -20px;
                            &.inverted {
                                margin-left: 0px;
                                margin-right: 80px;
                            }
                            & > figure {
                                display: none;
                            }
                            & > span {
                                border-radius: 20px !important;
                            }
                        }

                        &.inverted {
                            justify-content: flex-end;
                            & > figure {
                                margin-left: 20px;
                                border-color: $primary_pink;
                            }
                            &> span {
                                background-color: $primary_pink;
                                border-radius: 20px 20px 0 20px;
                                order: -1;
                            }
                        }
                    }
                }
            }
            &-form {
                background-color: $light_background;
                padding: 12px;
            }
        }
    }
}
</style>