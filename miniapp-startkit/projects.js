export default [
    /**
     * 主包内容↓↓↓
     */
    {
        projectName: 'tabbar',
        desc: '主包Tab页面',
        onwer: [
            'mykurisu'
        ],
        isMainPackage: true,
        path: 'app/main/tabbar',
        git: 'git@...'
    },
    {
        projectName: 'components',
        desc: '主包组件库',
        onwer: [
            'mykurisu'
        ],
        isMainPackage: true,
        path: 'app/main/components',
        git: 'git@...'
    },
    /**
     * 主包内容↑↑↑
     */

    /**
     * 分包内容↓↓↓
     */
    {
        projectName: 'projectA',
        desc: 'projectA业务',
        onwer: [
            'mykurisu'
        ],
        isMainPackage: false,
        path: 'app/pages/projectA',
        git: 'git@...'
    }
]