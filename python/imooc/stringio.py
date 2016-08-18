# StringIO和BytesIO是在内存中操作str和bytes的方法，使得和读写文件具有一致的接口。
from io import StringIO, BytesIO
f = StringIO('hello\nHi\nGoodbye')
while True:
	s = f.readline()
	if s == '':
		break
	print(s.strip())
f.write('hello')
f.write(' ')
f.write('world')
print(f.getvalue())

ss = BytesIO()
ss.write('中文'.encode('utf-8'))
print(ss.getvalue())