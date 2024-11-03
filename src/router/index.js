import { createRouter, createWebHistory } from 'vue-router';
import Training from '../views/TrainingPage.vue';
import Predict from '../views/PredictPage.vue';
import Otsu from '../views/OtsuPage.vue';
import Home from '../views/HomePage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/training',
        name: 'Training',
        component: Training
    },
    {
        path: '/predict',
        name: 'Predict',
        component: Predict
    },
    {
        path: '/otsu',
        name: 'Otsu',
        component: Otsu
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
