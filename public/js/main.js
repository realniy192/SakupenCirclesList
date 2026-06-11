import routes from './routes.js';

export const store = Vue.reactive({
    dark: JSON.parse(localStorage.getItem('dark')) || false,
    listType: localStorage.getItem('listType') || 'SKCDL',

    toggleDark() {
        this.dark = !this.dark;
        localStorage.setItem('dark', JSON.stringify(this.dark));
    },

    setListType(type) {
        this.listType = type;
        localStorage.setItem('listType', type);
        this.updateTheme(type);
    },

    updateTheme(type) {
        const root = document.documentElement;
        const logo = document.querySelector('header .logo h2');

        if (type === 'SKCCL') {
            root.style.setProperty('--color-primary', '#feb33b');
            root.style.setProperty('--color-primary-level', '#ffd498');
            
            if (logo) {
                logo.innerText = logo.innerText.replace('SKCDL', 'SKCCL');
                if (logo.innerText === 'Sakupen Circles List') logo.innerText = 'Sakupen Circles List'; 
                if (!logo.innerText.includes('SKCCL')) logo.innerText = 'SKCCL';
            }
        } else {
            root.style.removeProperty('--color-primary');
            root.style.removeProperty('--color-primary-level');

            if (logo) {
                logo.innerText = logo.innerText.replace('SKCCL', 'SKCDL');
                if (logo.innerText === 'Sakupen Circles List') logo.innerText = 'Sakupen Circles List';
                if (!logo.innerText.includes('SKCDL')) logo.innerText = 'SKCDL';
            }
        }
    }
});

store.updateTheme(store.listType);

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    let title = "SKCDL | Sakupen Circles List";

    const listPrefix = store.listType === 'SKCCL' ? 'SKCCL' : 'SKCDL';
    const listName = store.listType === 'SKCCL' ? 'Sakupen Circles List' : 'Sakupen Circles List';

    if (to.path === '/' || to.params._id) title = `${listPrefix} | ${listName}`;
    else if (to.path === '/leaderboard') title = "Leaderboard | " + listPrefix;
    else if (to.path === '/roulette') title = "Roulette | " + listPrefix;
    else if (to.path === '/admin') title = "Admin Panel | " + listPrefix;
    else if (to.path === '/manage') title = "Management Panel | " + listPrefix;
    else if (to.path === '/packs') title = "Packs | " + listPrefix;

    document.title = title;
    next();
});

const app = Vue.createApp({
    data: () => ({ store }),
    methods: {
        switchList(type) {
            this.store.setListType(type);
        }
    }
});

app.use(router);
app.mount('#app');
