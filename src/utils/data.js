export default {
    getCity: function () {
        let data = [
            {
                id: 1, name: '北京', city: [
                    {
                        id: 1, name: '北京市'
                    }
                ]
            },
            {
                id: 2, name: '天津', city: [
                    {
                        id: 2, name: '天津市'
                    }
                ]
            },
            {
                id: 3, name: '河北', city: [
                    {
                        id: 3, name: '石家庄市'
                    },
                    {
                        id: 4, name: '唐山市'
                    },
                    {
                        id: 5, name: '秦皇岛市'
                    },
                    {
                        id: 6, name: '邯郸市'
                    },
                    {
                        id: 7, name: '邢台市'
                    },
                    {
                        id: 8, name: '保定市'
                    },
                    {
                        id: 9, name: '张家口市'
                    },
                    {
                        id: 10, name: '承德市'
                    },
                    {
                        id: 11, name: '沧州市'
                    },
                    {
                        id: 12, name: '廊坊市'
                    },
                    {
                        id: 13, name: '衡水市'
                    }
                ]
            },
            {
                id: 4, name: '山西', city: [
                    {
                        id: 14, name: '太原市'
                    },
                    {
                        id: 15, name: '大同市'
                    },
                    {
                        id: 16, name: '阳泉市'
                    },
                    {
                        id: 17, name: '长治市'
                    },
                    {
                        id: 18, name: '晋城市'
                    },
                    {
                        id: 19, name: '朔州市'
                    },
                    {
                        id: 20, name: '晋中市'
                    },
                    {
                        id: 21, name: '运城市'
                    },
                    {
                        id: 22, name: '忻州市'
                    },
                    {
                        id: 23, name: '临汾市'
                    },
                    {
                        id: 24, name: '吕梁市'
                    }
                ]
            },
            {
                id: 5, name: '内蒙古', city: [
                    {
                        id: 25, name: '呼和浩特市'
                    },
                    {
                        id: 26, name: '包头市'
                    },
                    {
                        id: 27, name: '乌海市'
                    },
                    {
                        id: 28, name: '赤峰市'
                    },
                    {
                        id: 29, name: '通辽市'
                    },
                    {
                        id: 30, name: '鄂尔多斯市'
                    },
                    {
                        id: 31, name: '呼伦贝尔市'
                    },
                    {
                        id: 32, name: '巴彦淖尔市'
                    },
                    {
                        id: 33, name: '乌兰察布市'
                    },
                    {
                        id: 34, name: '兴安盟'
                    },
                    {
                        id: 35, name: '锡林郭勒盟'
                    },
                    {
                        id: 36, name: '阿拉善盟'
                    }
                ]
            },
            {
                id: 6, name: '辽宁', city: [
                    {
                        id: 37, name: '沈阳市'
                    },
                    {
                        id: 38, name: '大连市'
                    },
                    {
                        id: 39, name: '鞍山市'
                    },
                    {
                        id: 40, name: '抚顺市'
                    },
                    {
                        id: 41, name: '本溪市'
                    },
                    {
                        id: 42, name: '丹东市'
                    },
                    {
                        id: 43, name: '锦州市'
                    },
                    {
                        id: 44, name: '营口市'
                    },
                    {
                        id: 45, name: '阜新市'
                    },
                    {
                        id: 46, name: '辽阳市'
                    },
                    {
                        id: 47, name: '盘锦市'
                    },
                    {
                        id: 48, name: '铁岭市'
                    },
                    {
                        id: 49, name: '朝阳市'
                    },
                    {
                        id: 50, name: '葫芦岛市'
                    }
                ]
            },
            {
                id: 7, name: '吉林', city: [
                    {
                        id: 51, name: '长春市'
                    },
                    {
                        id: 52, name: '吉林市'
                    },
                    {
                        id: 53, name: '四平市'
                    },
                    {
                        id: 54, name: '辽源市'
                    },
                    {
                        id: 55, name: '通化市'
                    },
                    {
                        id: 56, name: '白山市'
                    },
                    {
                        id: 57, name: '松原市'
                    },
                    {
                        id: 58, name: '白城市'
                    },
                    {
                        id: 59, name: '延边'
                    }
                ]
            },
            {
                id: 8, name: '黑龙江', city: [
                    {
                        id: 60, name: '哈尔滨市'
                    },
                    {
                        id: 61, name: '齐齐哈尔市'
                    },
                    {
                        id: 62, name: '鸡西市'
                    },
                    {
                        id: 63, name: '鹤岗市'
                    },
                    {
                        id: 64, name: '双鸭山市'
                    },
                    {
                        id: 65, name: '大庆市'
                    },
                    {
                        id: 66, name: '伊春市'
                    },
                    {
                        id: 67, name: '佳木斯市'
                    },
                    {
                        id: 68, name: '七台河市'
                    },
                    {
                        id: 69, name: '牡丹江市'
                    },
                    {
                        id: 70, name: '黑河市'
                    },
                    {
                        id: 71, name: '绥化市'
                    },
                    {
                        id: 72, name: '大兴安岭地区'
                    }
                ]
            },
            {
                id: 9, name: '上海', city: [
                    {
                        id: 73, name: '上海市'
                    }
                ]
            },
            {
                id: 10, name: '江苏', city: [
                    {
                        id: 74, name: '南京市'
                    },
                    {
                        id: 75, name: '无锡市'
                    },
                    {
                        id: 76, name: '徐州市'
                    },
                    {
                        id: 77, name: '常州市'
                    },
                    {
                        id: 78, name: '苏州市'
                    },
                    {
                        id: 79, name: '南通市'
                    },
                    {
                        id: 80, name: '连云港市'
                    },
                    {
                        id: 81, name: '淮安市'
                    },
                    {
                        id: 82, name: '盐城市'
                    },
                    {
                        id: 83, name: '扬州市'
                    },
                    {
                        id: 84, name: '镇江市'
                    },
                    {
                        id: 85, name: '泰州市'
                    },
                    {
                        id: 86, name: '宿迁市'
                    }
                ]
            },
            {
                id: 11, name: '浙江', city: [
                    {
                        id: 87, name: '杭州市',
                    },
                    {
                        id: 88, name: '宁波市'
                    },
                    {
                        id: 89, name: '温州市'
                    },
                    {
                        id: 90, name: '嘉兴市'
                    },
                    {
                        id: 91, name: '湖州市'
                    },
                    {
                        id: 92, name: '绍兴市'
                    },
                    {
                        id: 93, name: '金华市'
                    },
                    {
                        id: 94, name: '衢州市'
                    },
                    {
                        id: 95, name: '舟山市'
                    },
                    {
                        id: 96, name: '台州市'
                    },
                    {
                        id: 97, name: '丽水市'
                    }
                ]
            },
            {
                id: 12, name: '安徽', city: [
                    {
                        id: 98, name: '合肥市'
                    },
                    {
                        id: 99, name: '芜湖市'
                    },
                    {
                        id: 100, name: '蚌埠市'
                    },
                    {
                        id: 101, name: '淮南市'
                    },
                    {
                        id: 102, name: '马鞍山市'
                    },
                    {
                        id: 103, name: '淮北市'
                    }, {
                        id: 104, name: '铜陵市'
                    },
                    {
                        id: 105, name: '安庆市'
                    },
                    {
                        id: 106, name: '黄山市'
                    },
                    {
                        id: 107, name: '滁州市'
                    },
                    {
                        id: 108, name: '阜阳市'
                    },
                    {
                        id: 109, name: '宿州市'
                    },
                    {
                        id: 110, name: '巢湖市'
                    },
                    {
                        id: 111, name: '六安市'
                    },
                    {
                        id: 112, name: '亳州市'
                    },
                    {
                        id: 113, name: '池州市'
                    },
                    {
                        id: 114, name: '宣城市'
                    }
                ]
            },
            {
                id: 13, name: '福建', city:
                    [
                        {
                            id: 115, name: '福州市'
                        },
                        {
                            id: 116, name: '厦门市'
                        },
                        {
                            id: 117, name: '莆田市'
                        },
                        {
                            id: 118, name: '三明市'
                        },
                        {
                            id: 119, name: '泉州市'
                        },
                        {
                            id: 120, name: '漳州市'
                        },
                        {
                            id: 121, name: '南平市'
                        },
                        {
                            id: 122, name: '龙岩市'
                        },
                        {
                            id: 123, name: '宁德市'
                        }
                    ]
            },
            {
                id: 14, name:
                    '江西', city:
                    [
                        {
                            id: 124, name: '南昌市'
                        },
                        {
                            id: 125, name: '景德镇市'
                        },
                        {
                            id: 126, name: '萍乡市'
                        },
                        {
                            id: 127, name: '九江市'
                        },
                        {
                            id: 128, name: '新余市'
                        },
                        {
                            id: 129, name: '鹰潭市'
                        },
                        {
                            id: 130, name: '赣州市'
                        },
                        {
                            id: 131, name: '吉安市'
                        },
                        {
                            id: 132, name: '宜春市'
                        },
                        {
                            id: 133, name: '抚州市'
                        },
                        {
                            id: 134, name: '上饶市'
                        }
                    ]
            },
            {
                id: 15, name:
                    '山东', city:
                    [
                        {
                            id: 135, name: '济南市'
                        },
                        {
                            id: 136, name: '青岛市'
                        },
                        {
                            id: 137, name: '淄博市'
                        },
                        {
                            id: 138, name: '枣庄市'
                        },
                        {
                            id: 139, name: '东营市'
                        },
                        {
                            id: 140, name: '烟台市'
                        },
                        {
                            id: 141, name: '潍坊市'
                        },
                        {
                            id: 142, name: '济宁市'
                        },
                        {
                            id: 143, name: '泰安市'
                        },
                        {
                            id: 144, name: '威海市'
                        },
                        {
                            id: 145, name: '日照市'
                        },
                        {
                            id: 146, name: '莱芜市'
                        },
                        {
                            id: 147, name: '临沂市'
                        },
                        {
                            id: 148, name: '德州市'
                        },
                        {
                            id: 149, name: '聊城市'
                        },
                        {
                            id: 150, name: '滨州市'
                        },
                        {
                            id: 151, name: '荷泽市'
                        }
                    ]
            },
            {
                id: 16, name: '河南', city:
                    [
                        {
                            id: 152, name: '郑州市'
                        },
                        {
                            id: 153, name: '开封市'
                        },
                        {
                            id: 154, name: '洛阳市'
                        },
                        {
                            id: 155, name: '平顶山市'
                        },
                        {
                            id: 156, name: '安阳市'
                        },
                        {
                            id: 157, name: '鹤壁市'
                        },
                        {
                            id: 158, name: '新乡市'
                        },
                        {
                            id: 159, name: '焦作市'
                        },
                        {
                            id: 160, name: '濮阳市'
                        },
                        {
                            id: 161, name: '许昌市'
                        },
                        {
                            id: 162, name: '漯河市'
                        },
                        {
                            id: 163, name: '三门峡市'
                        },
                        {
                            id: 164, name: '南阳市'
                        },
                        {
                            id: 165, name: '商丘市'
                        },
                        {
                            id: 166, name: '信阳市'
                        },
                        {
                            id: 167, name: '周口市'
                        },
                        {
                            id: 168, name: '驻马店市'
                        }
                    ]
            },
            {
                id: 17, name: '湖北', city:
                    [
                        {
                            id: 169, name: '武汉市'
                        },
                        {
                            id: 170, name: '黄石市'
                        },
                        {
                            id: 171, name: '十堰市'
                        },
                        {
                            id: 172, name: '宜昌市'
                        },
                        {
                            id: 173, name: '襄樊市'
                        },
                        {
                            id: 174, name: '鄂州市'
                        },
                        {
                            id: 175, name: '荆门市'
                        },
                        {
                            id: 176, name: '孝感市'
                        },
                        {
                            id: 177, name: '荆州市'
                        },
                        {
                            id: 178, name: '黄冈市'
                        },
                        {
                            id: 179, name: '咸宁市'
                        },
                        {
                            id: 180, name: '随州市'
                        },
                        {
                            id: 181, name: '恩施'
                        },
                        {
                            id: 182, name: '神农架'
                        }
                    ]
            },
            {
                id: 18, name: '湖南', city:
                    [
                        {
                            id: 183, name: '长沙市'
                        },
                        {
                            id: 184, name: '株洲市'
                        },
                        {
                            id: 185, name: '湘潭市', district: [
                                {id: 1643, name: '雨湖区'},
                                {id: 1644, name: '岳塘区'},
                                {id: 1645, name: '湘潭县'},
                                {id: 1646, name: '湘乡市'},
                                {id: 1647, name: '韶山市'}
                            ]
                        },
                        {
                            id: 186, name: '衡阳市'
                        },
                        {
                            id: 187, name: '邵阳市'
                        },
                        {
                            id: 188, name: '岳阳市'
                        },
                        {
                            id: 189, name: '常德市'
                        },
                        {
                            id: 190, name: '张家界市'
                        },
                        {
                            id: 191, name: '益阳市'
                        },
                        {
                            id: 192, name: '郴州市'
                        },
                        {
                            id: 193, name: '永州市'
                        },
                        {
                            id: 194, name: '怀化市'
                        },
                        {
                            id: 195, name: '娄底市'
                        },
                        {
                            id: 196, name: '湘西'
                        }
                    ]
            },
            {
                id: 19, name: '广东', city:
                    [
                        {
                            id: 197, name: '广州市'
                        },
                        {
                            id: 198, name: '韶关市'
                        },
                        {
                            id: 199, name: '深圳市'
                        },
                        {
                            id: 200, name: '珠海市'
                        },
                        {
                            id: 201, name: '汕头市'
                        },
                        {
                            id: 202, name: '佛山市'
                        },
                        {
                            id: 203, name: '江门市'
                        },
                        {
                            id: 204, name: '湛江市'
                        },
                        {
                            id: 205, name: '茂名市'
                        },
                        {
                            id: 206, name: '肇庆市'
                        },
                        {
                            id: 207, name: '惠州市'
                        },
                        {
                            id: 208, name: '梅州市'
                        },
                        {
                            id: 209, name: '汕尾市'
                        },
                        {
                            id: 210, name: '河源市'
                        },
                        {
                            id: 211, name: '阳江市'
                        },
                        {
                            id: 212, name: '清远市'
                        },
                        {id: 213, name: '东莞市'},
                        {id: 214, name: '中山市'},
                        {
                            id: 215, name: '潮州市'
                        },
                        {
                            id: 216, name: '揭阳市'
                        },
                        {
                            id: 217, name: '云浮市'
                        }
                    ]
            },
            {
                id: 20, name:
                    '广西', city:
                    [
                        {
                            id: 218, name: '南宁市'
                        },
                        {
                            id: 219, name: '柳州市'
                        },
                        {
                            id: 220, name: '桂林市'
                        },
                        {
                            id: 221, name: '梧州市'
                        },
                        {
                            id: 222, name: '北海市'
                        },
                        {
                            id: 223, name: '防城港市'
                        },
                        {
                            id: 224, name: '钦州市'
                        },
                        {
                            id: 225, name: '贵港市'
                        },
                        {
                            id: 226, name: '玉林市'
                        },
                        {
                            id: 227, name: '百色市'
                        },
                        {
                            id: 228, name: '贺州市'
                        },
                        {
                            id: 229, name: '河池市'
                        },
                        {
                            id: 230, name: '来宾市'
                        },
                        {
                            id: 231, name: '崇左市'
                        }
                    ]
            },
            {
                id: 21, name: '海南', city:
                    [
                        {
                            id: 232, name: '海口市'
                        },
                        {
                            id: 233, name: '三亚市'
                        }
                    ]
            },
            {
                id: 22, name:
                    '重庆', city:
                    [
                        {
                            id: 234, name: '重庆市'
                        }
                    ]
            },
            {
                id: 23, name:
                    '四川', city:
                    [
                        {
                            id: 235, name: '成都市'
                        },
                        {
                            id: 236, name: '自贡市'
                        },
                        {
                            id: 237, name: '攀枝花市'
                        },
                        {
                            id: 238, name: '泸州市'
                        },
                        {
                            id: 239, name: '德阳市'
                        },
                        {
                            id: 240, name: '绵阳市'
                        },
                        {
                            id: 241, name: '广元市'
                        },
                        {
                            id: 242, name: '遂宁市'
                        },
                        {
                            id: 243, name: '内江市'
                        },
                        {
                            id: 244, name: '乐山市'
                        },
                        {
                            id: 245, name: '南充市'
                        },
                        {
                            id: 246, name: '眉山市'
                        },
                        {
                            id: 247, name: '宜宾市'
                        },
                        {
                            id: 248, name: '广安市'
                        },
                        {
                            id: 249, name: '达州市'
                        },
                        {
                            id: 250, name: '雅安市'
                        },
                        {
                            id: 251, name: '巴中市'
                        },
                        {
                            id: 252, name: '资阳市'
                        },
                        {
                            id: 253, name: '阿坝'
                        },
                        {
                            id: 254, name: '甘孜'
                        },
                        {
                            id: 255, name: '凉山'
                        }
                    ]
            },
            {
                id: 24, name:
                    '贵州', city:
                    [
                        {
                            id: 256, name: '贵阳市'
                        },
                        {
                            id: 257, name: '六盘水市'
                        },
                        {
                            id: 258, name: '遵义市'
                        },
                        {
                            id: 259, name: '安顺市'
                        },
                        {
                            id: 260, name: '铜仁地区'
                        },
                        {
                            id: 261, name: '黔西'
                        },
                        {
                            id: 262, name: '毕节地区'
                        },
                        {
                            id: 263, name: '黔东'
                        },
                        {
                            id: 264, name: '黔南'
                        }
                    ]
            },
            {
                id: 25, name:
                    '云南', city:
                    [
                        {
                            id: 265, name: '昆明市'
                        },
                        {
                            id: 266, name: '曲靖市'
                        },
                        {
                            id: 267, name: '玉溪市'
                        },
                        {
                            id: 268, name: '保山市'
                        },
                        {
                            id: 269, name: '昭通市'
                        },
                        {
                            id: 270, name: '丽江市'
                        },
                        {
                            id: 271, name: '思茅市'
                        },
                        {
                            id: 272, name: '临沧市'
                        },
                        {
                            id: 273, name: '楚雄'
                        },
                        {
                            id: 274, name: '红河'
                        },
                        {
                            id: 275, name: '文山'
                        },
                        {
                            id: 276, name: '西双版纳'
                        },
                        {
                            id: 277, name: '大理'
                        },
                        {
                            id: 278, name: '德宏'
                        },
                        {
                            id: 279, name: '怒江'
                        },
                        {
                            id: 280, name: '迪庆'
                        }
                    ]
            },
            {
                id: 26, name:
                    '西藏', city:
                    [
                        {
                            id: 281, name: '拉萨市'
                        },
                        {
                            id: 282, name: '昌都地区'
                        },
                        {
                            id: 283, name: '山南地区'
                        },
                        {
                            id: 284, name: '日喀则地区'
                        },
                        {
                            id: 285, name: '那曲地区'
                        },
                        {
                            id: 286, name: '阿里地区'
                        },
                        {
                            id: 287, name: '林芝地区'
                        }
                    ]
            },
            {
                id: 27, name:
                    '陕西', city:
                    [
                        {
                            id: 288, name: '西安市'
                        },
                        {
                            id: 289, name: '铜川市'
                        },
                        {
                            id: 290, name: '宝鸡市'
                        },
                        {
                            id: 291, name: '咸阳市'
                        },
                        {
                            id: 292, name: '渭南市'
                        },
                        {
                            id: 293, name: '延安市'
                        },
                        {
                            id: 294, name: '汉中市'
                        },
                        {
                            id: 295, name: '榆林市'
                        },
                        {
                            id: 296, name: '安康市'
                        },
                        {
                            id: 297, name: '商洛市'
                        }
                    ]
            },
            {
                id: 28, name:
                    '甘肃', city:
                    [
                        {
                            id: 298, name: '兰州市'
                        },
                        {id: 299, name: '嘉峪关市'},
                        {
                            id: 300, name: '金昌市'
                        },
                        {
                            id: 301, name: '白银市'
                        },
                        {
                            id: 302, name: '天水市'
                        },
                        {
                            id: 303, name: '武威市'
                        },
                        {
                            id: 304, name: '张掖市'
                        },
                        {
                            id: 305, name: '平凉市'
                        },
                        {
                            id: 306, name: '酒泉市'
                        },
                        {
                            id: 307, name: '庆阳市'
                        },
                        {
                            id: 308, name: '定西市'
                        },
                        {
                            id: 309, name: '陇南市'
                        },
                        {
                            id: 310, name: '临夏'
                        },
                        {
                            id: 311, name: '甘南'
                        }
                    ]
            },
            {
                id: 29, name:
                    '青海', city:
                    [
                        {
                            id: 312, name: '西宁市'
                        },
                        {
                            id: 313, name: '海东地区'
                        },
                        {
                            id: 314, name: '海北'
                        },
                        {
                            id: 315, name: '黄南'
                        },
                        {
                            id: 316, name: '海南'
                        },
                        {
                            id: 317, name: '果洛'
                        },
                        {
                            id: 318, name: '玉树'
                        },
                        {
                            id: 319, name: '海西'
                        }
                    ]
            },
            {
                id: 30, name:
                    '宁夏', city:
                    [
                        {
                            id: 320, name: '银川市'
                        },
                        {
                            id: 321, name: '石嘴山市'
                        },
                        {
                            id: 322, name: '吴忠市'
                        },
                        {
                            id: 323, name: '固原市'
                        },
                        {
                            id: 324, name: '中卫市'
                        }
                    ]
            },
            {
                id: 31, name:
                    '新疆', city:
                    [
                        {
                            id: 325, name: '乌鲁木齐市'
                        },
                        {
                            id: 326, name: '克拉玛依市'
                        },
                        {
                            id: 327, name: '吐鲁番地区'
                        },
                        {
                            id: 328, name: '哈密地区'
                        },
                        {
                            id: 329, name: '昌吉'
                        },
                        {
                            id: 330, name: '博尔塔拉'
                        },
                        {
                            id: 331, name: '巴音郭楞'
                        },
                        {
                            id: 332, name: '阿克苏地区'
                        },
                        {
                            id: 333, name: '克孜勒苏柯尔克孜'
                        }, {
                        id: 334, name:
                            '喀什地区'

                    }
                        ,
                        {
                            id: 335, name:
                                '和田地区'
                        }
                        ,
                        {
                            id: 336, name:
                                '伊犁哈萨克'
                        }
                        ,
                        {
                            id: 337, name:
                                '塔城地区'
                        }
                        ,
                        {
                            id: 338, name:
                                '阿勒泰地区'
                        }
                        ,
                        {
                            id: 339, name:
                                '石河子市'
                        }
                        ,
                        {
                            id: 340, name:
                                '阿拉尔市'
                        }
                        ,
                        {
                            id: 341, name:
                                '图木舒克市'
                        }
                        ,
                        {
                            id: 342, name:
                                '五家渠市'
                        }
                    ]
            },
            {
                id: 32, name: '香港', city: [{id: 343, name: '香港'}
                ]
            },
            {
                id: 33, name:
                    '澳门', city:
                    [
                        {id: 344, name: '澳门'}
                    ]
            },
            {
                id: 34, name:
                    '台湾', city:
                    [
                        {id: 345, name: '台湾'}
                    ]
            }
        ]
        return data
    }
}
