###“量子代码”
``` javascript
	function companyOnSelect() {
    if (companySelect.combobox("getValue") == "-1") {
        ccList.hide();
        $("#oil").hide();
        $("#timeList").hide();
        return;
    } else {
        $("#timeList").show();
    }
    var com = companySelect.combobox("getText");
    var data = [];
    $.post("/Chart/BLL/HelpHandler.ashx?key=GetCountry&&company=" + com, null, function (d) {
        data = $.parseJSON(d);
        //        data = d;
        data.push({ "id": -1, "text": "全选" });
        cc = $('#cc').combobox({
            valueField: 'id',
            textField: 'text'
        });

    });
    cc.combobox("loadData", data);
    ccList.show();}
```

###Json字符串转Json对象
``` javascript
var obj = $.parseJSON(data); 或 var obj = eval("("+data+")");
```

之后就可以按对象操作如obj[1]、obj["数据"]
###jQuery EasyUI的DataGrid动态列和数据

之前尝试直接用字符串不成功……
``` javascript
    　$("#list").datagrid({

    　　 columns: [eval(colStr)],//columns需要[]包裹一个对象

    　　 fitColumns: true

    　　}).datagrid("loadData", eval(dataStr));//data数据需要一个对象
```

###jQuery EasyUI的ComboBox动态添加列表

```javascript
	var data = [];
     data.push({ "text": "测试", "id": 100 });
     $("#cc").combobox("loadData", data);
```

###jQuery显示和隐藏

　　之前老是把显示写成~~$("#id").display();~~

```javascript
    $("#id").hide();
    $("#id").show();
```