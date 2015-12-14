ORA-01745: 无效的主机/绑定变量名
FROM TO START END 是关键字，所以不能这么写

``` sql
	select * from T_CaCl2 where UNITPRICE>=:PRIFROM AND UNITPRICE<=:PRITO AND IMPMONTH>=:FROM AND IMPMONTH<=:TO;
```


```sql
--按提供的变量排序
select COMPANY as 公司,sum(QUANITY) as 总量 from T_CACL2 where IMPMONTH BETWEEN '201301' AND '201312' AND  UNITPRICE>=0 AND UNITPRICE<=1  AND COMPANY IN ('唐山三友志达钙业有限公司','江苏金桥盐化国际贸易有限公司')
 GROUP BY COMPANY
 order by INSTR ('唐山三友志达钙业有限公司,江苏金桥盐化国际贸易有限公司' ,COMPANY)
 ```
```cs
 	//字符串编码转换
	public static string Gb2312ToUtf8(string text)
        {
            //声明字符集
            Encoding utf8, gb2312;
            //gb2312
            gb2312 = Encoding.GetEncoding("gb2312");
            //utf8
            utf8 = Encoding.GetEncoding("utf-8");
            byte[] gb;
            gb = gb2312.GetBytes(text);
            gb = Encoding.Convert(gb2312, utf8, gb);
            //返回转换后的字符
            return utf8.GetString(gb);
        }
```
###打开sqlite外键支持
```sql
PRAGMA foreign_keys = ON
```
在.NET中添加foreign keys=true到连接字符串