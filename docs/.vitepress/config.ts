import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Luckywei Blog',
  base: '/vitepress-blog/',
  description: '前端学习博客',
  themeConfig: {
    // siteTitle: 'Luckywei Blog',
    logo: '',
    nav: [
      {
        text: '博客',
        link: '/blogs/js八股文'
      },
      {
        text: 'TS',
        link: '/blogs/typescript教程'
      },
      {
        text: '数据结构',
        link: '/blogs/数据结构/数组'
      }
    ],
    sidebar: {
      '/blogs/': [
        {
          text: 'JavaScript',
          collapsed: false,
          items: [
            {
              text: 'js八股文',
              link: '/blogs/js八股文'
            },
            {
              text: '手写专题',
              link: '/blogs/手写专题'
            }
          ]
        },
        {
          text: '数据结构 javaScript',
          collapsed: false,
          items: [
            {
              text: '数组',
              link: '/blogs/数据结构/数组'
            },
            {
              text: '栈',
              link: '/blogs/数据结构/栈'
            },
            {
              text: '队列',
              link: '/blogs/数据结构/队列'
            },
            {
              text: '链表',
              link: '/blogs/数据结构/链表'
            }
          ]
        },
        {
          text: '算法',
          collapsed: false,
          items: [
            {
              text: '简单算法',
              link: '/blogs/简单算法'
            }
          ]
        },
        {
          text: '面试',
          collapsed: false,
          items: [
            {
              text: 'css',
              link: '/blogs/面试/css'
            },
            {
              text: 'js',
              link: '/blogs/面试/js'
            }, {
              text: 'vue',
              link: '/blogs/面试/vue'
            }, {
              text: '性能优化',
              link: '/blogs/面试/性能优化'
            }, {
              text: '场景题',
              link: '/blogs/面试/场景题'
            }
          ]
        }
        // {
        //   text: '算法',
        //   collapsed: false,
        //   items: [
        //     {
        //       text: '简单算法',
        //       link: '/blogs/简单算法'
        //     }
        //   ]
        // }
        // {
        //   text: 'React',
        //   items: []
        // },
        // {
        //   text: 'Node',
        //   items: []
        // }
      ]
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Lucky wei'
    }
  }
})
