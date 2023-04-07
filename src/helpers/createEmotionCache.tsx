import createCache from '@emotion/cache'
const isBrowser = typeof document !== 'undefined'

export default function createEmotionCache(){
    let insertionPoint;

    if(isBrowser) {
        const emotionInsertPoint = document.querySelector<HTMLMetaElement>('meta[name="emotion-insertion-point"]',)
        insertionPoint = emotionInsertPoint ?? undefined
    }

    return createCache({ key: 'mui-style', insertionPoint })
}