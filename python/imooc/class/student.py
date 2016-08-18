# init 方法的下划线,代码简洁
# class Student(object):
# 	def __init__(self, name, score):
# 		self.name = name
# 		self.score = score

# bart = Student('bart', 60)
# print(bart.name, bart.score)
# self 的传递
class Student(object):
	def __init__(self, name, age):
		self.name = name
		self.age = age
	def getName (self):
		print(self.name)
	def getAge (self):
		print(self.age)

s = Student('nyl', 27)
s.getAge()
s.getName()