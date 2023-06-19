import {createRouter, createWebHistory} from "vue-router"
import FaceDetect from "../src/components/FacedetectComponent.vue"
import HomePage from "../src/components/HomeComponet.vue"
import Labeling from "../src/components/LabelingComponent.vue"
import ReadImage from "../src/components/ReadimageComponent.vue"
import SpeechtoText from "../src/components/SpeechtotextComponent.vue"
import Trasnlate from "../src/components/TranslateComponent.vue"
const routes = [
    {
        name: 'home',
        path:"/",
        component: HomePage
    },
    {
        name: 'labeling',
        path:"/labeling",
        component: Labeling
    },
    {
        name: 'speechtotext',
        path:"/speechtotext",
        component: SpeechtoText
    },
    {
        name: 'readimage',
        path:"/readimage",
        component: ReadImage
    },
    {
        name: 'facedetect',
        path:"/facedetect",
        component: FaceDetect
    },
    {
        name: 'translate',
        path:"/translate",
        component: Trasnlate
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;