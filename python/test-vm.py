import time, sys

print('running')

inpt = 13
rate_cnt = 0
tot_cnt = 0
minutes = 0
constant = 0.000015
time_new = 0.0
check = 0

while True:
	time_new = time.time() + 3 #+60 = 1 minute
	rate_cnt = 0
    
	while time.time() <= time_new:
		if check==0:
			rate_cnt += 1
			#tot_cnt += 1
		try:
				#print(GPIO.input(inpt), end = '' )
				#if GPIO.input(inpt) !=0:
					#print(GPIO.input(inpt), end = '' )
				#print('')
				blah = 0
		except KeyboardInterrupt:
			GPIO.cleanup()
			print('exiting...')
			sys.exit()
	
	
	
	minutes+=1
	print('\nRate ', rate_cnt)
	print('Liters / min: ', round(rate_cnt * constant,4))
	print('Total Liters: ', round(tot_cnt * constant,4))
	print('Cycle:  ', minutes)		
			
	
