# data = [1,2,3,4,12,0]
# s = set(data);
# 使用工具
from random import randint

data = [randint(-10, 10) for _ in rang(10)]

filter(lambda x: x >=0, data)


# 列表解析
# timeit 测试运行的时间
timeit ［x for x in data if x >=0］


# 字典的筛选
d = {x:randint(60,100) for x in xrange(1,21)}