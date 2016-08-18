class Worker:
	def _init_(self, name, pay):
		self.name = name
		self.pay = pay
	def giveRaise(self, percent):
		self.pay *= (1.0 + percent)

sue = Worker("sue", 60000)
sue.giveRaise(self, 0.1)
sue.pay


# L = [];
# for x in range(1,11):
# 	L.append(x * x)

# print(L)