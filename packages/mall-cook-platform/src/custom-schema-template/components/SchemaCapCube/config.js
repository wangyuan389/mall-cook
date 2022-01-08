/*
 * @Description: 魔方静态配置数据
 * @Autor: WangYuan
 * @Date: 2021-06-03 15:44:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 16:48:20
 */

export let initialModels = {
    capcub1: [
        { top: 0, left: 0, bottom: 3, right: 3, height: 3, width: 3 },
        { top: 0, left: 3, bottom: 3, right: 6, height: 3, width: 3 }
    ],
    capcub2: [
        { top: 0, left: 0, bottom: 2, right: 2, height: 2, width: 2 },
        { top: 0, left: 2, bottom: 2, right: 4, height: 2, width: 2 },
        { top: 0, left: 4, bottom: 2, right: 6, height: 2, width: 2 }
    ],
    capcub3: [
        { top: 0, left: 0, bottom: 3, right: 3, height: 3, width: 3 },
        { top: 0, left: 3, bottom: 3, right: 6, height: 3, width: 3 },
        { top: 3, left: 0, bottom: 6, right: 3, height: 3, width: 3 },
        { top: 3, left: 3, bottom: 6, right: 6, height: 3, width: 3 }
    ],
    capcub4: [
        { top: 0, left: 0, bottom: 6, right: 3, height: 6, width: 3 },
        { top: 0, left: 3, bottom: 3, right: 6, height: 3, width: 3 },
        { top: 3, left: 3, bottom: 6, right: 6, height: 3, width: 3 }
    ],
    capcub5: [
        { top: 0, left: 0, bottom: 3, right: 6, height: 3, width: 6 },
        { top: 3, left: 0, bottom: 5, right: 3, height: 2, width: 3 },
        { top: 3, left: 3, bottom: 5, right: 6, height: 2, width: 3 }
    ],
    capcub6: [
        { top: 0, left: 0, bottom: 5, right: 2, height: 5, width: 2 },
        { top: 0, left: 2, bottom: 2, right: 6, height: 2, width: 4 },
        { top: 2, left: 2, bottom: 5, right: 4, height: 3, width: 2 },
        { top: 2, left: 4, bottom: 5, right: 6, height: 3, width: 2 }
    ]
}

export let modelOptions = [
    {
        label: "一行两个",
        value: "capcub1",
        icon: "deco-icon-cuberow",
        row: 3,
    },
    {
        label: "一行三个",
        value: "capcub2",
        icon: "deco-icon-cuberow2",
        row: 2,
    },
    {
        label: "两左两右",
        value: "capcub3",
        icon: "deco-icon-cube",
        row: 6,
    },
    {
        label: "一左两右",
        value: "capcub4",
        icon: "deco-icon-cubeto",
        row: 6,
    },
    {
        label: "一上两下",
        value: "capcub5",
        icon: "deco-icon-cube-upto",
        row: 5,
    },
    {
        label: "一左右三",
        value: "capcub6",
        icon: "deco-icon-cubeto1",
        row: 5,
    },
    {
        label: "自定义",
        value: "custom",
        icon: "deco-icon-cube-custom",
        row: 5,
    },
]