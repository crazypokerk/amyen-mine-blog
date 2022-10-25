module.exports = {
    plugins: [
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    // 不要忘了安装 moment
                    const moment = require('moment')
                    moment.locale(lang)
                    return moment(timestamp).fromNow()
                }
            }
        ],
        [
            'vuepress-plugin-code-copy', {
                color: '#ffffff',
                successText: '复制成功',
                backgroundColor: '#000000',
            }
        ]
    ],
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    head: [
        [
            'link', { rel: 'icon', href: '/amyen_icon.png' }
        ]
    ],
    theme: 'reco',
    title: 'Young coconut',
    description: 'Favor object composition over class inheritance.',
    themeConfig: {
        /* reco配置 */
        noFoundPageByTencent: false,
        // 项目开始时间，只填写年份
        startYear: '2021',

        lastUpdated: '上次更新',
        logo: '/Coconut_logo.svg',
        // 默认主题配置
        home: '/',
        nav: [
            { text: '首页', link: '/' },
            {
                text: '前端基础',
                items: [
                    {
                        text: 'CSS',
                        link: '/css/01-前端简介'
                    },
                    {
                        text: 'JavaScript',
                        link: '/javascript/the_advanced_concepts'
                    },
                    {
                        text: 'TypeScript',
                        link: '/typescript/建立一个web框架'
                    }
                ]
            },
            {
                text: '框架学习',
                items: [
                    {
                        text: 'Vue',
                        link: '/vue/junior/vue2'
                    },
                    {
                        text: 'React',
                        link: '/react/Complete React Developer'
                    }
                ]
            },
            {
                text: '日常学习',
                items: [
                    {
                        text: '踩坑学习',
                        link: '/DailyForLearn/getElementAPI'
                    }
                ]
            },
            { text: 'Github', link: 'https://github.com/crazypokerk' }
        ],
        subSidebar: 'auto',
        // 侧边栏数组
        // 所有页面会使用相同的侧边栏
        sidebar: {
            '/css/': [{
                title: '基础知识',
                children: [
                    { title: '前端简介', path: '/css/01-前端简介' },
                    { title: '前端开发准备', path: '/css/02-前端开发准备' },
                    { title: '字符实体与语义标签', path: '/css/03-字符实体与语义标签' },
                    { title: 'CSS语法与选择器', path: '/css/04-CSS语法与选择器' },
                    { title: '样式继承与其他概念', path: '/css/05-样式继承与其他概念' },
                    { title: '盒模型', path: '/css/06-盒模型' },
                    { title: '盒模型补充及田径场实战', path: '/css/07-盒模型补充及田径场实战' },
                    { title: '浮动', path: '/css/08-浮动' },
                    { title: '高度塌陷与BFC', path: '/css/09-高度塌陷与BFC' },
                    { title: '定位', path: '/css/10-定位' },
                    { title: '字体', path: '/css/11-字体' },
                    { title: '背景', path: '/css/12-背景' },
                    { title: '雪碧图与渐变', path: '/css/13-雪碧图与渐变' },
                    { title: '表格', path: '/css/14-表格' },
                    { title: '过渡与动画', path: '/css/15-过渡与动画' },
                    { title: '变形：平移、旋转与缩放', path: '/css/16-变形：平移、旋转与缩放' },
                    { title: 'less简介', path: '/css/17-less简介' },
                    { title: '弹性盒简介', path: '/css/18-弹性盒简介' },
                    { title: '像素与视口', path: '/css/19-像素与视口' },
                    { title: '媒体查询', path: '/css/20-媒体查询' },
                    { title: 'grid布局', path: '/css/21-grid布局' },
                ]
            }],
            '/javascript/': [
                {
                    title: 'Advanced Concepts',
                    children: [
                        { title: '高级概念', path: '/javascript/the_advanced_concepts' }
                    ]
                }
            ],
            '/vue/': [
                {
                    title: 'Vue',
                    collapsible: true,
                    children: [
                        { title: 'vue2', path: '/vue/junior/vue2' },
                        { title: 'vue3', path: '/vue/junior/vue3' }
                    ]
                }
            ],
            '/typescript/': [
                {
                    text: '建立一个Web框架',
                    collapsible: true,
                    children: [
                        { title: '搭建一个web框架', path: '/typescript/建立一个web框架' }
                    ]
                }
            ],
            '/react/': [
                {
                    text: 'React',
                    collapsible: true,
                    children: [
                        { title: 'React入门', path: '/react/Complete React Developer' }
                    ]
                }
            ],
            '/DailyForLearn/': [
                {
                    text: '踩坑学习',
                    collapsible: true,
                    children: [
                        { title: 'getElement*系统', path: '/DailyForLearn/getElementAPI' }
                    ]
                }
            ]
        }
    }
}

