/**
 * [inputFormHTML description]
 * @param  {[type]} category [description]
 * @return {[type]}      [description]
 */
function displayBase() {
    let html = "";
    html += setFleet("base",0,3,4);

    document.write(html);
}

function displayShip() {
    let html = "";

    html += "<div id='tab-fleet'>"
    html += "<ul>"
    for (let i=0; i<3; i++) {
        let num = i+1;
        html += "<li><a href='#fleet-" + i + "'>" + num + "</a></li>";
    }
    html += "</ul>";
    for (i=0; i<3; i++) {
        html += "<div class='input-content' id='fleet-" + i + "'>"
        if (i==2) {
            html += setFleet("ship",i,7,6);
        } else {
            html += setFleet("ship",i,6,6);
        }
        html += "</div>"
    }
    html += "</div>";
    document.write(html);
}

function setFleet(type, fleet, line, item) {
// function setFleet(type, line, item, start) {
    let html = "";
    let skill = ["-","\\","\\\\","\\\\\\","/","//","///",">>"]

    let start = fleet*6
    let end =  fleet*6 + line
    for (let i=start; i<end; i++) {
        let num = i+1;
        html += "<div class='input-line'>";    // 1行分
        html += "<div class='" + type + "'>";           // target
        html += "<div class='top'>"             // targetの上部
        html += "<div class='input-group'>"
        html += "<div class='input-group-prepend'><button class='btn btn-secondary remove' onclick=\"removeItem('" + type + "'," + i + ")\">×</button></div>"
        html += "<input class='airpower form-control' id='airpower-" + type + "-" + i + "' value='0' onpaste='return false' oncontextmenu='return false'>"
        if (type == "base") {
            html += "<div class='input-group-append'><span class='radius' id='radius-" + i + "'>0</span></div>"
            html += "</div>"
        } else {
            html += "</div>"
            html += "<select class='grade selectpicker' id='grade-" + i + "'><option value='0'>-</option></select>"
        }
        html += "</div>"     // targetの上部
        if (type == "base") {
            html += "<div class='base-name' id='base-name-" + i + "' draggable='true'>基地航空隊" + num + "</div>"
        } else {
            html += "<div class='ship-name' id='ship-name-" + i + "' draggable='true'>艦娘" + num + "</div>"
        }
        html += "</div>"    // target
        for (let j=0; j<item; j++) {
            // num = i*item+j;
            if (type == "ship") {
                if (j==0) {
                    html += "<div class='equipment-main' id='equipment-main-" + i + "'>"
                } else if (j==4){
                    html += "<div class='equipment-sub' id='equipment-sub-" + i + "'>"
                }
            }
            html += "<div class='equipment' id='equipment-" + type + "-" + i + "-" + j + "'>"   // equipment
            html += "<div class='top'>" // equipmentの上部
            html += "<div class='input-group'>"
            html += "<div class='input-group-prepend'>"
            html += "<button class='btn btn-secondary remove' onclick=\"removeItem('" + type + "'," + i + "," + j + ")\">×</button></div>"
            html += "<span class='airpower' id='airpower-" + type + "-" + i + "-" + j + "'>0</span>"    // equipmentの上部左側
            if (type == "base") {
                html += "<span class='radius' id='radius-" + i + "-" + j + "'>0</span>"
            }
            html += "</div>"
            html += "<select class='improvement selectpicker' id='improvement-" + type + "-" + i + "-" + j + "'>" // equipmentのimprovement
            for (let k=0; k<=10; k++) {
                html += "<option value='" + k + "'>★" + k + "</option>";
            }
            html += "</select>";    // equipmentのimprovement
            html += "<select class='skill selectpicker' id='skill-" + type + "-" + i + "-" + j + "'>"   // equipmentのskill
            for (k=0; k<=7; k++) {
                html += "<option value='" + k + "'>" + skill[k] + "</option>"
            }
            html += "</select>";    // equipmentのskill
            html += "</div>"        // equipmentの上部
            html += "<div class='bottom'>"  // equipmentの下部
            if (type == "base") {
                html += "<div class='equipment-name-" + type + "' id='equipment-name-" + type + "-" + i + "-" + j + "'>&nbsp;装備選択" + "</div>" // equipmentの下部左部
                html += "<select class='space-" + type + " selectpicker' id='space-" + type + "-" + i + "-" + j + "'>"
                for (k=18; k>=0; k--) {
                    html += "<option value='" + k + "'>" + k + "</option>"
                }
            } else {
                html += "<div class='equipment-name-" + type + "' id='equipment-name-" + type + "-" + i + "-" + j + "'></div>" // equipmentの下部左部
                html += "<select class='space-" + type + " selectpicker' id='space-" + type + "-" + i + "-" + j + "'>"
                html += "<option value='0'>0</option>"
            }
            html += "</select>"
            html += "</div>"        // equipmentの下部
            html += "</div>"        // equipment

            if (type == "ship") {
                if (j==3) {
                html += "<div class='equipment-toggle' id='next-" + i + "'><img src='img/next.png' width='25' heigth='25'></div>"  // nextアイコン
                    html += "</div>"
                } else if (j==5) {
                    html += "<div class='equipment-toggle' id='prev-" + i + "'><img src='img/prev.png' width='25' heigth='25'></div>"  // nextアイコン
                    html += "</div>"
                }
            }
        }
        html += "</div>"    // 1行分
    }
    return html;
}


/**
 * [enemyFleetHTML description]
 * @return {[type]} [description]
 */
function displayMap() {
    let html = "";
    let text = "";

    html += "<div id='map-content-left'>";
    html += "<div class='form-check-inline'>"
    html += "<select class='selectpicker area' id='map-area'>";
    html += "<option value='0'>海域</option>"
    Object.keys(data_map).forEach(function(key){
        switch (key) {
            case "6":
                html += "<optgroup label='通常海域'>"
                Object.keys(data_map[key]).forEach(function(key2){
                    text = key + "-" + key2
                    html += "<option value='" + text + "'>" + text + "</option>"
                });
                html += "</optgroup>"
                break;
            default:
                Object.keys(data_map[key]).forEach(function(key2){
                    text = key + "-" + key2
                    html += "<option value='" + text + "'>" + text + "</option>"
                });
        }

    });
    html += "</select>"
    html += "<div class='form-check-inline' id='difficulty'>"
    html += "<label class='form-check-label'><input class='form-check-input' type='radio' name='difficulty' value='0' checked>甲</label>"
    html += "<label class='form-check-label'><input class='form-check-input' type='radio' name='difficulty' value='1'>乙</label>"
    html += "<label class='form-check-label'><input class='form-check-input' type='radio' name='difficulty' value='2'>丙</label>"
    html += "<label class='form-check-label'><input class='form-check-input' type='radio' name='difficulty' value='3'>丁</label>"
    html += "</div>"
    html += "</div>"
    html += "<p id='map-img'></p>"
    html += "</div>";

    html += "<div id='map-content-right'>"
    html += "<div class='form-check-inline'>"
    html += "<select class='selectpicker cell' id='map-cell'><option value='0' selected>マス</option></select>"
    html += "<div class='form-check-inline' id='enemy-fleet-step'>"
    html += "<label class='form-check-label'><input class='form-check-input' type='radio' name='enemy-fleet-step' value='0' checked>前哨戦</label>"
    html += "<label class='form-check-label'><input class='form-check-input' type='radio' name='enemy-fleet-step' value='1'>ラスダン</label>"
    html += "</div>"
    html += "</div>"

    html += "<table id='info-enemy-fleet'>"; // table全体
    html += "<tr>";        // ヘッダー部
    html += "<th class='column-name'>第一艦隊</th><th class='column-airpower'>制空</th><th class='column-name'>第二艦隊</th><th class='column-airpower'>制空</th>"
    html += "</tr>"                             // ヘッダー部
    for (let i=0; i<6; i++) {
        let num = i+6;
        html += "<tr>"      // データ部
        html += "<td><div class='enemy-name' id='enemy-name-" + i + "'></div></td>"
        html += "<td id='airpower-enemy-" + i + "'></td>"
        // html += "<td><input type='number' class='airpower form-control' id='airpower-enemy-" + i + "'></td>"
        html += "<td><div class='enemy-name' id='enemy-name-" + num + "'></div></td>"
        html += "<td id='airpower-enemy-" + num + "'></td>"
        // html += "<td><input type='number' class='airpower form-control' id='airpower-enemy-" + num + "'></td>"
        html += "</tr>"     // データ部
    }
    html += "</table>"      // table全体
    html += "</div>"
    // document.write(html);
    return html;
}

function displayResultOption() {
    let html = "";
    let label_list = ["第一航空隊&ensp;1波","2波","第二航空隊&ensp;1波","2波","第三航空隊&ensp;1波","2波"]
    let tooltip_downRate = "制空状態による撃墜数の割合（e.g.優勢時は0～80%）を変動します。"
    for (let i=0; i<6; i++) {
        if (i%2 == 0) {
            if (i === 0) html += "<div class='form-check form-check-inline' style='width:100%'><div data-toggle='tooltip' title='" + tooltip_downRate + "' id='detail-downRate' style='width:72px;border-bottom: 1px dotted black;'>撃墜率調整</div>"
            if (i != 0) html += "<div class='form-check form-check-inline' style='width:100%;margin-top:30px;'><div style='width:72px'></div>"
            html += "<label class='activate-base-label'>" + label_list[i] + "</label>";
        } else {
            html += "<label class='form-check-label' style='margin-left:20px;'>" + label_list[i] + "</label>";
        }
        html += "<input class='downRate' id='downRate-" + i + "' type='text'/>"

        if (i%2 === 1) html += "</div>";
    }
    html += "<div id='downRate-label'><span style='margin-left:192px'>0%</span><span style='margin-left:52px;'>50%</span><span style='margin-left:43px;'>100%</span><span style='margin-left:30px;'>0%</span><span style='margin-left:52px;'>50%</span><span style='margin-left:43px;'>100%</span></div>"
    document.write(html);
}

function displayListEquipment() {
    let html = "";
    let html_tab = "";
    let html_content = "";
    let html_info = "";
    let tab = tab_type_equipment;
    let type_name, data_id, tab_type, tab_id, list_id, list_name, id_list, data, info_id, item_id, range, i, j, k;

    html += "<div class='dialog-left'>";   // dialogの左側全体
    html_tab += "<ul class='nav nav-pills' role='tablist' style='width:450px;'>";                    // 上部のタブ部分
    html_content += "<div class='btn-toolbar' role='toolbar'>"
    html_content += "<div class='btn-group' role='group'>"
    html_content += "<button type='button' class='btn btn-primary btn-sm dialog-remove'>外す</button>";
    html_content += "</div>"
    html_content += "<div class='btn-group action' role='group'>"
    html_content += "<button type='button' class='btn btn-primary btn-sm' id='btn-select-equipment' onclick=\"selectItem(\'equipment\')\" disabled>OK</button>"
    html_content += "<button type='button' class='btn btn-primary btn-sm' onclick=\"$(\'#dialog-select-equipment\').dialog(\'close\')\">キャンセル</button>"
    html_content += "</div>"
    html_content += "</div>"
    html_content += "<div class='data-list tab-content'>";    // 下部の全一覧リスト
    html_info += "<div class='dialog-right tab-content'>"

    for (i=0; i<tab.length; i++) {
        type_name = data_equipment_type_ship[tab[i][0]].name;
        data_id = data_equipment_id_ship;
        switch (type_name) {
            case "小口径主砲":
                type_name = "主砲";
                break;
            case "副砲":
                type_name = "副砲";
                break;
            case "魚雷":
                type_name = "魚雷";
                break;
            case "ソナー":
                type_name = "対潜";
                break;
            case "対空強化弾":
                type_name = "強化弾";
                break;
            case "小型電探":
                type_name = "電探";
                break;
            case "探照灯":
                type_name = "夜戦";
                break;
            case "水上偵察機":
                type_name = "水上機";
                break;
            case "艦上戦闘機":
                type_name = "艦上機";
                break;
            case "機関部強化":
                type_name = "補強";
                break;
            case "上陸用舟艇":
                type_name = "大発";
                break;
            case "陸上攻撃機":
                type_name = "基地";
                break;
            default:
                type_name = "特殊";
                break;
        }
        tab_type = "tab-equipment-" + i;
        tab_id = [];
        list_id = [];
        list_name = [];
        id_list = [];

        for (j=0; j<tab[i].length; j++) {
            tab_id.push("tab-equipment-" + i + "-" + tab[i][j]);
            list_id.push("list-equipment-" + tab[i][j]);
            list_name.push(data_equipment_type_ship[tab[i][j]].name);
            id_list.push(data_equipment_type_ship[tab[i][j]].id);
        }

        html_tab += "<li class='nav-item dropdown' id='" + tab_type + "'>"
        html_tab += "<a class='nav-link dropdown-toggle' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'>" + type_name + "</a>"
        html_tab += "<div class='dropdown-menu'>"
        for (j=0; j<list_id.length; j++) {
            html_tab += "<a class='dropdown-item' id='" + tab_id[j] + "' data-toggle='pill' href='#" + list_id[j] + "'>" + list_name[j] + "</a>"

            html_content += "<div id='" + list_id[j] + "' class='tab-pane'>";     // 一覧リストの1つ
            html_content += "<div class='list-group'>";   // 一覧リスト
            for (k=0; k<id_list[j].length; k++) {
                data = data_id[id_list[j][k]];
                info_id = "info-equipment-" + tab[i][j] + "-" + id_list[j][k]
                item_id = list_id[j] + "-" + id_list[j][k]

                html_content += "<a href='#" + info_id + "' data-toggle='pill' class='list-group-item list-group-item-action' id='" + item_id + "'>" + data.name + "</a>"
                // let size = getFontSize(data.name, 30, "Meiryo UI", 350)

                html_info += "<div class='tab-pane' id='" + info_id + "'>";
                html_info += "<span class='select-name'>" + data.name + "</span>";
                html_info += "<table class='info-data'>";
                html_info += "<tr><td class='item'>火力</td><td class='value'>" + data.firePower + "</td><td class='item'>雷装</td><td class='value'>" + data.torpedo + "</td></tr>";
                html_info += "<tr><td>対空</td><td>" + data.antiAir + "</td><td>装甲</td><td>" + data.armor + "</td></tr>";
                html_info += "<tr><td>対潜</td><td>" + data.asw + "</td><td>回避</td><td>" + data.evasion + "</td></tr>";
                html_info += "<tr><td>索敵</td><td>" + data.los + "</td><td>命中</td><td>" + data.accuracy + "</td></tr>";
                if (i == 7 || i== 8 || i == 11) {
                    html_info += "<tr><td class='item'>行動半径</td><td class='value'>" + data.radius + "</td><td class='item'>爆装</td><td class='value'>" + data.bombing + "</td></tr>";
                }
                if (i == 11) {
                    html_info += "<tr><td class='item'>対爆</td><td class='value'>" + data.antiBobing + "</td><td class='item'>迎撃</td><td class='value'>" + data.interception + "</td></tr>";
                }
                switch (data.range) {
                    case 1:
                        range = "短";
                        break;
                    case 2:
                        range = "中";
                        break;
                    case 3:
                        range = "長";
                        break;
                    case 4:
                        range = "超長";
                        break;
                    default:
                        range = "短";
                }
                html_info += "<tr><td>射程</td><td colspan='3'>" + range + "</td>";
                html_info += "</table>"
                html_info += "<p class='info-img'><img src='img/equipment/item/" + ('000' + Number(id_list[j][k])).slice(-3) + ".png' /></p>"
                html_info += "</div>";
            }
            html_content += "</div>";   // 一覧リスト
            html_content += "</div>";   // 一覧リストの1つ
        }
        html_tab += "</div>"
        html_tab += "</li>"
    }
    html_tab += "</ul>"         // 上部のタブ部分
    html_content += "</div>";           // 下部の全一覧リスト
    html_info += "</div>";
    html += html_tab + html_content;
    html += "</div>"            // dialogの左側全体

    html += html_info;
    return html;
}


function displayListShip() {
    let html = "";
    let html_tab = "";
    let html_content = "";
    let html_info = "";
    let tab = tab_type_ship;
    let type_name, data_id, tab_type, tab_id, list_id, list_name, id_list, data, info_id, item_id, range, speed, i, j, k, l;

    html += "<div class='dialog-left'>";   // dialogの左側全体
    html_tab += "<ul class='nav nav-pills' role='tablist' style='width:450px;'>";                    // 上部のタブ部分
    html_content += "<div class='btn-toolbar' role='toolbar'>"
    html_content += "<div class='btn-group' role='group'>"
    html_content += "<button type='button' class='btn btn-primary btn-sm dialog-remove'>外す</button>";
    html_content += "</div>"
    html_content += "<div class='btn-group action' role='group'>"
    html_content += "<button type='button' class='btn btn-primary btn-sm' id='btn-select-ship' onclick=\"selectItem(\'ship\')\" disabled>OK</button>"
    html_content += "<button type='button' class='btn btn-primary btn-sm' onclick=\"$(\'#dialog-select-ship\').dialog(\'close\')\">キャンセル</button>"
    html_content += "</div>"
    html_content += "</div>"
    html_content += "<div class='data-list tab-content'>";    // 下部の全一覧リスト
    html_info += "<div class='dialog-right tab-content'>"

    for (i=0; i<tab.length; i++) {
        if (!Array.isArray(tab[i])) {
            tab_type = "tab-ship-" + i;
            list_id = "list-ship-" + tab[i];
            type_name = data_ship_type[tab[i]].name;
            id_list = data_ship_type[tab[i]].id;
            data_id = data_ship_id;
            switch (type_name) {
                case "軽空母":
                case "軽巡洋艦":
                case "重巡洋艦":
                    type_name = type_name.substr(0,2);
                    break;
                case "正規空母":
                case "装甲空母":
                case "航空戦艦":
                case "航空巡洋艦":
                    type_name = type_name.substr(0,1) + type_name.substr(2,1);
                    break;
                case "重雷装巡洋艦":
                    type_name = type_name.substr(1,1) + type_name.substr(3,1);
                    break;
                case "水上機母艦":
                    type_name = type_name.substr(0,1) + type_name.substr(3,1);
                    break;
            }

            html_tab += "<li class='nav-item' id='" + tab_type + "'>";    // タブの一項目
            html_tab += "<a class='nav-link' data-toggle='pill' href='#" + list_id + "'>" + type_name + "</a>";
            html_tab += "</li>";    // タブの一項目

            html_content += "<div id='" + list_id + "' class='tab-pane'>";     // 一覧リストの1つ
            html_content += "<div class='list-group'>";                          // 一覧リスト

            for (j=0; j<id_list.length; j++) {
                data = data_id[id_list[j]];
                info_id = "info-ship-" + tab[i] + "-" + id_list[j];

                html_content += "<a href='#" + info_id + "' data-toggle='pill' class='list-group-item list-group-item-action'>" + data.name + "</a>";

                html_info += "<div class='tab-pane' id='" + info_id + "'>";
                html_info += "<span class='select-name'>" + data.name + "</span>";
                html_info += "<table class='info-data'>";
                html_info += "<tr><td class='item'>耐久（初期）</td><td class='value'>" + data.HP_min + "</td><td class='item'>耐久（ケッコン）</td><td class='value'>" + data.HP_ring + "</td></tr>";
                html_info += "<tr><td>火力</td><td>" + data.firePower + "</td><td>雷装</td><td>" + data.torpedo + "</td></tr>";
                html_info += "<tr><td>対潜</td><td>" + data.ASW_ring + "</td><td>回避</td><td>" + data.evasion_ring + "</td></tr>";
                html_info += "<tr><td>対空</td><td>" + data.antiAir + "</td><td>装甲</td><td>" + data.armor + "</td></tr>";
                html_info += "<tr><td>運（初期）</td><td>" + data.luck_min + "</td><td>運（最大）</td><td>" + data.luck_max + "</td></tr>";

                switch (data.range) {
                    case 1:
                        range = "短";
                        break;
                    case 2:
                        range = "中";
                        break;
                    case 3:
                        range = "長";
                        break;
                    case 4:
                        range = "超長";
                        break;
                    default:
                        range = "短";
                }
                switch (data.speed) {
                    case 10:
                        speed = "高速";
                        break;
                    default:
                        speed = "低速";
                }
                html_info += "<tr><td>射程</td><td>" + range + "</td><td>速力</td><td>" + speed + "</td></tr>";
                html_info += "<tr>";
                html_info += "<td>機数</td>";
                html_info += "<td colspan='3'>"
                for (k=0; k<data.slot; k++) {
                    html_info += data.space[k];
                    if (k != data.slot-1) {
                        html_info += "/";
                    }
                }
                html_info += "</td>";
                html_info += "</tr>";
                html_info += "</table>"
                html_info += "<p class='info-img'><img src='img/ship/body/" + id_list[j] + ".png' height='430'/></p>"
                html_info += "</div>";
            }
            html_content += "</div>";   // 一覧リスト
            html_content += "</div>";   // 一覧リストの1つ

        } else {
            type_name = data_ship_type[tab[i][0]].name;
            data_id = data_ship_id;
            switch (type_name) {
                case "駆逐艦":
                    type_name = type_name.substr(0,2);
                    tab_type = "tab-ship-" + i;
                    tab_id = [];
                    list_id = [];
                    list_name = [];
                    id_list = [];
                    Object.keys(data_ship_model).forEach(function(key){
                        tab_id.push("tab-ship-" + i + "-" + tab[i][0]);
                        list_id.push("list-ship-" + tab[i][0] + "-" + key);
                        list_name.push(data_ship_model[key].name);
                        id_list.push(data_ship_model[key].id);
                    })
                    break;
                case "巡洋戦艦":
                    type_name = type_name.substr(2,2);
                    tab_type = "tab-ship-" + i;
                    tab_id = [];
                    list_id = [];
                    list_name = [];
                    id_list = [];
                    for (j=0; j<tab[i].length; j++) {
                        tab_id.push("tab-ship-" + i + "-" + tab[i][0]);
                        list_id.push("list-ship-" + tab[i][j]);
                        list_name.push(data_ship_type[tab[i][j]].name);
                        id_list.push(data_ship_type[tab[i][j]].id);
                    }
                    break;
                default:
                    type_name = "特殊";
                    tab_type = "tab-ship-" + i;
                    tab_id = [];
                    list_id = [];
                    list_name = [];
                    id_list = [];
                    for (j=0; j<tab[i].length; j++) {
                        tab_id.push("tab-ship-" + i + "-" + tab[i][0]);
                        list_id.push("list-ship-" + tab[i][j]);
                        list_name.push(data_ship_type[tab[i][j]].name);
                        id_list.push(data_ship_type[tab[i][j]].id);
                    }
                    break;
            }

            html_tab += "<li class='nav-item dropdown' id='" + tab_type + "'>"
            html_tab += "<a class='nav-link dropdown-toggle' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'>" + type_name + "</a>"
            html_tab += "<div class='dropdown-menu'>"
            for (j=0; j<list_id.length; j++) {
                html_tab += "<a class='dropdown-item' id='" + tab_id[j] + "' data-toggle='pill' href='#" + list_id[j] + "'>" + list_name[j] + "</a>"

                html_content += "<div id='" + list_id[j] + "' class='tab-pane'>";     // 一覧リストの1つ
                html_content += "<div class='list-group'>";   // 一覧リスト
                for (k=0; k<id_list[j].length; k++) {
                    data = data_id[id_list[j][k]];
                    info_id = "info-ship-" + tab[i][j] + "-" + id_list[j][k]
                    item_id = list_id[j] + "-" + id_list[j][k]

                    html_content += "<a href='#" + info_id + "' data-toggle='pill' class='list-group-item list-group-item-action' id='" + item_id + "'>" + data.name + "</a>"

                    html_info += "<div class='tab-pane' id='" + info_id + "'>";
                    html_info += "<span class='select-name'>" + data.name + "</span>";
                    html_info += "<table class='info-data'>";
                    html_info += "<tr><td class='item'>耐久（初期）</td><td class='value'>" + data.HP_min + "</td><td class='item'>耐久（ケッコン）</td><td class='value'>" + data.HP_ring + "</td></tr>";
                    html_info += "<tr><td>火力</td><td>" + data.firePower + "</td><td>雷装</td><td>" + data.torpedo + "</td></tr>";
                    html_info += "<tr><td>対空</td><td>" + data.antiAir + "</td><td>装甲</td><td>" + data.armor + "</td></tr>";
                    html_info += "<tr><td>対潜</td><td>" + data.ASW_ring + "</td><td>回避</td><td>" + data.evasion_ring + "</td></tr>";
                    html_info += "<tr><td>運（初期）</td><td>" + data.luck_min + "</td><td>運（最大）</td><td>" + data.luck_max + "</td></tr>";

                    switch (data.range) {
                        case 1:
                            range = "短";
                            break;
                        case 2:
                            range = "中";
                            break;
                        case 3:
                            range = "長";
                            break;
                        case 4:
                            range = "超長";
                            break;
                        default:
                            range = "短";
                    }
                    switch (data.speed) {
                        case 10:
                            speed = "高速";
                            break;
                        default:
                            speed = "低速";
                    }
                    html_info += "<tr><td>射程</td><td>" + range + "</td><td>速力</td><td>" + speed + "</td></tr>";
                    html_info += "<tr>";
                    html_info += "<td>機数</td>";
                    html_info += "<td colspan='3'>"
                    for (l=0; l<data.slot; l++) {
                        html_info += data.space[l];
                        if (l != data.slot-1) {
                            html_info += "/";
                        }
                    }
                    html_info += "</td>";
                    html_info += "</tr>";
                    html_info += "</table>"
                    html_info += "<p class='info-img'><img src='img/ship/body/" + id_list[j][k] + ".png' height='430'/></p>"
                    html_info += "</div>";

                }
                html_content += "</div>";   // 一覧リスト
                html_content += "</div>";   // 一覧リストの1つ
            }
            html_tab += "</div>"
            html_tab += "</li>"
        }
    }

    html_tab += "</ul>"         // 上部のタブ部分
    html_content += "</div>";           // 下部の全一覧リスト
    html_info += "</div>";
    html += html_tab + html_content;
    html += "</div>"            // dialogの左側全体

    html += html_info;
    return html;
}

function displayResultAirPowerInfo() {
    let html = "";
    let top = ["10px", "32px", "54px", "76px", "98px", "120px", "140px"];
    let left = ["55px", "100px", "145px", "220px", "260px", "430px", "470px"];
    for (let i=0; i<7; i++) {
        for (let j=0; j<7; j++) {
            switch (j) {
                case 0:
                case 1:
                case 3:
                case 5:
                    html += "<div class='result-airPower-right' id='result-airPower-" + i + "-" + j + "' style='top:" + top[i] + "; left:" + left[j] + "'></div>"
                    break;
                case 2:
                case 4:
                case 6:
                    html += "<div class='result-airPower-left' id='result-airPower-" + i + "-" + j + "' style='top:" + top[i] + "; left:" + left[j] + "'></div>"
                    break;
            }
        }
    }
    document.write(html);
}
