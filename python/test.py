import RPi.GPIO as GPIO
import time, sys

print('running')

GPIO.setmode(GPIO.BOARD)
inpt = 13

GPIO.setup(inpt, GPIO.IN)
rate_cnt = 0
tot_cnt = 0
minutes = 0
constant = 0.000015
time_new = 0.0
first3tries = true


while True:
	time_new = time.time() + 3 #+60 = 1 minute
	rate_cnt = 0

	if(minutes<3):
		GPIO.cleanup()
	
	while time.time() <= time_new:
		if GPIO.input(inpt) !=0:
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
			
	
