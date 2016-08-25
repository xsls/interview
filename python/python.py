movices = ['author',123,'activeor', {
}]
for item in movices:
	print(item)

# 创建一个函数
# 可重用的代码不如可共享的模块
# 1.模块允许你合理的组织代码来实现最优共享
# 2.发布工具允许你向全世界共享你的模块
# 注释代码
# 写新代码之前,先考虑BIF
# 内置函数:
# 1.数学相关
# ->abs(-1)
# ->max([1,2,3]) min([1,2,3])
# ->len('abc') len([1,2,3])
# ->divmod(5,2)
# ->pow(2,3,4)
# ->round(1)
# 2.功能相关
# ->函数是否调用:callable(funcname)
# ->类型判断 isinstance(x,list/int)
# ->比较:cmp('hello', 'hello')
# ->快速生成序列: (x)range([start,]stop[, step])
# 3.类型转换
# ->int(x)
# ->long(x)
# ->float(x)
# ->complex(x)
# ->str(x)
# ->list(x)
# ->tuple(x)
# ->hex(x)
# ->oct(x)
# ->chr(x)
# ->ord(x)
# 4.字符串处理
# ->.首字母大写:str.capitalize()
# ->.字符串替换:str.replace()
# ->.字符串分割:str.split()
# 5.序列处理函数
# ->.len: 序列长度
# ->.max:序列中的最大值
# ->.min:最小值
# ->.filter:过滤序列
# ->.zip:并行遍历
# ->.map:并行遍历
# ->.reduce:归并


文件与异常

文件的处理，需要导入标准库os


self的重要性,就是提高自己的使用

