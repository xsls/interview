# this is read file
f = open('/设计模式/interview/python/imooc/index.py', 'r')
print(f.read())
with open('/设计模式/interview/python/imooc/test.txt', 'w') as s:
    print(s.write('Hello, World!'))
# 在Python中，文件读写是通过open()函数打开的文件对象完成的。使用with语句操作文件IO是个好习惯。