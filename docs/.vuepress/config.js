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
                text: '前端基础',
                children: [
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
                children: [
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
                text: 'Home',
                link: '/',
            },
            {
                text: 'About',
                link: '/guide/about.md'
            },

        ],
        // 侧边栏数组
        // 所有页面会使用相同的侧边栏
        sidebar: {
            '/css/': [
                {
                    text: 'Part I',
                    collapsible: true,
                    children: ['/css/PartI/01-前端简介.md', '/css/PartI/02-前端开发准备.md']
                },
                {
                    text: 'Part II',
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
                    collapsible: true,
                    children: [
                        '/css/PartV/22-grid布局.md',
                    ]
                }
            ],
            '/javascript/': [
                {
                    text: 'Advanced Concepts',
                    collapsible: true,
                    children: ['/javascript/the_advanced_concepts.md',]
                }
            ],
            '/vue/': [
                {
                    text: 'Vue',
                    collapsible: true,
                    children: [
                        '/vue/junior/vue2.md',
                        '/vue/junior/vue3.md'
                    ]
                }
            ],
            '/typescript/': [
                {
                    text: '建立一个Web框架',
                    collapsible: true,
                    children: [
                        '/typescript/建立一个web框架.md'
                    ]
                }
            ],
            '/react/': [
                {
                    text: 'React',
                    collapsible: true,
                    children: [
                        '/react/Complete React Developer.md',
                    ]
                }
            ],
        },
        backToHome: '返回首页'
    }),
}