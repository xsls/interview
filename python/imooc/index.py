import math

def add(x, y, f):
    return f(x) + f(y)

print add(25, 9, math.sqrt)

# reduce
def prod(x, y):
    return x * y
print reduce(prod, [2, 4, 5, 7, 12])


# filter

import math
def is_sqr(x):
    r = int(math.sqrt(x))
    return r*r ==x
print filter(is_sqr, range(1, 101))

# sorted
def cmp_ignore_case(s1, s2):
    u1 = s1.upper()
    u2 = s2.upper()
    if u1 < u2:
        return -1
    if u1 > u2:
        return 1
    return 0
print sorted(['bob', 'about', 'Zoo', 'Credit'], cmp_ignore_case)

# list
L = ['Adam', 'Lisa', 'Bart']
L.insert(2, 'Paul')
print L

# tuple
t = (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
print t

s = ('a', 'b', ('A', 'B'))
print s
# if elif else
score = 55
if score >= 60:
    print 'passed'
else:
    print 'failed'
age = 8
if age >= 6:
    print 'teenager'
elif age >= 18:
    print 'adult'
else:
    print 'kid'
# for
suit = ['111', '222', '333']
for name in suit:
	print name

ss = [75,75,75,75]
sum = 0;
for x in ss:
	sum = sum + x
print sum/4
# dict key-value
dic = {
	'name': 'niurui',
	'age': 10,
	'height': 178
}
for key in dic:
	print(key)
	print(dic[key])
# set
val = set([1,2,3])
for key in val:
	print(key)


