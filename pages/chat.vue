<template>
    <div class="chat">
        <aside class="chat-menu">
            <button class="new">
                <span class="icon">
                    <Icon name="quill:add" aria-hidden/>
                </span>
                <span>New chat</span>
            </button>
            <div class="search">
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
            <nav class="items">
                <ul>
                    <li v-for="chat in chats">
                        <button>
                            <figure :class="getRandomColor()">
                                <img :src="chat.image" alt=""/>
                            </figure>
                            <p>
                                <span>{{ chat.name }}</span>
                                <span>{{ chat.status }}</span>
                            </p>
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
        <main class="chat-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores temporibus sunt quas corrupti explicabo consectetur voluptas vitae est. Est libero illo voluptas maxime? Cumque incidunt quod facilis corporis vel quasi quas aliquam hic cupiditate nesciunt, excepturi, earum eum. Cum maxime quisquam eum possimus consequatur eaque suscipit. Sunt sit veniam odit vero laboriosam, quaerat nisi maiores obcaecati assumenda, odio ut amet commodi alias voluptates possimus maxime suscipit aut magni temporibus? Laboriosam, iure nulla eum rem saepe amet corrupti sapiente vitae laudantium harum ex reprehenderit optio vero magnam ipsum perspiciatis provident architecto esse sed tempore doloremque. Fuga incidunt dolorem obcaecati officia illum?
        </main>
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
        name: 'Rosetta Marshall',
        status: 'rocket finger information perfect since breakfast upper surface mad all farther sleep church able moving term also cannot religious star handle different breathing morning',
        image: `https://picsum.photos/seed/place/200`
    },
    {
 
        id: 24,
        name: 'Eric Harrington',
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
</script>

<style lang="scss" scoped>
.chat {
    display: flex;
    padding: 60px; 
    max-height: 100%;
    &-menu {
        display: flex;
        flex-direction: column;
        background-color: $light_background;
        box-shadow: -4px 4px 8px 6px rgba($dark_background, 0.1);
        padding: 20px;
        border-radius: 40px;
        button {
            padding: 0;
            background-color: transparent;
            border: none;
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        .new {
            border-radius: 50px;
            padding: 8px 12px;
            font-size: 24px;
            gap: 20px;
            .icon {
                display: grid;
                place-items: center;
                font-size: 48px;
                border-radius: 50%;
                color: $primary_blue;
                background-color: lighten($lighter_blue, 20%);
                width: 60px;
                aspect-ratio: 1;
                svg {
                    position: absolute;
                }
            }
        }

        .search {
            display: flex;
            align-items: center;
            position: relative;
            margin-block: 24px 20px;
            input {
                padding: 8px 40px 8px 16px;
                background-color: $light_background;
                border: 2px solid darken($light_background, 10%);
                border-radius: 50px;
                width: 100%;
                transition: border-color 0.4s ease;
                &:focus, &:hover {
                    border: 2px solid darken($light_background, 20%);
                    outline: none;
                }
                &::placeholder {
                    color: darken($light_background, 15%);
                }
            }
            span {
                position: absolute;
                right: 12px;
                font-size: 24px;
                color: darken($light_background, 35%);
                margin-bottom: 2px;
            }
        }
        .items {
            flex-grow: 1;
            overflow-y: auto;

            ul {
                li {
                    button {
                        figure {
                            flex-grow: 1;
                            flex-shrink: 0;
                            max-width: 120px;
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
                    }
                }
            }
        }
    }
    &-content {
        padding: 12px 40px;
    }
}
</style>