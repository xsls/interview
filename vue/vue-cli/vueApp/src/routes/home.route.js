import IndexHomeViews from '../views/home/index.vue';
import VuxIndexViews from '../views/home/vuxIndex.vue';
export default {
    '/indexHomeViews': {
        name: 'indexHomeViews',
        component: IndexHomeViews
    },
    '/vuxIndexViews': {
        name: 'vuxIndexViews',
        component: VuxIndexViews
    }
};
