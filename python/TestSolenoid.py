import RPi.GPIO as GPIO
import time, sys
from time import sleep

print('running')

try:
	GPIO.setmode(GPIO.BOARD)
	GPIO.setup(40, GPIO.OUT)
	print(GPIO.input(40))	
	
	while True:
		GPIO.output(40,GPIO.HIGH)
		print(GPIO.input(40))
		sleep(0.5)
	
		
		GPIO.output(40,GPIO.LOW)
		print(GPIO.input(40))
		sleep(0.5)

finally:
	GPIO.cleanup()
	
print("dunzo")	