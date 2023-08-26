import Quill from 'quill'
import MagicUrl from 'quill-magic-url'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            useQuill: () => {
                Quill.register('modules/magicUrl', MagicUrl)

                return Quill
            }
        }
    }
})