
"use strict";


/***********************************************************
 *    定数
 ***********************************************************/

var code_version = 1;
var event_id = 0;

var ship_data = [
  [ "正規空母/装甲空母", "oooxxxxxxox", [
    [ 1377, "赤城改", [20, 20, 32, 10] ],
    [ 1378, "加賀改", [20, 20, 46, 12] ],
    [ 197, "蒼龍改二", [18, 35, 20, 6] ],
    [ 196, "飛龍改二", [18, 36, 22, 3] ],
    [ 261, "翔鶴改二", [27, 27, 27, 12] ],
    [ 266, "翔鶴改二甲", [34, 21, 12, 9], "oooxxxxoxox" ],
    [ 262, "瑞鶴改二", [28, 26, 26, 13] ],
    [ 267, "瑞鶴改二甲", [34, 24, 12, 6], "oooxxxxoxox" ],
    [ 156, "大鳳改", [30, 24, 24, 8] ],
    [ [206, 229, 230], "雲龍改/天城改/葛城改", [18, 21, 27, 3] ],
    [ 1433, "Graf Zeppelin改", [30, 13, 10, 3] ],
    [ 1445, "Aquila改", [15, 26, 15, 10] ],
    [ 345, "Saratoga Mk.II", [32, 24, 18, 6] ],
    [ 350, "Saratoga Mk.II Mod.2", [37, 24, 19, 13] ],
    [ 1473, "Ark Royal改", [24, 30, 12, 12] ],
    [ 1477, "Intrepid改", [40, 36, 21, 15] ],
  ]],
  [ "軽空母", "oooxxxxxxox", [
    [ 1385, "鳳翔改", [14, 16, 12] ],
    [ 157, "龍驤改二", [18, 28, 6, 3] ],
    [ 1383, "飛鷹改", [18, 18, 18, 12] ],
    [ 208, "隼鷹改二", [24, 18, 20, 4] ],
    [ 1382, "祥鳳改", [18, 12, 12, 6] ],
    [ 355, "瑞鳳改二", [21, 18, 12, 6] ],
    [ 360, "瑞鳳改二乙", [18, 15, 15, 2] ],
    [ [121, 122], "千歳航改二/千代田航改二", [24, 16, 11, 8] ],
    [ 190, "龍鳳改", [21, 9, 9, 6] ],
    [ [308, 309], "鈴谷航改二/熊野航改二", [15, 12, 12, 8] ],
    [ 331, "大鷹改二", [14, 14, 8, 3] ],
    [ 1476, "Gambier Bay改", [16, 12, 6] ],
  ]],
  [ "航空戦艦", "xxxooxxxoxx", [
    [ [102, 103], "伊勢改/日向改", [11, 11, 11, 14] ],
    [ [211, 212], "扶桑改二/山城改二", [4, 4, 9, 23] ],
  ]],
  [ "航空巡洋艦", "xxxooxxxoxx", [
    [ 101, "最上改", [5, 6, 5, 11] ],
    [ 117, "三隈改", [5, 6, 5, 8] ],
    [ [303, 304], "鈴谷改二/熊野改二", [3, 3, 7, 11] ],
    [ [188, 189], "利根改二/筑摩改二", [2, 2, 9, 5] ],
  ]],
  [ "戦艦", "xxxoxxxxoxx", [
    [ 341, "長門改二", [3, 3, 6, 3] ],
    [ 1376, "陸奥改", [3, 3, 3, 3] ],
    [ 136, "大和改", [7, 7, 7, 7] ],
    [ 346, "武蔵改二", [5, 5, 5, 8] ],
  ]],
  [ "戦艦 (伊艦)", "xxxooxxxoxx", [
    [ [246, 247], "Italia/Roma改", [3, 3, 3, 3] ],
  ]],
  [ "重巡洋艦 (伊艦)", "xxxooxxxoxx", [
    [ 296, "Zara due", [6, 3, 3, 3] ],
    [ 1441, "Pola改", [2, 2, 2, 2] ],
  ]],
  [ "軽巡洋艦", "xxxooxxxoxx", [
    [ 288, "由良改二", [1, 2, 1] ],
    [ 347, "多摩改二", [1, 1, 1] ],
  ]],
  [ "水上機母艦", "xxxooxxxoxx", [
    [ [99, 100], "千歳甲/千代田甲", [12, 6, 6] ],
    [ 250, "秋津洲改", [1, 1, 1], "xxxooxxxoxo" ],
    [ 1428, "瑞穂改", [12, 12, 8] ],
    [ 299, "神威改", [11, 8, 3] ],
    [ 1452, "Commandant Teste改", [12, 12, 7, 7] ],
  ]],
  [ "揚陸艦", "oxxxxxxxxxx", [
    [ 166, "あきつ丸改", [8, 8, 8] ],
  ]],
  [ "潜水母艦", "xxxoxxxxoxx", [
    [ 184, "大鯨", [2, 3, 3] ],
  ]],
  [ "補給艦", "xxxooxxxoxx", [
    [ 1432, "速吸改", [6, 3, 1], "xoxooxxxoxx" ],
    [ 300, "神威改母", [1, 1, 1], "xxxooxxxoxo" ],
  ]],
  [ "潜水空母", "xxxooxxxoxx", [
    [ [1499, 1500, 1501, 1447], "(伊58/伊8/伊19/伊26)改", [1, 1] ],
    [ [1503, 1506], "伊401改/伊400改", [3, 3] ],
    [ [1454, 1455], "伊13改/伊14改", [2, 1, 0] ],
  ]],
  [ "-----" ],
  [ "正規空母/装甲空母(改造前)", "oooxxxxxxox", [
    [ 6, "赤城", [18, 18, 27, 10] ],
    [ 7, "加賀", [18, 18, 45, 12] ],
    [ [8, 9], "蒼龍/飛龍", [12, 27, 18, 7] ],
    [ [1379, 1380], "蒼龍改/飛龍改", [18, 27, 18, 10] ],
    [ [106, 107], "翔鶴/瑞鶴", [21, 21, 21, 12] ],
    [ [1388, 108], "翔鶴改/瑞鶴改", [24, 24, 24, 12] ],
    [ 153, "大鳳", [18, 18, 18, 7] ],
    [ [201, 202, 203], "雲龍/天城/葛城", [18, 24, 3, 6] ],
    [ 232, "Graf Zeppelin", [20, 13, 10] ],
    [ 244, "Aquila", [10, 26, 15]],
    [ 233, "Saratoga", [27, 19, 19, 15] ],
    [ 238, "Saratoga改", [36, 18, 18, 18] ],
    [ 315, "Ark Royal", [18, 30, 12, 12] ],
    [ 349, "Intrepid", [37, 36, 19, 4] ],
  ]],
  [ "軽空母 (改造前)", "oooxxxxxxox", [
    [ 25, "鳳翔", [8, 11] ],
    [ 30, "龍驤", [9, 24, 5] ],
    [ 1381, "龍驤改", [9, 24, 5, 5] ],
    [ [65, 66], "飛鷹/隼鷹", [12, 18, 18, 10] ],
    [ 1384, "隼鷹改", [18, 18, 18, 12] ],
    [ [94, 112], "祥鳳/瑞鳳", [18, 9, 3] ],
    [ 113, "瑞鳳改", [18, 12, 12, 6] ],
    [ [104, 105], "千歳航/千代田航", [21, 9, 6] ],
    [ [1391, 1392], "千歳航改/千代田航改", [24, 16, 8, 8] ],
    [ 185, "龍鳳", [18, 7, 6] ],
    [ 321, "春日丸", [14, 9] ],
    [ 326, "大鷹", [14, 11, 2] ],
    [ 1460, "大鷹改", [14, 14, 5, 3] ],
    [ 344, "Gambier Bay", [16, 12] ],
  ]],
  [ "航空戦艦 (改造前)", "xxxooxxxoxx", [
    [ [1386, 1387], "扶桑改/山城改", [10, 10, 10, 10] ],
  ]],
  [ "航空巡洋艦 (改造前)", "xxxooxxxoxx", [
    [ [129, 130], "鈴谷改/熊野改", [5, 6, 5, 6] ],
  ]],
  [ "戦艦 (改造前)", "xxxoxxxxoxx", [
    [ 1375, "長門改", [3, 3, 3, 3] ],
    [ 148, "武蔵改", [7, 7, 7, 7] ],
  ]],
  [ "重巡洋艦 (伊艦) (改造前)", "xxxooxxxoxx", [
    [ 1438, "Zara改", [2, 2, 2, 2] ],
  ]],
  [ "水上機母艦 (改造前)", "xxxooxxxoxx", [
    [ [49, 50], "千歳/千代田", [12, 12] ],
    [ [95, 96], "千歳改/千代田改", [12, 6, 6] ],
    [ 245, "秋津洲", [1, 1], "xxxooxxxoxo" ],
    [ 251, "瑞穂", [12, 12] ],
    [ 291, "Commandant Teste", [12, 7, 7] ],
  ]],
  [ "補給艦 (改造前)", "xxxooxxxoxx", [
    [ 260, "速吸", [6, 1] ],
  ]],
  [ "潜水空母 (改造前)", "xxxooxxxoxx", [
    [ [155, 293], "伊401/伊400", [3] ],
    [ [294, 295], "伊13/伊14", [2, 0] ],
  ]],
];

// ID, 艦載機名(短縮), 対空, 迎撃, 対爆, 半径, 防空補正, 改修可否, 艦載機名(正式)
var eq_data = [
  [ "艦上戦闘機", [
    [  19, "九六式艦戦", 2, 0, 0, 3,, 1 ],
    [ 228, "九六式艦戦改", 4, 0, 0, 4,, 0 ],
    [  20, "零戦21型", 5, 0, 0, 7,, 1, "零式艦戦21型" ],
    [  96, "零戦21型 (熟練)", 8, 0, 0, 7,, 1, "零式艦戦21型 (熟練)" ],
    [ 155, "零戦21型 (付岩本)", 9, 0, 0, 7,, 2, "零戦21型 (付岩本小隊)" ],
    [ 181, "零戦32型", 5, 0, 0, 5,, 1, "零式艦戦32型" ],
    [ 182, "零戦32型 (熟練)", 8, 0, 0, 5,, 1, "零式艦戦32型 (熟練)" ],
    [  21, "零戦52型", 6, 0, 0, 6,, 1, "零式艦戦52型" ],
    [ 152, "零戦52型 (熟練)", 9, 0, 0, 6,, 1, "零式艦戦52型 (熟練)" ],
    [ 156, "零戦52型甲 (付岩本)", 11, 0, 0, 6,, 1, "零戦52型甲 (付岩本小隊)" ],
    [ 109, "零戦52型丙 (601空)", 9, 0, 0, 6,, 1, "零戦52型丙 (六〇一空)" ],
    [ 153, "零戦52型丙 (付岩井)", 10, 0, 0, 6,, 1, "零戦52型丙 (付岩井小隊)" ],
    [ 157, "零戦53型 (岩本隊)", 12, 0, 0, 6,, 1, "零式艦戦53型 (岩本隊)" ],
    [  55, "紫電改二", 9, 0, 0, 3,, 0 ],
    [ 271, "紫電改四", 10, 0, 0, 4,, 0 ],
    [  22, "烈風", 10, 0, 0, 5,, 0 ],
    [ 110, "烈風 (601空)", 11, 0, 0, 5,, 2, "烈風 (六〇一空)" ],
    [  53, "烈風改", 12, 0, 0, 5,, 0 ],
    [  56, "震電改", 15, 0, 0, 2,, 0 ],
    [ 158, "Bf109T改", 8, 0, 0, 2,, 0 ],
    [ 159, "Fw190T改", 10, 0, 0, 3,, 0 ],
    [ 184, "Re.2001 OR改", 6, 0, 0, 4,, 0 ],
    [ 189, "Re.2005 改", 11, 0, 0, 3,, 0 ],
    [ 197, "F4F-3", 4, 0, 0, 4,, 1 ],
    [ 198, "F4F-4", 5, 0, 0, 4,, 1 ],
    [ 205, "F6F-3", 8, 0, 0, 5,, 1 ],
    [ 254, "F6F-3N", 8, 0, 0, 5,, 0 ],
    [ 206, "F6F-5", 10, 0, 0, 5,, 1 ],
    [ 255, "F6F-5N", 10, 0, 0, 5,, 0 ],
    [ 249, "Fulmar", 3, 0, 0, 4,, 0 ],
    [ 252, "Seafire Mk.III改", 9, 0, 0, 4,, 0 ],
  ]],
  [ "艦上攻撃機", [
    [  93, "九七式艦攻 (友永隊)", 1, 0, 0, 4,, 0 ],
    [ 143, "九七式艦攻 (村田隊)", 1, 0, 0, 4,, 0 ],
    [  94, "天山一二型 (友永隊)", 1, 0, 0, 5,, 0 ],
    [ 144, "天山一二型 (村田隊)", 1, 0, 0, 5,, 0 ],
    [ 188, "Re.2001 G改", 4, 0, 0, 3,, 0 ],
    [ 256, "TBF", 1, 0, 0, 6,, 0 ],
    [ 257, "TBM-3D", 1, 0, 0, 6,, 0 ],
    [ 990, "一般の艦攻 (対空0)", 0, 0, 0, -1,, 0 ],
  ]],
  [ "艦上爆撃機", [
    [  60, "零戦62型 (爆戦)", 4, 0, 0, 4,, 1, "零式艦戦62型 (爆戦)" ],
    [ 154, "零戦62型 (岩井隊)", 7, 0, 0, 5,, 1, "零戦62型 (爆戦/岩井隊)" ],
    [ 219, "零戦63型 (爆戦)", 5, 0, 0, 4,, 1, "零式艦戦63型 (爆戦)" ],
    [  97, "九九式艦爆 (熟練)", 1, 0, 0, 4,, 0 ],
    [ 100, "彗星 (江草隊)", 1, 0, 0, 5,, 0 ],
    [ 148, "試製南山", 1, 0, 0, 5,, 0 ],
    [ 195, "SBD", 2, 0, 0, 4,, 0 ],
    [ 233, "F4U-1D", 7, 0, 0, 6,, 0 ],
    [ 277, "FM-2", 6, 0, 0, 4,, 0 ],
    [ 248, "Skua", 2, 0, 0, 4,, 0 ],
    [ 991, "一般の艦爆 (対空0)", 0, 0, 0, -1,, 0 ],
  ]],
  [ "水上戦闘機", [
    [ 164, "Ro.44水上戦闘機", 2, 0, 0, 3,, 1 ],
    [ 215, "Ro.44水上戦闘機bis", 3, 0, 0, 3,, 1 ],
    [ 165, "二式水戦改", 3, 0, 0, 4,, 1 ],
    [ 216, "二式水戦改 (熟練)", 5, 0, 0, 4,, 1 ],
    [ 217, "強風改", 5, 0, 0, 3,, 1 ],
  ]],
  [ "水上爆撃機", [
    [  26, "瑞雲", 2, 0, 0, 5,, 1 ],
    [  79, "瑞雲 (634空)", 2, 0, 0, 5,, 1, "瑞雲 (六三四空)" ],
    [ 237, "瑞雲 (634空/熟練)", 4, 0, 0, 5,, 1, "瑞雲 (六三四空/熟練)" ],
    [ 207, "瑞雲 (631空)", 1, 0, 0, 5,, 0, "瑞雲 (六三一空)" ],
    [  80, "瑞雲12型", 3, 0, 0, 5,, 0 ],
    [  81, "瑞雲12型 (634空)", 3, 0, 0, 5,, 0, "瑞雲12型 (六三四空)" ],
    [  62, "試製晴嵐", 0, 0, 0, 4,, 0 ],
    [ 208, "晴嵐 (631空)", 0, 0, 0, 4,, 0, "晴嵐 (六三一空)" ],
    [ 194, "Laté 298B", 1, 0, 0, 4,, 0 ],
  ]],
  [ "陸上戦闘機", [
    [ 175, "雷電", 6, 2, 5, 2,, 0 ],
    [ 201, "紫電一一型", 8, 1, 1, 3,, 1 ],
    [ 202, "紫電二一型 紫電改", 9, 3, 1, 4,, 0 ],
    [ 263, "紫電改 (343空)", 11, 4, 2, 4,, 0, "紫電改 (三四三空) 戦闘301" ],
    [ 221, "一式戦 隼II型", 6, 2, 0, 6,, 1 ],
    [ 222, "一式戦 隼III型甲", 7, 3, 1, 6,, 1 ],
    [ 223, "一式戦 (54戦隊)", 8, 3, 1, 7,, 0, "一式戦 隼III型甲 (54戦隊)" ],
    [ 225, "一式戦 (64戦隊)", 11, 5, 1, 7,, 0, "一式戦 隼II型 (64戦隊)" ],
    [ 176, "三式戦 飛燕", 8, 3, 1, 3,, 0 ],
    [ 177, "三式戦 (第244戦隊)", 9, 4, 3, 4,, 0, "三式戦 飛燕 (飛行第244戦隊)" ],
    [ 185, "三式戦 飛燕一型丁", 9, 3, 2, 4,, 0 ],
    [ 218, "四式戦 疾風", 10, 1, 1, 5,, 0 ],
    [ 250, "Spitfire Mk.I", 7, 1, 2, 4,, 0 ],
    [ 251, "Spitfire Mk.V", 9, 2, 3, 5,, 0 ],
    [ 253, "Spitfire Mk.IX (熟練)", 10, 4, 2, 4,, 0 ],
  ]],
  [ "陸上攻撃機", [
    [ 168, "九六式陸攻", 1, 0, 0, 8,, 0 ],
    [ 169, "一式陸攻", 2, 0, 0, 9,, 0 ],
    [ 170, "一式陸攻 (野中隊)", 3, 0, 0, 9,, 0 ],
    [ 180, "一式陸攻 二二型甲", 3, 0, 0, 10,, 0 ],
    [ 186, "一式陸攻 三四型", 4, 0, 0, 8,, 0 ],
    [ 187, "銀河", 3, 0, 0, 9,, 0 ],
    [ 224, "爆装一式戦 (55戦隊)", 6, 0, 0, 5,, 0, "爆装一式戦 隼III型改 (55戦隊)" ],
    [ 269, "試製東海", 0, 0, 0, 8,, 0 ],
    [ 270, "東海 (901空)", 0, 0, 0, 8,, 0, "東海 (九〇一空)" ],
  ]],
  [ "噴式戦闘爆撃機", [
    [ 199, "噴式景雲改", 6, 0, 0, 3,, 0 ],
    [ 200, "橘花改", 12, 0, 0, 2,, 0 ],
  ]],
  [ "水上偵察機", [
    [  25, "零式水上偵察機", 1, 0, 0, 7, 1.10, 1 ],
    [ 238, "零偵11型乙", 1, 0, 0, 7, 1.10, 0, "零式水上偵察機11型乙" ],
    [ 239, "零偵11型乙 (熟練)", 1, 0, 0, 7, 1.13, 0, "零式水上偵察機11型乙 (熟練)" ],
    [  59, "零式水上観測機", 2, 0, 0, 3, 1.10, 1 ],
    [ 102, "九八式水偵 (夜偵)", 0, 0, 0, 6, 1.10, 1, "九八式水上偵察機 (夜偵)" ],
    [ 115, "Ar196改", 1, 0, 0, 3, 1.10, 0 ],
    [ 118, "紫雲", 0, 0, 0, 4, 1.13, 0 ],
    [ 163, "Ro.43水偵", 1, 0, 0, 3, 1.10, 1 ],
    [ 171, "OS2U", 1, 0, 0, 3, 1.10, 0 ],
  ]],
  [ "艦上偵察機", [
    [  54, "彩雲", 0, 0, 0, 8, 1.3, 0 ],
    [ 212, "彩雲 (東カロリン空)", 0, 0, 0, 8, 1.3, 0 ],
    [ 273, "彩雲 (偵四)", 2, 0, 0, 7, 1.3, 0 ],
    [  61, "二式艦上偵察機", 1, 0, 0, 5, 1.2, 0 ],
    [ 151, "試製景雲 (艦偵型)", 0, 0, 0, 8, 1.3, 1 ],
  ]],
  [ "大型飛行艇", [
    [ 138, "二式大艇", 0, 0, 0, 20, 1.16, 0 ],
    [ 178, "PBY-5A Catalina", 0, 0, 0, 10, 1.16, 0 ],
  ]],
];

var map_data = [
  [ "鎮守府海域", "%C4%C3%BC%E9%C9%DC%B3%A4%B0%E8", [
    [ "(1-4) 南西諸島防衛線", [
      [ "ボス", [512, 512], 1 ],
      [ "E, I", [510, 510] ],
    ]],
    [ "(1-5) 鎮守府近海", [
      [ "F", [523], 1 ],
    ]],
    [ "(1-6) 鎮守府近海航路", [
      [ "B", [523] ],
      [ "D", [579, 523, 523] ],
      [ "F", [528, 525] ],
      [ "J", [565, 510, 510] ],
      [ "L", [579, 579, 523], 1 ],
    ]],
  ]],
  [ "南西諸島海域", "%C6%EE%C0%BE%BD%F4%C5%E7%B3%A4%B0%E8", [
    [ "(2-1) カムラン半島", [
      [ "ボス", [512, 512, 510], 1 ],
      [ "C, F", [510, 510, 510] ],
    ]],
    [ "(2-2) バシー島沖", [
      [ "ボス", [525, 525], 1 ],
    ]],
    [ "(2-3) 東部オリョール海", [
      [ "ボス", [525, 512], 1 ],
      [ "F, H, K", [512, 510, 510] ],
    ]],
    [ "(2-4) 沖ノ島海域", [
      [ "D, H, N, P", [528, 525, 525], 1 ],
      [ "G", [512, 512, 523, 523] ],
    ]],
    [ "(2-5) 沖ノ島沖", [
      [ "B", [560] ],
      [ "I (Lv100～)", [565], 1 ],
      [ "I (～Lv99)", [528], 1 ],
    ]],
  ]],
  [ "北方海域", "%CB%CC%CA%FD%B3%A4%B0%E8", [
    [ "(3-1) モーレイ海", [
      [ "ボス", [528] ],
      [ "C, F", [523, 523, 523], 1 ],
    ]],
    [ "(3-2) キス島沖", [
      [ "C", [525, 525, 523], 1 ],
    ]],
    [ "(3-3) アルフォンシーノ方面", [
      [ "ボス", [528, 525] ],
      [ "C, E", [523, 523, 523] ],
      [ "D, I", [528, 525, 523], 1 ],
    ]],
    [ "(3-4) 北方海域全域", [
      [ "ボス", [528, 528] ],
      [ "B, F, L", [523, 523] ],
      [ "D, I, N", [528, 525, 525], 1 ],
    ]],
    [ "(3-5) 北方AL海域", [
      [ "C (Lv90～)", [565, 579, 528] ],
      [ "C (～Lv89)", [565, 579] ],
      [ "E (最終)", [560] ],
      [ "F (前哨) (Lv85～)", [587, 549, 549, 549, 549, 549], 1 ],
      [ "F (前哨) (～Lv84)", [589, 549, 549, 549, 549, 549], 1 ],
      [ "F (最終) (Lv85～)", [588, 549, 549, 549, 549, 549], 1 ],
      [ "F (最終) (～Lv84)", [590, 549, 549, 549, 549, 549], 1 ],
      [ "G (最終)", [560] ],
    ]],
  ]],
  [ "西方海域", "%C0%BE%CA%FD%B3%A4%B0%E8", [
    [ "(4-1) ジャム島攻略作戦", [
      [ "ボス", [523, 523], 1 ],
    ]],
    [ "(4-2) カレー洋制圧戦", [
      [ "ボス", [528] ],
      [ "H", [525, 523, 523], 1 ],
      [ "I", [523] ],
    ]],
    [ "(4-3) リランカ島空襲", [
      [ "ボス", [528] ],
      [ "A, J", [523, 523] ],
      [ "G", [528, 523, 523], 1 ],
      [ "H", [523, 523, 523] ],
      [ "M", [528] ],
    ]],
    [ "(4-4) カスガダマ沖海戦", [
      [ "ボス (前哨)", [544, 523] ],
      [ "ボス (最終)", [545, 536, 536] ],
      [ "C, J", [528, 523, 523] ],
      [ "F, I", [523, 523] ],
      [ "G", [528, 528, 523, 523], 1 ],
    ]],
    [ "(4-5) カレー洋リランカ島沖", [
      [ "ボス (前哨)", [573, 549, 549] ],
      [ "ボス (最終)", [613, 549, 549] ],
      [ "ボス (クリア後)", [613, 549] ],
      [ "H", [579, 579], 1 ],
      [ "J", [560] ],
    ]],
  ]],
  [ "南方海域", "%C6%EE%CA%FD%B3%A4%B0%E8", [
    [ "(5-1) 南方海域前面", [
      [ "ボス", [528] ],
      [ "A", [523] ],
      [ "E", [528, 528, 523, 523], 1 ],
      [ "F", [523] ],
      [ "H", [523, 523, 523] ],
    ]],
    [ "(5-2) 珊瑚諸島沖", [
      [ "ボス (前哨)", [545, 544], 1 ],
      [ "ボス (最終)", [547, 528, 528], 1 ],
      [ "B, F", [523] ],
      [ "C, J", [528] ],
    ]],
    [ "(5-3) サブ島沖海域", [
      [ "ボス (クリア前)", [548] ],
      [ "ボス (クリア後)", [528, 548] ],
      [ "E", [528, 523, 523], 1 ],
      [ "J", [528] ],
    ]],
    [ "(5-4) サーモン海域", [
      [ "ボス (最終)", [528, 523, 523] ],
      [ "A", [523] ],
      [ "C, G", [528] ],
      [ "H", [544, 544, 528], 1 ],
      [ "I", [523] ],
      [ "K", [545, 525, 525] ],
    ]],
    [ "(5-5) サーモン海域北方", [
      [ "ボス (前哨)", [565, 528, 562], 1 ],
      [ "ボス (最終)", [565, 565, 548], 1 ],
      [ "A, B", [561, 560, 560] ],
      [ "C", [560] ],
      [ "D", [565, 560, 560, 560] ],
      [ "E, G, H", [562] ],
      [ "F, M", [560] ],
      [ "K", [562, 561] ],
    ]],
  ]],
  [ "中部海域", "%C3%E6%C9%F4%B3%A4%B0%E8", [
    [ "(6-1) 中部海域哨戒線", [
      [ "ボス", [579] ],
      [ "B", [560] ],
      [ "H", [585, 579], 1 ],
    ]],
    [ "(6-2) MS諸島沖", [
      [ "ボス", [579] ],
      [ "A", [523, 523] ],
      [ "B", [560, 560] ],
      [ "E", [579, 579], 1 ],
      [ "H", [560] ],
      [ "I", [565] ],
    ]],
    [ "(6-3) グアノ環礁沖海域", [
      [ "--- 制空戦力なし ---", [] ],
    ]],
    [ "(6-4) 中部北海域ﾋﾟｰｺｯｸ島沖", [
      [ "ボス (前哨)", [671, 653], 1 ],
      [ "ボス (最終)", [656, 555] ],
      [ "C", [523, 529, 529, 555] ],
      [ "D, F, G", [669], 1 ],
      [ "H", [523, 529, 529, 555] ],
      [ "I", [669, 560] ],
      [ "J (前哨)", [618, 567, 595, 592], 1 ],
      [ "J (最終)", [620, 567, 595, 592], 1 ],
      [ "K (前哨)", [616, 543, 527] ],
      [ "K (最終)", [617, 543, 527] ],
      [ "L", [560, 560, 527] ],
    ]],
    [ "(6-5) KW環礁沖海域", [
      [ "ボス", [586, 6152, 592, 555, 5272], 1 ],
      [ "C", [618, 595, 595] ],
      [ "D", [560, 560, 595, 592] ],
      [ "G", [586, 615, 615, 592], 1 ],
      [ "H", [615, 615, 592] ],
      [ "I", [560, 560, 555, 592] ],
      [ "J", [560] ],
    ]],
  ]],
];

// ID (下3桁), 艦名, 対空値, 搭載数, 未確定フラグ
var eship_data = [
  [ "軽空母", [
    [ 510, "軽母ヌ級", [2], [18] ],
    [ 523, "軽母ヌ級elite", [5], [24] ],
    [ 762, "軽母ヌ級elite (白)", [10, 4], [26, 23] ],
    [ 777, "軽母ヌ級elite (黒)", [11, 5, 6], [26, 23, 23] ],
    [ 560, "軽母ヌ級flagship", [5], [22] ],
    [ 763, "軽母ヌ級flagship (白)", [10, 4], [32, 28] ],
    [ 764, "軽母ヌ級flagship (赤)", [12, 5], [32, 28] ],
    [ 734, "軽母ヌ級改elite", [8, 5, 8], [22, 22, 22] ],
    [ 765, "軽母ヌ級改elite (白)", [8, 10, 4], [28, 24, 18] ],
    [ 778, "軽母ヌ級改elite (黒)", [11, 5, 6, 6], [28, 24, 18, 18] ],
    [ 735, "軽母ヌ級改flagship", [9, 5, 9], [23, 27, 23] ],
    [ 766, "軽母ヌ級改flagship (赤)", [9, 12, 5], [28, 28, 20] ],
    [ 779, "軽母ヌ級改flagship (赤2)", [12, 5, 5], [28, 20, 20] ],
    [ 780, "軽母ヌ級改flagship (黒)", [11, 5, 6, 9], [28, 28, 20, 20] ],
  ]],
  [ "正規空母", [
    [ 512, "空母ヲ級", [2], [27] ],
    [ 525, "空母ヲ級elite", [5], [30] ],
    [ 528, "空母ヲ級flagship", [5], [32] ],
    [ 579, "空母ヲ級flagship (白)", [10, 4, 4], [32, 27, 5] ],
    [ 614, "空母ヲ級flagship (準赤)", [12, 5, 4], [32, 27, 5] ],
    [ 615, "空母ヲ級flagship (赤)", [12, 5, 5], [32, 27, 5] ],
    [ 565, "空母ヲ級改flagship", [9, 4, 4], [36, 36, 36] ],
    [ 616, "空母ヲ級改flagship (白)", [10, 4, 4], [36, 36, 36] ],
    [ 617, "空母ヲ級改flagship (準赤)", [12, 5, 4], [36, 36, 36] ],
    [ 618, "空母ヲ級改flagship (赤)", [12, 5, 5], [36, 36, 36] ],
  ]],
  [ "重巡洋艦", [
    [ 761, "重巡ネ級flagship", [8], [28] ],
  ]],
  [ "戦艦", [
    [ 561, "戦艦レ級", [8], [140] ],
    [ 562, "戦艦レ級elite", [8], [180] ],
  ]],
  [ "その他 (通常海域敵艦)", [
    [ [536, 537, 538], "浮遊要塞", [5], [30] ],
    [ [549, 550, 551], "護衛要塞", [5], [35] ],
    [ 589, "北方棲姫 (3-5前哨; 弱)", [9], [64] ],
    [ 587, "北方棲姫 (3-5前哨; 強)", [9], [72] ],
    [ 590, "北方棲姫 (3-5最終; 弱)", [10, 4], [64, 40] ],
    [ 588, "北方棲姫 (3-5最終; 強)", [10, 4], [72, 40] ],
    [ 544, "装甲空母鬼", [5], [80] ],
    [ 545, "装甲空母姫", [5], [96] ],
    [ 573, "港湾棲姫 (4-5前哨)", [9], [80] ],
    [ 613, "港湾棲姫 (4-5最終)", [4], [180] ],
    [ 547, "南方棲戦鬼", [5], [70] ],
    [ 548, "南方棲戦姫", [5], [90] ],
    [ 585, "空母棲鬼 (6-1)", [10, 4], [48, 48] ],
    [ 586, "空母棲姫", [10, 4], [60, 56] ],
    [ 620, "空母棲姫 (赤)", [12, 5], [60, 56] ],
    [ 671, "離島棲姫", [7, 7], [32, 32] ],
    [ 668, "離島棲姫 (陸爆弱)", [5, 3, 3, 7], [16, 12, 12, 8] ],
    [ 669, "離島棲姫 (陸爆強)", [5, 3, 7, 7], [20, 18, 18, 8] ],
    [ 653, "集積地棲姫 (6-4)", [3, 3, 3, 3], [12, 12, 6, 6] ],
    [ 656, "集積地棲姫-壊 (6-4)", [5, 3, 3, 3], [24, 12, 6, 6] ],
  ]],
  [ "前イベント登場艦", [
    [ [781, 782], "空母棲姫 (黒)", [11, 5, 6], [60, 56, 30] ],
    [ 785, "護衛棲水姫 ('18冬甲)", [11, 5, 6], [42, 35, 35] ],
    [ 784, "護衛棲水姫 ('18冬乙)", [11, 5, 6], [42, 35, 35] ],
    [ 783, "護衛棲水姫 ('18冬丙丁)", [11, 5, 6], [28, 28, 28], 1 ],
    [ 788, "護衛棲水姫-壊 ('18冬甲)", [11, 5, 6], [42, 35, 35] ],
    [ 787, "護衛棲水姫-壊 ('18冬乙)", [11, 5, 6], [42, 35, 35], 1 ],
    [ 786, "護衛棲水姫-壊 ('18冬丙丁)", [11, 5, 6], [28, 28, 28], 1 ],
    [ [790, 791, 792], "戦艦棲姫改", [-1], [4] ],
    [ [793, 794, 795], "戦艦水鬼改", [-1], [6] ],
    [ [796, 797, 798], "戦艦水鬼改-壊", [-1], [6] ],
    [ 801, "深海鶴棲姫 ('18冬甲)", [11, 9, 5, 6], [40, 36, 36, 26] ],
    [ 800, "深海鶴棲姫 ('18冬乙)", [11, 9, 5, 6], [40, 36, 36, 26], 1 ],
    [ 799, "深海鶴棲姫 ('18冬丙丁)", [11, 9, 5, 6], [40, 36, 36, 26], 1 ],
    [ 804, "深海鶴棲姫-壊 ('18冬甲)", [11, 9, 5, 6], [69, 54, 54, 30] ],
    [ 803, "深海鶴棲姫-壊 ('18冬乙)", [11, 9, 5, 6], [69, 54, 54, 30], 1 ],
    [ 802, "深海鶴棲姫-壊 ('18冬丙丁)", [11, 9, 5, 6], [69, 54, 54, 30], 1 ],
    [ [599, 600], "空母水鬼", [10, 4], [66, 60] ],
    [ 625, "水母棲姫 ('15夏弱)", [4], [32] ],
    [ 626, "水母棲姫 ('15夏中)", [9], [64] ],
    [ 627, "水母棲姫 ('15夏強)", [9], [96] ],
  ]],
  [ "水上偵察機搭載艦", [
    [ 518, "軽巡ホ級elite", [-1], [1] ],
    [ 519, "軽巡ヘ級elite", [-1], [1] ],
    [ 555, "軽巡ヘ級flagship", [-1], [2] ],
    [ 591, "軽巡ツ級", [-1], [3] ],
    [ 592, "軽巡ツ級elite", [-1], [3] ],
    [ 509, "重巡リ級", [-1], [3] ],
    [ 522, "重巡リ級elite", [-1, -1], [3, 3] ],
    [ 527, "重巡リ級flagship", [-1], [4] ],
    [ 566, "重巡リ級改flagship", [-2], [4] ],
    [ 594, "重巡ネ級", [-1], [4] ],
    [ 595, "重巡ネ級elite", [-1], [4] ],
    [ 529, "戦艦ル級flagship", [-1], [5] ],
    [ 567, "戦艦ル級改flagship", [-2], [5] ],
    [ 541, "戦艦タ級", [-1], [4] ],
    [ 543, "戦艦タ級flagship", [-1], [4] ],
    [ [659, 660, 661, 662, 663, 664], "重巡棲姫", [-2], [4] ],
  ]],
  [ "複数艦指定用", [
    [ 7772, "軽母ヌ級elite (黒) x2", [11, 5, 6, 11, 5, 6], [26, 23, 23, 26, 23, 23] ],
    [ 7773, "軽母ヌ級elite (黒) x3", [11, 5, 6, 11, 5, 6, 11, 5, 6], [26, 23, 23, 26, 23, 23, 26, 23, 23] ],
    [ 7782, "軽母ヌ級改elite (黒) x2", [11, 5, 6, 6, 11, 5, 6, 6], [28, 24, 18, 18, 28, 24, 18, 18] ],
    [ 7783, "軽母ヌ級改elite (黒) x3", [11, 5, 6, 6, 11, 5, 6, 6, 11, 5, 6, 6], [28, 24, 18, 18, 28, 24, 18, 18, 28, 24, 18, 18] ],
    [ 7802, "軽母ヌ級改flagship (黒) x2", [11, 5, 6, 9, 11, 5, 6, 9], [28, 28, 20, 20, 28, 28, 20, 20] ],
    [ 7803, "軽母ヌ級改flagship (黒) x3", [11, 5, 6, 9, 11, 5, 6, 9, 11, 5, 6, 9], [28, 28, 20, 20, 28, 28, 20, 20, 28, 28, 20, 20] ],
    [ 5122, "空母ヲ級 x2", [2, 2], [27, 27] ],
    [ 5252, "空母ヲ級elite x2", [5, 5], [30, 30] ],
    [ 5282, "空母ヲ級flagship x2", [5, 5], [32, 32] ],
    [ 6152, "空母ヲ級flagship (赤) x2", [12, 5, 5, 12, 5, 5], [32, 27, 5, 32, 27, 5] ],
    [ 6182, "空母ヲ級改flagship (赤) x2", [12, 5, 5, 12, 5, 5], [36, 36, 36, 36, 36, 36] ],
    [ [7812, 7822], "空母棲姫 (黒) x2", [11, 5, 6, 11, 5, 6], [60, 56, 30, 60, 56, 30] ],
    [ 5912, "軽巡ツ級 x2", [-1, -1], [3, 3] ],
    [ 5922, "軽巡ツ級elite x2", [-1, -1], [3, 3] ],
    [ 5092, "重巡リ級 x2", [-1, -1], [3, 3] ],
    [ 5272, "重巡リ級flagship x2", [-1, -1], [4, 4] ],
    [ 5942, "重巡ネ級 x2", [-1, -1], [4, 4] ],
    [ 5952, "重巡ネ級elite x2", [-1, -1], [4, 4] ],
    [ 5432, "戦艦タ級flagship x2", [-1, -1], [4, 4] ],
  ]],
];

var prof_blue = "#7499be";
var prof_yellow = "#d19504";


/***********************************************************
 *    グローバル変数
 ***********************************************************/

var ship_table = {};
var eq_table = {};
var map_table = {};
var node_table = {};
var eship_table = {};

/**
 * 現在の入力データ
 * @type {Object}
 */
var input_data = {};

/**
 * 現在の入力データに対応するコード文字列
 * @type {string}
 */
var input_data_code;

/**
 * 現在のモードを表す: 0=通常, 1=基地航空隊出撃, 2=基地航空隊防空
 * @type {number}
 */
var is_lbas = 0;

/**
 * 各スロットの偵察機フラグ: 基地航空隊モード時に参照
 * @type {boolean[]}
 */
var is_recon_slot = [false, false, false, false];

/**
 * sessionStorage および localStorage が利用できるかどうか
 * @type {boolean}
 */
var support_storage;


/***********************************************************
 *    初期化
 ***********************************************************/

/**
 * セレクトメニュー構築などの初期化を行う
 * @return {void}
 */
function init() {
  var i, $g;

  // 艦船オブジェクト生成
  function gen_ship_object(ship_info, flags) {
    return {
      id: ship_info[0],
      first_id: Array.isArray(ship_info[0]) ? ship_info[0][0] : ship_info[0],
      has_multi_ids: Array.isArray(ship_info[0]),
      name: ship_info[1],
      space: ship_info[2],
      equip_capability: (ship_info[3] || flags).split("").map(function (c) {
        return c === "o";
      })
    };
  }

  // 艦船テーブル構築
  var $ship = $(".ship");
  ship_data.forEach(function (ship_group) {
    $g = $("<optgroup>").attr("label", ship_group[0]);
    if (ship_group[0] === "-----") {
      $ship.append($g.css("text-align", "center").prop("disabled", true));
    } else {
      var flags = ship_group[1];
      ship_group[2].forEach(function (ship_info) {
        var ship = gen_ship_object(ship_info, flags);
        (ship.has_multi_ids ? ship.id : [ship.id]).forEach(function (id) {
          ship_table[id] = ship;
        });
        $g.append($("<option>").text(ship.name).val(ship.first_id));
      });
      $ship.append($g);
    }
  });

  // 艦1に基地航空隊追加
  $g = $("<optgroup>").attr("label", "-----").css("text-align", "center");
  $("#ship0 option:first").after($g.prop("disabled", true));
  $g = $("<optgroup>").attr("label", "基地航空隊");
  $g.append($("<option>").text("基地航空隊 [出撃]").val(1));
  $g.append($("<option>").text("基地航空隊 [防空]").val(2));
  $("#ship0 option:first").after($g);
  ship_table[1] = gen_ship_object([1, "基地航空隊 [出撃]", [18, 18, 18, 18]], "ooooooooooo");
  ship_table[2] = gen_ship_object([2, "基地航空隊 [防空]", [18, 18, 18, 18]], "ooooooooooo");

  // 艦載機オブジェクト生成
  function gen_eq_object(eq_info, plane_type) {
    return {
      id: eq_info[0],
      name: eq_info[8] || eq_info[1],
      name_abbr: eq_info[1],
      plane_type: plane_type,
      aa: eq_info[2],
      ic: eq_info[3],
      ab: eq_info[4],
      range: eq_info[5],
      recon_bonus: eq_info[6] || 1,
      can_improve: eq_info[7]
    };
  }

  // 艦載機テーブル構築
  var $eq = $(".eq");
  eq_data.forEach(function (eq_group, plane_type) {
    $g = $("<optgroup>").attr("label", eq_group[0]);
    eq_group[1].forEach(function (eq_info) {
      var eq = gen_eq_object(eq_info, plane_type);
      var title = eq.name + " - 対空+" + eq.aa;
      if (eq.ab) title += ", 対爆+" + eq.ab;
      if (eq.ic) title += ", 迎撃+" + eq.ic;
      if (eq.can_improve) title += ", 改修" + [, "可", "値引継可"][eq.can_improve];
      eq_table[eq.id] = eq;
      $g.append($("<option>").text(eq.name_abbr).val(eq.id).attr("title", title));
    });
    $eq.append($g);
  });

  // 艦載機セレクトメニューの幅調整
  $eq.width(Math.ceil($eq.width() * 0.92));

  // 熟練度セレクトメニュー構築
  $(".prof")
    .append($("<option>").text("-").val(0).css("color", "black"))
    .append($("<option>").text("|").val(1).css("color", prof_blue))
    .append($("<option>").text("||").val(2).css("color", prof_blue))
    .append($("<option>").text("|||").val(3).css("color", prof_blue))
    .append($("<option>").text("/").val(4).css("color", prof_yellow))
    .append($("<option>").text("//").val(5).css("color", prof_yellow))
    .append($("<option>").text("///").val(6).css("color", prof_yellow))
    .append($("<option>").text(">>").val(7).css("color", prof_yellow))
    .val(7).css("color", prof_yellow);

  // 艦載機セルの幅調整
  $(".prof").show(); $(".star-span").show();
  $(".td-eq").width($(".td-eq").width() + 2);
  $(".prof").hide(); $(".star-span").hide();

  // マップテーブル構築
  var $map = $("#map");
  map_data.forEach(function (map_group, i) {
    $g = $("<optgroup>").attr("label", map_group[0]);
    map_group[2].forEach(function (map, j) {
      var map_id = +map[0][3];
      map_id += 10 * (map[0][1] === "E" ? 0 : +map[0][1]);
      map_table[map_id] = { index: [i, j] };
      $g.append($("<option>").text(map[0]).val(map_id));
    });
    $map.append($g);
  });

  // 敵艦船オブジェクト生成
  function gen_eship_object(eship_info) {
    var eship = {
      id: eship_info[0],
      first_id: Array.isArray(eship_info[0]) ? eship_info[0][0] : eship_info[0],
      has_multi_ids: Array.isArray(eship_info[0]),
      name: eship_info[1],
      aa: eship_info[2],
      space: eship_info[3],
      estim: !!eship_info[4],
      fp: 0, lbas_fp: 0
    };
    eship.aa.forEach(function (aa, i) {
      if (aa > 0)
        eship.fp += Math.floor(aa * Math.sqrt(eship.space[i]));
      if (aa < 0)
        eship.lbas_fp += Math.floor(-aa * Math.sqrt(eship.space[i]));
    });
    return eship;
  }

  // 敵艦船テーブル構築
  var $eship = $(".eship");
  var $enemy_detail = $("#enemy-detail");
  $eship.append($("<option>").text("直接入力").val(1));
  eship_data.forEach(function (eship_group) {
    $g = $("<optgroup>").attr("label", eship_group[0]);
    eship_group[1].forEach(function (eship_info) {
      var eship = gen_eship_object(eship_info);
      (eship.has_multi_ids ? eship.id : [eship.id]).forEach(function (id) {
        eship_table[id] = eship;
      });
      $g.append($("<option>").text(eship.name).val(eship.first_id));
    });
    $eship.append($g);
    if (+$g.children().val() < 5000)
      $enemy_detail.append($g.clone());
  });

  // 基地航空隊損耗セレクトメニュー構築
  $(".pre-lbas")
    .append($("<option>").text("制空権確保 (～100%撃墜)").val(10))
    .append($("<option>").text("航空優勢 (～80%撃墜)").val(8))
    .append($("<option>").text("航空均衡 (～60%撃墜)").val(6))
    .append($("<option>").text("航空劣勢 (～40%撃墜)").val(4))
    .append($("<option>").text("制空権喪失 (～10%撃墜)").val(1));

  // tabindex調整
  var index = 1;
  $("#data-list").attr("tabindex", index++);
  $("#load-data").attr("tabindex", index++);
  $("#remove-data").attr("tabindex", index++);
  $("#save-name").attr("tabindex", index++);
  $("#save-data").attr("tabindex", index++);
  $("#data-url").attr("tabindex", index++);
  $("#copy-url").attr("tabindex", index++);
  for (i = 0; i < 6; ++i)
    $("#ship" + i).attr("tabindex", index++);
  $("input[name='disp-ship-num']").attr("tabindex", index++);
  $("#reset").attr("tabindex", index++);
  for (i = 0; i < 24; ++i) {
    $("#eq"  + i).attr("tabindex", index++);
    $("#prof" + i).attr("tabindex", index++);
    $("#star" + i).attr("tabindex", index++);
    $("#num" + i).attr("tabindex", index++);
    if (i < 4) $("#range-input" + i).attr("tabindex", index++);
  }
  $("#map").attr("tabindex", index++);
  $("#node").attr("tabindex", index++);
  for (i = 0; i < 6; ++i) {
    $("#eship" + i).attr("tabindex", index++);
    $("#efp-input" + i).attr("tabindex", index++);
  }
  for (i = 0; i < 11; ++i)
    $("#max-prof" + i).attr("tabindex", index++);
  $("#prof-check").attr("tabindex", index++);
  $("#prof-uncheck").attr("tabindex", index++);
  $("#enable-pre-lbas").attr("tabindex", index++);
  for (i = 0; i < 6; ++i)
    $("#pre-lbas").attr("tabindex", index++);

  // 更新ハンドラの設定
  for (i = 0; i < 6; ++i)
    $("#ship" + i).change(set_ship.bind(null, i));
  $("#map").change(set_map);
  $("#node").change(set_node);
  $("input").on("input", update);
  $("input:radio").off("input").change(update);
  $("input:checkbox").off("input").change(update);
  $("select").change(update);
  $("#data-list").off("change");
  $("#load-data").click(load_data);
  $("#remove-data").click(remove_data);
  $("#save-name").off("input").on("keydown", function (e) { if (e.which === 13) save_data(); });
  $("#save-data").click(save_data);
  $("#copy-url").click(copy_url);
  $("#reset").click(reset);
  $("#prof-check").click(prof_check.bind(null, true));
  $("#prof-uncheck").click(prof_check.bind(null, false));
  $("#toggle-pre-lbas-desc").click(toggle_pre_lbas_desc);
  $("#enemy-detail").off("change").change(update_enemy_detail);

  // ストレージのチェック、読み込みおよび入力の初期化
  support_storage = check_storage();
  load_local_storage();
  init_input_data();
}


/***********************************************************
 *    計算
 ***********************************************************/

/**
 * 全体の再計算を行う
 * @return {void}
 */
function update() {
  var fp_info = calc_fighter_power();
  var efp_info = calc_enemy_fighter_power();
  print_result(fp_info, efp_info);
  update_data_code();
}

/**
 * 自艦隊の制空値に関する計算を行う
 * @return {Object} 計算結果
 */
function calc_fighter_power() {
  var i, j;
  var disp_ship_num = +get_radio_value("disp-ship-num");
  var eq_num = is_lbas ? 4 : 4 * disp_ship_num;
  if (eq_num === 16) $(".tr-6s").hide();
  else if (eq_num === 24) $(".tr-6s").show();

  var num_limit = [];
  for (i = 0; i < disp_ship_num; ++i) {
    var ship_val = input_data.ship[i];
    var ship_space = ship_val === "0" ? [] : ship_table[ship_val].space;
    for (j = 0; j < 4; ++j)
      num_limit[i * 4 + j] = ship_space.length <= j ? 999 : ship_space[j];
  }

  var use_max_prof = [];
  for (i = 0; i < 11; ++i)
    use_max_prof[i] = get_checkbox_value("max-prof", i);

  var fp = 0;
  var min_range = 1/0, max_range_recon = 0;
  var recon_coef = 1.0;

  for (i = 0; i < eq_num; ++i) {
    var eq_val = get_value("eq", i);
    var is_recon_type = eq_val !== "0" && eq_table[eq_val].plane_type >= 8;
    if (is_lbas && is_recon_slot[i] !== is_recon_type) {
      is_recon_slot[i] = is_recon_type;
      set_value("num", i, is_recon_type ? 4 : 18);
    }
    if (is_lbas && is_recon_type) num_limit[i] = 4;
    var num_plane = get_number("num", i, num_limit[i]);

    // 装備未選択
    if (eq_val === "0") {
      $("#eq" + i).removeAttr("title");
      $("#fp" + i).text("");
      $("#prof" + i).fadeOut("fast");
      $("#star-span" + i).fadeOut("fast");
      set_value("prof", i, 7);
      set_value("star", i, 0);
      if (is_lbas) $("#fp" + (i + 4)).text("");
      continue;
    }

    var eq = eq_table[eq_val];
    $("#prof" + i).fadeIn("fast");
    if (eq.can_improve) {
      $("#star-span" + i).fadeIn("fast");
    } else {
      set_value("star", i, 0);
      $("#star-span" + i).fadeOut("fast");
    }

    // 対空値
    var aa = eq.aa;
    if (is_lbas === 1) aa += 1.5 * eq.ic; // 出撃
    if (is_lbas === 2) aa += eq.ic + 2 * eq.ab; // 防空

    // 改修補正
    var improve_coef = 0.0;
    if ([0, 3, 5].indexOf(eq.plane_type) >= 0)
      improve_coef = 0.2;   // 係数0.2: 艦戦、水戦、陸戦
    else if (eq.plane_type === 2)
      improve_coef = 0.25;  // 係数0.25: 爆戦
    var improve_bonus = improve_coef * get_number("star", i, 10);

    // スロット制空値
    var fp_i = (aa + improve_bonus) * Math.sqrt(num_plane);

    var prof = +get_value("prof", i);
    if (prof === 0)
      $("#prof" + i).css("color", "black");
    else if (prof <= 3)
      $("#prof" + i).css("color", prof_blue);
    else
      $("#prof" + i).css("color", prof_yellow);

    // 熟練度ボーナス加算
    if (num_plane) {
      // 表示ボーナス
      if ([0, 3, 5].indexOf(eq.plane_type) >= 0)
        fp_i += [0, 0, 2, 5, 9, 14, 14, 22][prof]; // 艦戦、水戦、陸戦
      if (eq.plane_type === 4)
        fp_i += [0, 0, 1, 1, 1, 3, 3, 6][prof];    // 水上爆撃機

      // 内部ボーナス
      if (prof === 7 && use_max_prof[eq.plane_type]) ++prof;
      fp_i += Math.sqrt([0, 1, 2.5, 4, 5.5, 7, 8.5, 10, 12][prof]);
    }

    // 基地航空隊: 半径および偵察機係数の計算
    if (is_lbas) {
      var range;
      if (eq.range >= 0) {
        $("#fp" + (i + 4)).text(eq.range);
        $("#range-input" + i).hide();
        set_value("range-input", i, 4);
        range = eq.range;
      } else {
        $("#fp" + (i + 4)).text("");
        $("#range-input" + i).show();
        range = get_number("range-input", i, 20);
      }
      min_range = Math.min(range, min_range);

      if (is_recon_slot[i]) {
        max_range_recon = Math.max(range, max_range_recon);
        recon_coef = Math.max(eq.recon_bonus, recon_coef);
      }
    }

    if (!is_lbas && is_recon_type) fp_i = 0;
    fp_i = Math.floor(fp_i);
    $("#fp" + i).text(fp_i);
    fp += fp_i;

    $("#eq" + i).attr("title", $("#eq" + i + " option:selected").attr("title"));
  }

  return {
    fp: fp,
    min_range: min_range,
    max_range_recon: max_range_recon,
    recon_coef: recon_coef
  };
}

/**
 * 敵艦隊の制空値に関する計算を行う
 * @return {Object} 計算結果
 */
function calc_enemy_fighter_power() {
  var efp = 0, efp_fixed = 0;
  var aa_stats = [], num_planes = [];
  var estim = false;

  for (var i = 0; i < 6; ++i) {
    var eship_val = get_value("eship", i), efp_i;

    // 直接入力時
    if (eship_val === "1") {
      $("#efp" + i).text("");
      $("#efp-input" + i).fadeIn("fast");
      efp_i = get_number("efp-input", i, 999);
      efp += efp_i;
      efp_fixed += efp_i;
      continue;
    }
    $("#efp-input" + i).hide();
    set_value("efp-input", i, 0);

    if (eship_val === "0") {
      $("#efp" + i).text("");
      continue;
    }

    var eship = eship_table[eship_val];
    if (eship.estim){
      estim = true;
      if (!eship.fp && !eship.lbas_fp) {
        $("#efp" + i).html("<b style='color:red'>?</b>");
        continue;
      }
    }

    efp_i = eship.fp + (is_lbas ? eship.lbas_fp : 0);
    $("#efp" + i).text((efp_i || "-") + (eship.estim && efp_i ? "?" : ""));
    efp += efp_i;

    eship.aa.forEach(function (aa, j) {
      if (is_lbas || aa > 0) {
        aa_stats.push(Math.abs(aa));
        num_planes.push(eship.space[j]);
      }
    });
  }

  var res_obj = { fp: efp, estim: estim };
  if (get_checkbox_value("enable-pre-lbas") && is_lbas !== 2) {
    $("#pre-lbas-input").fadeIn("fast");
    res_obj.distrib = calc_efp_distribution(aa_stats, num_planes, efp_fixed);
  } else {
    $("#pre-lbas-input").hide();
  }

  return res_obj;
}

/**
 * 基地航空隊による損耗後の敵艦隊制空値の確率分布を計算する
 * @param {number[]} aa_stats - 各スロットの対空値
 * @param {number[]} num_planes - 各スロットの搭載数
 * @param {number} base - 損耗を計算しない制空値
 * @return {number[]} 各制空値の確率
 */
function calc_efp_distribution(aa_stats, num_planes, base) {
  var i, j;
  var num_dists = {};
  num_planes.forEach(function (num) {
    num_dists[num] = {};
    num_dists[num][num] = 1.0;
  });

  var max_stage = is_lbas ? 5 : 6;
  for (var stage = 0; stage < max_stage; ++stage) {
    var rand_max = +get_value("pre-lbas", stage);
    if (rand_max === 0) continue;

    var rand_table = [];
    var rand_n = (rand_max + 1) * (rand_max + 1);
    for (i = 0; i <= rand_max; ++i)
      for (j = 0; j <= rand_max; ++j)
        rand_table.push(0.65 * i + 0.35 * j);
    rand_table.push(1/0);
    rand_table.sort(function (a, b) { return a - b; });

    Object.keys(num_dists).forEach(function (num) {
      var cur_dist = num_dists[num];
      var new_dist = {};
      Object.keys(cur_dist).forEach(function (cur_num_str) {
        var cur_num = +cur_num_str;
        var cnt = 1, shot_num = Math.floor(cur_num * rand_table[0] / 10);
        for (i = 0; i < rand_n; ++i) {
          var next_shot_num = Math.floor(cur_num * rand_table[i + 1] / 10);
          if (shot_num !== next_shot_num) {
            var new_num = cur_num - shot_num;
            new_dist[new_num] = (new_dist[new_num] || 0) + cur_dist[cur_num_str] * cnt / rand_n;
            cnt = 1;
          } else ++cnt;
          shot_num = next_shot_num;
        }
      });
      num_dists[num] = new_dist;
    });
  }

  var fp_dist = {};
  fp_dist[base] = 1.0;
  aa_stats.forEach(function (aa, idx) {
    var add_dist = {};
    var cur_num_dist = num_dists[num_planes[idx]];
    Object.keys(cur_num_dist).forEach(function (cur_num) {
      var cur_fp = Math.floor(+aa * Math.sqrt(cur_num));
      add_dist[cur_fp] = (add_dist[cur_fp] || 0) + cur_num_dist[cur_num];
    });
    var new_fp_dist = {};
    Object.keys(fp_dist).forEach(function (cur_fp_str) {
      var cur_prob = fp_dist[cur_fp_str];
      if (cur_prob > 1e-12) {
        var cur_fp = +cur_fp_str;
        Object.keys(add_dist).forEach(function (add_fp) {
          var new_fp = +add_fp + cur_fp;
          new_fp_dist[new_fp] = (new_fp_dist[new_fp] || 0) + cur_prob * add_dist[add_fp];
        });
      }
    });
    fp_dist = new_fp_dist;
  });

  var fp_dist_ary = [], prob_sum = 0;
  Object.keys(fp_dist).forEach(function (fp) {
    prob_sum += fp_dist_ary[fp] = fp_dist[fp];
  });
  return fp_dist_ary.map(function (p) { return p / prob_sum; });
}

/**
 * 計算結果をもとに結果の表示を行う
 * @param {Object} fp_info - 自艦隊の制空値に関する情報
 * @param {Object} efp_info - 敵艦隊の制空値に関する情報
 * @return {void}
 */
function print_result(fp_info, efp_info) {
  var i;
  var fp = fp_info.fp;
  var efp = efp_info.fp;

  var border = [efp * 3, Math.ceil(efp * 1.5), Math.floor(efp / 1.5) + 1,
                Math.floor(efp / 3) + 1, 0];

  if (is_lbas) {
    if (is_lbas === 2)
      fp = Math.floor(fp * fp_info.recon_coef);

    var txt = "<b>自艦隊制空値: " + fp + "　　　敵艦隊制空値: " + efp;
    if (efp_info.estim && efp) txt += "?";
    txt += "</b><br>確保: " + border[0] + " / 優勢: ";
    if (efp === 0) txt += "- / 均衡: - / 劣勢: -";
    else txt += border[1] + " / 均衡: " + border[2] + " / 劣勢: " + border[3];
    $("#lbas-result").html(txt);

    if (is_lbas === 1) {
      var bonus = Math.min(Math.round(Math.sqrt(Math.max(fp_info.max_range_recon - fp_info.min_range, 0))), 3);
      $("#lbas-info").text("出撃可能範囲: " + (isFinite(fp_info.min_range) ? fp_info.min_range + bonus : "-"));
    } else {
      $("#lbas-info").text("偵察機補正係数: " + Math.round(fp_info.recon_coef * 100) + "%");
    }
  } else {
    $("#border0").text(border[0]);
    for (i = 1; i < 4; ++i)
      $("#border" + i).text(efp === 0 ? "-" : border[i]);
    $("#fp-sum").text(fp);
    $("#efp-sum").text(efp + (efp_info.estim && efp ? "?" : ""));
  }

  var state_text = ["制空権確保", "航空優勢", "航空均衡", "航空劣勢", "制空権喪失"];
  var state_color = ["green", "green", "black", "black", "red"];

  // 敵機損耗を計算しない場合
  if (efp_info.distrib == null) {
    for (i = 0; i < 5; ++i) if (fp >= border[i]) {
      var result_span = $("<span>").text(state_text[i]).css("color", state_color[i]);
      $("#result").empty().append(result_span);
      break;
    }
    update_bar(fp, efp);
    hide_errorbar();
    return;
  }

  var cum = 0, cum_dist = [];
  efp_info.distrib.forEach(function (prob, fp) {
    if (prob != null) {
      cum += prob;
      cum_dist.push([cum, fp]);
    }
  });

  function find_fp(p) {
    var lo = -1, hi = cum_dist.length - 1;
    while (hi - lo > 1) {
      var mid = Math.floor((lo + hi) / 2);
      if (cum_dist[mid][0] < p - 1e-9) lo = mid;
      else hi = mid;
    }
    if (cum_dist[hi][0] < p + 1e-9)
      return (cum_dist[hi][1] + cum_dist[hi + 1][1]) / 2;
    return cum_dist[hi][1];
  }

  function find_cum_prob(fp) {
    if (fp < cum_dist[0][1]) return 0;
    var lo = 0, hi = cum_dist.length;
    while (hi - lo > 1) {
      var mid = Math.floor((lo + hi) / 2);
      if (cum_dist[mid][1] <= fp) lo = mid;
      else hi = mid;
    }
    return cum_dist[lo][0];
  }

  var efp_median = find_fp(0.5);
  var efp_5p = find_fp(0.05);
  var efp_95p = find_fp(0.95);
  var efp_99p = find_fp(0.99);
  $("#pre-lbas-result-median").text(efp_median);
  $("#pre-lbas-result-95p").text(efp_95p);
  $("#pre-lbas-result-99p").text(efp_99p);

  var eborder = [Math.floor(fp / 3), Math.floor(fp / 1.5),
                 Math.ceil(fp * 1.5) - 1, fp * 3 - 1, Infinity];
  var prev_p = 0;
  var state_prob = [], state_order = [];
  for (i = 0; i < 5; ++i) {
    var p = find_cum_prob(eborder[i]);
    if (p - prev_p >= 5e-5) {
      state_prob.push(p - prev_p);
      state_order.push(i);
    } else
      state_prob.push(0);
    prev_p = Math.max(p, prev_p);
  }
  state_order.sort(function (a, b) {
    return state_prob[b] - state_prob[a] || a - b;
  });

  var result_html = "";
  state_order.forEach(function (st, idx) {
    if (idx === 3) result_html += "<br>";
    else if (idx) result_html += " / ";
    result_html += "<span style='color:" + state_color[st] + "'>" + state_text[st];
    if (state_order.length !== 1)
      result_html += " (" + (state_prob[st] * 100).toFixed(2) + "%)";
    result_html += "</span>";
  });
  $("#result").html(result_html);

  update_bar(fp, efp_median);
  update_errorbar(fp, efp_5p, efp_95p);
}


/***********************************************************
 *    チャート
 ***********************************************************/

function update_bar(fp, efp) {
  var ratio = efp ? Math.min(fp / efp, 3.5) : 3.5;
  var c = fp * 2 >= efp * 3 ? "#089908" : fp * 3 <= efp ? "#ee3333" : "#808080";
  chart.series[0].data[0].update({ y: ratio, color: c }, true, { duration: 300 });
}

function update_errorbar(fp, efp_5p, efp_95p) {
  var ratio_5p = efp_5p ? Math.min(fp / efp_5p, 3.5) : 3.5;
  var ratio_95p = efp_95p ? Math.min(fp / efp_95p, 3.5) : 3.5;
  if (efp_5p === efp_95p) { hide_errorbar(); return; }
  chart.series[1].setVisible(true, false);
  chart.series[1].data[0].update([ratio_5p, ratio_95p], true, { duration: 300 });
}

function hide_errorbar() {
  chart.series[1].setVisible(false);
}

var chart = new Highcharts.Chart("chart", {
  chart: {
    type: "bar",
    backgroundColor: "#f8f8f8",
    marginLeft: 20,
    spacing: [9, 10, 7, 10]
  },
  title: { text: null },
  credits: { enabled: false },
  legend: { enabled: false },
  tooltip: { enabled: false },
  xAxis: { labels: { enabled: false }, lineWidth: 0, tickLength: 0 },
  yAxis: {
    title: { text: null },
    gridLineWidth: 0,
    lineWidth: 1, lineColor: "black",
    tickWidth: 2, tickLength: 6, tickColor: "black",
    tickPositions: [0, 1/3, 2/3, 1.5, 3, 3.5],
    labels: {
      y: 20,
      style: { color: "black", fontSize: "14px" },
      formatter: function() {
        switch (this.value) {
          case 0:   return "喪失";
          case 1/3: return "劣勢";
          case 2/3: return "均衡";
          case 1.5: return "優勢";
          case 3:   return "確保";
          default:  return "";
        }
      }
    }
  },
  series: [
    { data: [0], pointWidth: 9 },
    { type: "errorbar", data: [[0, 0]], color: "#3050ff", whiskerLength: "60%", visible: false }
  ]
});


/***********************************************************
 *    表示切り替え
 ***********************************************************/

/**
 * 艦船の設定に伴い、搭載数の変更および装備可能な艦載機の絞り込みを行う
 * @param {number} pos - 変更された艦船の位置
 * @return {void}
 */
function set_ship(pos) {
  var ship_val = get_value("ship", pos), i, k;
  if (pos === 0) {
    var cur_mode = +ship_val;
    if (cur_mode > 2) cur_mode = 0;
    if (is_lbas !== cur_mode) lbas_mode_change(cur_mode);
  }

  if (ship_val === "0") {
    for (i = 0; i < 4; ++i) {
      k = pos * 4 + i;
      set_value("num", k, "");
      $("#num" + k).prop("disabled", false);
      $("#eq" + k).prop("disabled", false);
      $("#eq" + k + " optgroup").prop("disabled", false).show();
    }
    return;
  }

  var ship = ship_table[ship_val];
  for (i = 0; i < 4; ++i) {
    k = pos * 4 + i;
    if (ship.space.length <= i) {
      set_value("eq", k, 0);
      set_value("num", k, "");
      $("#eq" + k).prop("disabled", true);
      $("#num" + k).prop("disabled", true);
      continue;
    }

    $("#eq" + k).prop("disabled", false);
    $("#eq" + k + " optgroup").each(function (k) {
      if (ship.equip_capability[k])
        $(this).prop("disabled", false).show();
      else
        $(this).prop("disabled", true).hide();
    });

    // 装甲空母チェック (試製景雲の処理)
    var cvb_list = [153, 156, 266, 267, 350];
    if (is_lbas || cvb_list.indexOf(ship.first_id) >= 0)
      $("#eq" + k).find("option[value='151']").prop("disabled", false).show();
    else
      $("#eq" + k).find("option[value='151']").prop("disabled", true).hide();

    if ($("#eq" + k).val() == null)
      set_value("eq", k, 0);

    $("#num" + k).prop("disabled", false);
    set_value("num", k, ship.space[i]);
  }
}

/**
 * 基地航空隊モードの切替に伴う表示の調整を行う
 * @param {number} new_mode - 新たなモード
 * @return {void}
 */
function lbas_mode_change(new_mode) {
  if (is_lbas === new_mode) return;

  // 基地航空隊の出撃・防空切り替えのみ
  if (is_lbas && new_mode) {
    if ((is_lbas = new_mode) === 1)
      $("#label-enable-pre-lbas").fadeIn("fast");
    else
      $("#label-enable-pre-lbas").hide();
    return;
  }

  var i, $g1, $g2;
  if ((is_lbas = new_mode)) {
    $(".lbas-tgl").hide();
    $("#lbas-info").show();
    $(".tr-6s").hide();
    $(".td-fleet").attr("colspan", 4);
    $("#radius-title").text("半径");
    $("#td-lbas-result").attr({ colspan: 4, rowspan: 2 }).css("text-align", "center");
    $("#prof8, #star-span8").hide();
    for (i = 0; i < 4; ++i) {
      is_recon_slot[i] = false;
      $g1 = $("#eq" + i + " optgroup:eq(5)").detach();
      $g2 = $("#eq" + i + " optgroup:eq(5)").detach();
      $("#eq" + i + " optgroup:first").before($g1, $g2);
    }
  } else {
    $(".lbas-tgl").show();
    $("#lbas-info").hide();
    $(".td-fleet").attr("colspan", 6);
    $("#radius-title").text("制空");
    $(".range-input").hide();
    set_value_class("range-input", 4);
    $("#td-lbas-result").attr({ colspan: 1, rowspan: 1 }).css("text-align", "left");
    $("#lbas-result").text("");
    for (i = 0; i < 4; ++i) {
      $g1 = $("#eq" + i + " optgroup:first").detach();
      $g2 = $("#eq" + i + " optgroup:first").detach();
      $("#eq" + i + " optgroup:eq(5)").before($g1, $g2);
    }
    $("#label-enable-pre-lbas").fadeIn("fast");
  }
}

/**
 * 自艦隊の設定をすべてクリアする
 * @return {void}
 */
function reset() {
  for (var i = 0; i < 6; ++i) {
    if (is_lbas && i === 0) continue;
    set_value("ship", i, 0);
    set_ship(i);
  }
  set_value_class("eq", 0);
  set_value_class("pre-lbas", 0);
  $("#save-name").val("");
  update();
}

/**
 * 海域の変更に伴いマスの情報を変更する
 * @return {void}
 */
function set_map() {
  var $node = $("#node");
  var map_val = get_value("map");
  if (map_val === "0") {
    $node.html($("<option>").text("--- 海域を選択 ---").val(0)).val(0);
    node_table = { 0: { enemies: []} };
    set_node();
    $("#mapguide").hide();
    return;
  }

  var index = map_table[map_val].index;
  var node_data = map_data[index[0]][2][index[1]][1];
  $node.empty();
  node_table = {};

  node_data.forEach(function (node, i) {
    var node_id = i, ofs = 0;
    if (typeof node[0] === "number") {
      node_id = node[0];
      ofs = 1;
    }
    node_table[node_id] = { enemies: node[ofs + 1] };

    var $opt = $("<option>").text(node[ofs]).val(node_id);
    if (node[ofs] === "-----")
      $opt.css("text-align", "center").prop("disabled", true).val("-----");
    if (node[ofs + 2])
      $opt.addClass("bold");
    $node.append($opt);
  });

  var url = "http://wikiwiki.jp/kancolle/?" + map_data[index[0]][1];
  if (index[0] === 0 && index[1] >= 4)
    url += "%2F%B3%C8%C4%A5%BA%EE%C0%EF"; // イベ対応 (拡張作戦)
  url += "#area" + (map_val % 10);
  $("#mapguide").show();
  $("#maplink").attr("href", url);

  $node.children().first().prop("selected", true);
  set_node();
}

/**
 * マスの変更に伴い敵艦を変更する
 * @return {void}
 */
function set_node() {
  var i = 0;
  var enemies = node_table[get_value("node")].enemies;
  for (; i < enemies.length; ++i)
    set_value("eship", i, eship_table[enemies[i]].first_id);
  for (; i < 6; ++i)
    set_value("eship", i, 0);
}

/**
 * 内部熟練度120として扱うかどうかのチェックボックスを全て変更する
 * @param {*} arg - チェックを入れるかどうか。booleanとして解釈される
 * @return {void}
 */
function prof_check(arg) {
  set_checkbox_value_class("max-prof", arg);
  update();
}

/**
 * 基地航空隊による敵機損耗に関しての詳細表示を切り替える
 * @return {void}
 */
function toggle_pre_lbas_desc() {
  if ($("#toggle-pre-lbas-desc").text()[0] === "＋") {
    $("#toggle-pre-lbas-desc").text("－ 詳細を表示する");
    $("#pre-lbas-description").show("fast");
  } else {
    $("#toggle-pre-lbas-desc").text("＋ 詳細を表示する");
    $("#pre-lbas-description").hide("fast");
  }
}

/**
 * 敵艦スロット情報の表示を更新する
 * @return {void}
 */
function update_enemy_detail() {
  var eship_val = $("#enemy-detail").val();
  if (eship_val === "0") {
    $("#enemy-detail-right").empty();
    $("#enemy-detail-bottom").text("--- ここに情報が表示されます ---");
    return;
  }
  var eship = eship_table[eship_val];

  var id_string = "1" + (eship.has_multi_ids ? eship.id.join(", 1") : eship.id);
  var right_txt = "　ID: " + id_string + "　制空値: " + eship.fp;
  if (eship.estim && eship.fp) right_txt += "?";
  if (eship.lbas_fp) right_txt += " (" + (eship.fp + eship.lbas_fp) + (eship.estim ? "?" : "") + ")";
  $("#enemy-detail-right").text(right_txt);

  if (eship.aa.length === 0) {
    $("#enemy-detail-bottom").text("--- 敵艦情報不明 ---");
    return;
  }

  var bottom_txt = "";
  eship.aa.forEach(function (a, i) {
    if (i) bottom_txt += "<br>";
    bottom_txt += "スロット" + (i + 1) + " [搭載" + eship.space[i] + "]: ";
    if (a < 0) bottom_txt += "<偵察機> ";
    var slot_fp = Math.floor(Math.abs(a) * Math.sqrt(eship.space[i]));
    bottom_txt += "対空+" + Math.abs(a) + " 制空値";
    bottom_txt += a < 0 ? "0(" + slot_fp + ")" : slot_fp;
  });
  $("#enemy-detail-bottom").html(bottom_txt);
}


/***********************************************************
 *    HTML要素の値の取得・変更
 ***********************************************************/

/**
 * IDの先頭に "#" を付加し、必要に応じて番号を末尾に付加した文字列を返す
 * @param {string} id - 要素のベースID
 * @param {number=} index - 番号を付加する場合はその数値
 * @return {string} HTML上のIDを表す文字列
 */
function id_str(id, index) {
  if (index == null) return "#" + id;
  return "#" + id + index;
}

/**
 * input/select要素の値を取得し、input_dataを更新する
 * @param {string} id - 要素のベースID
 * @param {number=} index - 番号
 * @return {string} 取得した値
 */
function get_value(id, index) {
  var value = $(id_str(id, index)).val();
  if (index == null)
    return (input_data[id] = value);
  return (input_data[id][index] = value);
}

/**
 * input/select要素の値を変更し、input_dataを更新する
 * @param {string} id - 要素のベースID
 * @param {?number} index - 番号
 * @param {*} value - 更新する値
 * @return {string} 引数valueと同じ (ただし文字列に変換される)
 */
function set_value(id, index, value) {
  var value_str = String(value);
  $(id_str(id, index)).val(value_str);
  if (index == null)
    return (input_data[id] = value_str);
  return (input_data[id][index] = value_str);
}

/**
 * 特定のクラスのinput/select要素の値すべてを変更し、input_dataを更新する
 * @param {string} class_name - 要素のクラス名
 * @param {*} value - 更新する値
 * @return {string} 引数valueと同じ (ただし文字列に変換される)
 */
function set_value_class(class_name, value) {
  var value_str = String(value);
  var $class = $("." + class_name).val(value_str);
  input_data[class_name] = [];
  for (var i = 0; i < $class.length; ++i)
    input_data[class_name][i] = value_str;
  return value_str;
}

/**
 * input[type="radio"]要素の値を取得し、input_dataを更新する
 * @param {string} name - 要素のname
 * @return {string} 取得した値
 */
function get_radio_value(name) {
  var value = $("input[name='" + name + "']:checked").val();
  return (input_data[name] = value);
}

/**
 * input[type="radio"]要素の値を変更し、input_dataを更新する
 * @param {string} name - 要素のname
 * @param {*} value - 更新する値
 * @return {string} 引数valueと同じ (ただし文字列に変換される)
 */
function set_radio_value(name, value) {
  var value_str = String(value);
  $("input[name='" + name + "']").val([value_str]);
  return (input_data[name] = value_str);
}

/**
 * input[type="checkbox"]要素の値を取得し、input_dataを更新する
 * @param {string} id - 要素のベースID
 * @param {number=} index - 番号
 * @return {boolean} 取得した値
 */
function get_checkbox_value(id, index) {
  var value = $(id_str(id, index)).prop("checked");
  if (index == null)
    return (input_data[id] = value);
  return (input_data[id][index] = value);
}

/**
 * input[type="checkbox"]要素の値を変更し、input_dataを更新する
 * @param {string} id - 要素のベースID
 * @param {?number} index - 番号
 * @param {*} value - 更新する値 (booleanとして解釈される)
 * @return {boolean} 引数valueと同じ (ただしbooleanに変換される)
 */
function set_checkbox_value(id, index, value) {
  var value_bool = !!value;
  $(id_str(id, index)).prop("checked", value_bool);
  if (index == null)
    return (input_data[id] = value_bool);
  return (input_data[id][index] = value_bool);
}

/**
 * 特定のクラスのinput[type="checkbox"]要素の値すべてを変更し、input_dataを更新
 * @param {string} class_name - 要素のクラス名
 * @param {*} value - 更新する値 (booleanとして解釈される)
 * @return {boolean} 引数valueと同じ (ただしbooleanに変換される)
 */
function set_checkbox_value_class(class_name, value) {
  var value_bool = !!value;
  var $class = $("." + class_name).prop("checked", value_bool);
  input_data[class_name] = [];
  for (var i = 0; i < $class.length; ++i)
    input_data[class_name][i] = value_bool;
  return value_bool;
}

/**
 * input[type="number"]要素に入力された数値を取得し、input_dataを更新する。
 * 数値は非負かつ指定した最大値以下の整数に制限される
 * @param {string} id - 要素のベースID
 * @param {?number} index - 番号
 * @param {number} max - 許容する数値の最大値
 * @return {number} 取得した数値
 */
function get_number(id, index, max) {
  var v = $(id_str(id, index)).val();
  if (v === "") {
    set_value(id, index, "");
    return 0;
  }
  var num = +v;
  if (isNaN(num)) num = 0;
  num = Math.min(Math.max(Math.floor(num), 0), max);
  set_value(id, index, num);
  return num;
}


/***********************************************************
 *    登録編成管理
 ***********************************************************/

/**
 * sessionStorage および localStorage が利用できるかどうか確認する
 * @return {boolean} 両方利用できる場合に真
 */
function check_storage() {
  try {
    var item = "__test__";
    sessionStorage.setItem(item, item);
    sessionStorage.removeItem(item);
    localStorage.setItem(item, item);
    localStorage.removeItem(item);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * ローカルストレージに保存されている登録編成群を読み込む
 * @return {void}
 */
function load_local_storage() {
  if (!support_storage) return;
  var data_str = localStorage.getItem("kcc-as-data");
  if (data_str == null) return;
  var $data_list = $("#data-list").empty();
  JSON.parse(data_str).forEach(function (p) {
    $data_list.append($("<option>").text(p[0]).val(p[1]));
  });
  $data_list.children().first().prop("selected", true);
  $("#load-data").prop("disabled", false);
  $("#remove-data").prop("disabled", false);
}

/**
 * 現在選択されている登録編成を読み込む
 * @return {void}
 */
function load_data() {
  var $selected = $("#data-list option:selected");
  load_data_code($selected.val());
  $("#save-name").val($selected.text());
  show_tooltip("load-data", "編成を読み込みました", 2500);
}

/**
 * 現在選択されている登録編成を削除する
 * @return {void}
 */
function remove_data() {
  if (!enable_data_removal) {
    show_tooltip(
      "remove-data",
      "本当に編成を削除しますか？<br>削除する場合はもう一度クリックしてください",
      6000,
      function () { enable_data_removal = false; }
    );
    enable_data_removal = true;
    return;
  }

  var $data_list = $("#data-list");
  var name = $data_list.children().filter(":selected").text();

  var data = JSON.parse(localStorage.getItem("kcc-as-data"));
  var index = 0;
  for (; index < data.length; ++index)
    if (name === data[index][0]) break;

  data.splice(index, 1);
  $data_list.empty();
  if (data.length === 0) {
    localStorage.removeItem("kcc-as-data");
    $data_list.append($("<option>").text("--- 登録編成なし ---"));
    $("#load-data").prop("disabled", true);
    $("#remove-data").prop("disabled", true);
  } else {
    localStorage.setItem("kcc-as-data", JSON.stringify(data));
    data.forEach(function (p) {
      $data_list.append($("<option>").text(p[0]).val(p[1]));
    });
  }

  $data_list.children().eq(Math.min(index, data.length - 1)).prop("selected", true);
  show_tooltip("remove-data", "編成を削除しました", 2500);
}
var enable_data_removal = false;

/**
 * 現在の編成を保存する
 * @return {void}
 */
function save_data() {
  var name = $("#save-name").val();
  if (name === "") {
    show_tooltip("save-data", "編成名を入力してください", 3000);
    return;
  }

  if (!support_storage) {
    show_tooltip("save-data", "編成の保存に失敗しました:<br>Webストレージが利用できません", 5000);
    return;
  }

  var data_str = localStorage.getItem("kcc-as-data");
  var data, index = 0;

  if (data_str == null) {
    data = [];
    $("#load-data").prop("disabled", false);
    $("#remove-data").prop("disabled", false);
  } else {
    data = JSON.parse(data_str);
    for (; index < data.length; ++index)
      if (name === data[index][0]) break;
  }

  data[index] = [name, input_data_code];
  localStorage.setItem("kcc-as-data", JSON.stringify(data));

  // localStorageは他のタブからも操作され得るため、編成リストを完全に作り直す
  var $data_list = $("#data-list").empty();
  data.forEach(function (p) {
    $data_list.append($("<option>").text(p[0]).val(p[1]));
  });
  $data_list.children().eq(index).prop("selected", true);

  show_tooltip("save-data", "編成を保存しました", 2500);
}

/**
 * 現在の編成のURLをコピーする
 * @return {void}
 */
function copy_url() {
  // iOS Safari対策
  if (navigator.userAgent.match(/iP(hone|ad|od)/)) {
    var range = document.createRange();
    range.selectNodeContents($("#data-url")[0]);
    var selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    $("#data-url")[0].setSelectionRange(0, 9999);
  } else {
    $("#data-url").select();
  }

  if (document.execCommand("copy"))
    show_tooltip("copy-url", "URLをクリップボードにコピーしました", 2500);
  else
    show_tooltip("copy-url", "URLをコピーできませんでした:<br>テキストボックスを手動でコピーしてください", 5000);
}


/***********************************************************
 *    input_data <=> 数値シーケンス 間の変換
 ***********************************************************/

/**
 * グローバル変数input_dataの初期化を行う。
 * URLパラメータがあるか、セッションストレージにデータがある場合はロードも行う
 * @return {void}
 */
function init_input_data() {
  function make_array(len, value) {
    var ary = new Array(len);
    for (var i = 0; i < len; ++i) ary[i] = value;
    return ary;
  }

  var d = input_data;

  d.ship = make_array(6, "0");
  d["disp-ship-num"] = "4";
  d.eq = make_array(24, "0");
  d.prof = make_array(24, "7");
  d.star = make_array(24, "0");
  d.num = make_array(24, "");
  d["range-input"] = make_array(4, "4");
  d.map = "0";
  d.node = "0";
  d.eship = make_array(6, "0");
  d["efp-input"] = make_array(6, "0");
  d["max-prof"] = [true, false, false, true, false,
                   true, false, false, false, false, false];
  d["enable-pre-lbas"] = false;
  d["pre-lbas"] = make_array(6, "0");

  var url_code = get_url_params().c;
  var session_code = support_storage ?
                     sessionStorage.getItem("kcc-as-code") :
                     null;
  update_data_code();

  // URLパラメータに不正なコードが仕込まれる危険性に注意する
  if (url_code != null) {
    try {
      load_data_code(url_code);
    } catch (e) {
      load_data_code(session_code || input_data_code);
    }
    return;
  }

  if (session_code != null) {
    load_data_code(session_code);
    return;
  }

  update();
}

/**
 * 現在の入力内容に応じてinput_data_codeを更新する。
 * sessionStorageへの保存およびURL欄の更新も行う
 * @return {void}
 */
function update_data_code() {
  var e = new CodeEncoder();
  e.push_number(code_version);
  e.push_number(event_id);

  var i;
  var d = input_data;

  for (i = 0; i < 6; ++i)
    e.push_number(d.ship[i]);
  e.push_number(d["disp-ship-num"]);

  for (i = 0; i < 24; ++i)
    e.push_number(d.eq[i]);
  for (i = 0; i < 24; ++i)
    e.push_number(7 - d.prof[i]);
  for (i = 0; i < 24; ++i)
    e.push_number(d.star[i]);
  for (i = 0; i < 24; ++i)
    e.push_number(+d.num[i]);
  for (i = 0; i < 4; ++i)
    e.push_number(d["range-input"][i]);

  e.push_number(d.map);
  e.push_number(d.node);

  for (i = 0; i < 6; ++i)
    e.push_number(d.eship[i] >= 500 ? d.eship[i] - 500 : d.eship[i]);
  for (i = 0; i < 6; ++i)
    e.push_number(d["efp-input"][i]);

  for (i = 0; i < 11; ++i)
    e.push_number(+d["max-prof"][i]);

  e.push_number(+d["enable-pre-lbas"]);
  for (i = 0; i < 6; ++i)
    e.push_number(d["pre-lbas"][i]);

  input_data_code = e.generate_code();
  if (support_storage)
    sessionStorage.setItem("kcc-as-code", input_data_code);
  $("#data-url").val("http://kancollecalc.web.fc2.com/air_supremacy.html?c=" + input_data_code);
}

/**
 * コードを読み込み入力内容を変更する
 * @param {string} code - エンコードされたコード
 * @return {void}
 * @throws {Error} コードが不正な場合
 */
function load_data_code(code) {
  var i, n;
  var d = new CodeDecoder(code);
  var version = d.pop_number();
  if (version !== 1)
    throw new Error("load_data_code: invalid version number: " + version);
  var is_same_event_id = event_id === d.pop_number();

  for (i = 0; i < 6; ++i) {
    n = d.pop_number();
    if (ship_table[n] != null)
      set_value("ship", i, ship_table[n].first_id);
    else
      set_value("ship", i, 0);
    set_ship(i);
  }
  n = d.pop_number();
  if (n !== 4 && n !== 6) n = 4;
  set_radio_value("disp-ship-num", n);

  for (i = 0; i < 24; ++i) {
    n = d.pop_number();
    if (eq_table[n] == null) n = 0;
    set_value("eq", i, n);
  }
  for (i = 0; i < 24; ++i)
    set_value("prof", i, Math.max(7 - d.pop_number(), 0));
  for (i = 0; i < 24; ++i)
    set_value("star", i, Math.min(d.pop_number(), 10));
  for (i = 0; i < 24; ++i)
    set_value("num", i, Math.min(d.pop_number(), 999) || "");
  for (i = 0; i < 4; ++i)
    set_value("range-input", i, Math.min(d.pop_number(), 20));

  n = d.pop_number();
  if (map_table[n] == null || (n < 10 && !is_same_event_id)) n = 0;
  set_value("map", null, n);
  set_map();
  n = d.pop_number();
  if (node_table[n] == null) n = 0;
  set_value("node", null, n);
  set_node();

  for (i = 0; i < 6; ++i) {
    n = d.pop_number();
    if (eship_table[n + 500] != null)
      set_value("eship", i, eship_table[n + 500].first_id);
    else
      set_value("eship", i, +(n === 1));
  }
  for (i = 0; i < 6; ++i)
    set_value("efp-input", i, Math.min(d.pop_number(), 999));

  for (i = 0; i < 11; ++i)
    set_checkbox_value("max-prof", i, d.pop_number());

  set_checkbox_value("enable-pre-lbas", null, d.pop_number());
  for (i = 0; i < 6; ++i) {
    n = d.pop_number();
    set_value("pre-lbas", i, [0, 1, 4, 6, 8, 10].indexOf(n) >= 0 ? n : 0);
  }

  if (d.pop_test())
    throw new Error("load_data_code: code contains too many elements");

  update();
}

/**
 * URLのパラメータを取得する
 * @return {Object} URLパラメータの連想配列
 */
function get_url_params() {
  var search_str = $(location).attr("search");
  if (search_str === "") return {};
  var params = {};
  search_str.slice(1).split("&").forEach(function (s) {
    var p = s.split("=");
    params[p[0]] = p[1];
  });
  return params;
}


/***********************************************************
 *    Base64コード生成・復号器
 ***********************************************************/

/**
 * 0～63までの整数を引数に取り、(URL-safe) Base64の文字に変換する
 * @param {number} num - 0～63までの整数
 * @return {string} Base64に変換された文字
 * @throws {RangeError} 入力が0～63の範囲外の場合
 */
function encode_base64_char(num) {
  if (0 <= num && num < 26)
    return String.fromCharCode("A".charCodeAt() + num);
  if (26 <= num && num < 52)
    return String.fromCharCode("a".charCodeAt() + num - 26);
  if (52 <= num && num < 62)
    return String.fromCharCode("0".charCodeAt() + num - 52);
  if (num === 62)
    return "-";
  if (num === 63)
    return "_";
  throw new RangeError("encode_base64_char: invalid argument: " + num);
}

/**
 * (URL-safe) Base64の文字を1文字引数に取り、数値に変換する
 * @param {string} char - 入力の文字 (1文字)
 * @return {number} 変換後の数値
 * @throws {Error} 入力が (URL-safe) Base64に存在しない文字の場合
 */
function decode_base64_char(char) {
  var char_code = char.charCodeAt();
  var code_A = "A".charCodeAt();
  var code_a = "a".charCodeAt();
  var code_0 = "0".charCodeAt();
  if (code_A <= char_code && char_code < code_A + 26)
    return char_code - code_A;
  if (code_a <= char_code && char_code < code_a + 26)
    return char_code - code_a + 26;
  if (code_0 <= char_code && char_code < code_0 + 10)
    return char_code - code_0 + 52;
  if (char === "-")
    return 62;
  if (char === "_")
    return 63;
  throw new Error("decode_base64_char: invalid argument: " + char);
}

/*
 * コードフォーマット:
 *   - 各文字はBase64でエンコードされた3桁の4進数として解釈する
 *   - リトルエンディアン (?)
 *   - 4進数の0～2を用いて非負整数を3進数で記録する
 *   - 区切り文字として4進数の3を用いる
 */

/**
 * 非負整数のシーケンス -> Base64文字列の生成器を作成する
 * @constructor
 */
function CodeEncoder() {
  this.code = "";
  this.last_code = 0;
  this.shift = 6;
}

/**
 * エンコーダに0～3の整数を追加する (private)
 * @private
 * @param {number} num - 0～3の整数
 * @return {void}
 */
CodeEncoder.prototype._push_number_internal = function (num) {
  this.last_code += num << (this.shift -= 2);
  if (this.shift === 0) {
    this.code += encode_base64_char(this.last_code);
    this.last_code = 0;
    this.shift = 6;
  }
};

/**
 * エンコーダに非負整数を追加する
 * @param {number|string} num - 入力の非負整数
 * @return {void}
 * @throws {Error} 入力が非負整数でない場合
 */
CodeEncoder.prototype.push_number = function (num) {
  var n = +num;
  if (!$.isNumeric(num) || n < 0 || n !== Math.floor(n))
    throw new Error("CodeEncoder: add_number: invalid argument: " + num);
  while (n > 0) {
    this._push_number_internal(n % 3);
    n = Math.floor(n / 3);
  }
  this._push_number_internal(3);
};

/**
 * Base64にエンコードされた文字列を取得する
 * @return {string} Base64にエンコードされた文字列
 */
CodeEncoder.prototype.generate_code = function () {
  return this.code + (this.last_code ? encode_base64_char(this.last_code): "");
};

/**
 * Base64文字列 -> 非負整数のシーケンスの生成器を作成する
 * @param {string} code - デコードする (URL-safe) Base64文字列
 * @constructor
 * @throws {TypeError} 引数が文字列でない場合
 */
function CodeDecoder(code) {
  if (typeof code !== "string")
    throw new TypeError("CodeDecoder: Constructor: invalid argument: " + code);
  this.code = code;
  this.reading_code = 0;
  this.pos = -1;
  this.shift = 0;
}

/**
 * デコーダから0～3の整数を1桁取得する (private)
 * @private
 * @return {number} 0～3の整数、またはこれ以上数値を取得できない場合は-1
 */
CodeDecoder.prototype._pop_number_internal = function () {
  if (this.shift === 0) {
    if (this.pos === this.code.length - 1) return -1;
    this.reading_code = decode_base64_char(this.code[++this.pos]);
    this.shift = 6;
  }
  return (this.reading_code >> (this.shift -= 2)) & 3;
};

/**
 * デコーダから数値を取得する
 * @return {number} 取得した数値
 * @throws {Error} 数値を取得できなかった場合
 */
CodeDecoder.prototype.pop_number = function () {
  var ret = 0, base = 1;
  while (true) {
    var n = this._pop_number_internal();
    if (n === 3) return ret;
    if (n === -1) throw new Error("CodeDecoder: pop_number: reached end of code");
    ret += base * n;
    base *= 3;
  }
};

/**
 * デコーダから数値を取得できるかどうかをテストする
 * @return {boolean} 数値を取得できるかどうか
 */
CodeDecoder.prototype.pop_test = function () {
  return this.pos !== this.code.length - 1 ||
         this.reading_code % (1 << this.shift) !== 0;
};


/***********************************************************
 *    ツールチップ表示
 ***********************************************************/

/**
 * ツールチップを表示する
 * @param {string} target_id - ツールチップを表示させるHTML要素のID
 * @param {string} message - 表示する文字列。HTMLタグが利用可能
 * @param {number=} timeout - ツールチップを timeout [ms] 表示したら消す
 * @param {Function=} callback - ツールチップを消す際に呼ばれる関数
 * @return {void}
 */
function show_tooltip(target_id, message, timeout, callback) {
  var $prev_tooltip = $(".tooltip-content");
  if ($prev_tooltip.length)
    $prev_tooltip.data("complete")();

  var $window = $(window);
  var $target = $("#" + target_id);
  var $tooltip = $("<div>").addClass("tooltip-content");
  var top = false;

  var width = $(".wrapper").width();
  width += +$("body").css("margin-left").slice(0, -2);
  width += +$("body").css("margin-right").slice(0, -2);
  width = Math.max(width, $(window).width());

  $tooltip.css("opacity", 0).html(message).appendTo("body");
  $tooltip.width(Math.min(+$tooltip.width() + 2, 360));

  var pos_left = $target.offset().left + ($target.outerWidth() / 2) - ($tooltip.outerWidth() / 2);
  var pos_top = $target.offset().top - $tooltip.outerHeight() - 20;

  if (pos_left - $window.scrollLeft() < 0) {
    pos_left = $target.offset().left + $target.outerWidth() / 2 - 20;
    $tooltip.addClass("left");
  }

  if (pos_left + $tooltip.outerWidth() - $window.scrollLeft() > width) {
    pos_left = $target.offset().left - $tooltip.outerWidth() + $target.outerWidth() / 2 + 20;
    $tooltip.addClass("right");
  }

  if (pos_top - $window.scrollTop() < 0) {
    top = true;
    pos_top = $target.offset().top + $target.outerHeight() + 20;
    $tooltip.addClass("top");
  }

  $tooltip.css({ left: pos_left, top: pos_top });
  $tooltip.animate({ top: top ? "-=10" : "+=10", opacity: 1 }, 100);

  var removed = false;
  function remove_tooltip() {
    if (removed) return;
    removed = true;
    $tooltip.animate({ top: top ? "+=10" : "-=10", opacity: 0 }, 90, function() { $tooltip.remove(); });
    $target.off("mouseleave.tooltip");
    if (callback != null) callback();
  }

  $target.on("mouseleave.tooltip", remove_tooltip);
  $tooltip.data("complete", remove_tooltip);
  if (timeout != null) setTimeout(remove_tooltip, timeout);
}


/***********************************************************
 *    実行コード
 ***********************************************************/

init();
