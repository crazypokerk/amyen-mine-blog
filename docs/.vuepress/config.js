const { defaultTheme } = require('@vuepress/theme-default')

module.exports = {
    head: [
        [
            'link', { rel: 'icon', href: '/amyen_icon.png' }
        ]
    ],
    title: 'Young coconut',
    description: 'Favor object composition over class inheritance.',
    theme: defaultTheme({
        logo: '/Coconut_logo.svg',
        // 默认主题配置
        home: '/',
        navbar: [
            {
                text: 'home',
                link: '/',
            },
            {
                text: 'about',
                link: '/guide/first1.md'
            },
            {
                text: '学习笔记',
                children: [
                    {
                        text: 'CSS',
                        link: '/css/'
                    },
                    {
                        text: 'JavaScript',
                        link: '/javascript/'
                    }
                ]
            }
        ],
        // 侧边栏数组
        // 所有页面会使用相同的侧边栏
        sidebar: {
            '/css/': [
                {
                    text: 'Part I',
                    link: '/css/',
                    collapsible: true,
                    children: ['/css/PartI/01-前端简介.md', '/css/PartI/02-前端开发准备.md']
                },
                {
                    text: 'Part II',
                    link: '/css/',
                    collapsible: true,
                    children: [
                        '/css/PartII/03-字符实体与语义标签.md',
                        '/css/PartII/04-CSS语法与选择器.md',
                        '/css/PartII/05-样式继承与其他概念.md',
                        '/css/PartII/06-盒模型.md',
                        '/css/PartII/07-实战练习.md',
                        '/css/PartII/08-盒模型补充及田径场实战.md',
                    ]
                },
                {
                    text: 'Part III',
                    link: '/css/',
                    collapsible: true,
                    children: [
                        '/css/PartIII/09-浮动.md',
                        '/css/PartIII/10-高度塌陷与BFC.md',
                        '/css/PartIII/11-定位.md',
                        '/css/PartIII/12-字体.md',
                        '/css/PartIII/13-背景.md',
                        '/css/PartIII/14-雪碧图与渐变.md',
                        '/css/PartIII/15-表格.md',
                        '/css/PartIII/16-过渡与动画.md',
                        '/css/PartIII/17-变形：平移、旋转与缩放.md',
                    ]
                },
                {
                    text: 'Part IV',
                    link: '/css/',
                    collapsible: true,
                    children: [
                        '/css/PartIV/18-less简介.md',
                        '/css/PartIV/19-弹性盒简介.md',
                        '/css/PartIV/20-像素与视口.md',
                        '/css/PartIV/21-媒体查询.md',
                    ]
                },
                {
                    text: 'Part V',
                    link: '/css/',
                    collapsible: true,
                    children: [
                        '/css/PartV/22-grid布局.md',
                        '/css/PartV/23-网页设计思维.md'
                    ]
                }
            ],
            '/javascript/': [
                {
                    text: 'Advanced Concepts',
                    collapsible: true,
                    children: ['/javascript/the_advanced_concepts.md',]
                }
            ]
        },
        backToHome: '返回首页'
    }),
}