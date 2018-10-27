import RPi.GPIO as GPIO
import time, sys
import json

GPIO.setmode(GPIO.BOARD)
inpt = 13

GPIO.setup(inpt, GPIO.IN)
rate_cnt = 0
minutes = 0
constant = 0.000015
time_new = 0.0
dunzo = True

while dunzo:
	time_new = time.time() + 5 #+60 = 1 minute
	rate_cnt = 0
	
	while time.time() <= time_new:
		try:
			if GPIO.input(inpt) !=0:
				rate_cnt += 1

#print to nodejs
    dunzo = false
	data = {}
	data['status'] = '200'
	data['usage'] = round(rate_cnt * constant,4)
	data['cycle'] = minutes
	
	if(data['usage']>11):
		data['status'] = '500'	
	  
	json_data = json.dumps(data)
	print(json_data)
	sys.stdout.flush()
    GPIO.cleanup()
    sys.exit()

	
	
