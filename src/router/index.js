import { createRouter, createWebHistory } from 'vue-router';
import Training from '../views/TrainingPage.vue';
import Predict from '../views/PredictPage.vue';
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
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
