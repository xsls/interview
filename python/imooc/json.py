import json
# d = dict(name='Bob', age=20, score=88)
# print(json.dumps(d))

class Student(object):
	def _init_(self, name, age, score):
		self.name = name
		self.age = age
		self.score = score
s = Student('Bob', 20, 88)
print(json.dumps(s))

# Python语言特定的序列化模块是pickle，但如果要把序列化搞得更通用、更符合Web标准，就可以使用json模块。