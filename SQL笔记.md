[TOC]

##规范化

###约束
1. NOT NULL
2. UNIQUE
3. PRIMARY KEY
4. DEFAULT
5. FOREIGN KEY：引用父表的某个唯一值
引用完整性：插入外键列的值必须已经存在于父表的来源列中
```sql
--创建外键
create table interest(
int_id varchar(50) NOT NULL,
contact_id INT NOT NULL,
FOREIGN KEY (contact_id)
REFERENCES my_contacts(contact_id)
);
```

6. UNIQUE约束
```sql
--当表已被创建时，如需在 "Id_P" 列创建 UNIQUE 约束，请使用下列 SQL：
ALTER TABLE Persons
ADD UNIQUE (Id_P)
--如需命名 UNIQUE 约束，并定义多个列的 UNIQUE 约束，请使用下面的 SQL 语法：
ALTER TABLE Persons
ADD CONSTRAINT uc_PersonID UNIQUE (Id_P,LastName)
```

7. CHECK约束
``` sql
--如果在表已存在的情况下为 "Id_P" 列创建 CHECK 约束，请使用下面的 SQL：
ALTER TABLE Persons
ADD CHECK (Id_P>0)
--如果需要命名 CHECK 约束，以及为多个列定义 CHECK 约束，请使用下面的 SQL 语法：
ALTER TABLE Persons
ADD CONSTRAINT chk_Person CHECK (Id_P>0 AND City='Sandnes')
CREATE TABLE piggy_bank
(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
coin CHAR(1) CHECK (coin IN ('P','N','D','Q'))
)
```


###原子性
具有原子性的列不会有多个类型相同的值
>| food_name  | ingredients |
|--------|--------|
| bread  |flour,milk,egg,oil |
| salad | lettuce,tomato,cucumber  |

具有原子性数据的表中不会有多个存储同类数据的列
>|teacher|student1|student2|
|---|---|---|
|Mr.Tang|Joe|Ron


###第一范式 *1NF*
**每个数据必须包含具有原子性的值
每个数据必须有独一无二的识别项，人称主键(**Primary Key**)**
###数据模式

1. 一对一
父表中的一条记录只与子表中的一条记录相关联
 1. 抽出数据写出更快的查询
 2. 某列包含未知的值，单独存储，以避免出现null
 3. 隔离数据，现在访问
 4. 大块数据，例如BLOB

2. 一对多
父表中的一条记录与子表中的多条记录关联
但子表中的一条记录只与父表中的一条记录关联

3. 多对多
一张表的多行记录与另一张表的多行记录相关联
使用junction table（连接表）转化为两个一对多关系

###依赖
>T.x->T.y表示为在表T中，y列函数依赖于x列

1. 部分函数依赖
非主键的列依赖于组主合键的某个部分（但不完全依赖于组合主键）

2. 传递函数依赖
任何非键列与另一个非键类有关联

3. 第二范式*2NF*
符合第一范式且没有部分函数依赖

4. 第三范式*3NF*
符合第二范式且没有传递函数依赖

##联接查询
###交叉联接（AKA 笛卡尔联接，叉积）
CROSS JOIN 返回两张表的每一行相乘的结果
```sql
SELECT b.boy,t.toy
FROM boys as b CROSS JOIN toys as t
--CROSS JOIN可以用逗号代替
SELECT b.boy,t.toy
FROM boys as b, toys as t
```
###内联接
内联接就是通过查询中的条件移除了某些结果数据行后的交叉联接

1. 相等联接
```sql
SELECT boys.boy ,toys.toy
FROM boys
INNER JOIN toys
ON boys.toy_id=toys.toy_id
```

2. 不等联接
```sql
SELECT boys.boy ,toys.toy
FROM boys
INNER JOIN toys
ON boys.toy_id<>toys.toy_id
ORDER BY boys.boy
```

3. 自然联接
利用相同列名的内联接
```sql
SELECT boys.boy ,toys.toy
FROM boys
NATURAL JOIN toys
```

###子查询
子查询一般只返回一个值，使用IN是列外情况

非关联子查询：如果子查询==**可以独立运行**==且不会引用外层查询的任何结果，即称为非关联子查询
关联子查询：内层查询的解析需要依赖外层查询的结果
```sql
SELECT mc.name ,mc.email
FROM my_contacts mc
WHERE NOT EXISTS
(SELECT * FROM job_current jc
WHERE mc.contact_id = jc.contact_id);--mc在外层指定
```

###外联接
1. 左外联接
LEFT OUTER JOIN会匹配左表中的每一行及右表中符合条件的行
左外联接的结果集中的NULL表示右表中没有找到与左表相符的记录

2. 右外联接
与左外联接相反

###自联接
1. 自引用外键
用属于同一张表的其他列作为外键。

>| ID | NAME | BOSS_ID |
|--------|--------|--------|
|   1     |    TOM    |    1    |
|    2    |    JACK    |    1    |

BOSS_ID引用了ID字段

2. 自联接
自联接把单一的表当成两张具有相同信息的表来进行查询
```sql
SELECT c1.name,c2.name as BOSS
FROM clown_info c1
INNER JOIN clown_info c2
ON c1.boss_id =c2.id
```

###集合
1. 联和（UNION）
将多张表的查询结果合并至一张表，默认无重复（相当于去并集？）
```sql
SELECT title FROM job_current
UNION
SELECT title FROM job_desired
UNION
SELECT title FROM job_listings
```

2. 限制
每个SELECT中列必须一致，统计函数与表达式也必须相同，类型相同或者可以转换
SELECT语句顺序不重要
默认无重复，需要重复可使用UNION ALL

3. 交集（INTERSECT）
```sql
SELECT title FROM job_current
INTERSECT
SELECT title FROM job_desired
```

4. 差集（EXCEPT）
```sql
SELECT title FROM job_current
EXCEPT
SELECT title FROM job_desired
```

##事务
###ACID

1. 原子性
事务里的每一个步骤都必须完成，否则只能都不完成。

2. 一致性
事务完成后应该维持数据库的一致性。

3. 隔离性
表示每次事务都会看到具有一致性的数据库，无论其他事务有什么行动。

4. 持久性
事务完成后，数据库需要正确存储数据并保护数据免受断电或其他威胁的伤害。

###管理事务
```SQL
START TRANSACTION--持续追踪后续所有SQL语句，直到输入COMMIT或ROLLBACK为止
COMMIT--提交
ROLLBACK--回滚
```



##常用语句
``` sql
SHOW CREATE TABLE tablename 显示创建表的SQL语句
SHOW WARNINGS 显示错误信息
SHOW INDEX FROM tablename 显示索引
```

```sql
ALTER TABLE tablename
ADD COLUMN columnname varchar(10) AFTER colname
新列的顺序除了AFTER还有 BEFORE,FIRST,SECOND可供选择
```

``` sql

ALTER TABLE projekt_list
CHANGE COLUMN num proj_id INT NOT NULL auto_increment,
ADD PRIMARY KEY (proj_id)


ALTER TABLE projekt_list
MODIFY COLUMN num proj_id INT NOT NULL auto_increment


ALTER TABLE projekt_list
DROP COLUMN star_date--删除一列会删除该列的所有数据，在删除之前先选出列以确定那是你要删除的列
```

``` sql
--一些字符串操作函数
SELECT SUBSTRING(,)
UPPER()
LOWER()
REVERSE()
LTRIM()
RTRIM()
LENGTH()
```
``` sql
UPDATE movie_table
SET category =
CASE	--根据条件更新,还可以搭配SELECT,INSERT,DELET
WHEN comedy='T' THEN 'comedy'
WHEN cartoon='T' AND rating='G' THEN 'family'
ELSE 'misc'
```

```sql
SELECT first_name,SUM(sales) AS sale
FROM cookie_sales
GROUP BY first_name
ORDER BY sale DESC
--常用函数
SUM() COUNT() MIN() MAX()

--组合使用
SELECT COUNT(DISTINCT sale_date)
FROM cookie_sales

DISTINCT--去重
LIMIT--限制返回行数(限MySQL)
```


##注意
1. null代表未定义，它不是0也不是空字符串，值可以是null但不会等于null,两个null也不能比较
==注意和编程语言的不同==
``` cs
  	// Equals applied to any null object returns false.
        bool b = (t.Equals(s));
        Console.WriteLine(b);
        // Equality operator also returns false when one
        // operand is null.
        Console.WriteLine("Empty string {0} null string", s == t ? "equals": "does not equal");

        // Returns true.
        Console.WriteLine("null == null is {0}", null == null);
```

2. 不要在SQL中使用双引号
3. 不要直接查找null而要使用==IS NULL==
4. BETWEEN AND 可以替代<= AND  >=,而且可以用于字符,但是较小的值必须放在前面
5. 除了NOT IN，AND，OR之外，NOT必须接在WHERE之后
7. 在删除和更新之前先查询
