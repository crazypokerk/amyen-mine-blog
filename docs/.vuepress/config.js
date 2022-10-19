const moment = require('moment')

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
        // 备案
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
                        link: '/css/'
                    },
                    {
                        text: 'JavaScript',
                        link: '/javascript/'
                    },
                    {
                        text: 'TypeScript',
                        link: '/typescript/'
                    }
                ]
            },
            {
                text: '框架学习',
                items: [
                    {
                        text: 'Vue',
                        link: '/vue/'
                    },
                    {
                        text: 'React',
                        link: '/react/'
                    }
                ]
            },
            {
                text: '日常学习',
                items: [
                    {
                        text: '踩坑学习',
                        link: '/DailyForLearn/'
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
                title: 'Part I',
                children: [
                    { title: '前端简介', path: '/css/PartI/01-前端简介' },
                    { title: '前端开发准备', path: '/css/PartI/02-前端开发准备' }
                ]
            },
            {
                title: 'Part II',
                children: [
                    { title: '字符实体与语义标签', path: '/css/PartII/03-字符实体与语义标签' },
                    { title: 'CSS语法与选择器', path: '/css/PartII/04-CSS语法与选择器' },
                    { title: '样式继承与其他概念', path: '/css/PartII/05-样式继承与其他概念' },
                    { title: '盒模型', path: '/css/PartII/06-盒模型' },
                    { title: '实战练习', path: '/css/PartII/07-实战练习' },
                    { title: '盒模型补充及田径场实战', path: '/css/PartII/08-盒模型补充及田径场实战' },
                ]
            },
            {
                title: 'Part III',
                children: [
                    { title: '浮动', path: '/css/PartIII/09-浮动' },
                    { title: '高度塌陷与BFC', path: '/css/PartIII/10-高度塌陷与BFC' },
                    { title: '定位', path: '/css/PartIII/11-定位' },
                    { title: '字体', path: '/css/PartIII/12-字体' },
                    { title: '背景', path: '/css/PartIII/13-背景' },
                    { title: '雪碧图与渐变', path: '/css/PartIII/14-雪碧图与渐变' },
                    { title: '表格', path: '/css/PartIII/15-表格' },
                    { title: '过渡与动画', path: '/css/PartIII/16-过渡与动画' },
                    { title: '变形：平移、旋转与缩放', path: '/css/PartIII/17-变形：平移、旋转与缩放' },
                ]
            },
            {
                title: 'Part IV',
                children: [
                    { title: 'less简介', path: '/css/PartIV/18-less简介' },
                    { title: '弹性盒简介', path: '/css/PartIV/19-弹性盒简介' },
                    { title: '像素与视口', path: '/css/PartIV/20-像素与视口' },
                    { title: '媒体查询', path: '/css/PartIV/21-媒体查询' },
                ]
            },
            {
                title: 'Part V',
                children: [
                    { title: 'grid布局', path: '/css/PartV/22-grid布局' },
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
        },
        backToHome: '返回首页'
    }
}