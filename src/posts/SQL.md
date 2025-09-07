---
icon: pen-to-square
date: 2022-01-11
category:
  - 数据库
tag:
  - 快速入门
  - SQL
  - PostgreSQL
---

# SQL快速入门（PostgreSQL版）

## SQL是什么？

SQL（Structured Query Language，结构化查询语言）是一种专门用于管理和操作关系型数据库的标准化编程语言。它允许用户执行各种数据库操作，如查询数据、插入记录、更新数据、删除记录以及创建和修改数据库结构等。

PostgreSQL是一个功能强大的开源对象-关系型数据库系统，以其可靠性、功能 robustness 和性能而闻名。它是SQL标准的一个实现，并提供了许多高级功能。

### 数据类型

#### 1.字符类型

|  名字   | 描述  | 标准SQL  |
|  ----  | ----  | ----  |
| char(n)  | 固定长度为n  | &#x2705;  |
| varchar(n)  | 最大长度为n  | &#x2705;  |
| text  | 没有长度限制的可变长度列  | :x:  |

#### 2.日期与时间类型

|  名字   | 描述  | ISO格式  | 标准SQL  |
|  ----  | ----  | ----  | ----  |
| date  | 日期  | **YYYY-MM--DD**  | &#x2705;  |
| time  | 时间  | **HH:MM:SS**  | &#x2705;  |
| timestamp  | 日期和时间  | **YYYY-MM--DD HH:MM:SS**  | &#x2705;  |
| interval  | 时间间隔  | **n days/mon/years**  | :arrow_up:  |

#### 4.整数

|  数据类型   | 描述  | 取值范围  | 标准SQL  |
|  ----  | ----  | ----  | ----  |
| smallint  | 2字节  | -32768~+32767  | &#x2705;  |
| integer  | 4字节  | -2147483648~+2147483647  | &#x2705;  |
| bigint  | 8字节  | 太长了，略~  | &#x2705;  |

#### 3.小数

|  数据类型   | 描述  | 标准SQL  |
|  ----  | ----  | ----  |
| numeric(precision,scale)  | 定点数  | &#x2705;  |
| decimal(precision,scale)  | 定点数  | &#x2705;  |
| real  | 浮点数，6位小数的精度  | &#x2705;  |
| double precision  | 浮点数，15位小数的精度  | &#x2705;  |

> [!tip]
> （1）浮点数不精确，在需要精确计算的场合应优先选择numeric或其等价物decimal
> （2）numeric/decimal的precision参数用于指定小数点左右两边的最大数字个数，scale参数则用于指定小数点右边允许的数字个数


### 基础语法

#### 1. SELECT 查询语句

SELECT语句用于从数据库中查询数据：

```sql
-- 查询所有列
SELECT * FROM users;

-- 查询指定列
SELECT name, email FROM users;

-- 带条件查询
SELECT * FROM users WHERE age > 18;

-- 带排序查询
SELECT * FROM users ORDER BY created_at DESC;

-- 限制结果数量（PostgreSQL使用LIMIT）
SELECT * FROM users LIMIT 10;
```

#### 2. INSERT 插入语句

INSERT语句用于向表中插入新记录：

```sql
-- 插入指定列的数据
INSERT INTO users (name, email, age) VALUES ('张三', 'zhangsan@example.com', 25);

-- 插入多条记录
INSERT INTO users (name, email, age) VALUES 
  ('李四', 'lisi@example.com', 30),
  ('王五', 'wangwu@example.com', 28);
```

#### 3. UPDATE 更新语句

UPDATE语句用于修改表中的现有记录：

```sql
-- 更新指定条件的记录
UPDATE users SET age = 26 WHERE name = '张三';

-- 更新多个字段
UPDATE users SET age = 27, email = 'newemail@example.com' WHERE id = 1;
```

#### 4. DELETE 删除语句

DELETE语句用于删除表中的记录：

```sql
-- 删除指定条件的记录
DELETE FROM users WHERE id = 1;

-- 删除所有记录（谨慎使用）
DELETE FROM users;
```

#### 5. CREATE 创建语句

CREATE语句用于创建数据库对象，如表：

```sql
-- 创建表
CREATE TABLE users (
  id SERIAL PRIMARY KEY,        -- PostgreSQL中的自增主键
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  age INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 6. WHERE 条件语句

WHERE子句用于过滤记录：

```sql
-- 基本比较
SELECT * FROM users WHERE age = 25;
SELECT * FROM users WHERE age > 25;
SELECT * FROM users WHERE age < 30;
SELECT * FROM users WHERE age >= 25;
SELECT * FROM users WHERE age <= 30;
SELECT * FROM users WHERE age <> 25;  -- 不等于

-- 多条件组合
SELECT * FROM users WHERE age > 18 AND email IS NOT NULL;
SELECT * FROM users WHERE age < 18 OR age > 60;

-- 模糊查询
SELECT * FROM users WHERE name LIKE '%三%';

-- 范围查询
SELECT * FROM users WHERE age BETWEEN 18 AND 60;

-- 列表查询
SELECT * FROM users WHERE name IN ('张三', '李四', '王五');
```

#### 7. JOIN 连接查询

JOIN用于合并两个或多个表中的行：

```sql
-- 内连接
SELECT users.name, orders.amount 
FROM users 
INNER JOIN orders ON users.id = orders.user_id;

-- 左连接
SELECT users.name, orders.amount 
FROM users 
LEFT JOIN orders ON users.id = orders.user_id;

-- 右连接
SELECT users.name, orders.amount 
FROM users 
RIGHT JOIN orders ON users.id = orders.user_id;

-- 全外连接（PostgreSQL支持）
SELECT users.name, orders.amount 
FROM users 
FULL OUTER JOIN orders ON users.id = orders.user_id;
```

#### 8. GROUP BY 和聚合函数

GROUP BY语句与聚合函数一起使用，对数据进行分组：

```sql
-- 计数
SELECT COUNT(*) FROM users;

-- 分组计数
SELECT age, COUNT(*) FROM users GROUP BY age;

-- 求和
SELECT user_id, SUM(amount) FROM orders GROUP BY user_id;

-- 平均值
SELECT AVG(age) FROM users;

-- 最大值和最小值
SELECT MAX(age), MIN(age) FROM users;
```

#### 9. HAVING 子句

HAVING子句用于过滤分组后的结果：

```sql
-- 查询年龄相同的用户数量大于1的分组
SELECT age, COUNT(*) as count 
FROM users 
GROUP BY age 
HAVING COUNT(*) > 1;
```

#### 10. PostgreSQL 特有数据类型

PostgreSQL提供了许多特有的数据类型：

```sql
CREATE TABLE example_table (
  id SERIAL PRIMARY KEY,
  name TEXT,                           -- 可变长度字符串
  description VARCHAR(255),            -- 有限长度字符串
  is_active BOOLEAN,                   -- 布尔类型
  salary DECIMAL(10,2),                -- 精确数值类型
  birthday DATE,                       -- 日期类型
  created_at TIMESTAMP,                -- 时间戳
  tags TEXT[],                         -- 数组类型
  data JSON,                           -- JSON类型
  location POINT                       -- 几何类型（点）
);
```

#### 11. PostgreSQL 特有功能

##### 数组操作
```sql
-- 查询数组包含特定元素
SELECT * FROM example_table WHERE tags && ARRAY['important'];

-- 查询数组包含所有指定元素
SELECT * FROM example_table WHERE tags @> ARRAY['important', 'urgent'];
```

##### JSON操作
```sql
-- 查询JSON字段
SELECT * FROM example_table WHERE data->>'status' = 'active';

-- 更新JSON字段
UPDATE example_table 
SET data = jsonb_set(data, '{status}', '"inactive"') 
WHERE id = 1;
```

#### 12. 事务处理

事务是一组被视为单个工作单元的SQL操作：

```sql
BEGIN;  -- 开始事务

INSERT INTO users (name, email) VALUES ('测试用户', 'test@example.com');
UPDATE users SET age = 30 WHERE name = '测试用户';

COMMIT;  -- 提交事务

-- 或者在出错时回滚
-- ROLLBACK;  -- 回滚事务
```

## 总结

SQL是操作关系型数据库的强大工具，PostgreSQL作为先进的开源数据库系统，提供了丰富的功能和数据类型。掌握基本的SQL语句是进行数据库操作的基础，而PostgreSQL的特有功能则能帮助你更高效地处理复杂的数据需求。

通过练习这些基本语句，你可以开始构建和管理自己的数据库应用了。