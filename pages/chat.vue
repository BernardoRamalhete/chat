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
                    <button 
                        class="new" 
                        :class="{ active: activeChat }"
                    >
                        <span class="icon">
                            <Icon name="quill:add" aria-hidden/>
                        </span>
                        <span class="text">New chat</span>
                    </button>
                    <div 
                        class="search" 
                        :class="{ active: activeChat }"
                    >
                        <label for="chat-search" class="visually-hidden">
                            Search
                        </label>
                        <input 
                            id="chat-search" 
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
                        <li v-for="chat in chats">
                            <button>
                                <figure :class="getRandomColor()">
                                    <img :src="chat.image" alt=""/>
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
            <main class="chat-main-content">
                <header class="chat-main-content-header">
                    <figure>
                        <img src="https://picsum.photos/seed/batata/200" alt=""/>
                    </figure>
                    <div class="chat-main-content-header-text">
                        <span>
                            <h2>Lora Carlson</h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore, ut?</p>
                        </span>
                        <button>
                            <Icon name="quill:meatballs-h"/>
                            <span class="visually-hidden">Chat actions</span>
                        </button>
                    </div>
                </header>
                <section class="chat-main-content-messages">
                    <ul>
                        <li 
                            v-for="(message, index) in messages" 
                            :key="message.id"
                            :class="{ 
                                inverted: message.author.name === 'Chris Larson',
                                'same-author': messages[index + 1] != undefined && messages[index + 1].author.name === message.author.name
                            }"
                        >
                            <figure>
                                <img :src="message.author.avatar_url" alt=""/>
                            </figure>
                            <span v-html="message.content"/>
                        </li>
                    </ul>
                </section>
                <form @submit.prevent class="chat-main-content-form">
                    <ChatMessageInputs/>
                </form>
            </main>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
})

const { user } = useFirebaseAuth()
const userCookie = useCookie('user')

const userData = computed(() => {
    return user.value || userCookie.value
})

const chats = reactive([
    {
        id: 13,
        name: 'Chris Larson',
        status: 'leader electric any corner safety grandmother number various rope black effort mathematics secret type aware night guide rapidly chamber hidden joy wherever fireplace central',
        image: `https://picsum.photos/seed/chose/200`
    },
    {
 
        id: 55,
        name: 'Mathilda Vargas',
        status: 'rocket finger information perfect since breakfast upper surface mad all farther sleep church able moving term also cannot religious star handle different breathing morning',
        image: `https://picsum.photos/seed/place/200`
    },
    {
 
        id: 24,
        name: 'Maurice Gutierrez',
        status: 'kids fog upper vast pipe both son special common pass volume melted anyone fair today know facing stairs north negative successful dirty cost firm',
        image: `https://picsum.photos/seed/lady/200`
    },
    {
        id: 33,
        name: 'Bernice Bell',
        status: 'snow except composition village cut possible sight piece mathematics chose as jack parallel you neighborhood unknown value captured hall plenty season driving heading found',
        image: `https://picsum.photos/seed/folks/200`
    },
    {
        id: 80,
        name: 'Dominic Montgomery',
        status: 'jack modern game ability corn to name mice flies adventure care consider ago stronger mail balloon fewer built faster roll yet percent single then',
        image: `https://picsum.photos/seed/first/200`
    },
    {
        id: 57,
        name: 'Alex Lyons',
        status: 'of mind slide sound anyone fewer attached lost stretch suggest alphabet silly fly central everywhere twenty month property jack below view family title chapter',
        image: `https://picsum.photos/seed/out/200`
    },
    {
        id: 62,
        name: 'Ella Hanson',
        status: 'gray war conversation compound where breathing musical border harbor future group help west body pound driver soft crew nearer give satisfied quite new alone',
        image: `https://picsum.photos/seed/truck/200`
    },
    {
        id: 49,
        name: 'Birdie Lloyd',
        status: 'am average main helpful everywhere radio shut globe box stay without means wall buy mud army girl exist may instrument began swimming tomorrow pen',
        image: `https://picsum.photos/seed/card/200`
    },
    {
        id: 22,
        name: 'Bryan Snyder',
        status: 'shirt quite else column lower four in burst hung rocky task saved needle bicycle rubber mass pupil elephant possibly grade arrive information ought barn',
        image: `https://picsum.photos/seed/engine/200`
    },
    {
        id: 42,
        name: 'Edna Saunders',
        status: 'slow taste express terrible bill verb stand better split stomach stay concerned fuel jar simple positive strip mother also pie recent shorter younger vegetable',
        image: `https://picsum.photos/seed/magnet/200`
    },
    {
        id: 64,
        name: 'Jesus Mullins',
        status: 'wire felt course hundred sum brief underline village recognize shorter became member race too window clay shape opinion mouse directly useful ring environment settlers',
        image: `https://picsum.photos/seed/care/200`
    },
    {
        id: 52,
        name: 'Irene Powers',
        status: 'fierce studying duty naturally roll political temperature visitor later open among weather labor swing probably pleasure will next tea remember count current particles follow',
        image: `https://picsum.photos/seed/anywhere/200`
    },
    {
        id: 97,
        name: 'Jerome Morgan',
        status: 'eye influence powder neighbor play some wide money explain troops wool fresh get local studied sometime worse hair correct hide edge floor mirror trade',
        image: `https://picsum.photos/seed/compare/200`
    }
])

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

const messages = reactive([
    {
        id: 40,
        author: {
            avatar_url: 'https://picsum.photos/seed/general/200',
            name: 'Chris Larson'
        },
        content: 'powder better is bad plural examine itself alive which minute bring shine continent spread escape law out beyond closely wait proper do came sides'
    },
    {
        id: 87,
        author: {
            avatar_url: 'https://picsum.photos/seed/gas/200',
            name: 'Chris Larson'
        },
        content: 'local up nor chose structure dust crew gift properly donkey village at canal bowl name observe adventure stronger dream ancient problem several fish saw'
    },
    {
        id: 68,
        author: {
            avatar_url: 'https://picsum.photos/seed/occur/200',
            name: 'Chris Larson'
        },
        content: 'load sell maybe gradually fresh pictured pretty now equally missing feet her respect football gain here dirt bad faster troops period course contain sitting'
    },
    {
        id: 63,
        author: {
            avatar_url: 'https://picsum.photos/seed/exercise/200',
            name: 'Clifford Gilbert'
        },
        content: 'out substance agree actual known balance thus school slow upward orange fun no safe community heat softly mud bush owner pet pool consist duck'
    },
    {
        id: 34,
        author: {
            avatar_url: 'https://picsum.photos/seed/smallest/200',
            name: 'Sarah Dean'
        },
        content: 'waste prize be journey weigh cage learn pole brush congress quarter habit for clearly sure century drew music travel noon recent activity sharp consist'
    },
    {
        id: 81,
        author: {
            avatar_url: 'https://picsum.photos/seed/only/200',
            name: 'Annie Gill'
        },
        content: 'wear mine family bare use promised something brought case sang save hill railroad gentle large generally minute recall meant if journey subject officer free'
    },
    {
        id: 17,
        author: {
            avatar_url: 'https://picsum.photos/seed/wagon/200',
            name: 'Mamie Ballard'
        },
        content: 'orange grass join back outside sight known different win instrument provide atom meal pool rose range powerful donkey continent metal east mountain correctly meant'
    },
    {
        id: 92,
        author: {
            avatar_url: 'https://picsum.photos/seed/small/200',
            name: 'Myrtie Alvarado'
        },
        content: 'frozen jump mark modern thou speech strong decide contain asleep famous plant maybe curve further country steep worse stay least son bit library available'
    },
    {
        id: 25,
        author: {
            avatar_url: 'https://picsum.photos/seed/father/200',
            name: 'Edgar Bryan'
        },
        content: 'probably tiny opposite act mass everyone provide hungry spent thing pipe closer square egg given shells anything evening nearby run airplane record orbit society'
    },
    {
        id: 52,
        author: {
            avatar_url: 'https://picsum.photos/seed/saw/200',
            name: 'Isabella Lopez'
        },
        content: 'caught enemy sink cake truck vertical review golden other compound familiar ring rate letter slave spring cage supper hello fear volume heading create wind'
    },
    {
        id: 52,
        author: {
            avatar_url: 'https://picsum.photos/seed/capital/200',
            name: 'Johnny Banks'
        },
        content: 'knew race process balloon tower tune believed amount how wife everybody human alone fast dark write scene sun sent cattle born grass shadow land'
    },
    {
        id: 20,
        author: {
            avatar_url: 'https://picsum.photos/seed/needs/200',
            name: 'Ola Lee'
        },
        content: 'farther fewer teach smallest steam train twice fun thing egg collect has pocket improve pair basis box chamber rock zero cross threw trouble lonely'
    },
    {
        id: 584,
        author: {
            avatar_url: 'https://picsum.photos/seed/father/200',
            name: 'Edgar Bryan'
        },
        content: 'probably tiny opposite act mass everyone provide hungry spent thing pipe closer square egg given shells anything evening nearby run airplane record orbit society'
    },
    {
        id: 952,
        author: {
            avatar_url: 'https://picsum.photos/seed/saw/200',
            name: 'Isabella Lopez'
        },
        content: 'caught enemy sink cake truck vertical review golden other compound familiar ring rate letter slave spring cage supper hello fear volume heading create wind'
    },
    {
        id: 512,
        author: {
            avatar_url: 'https://picsum.photos/seed/capital/200',
            name: 'Johnny Banks'
        },
        content: 'knew race process balloon tower tune believed amount how wife everybody human alone fast dark write scene sun sent cattle born grass shadow land'
    },
    {
        id: 217,
        author: {
            avatar_url: 'https://picsum.photos/seed/needs/200',
            name: 'Ola Lee'
        },
        content: 'farther fewer teach smallest steam train twice fun thing egg collect has pocket improve pair basis box chamber rock zero cross threw trouble lonely'
    },
])
</script>

<style lang="scss" scoped>
.chat {
    display: flex;
    padding: 60px; 
    max-height: 100%;
    &-main {
        display: flex;
        max-height: 100%;
        box-shadow: -4px 4px 8px 6px rgba($lighter_blue, 0.1);
        padding: 24px;
        border-radius: 64px;
        width: 100%;
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
            .new {
                border-radius: 50px;
                font-size: 24px;
                gap: 20px;
                color: $light_background;
                white-space: nowrap;
                transition: all 0.5s ease;
                padding-block: 8px;
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
                        outline: none;
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
                    border: 4px solid $primary_orange;
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
                ul {
                    margin-block: 52px;
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