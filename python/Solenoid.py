import RPi.GPIO as GPIO
import time, sys
from time import sleep

print('running')

try:
	GPIO.setmode(GPIO.BCM)
	GPIO.setup(8, GPIO.OUT)
	while True:
		#GPIO.output(6,GPIO.HIGH)
		print(GPIO.input(8))
		sleep(2)
	
		
		GPIO.output(8,GPIO.LOW)
		print(GPIO.input(8))
		sleep(2)

finally:
	GPIO.cleanup()
	
print("dunzo")	