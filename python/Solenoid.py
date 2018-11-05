import RPi.GPIO as GPIO
import time, sys
from time import sleep


try:
	GPIO.setmode(GPIO.BOARD)
	GPIO.setup(40, GPIO.OUT)
	
	GPIO.output(40,GPIO.HIGH)
	sleep(0.25)
	GPIO.output(40,GPIO.LOW)
	sleep(0.25)
	GPIO.output(40,GPIO.HIGH)
	sleep(0.25)
	GPIO.output(40,GPIO.LOW)
	sleep(0.25)
	GPIO.output(40,GPIO.HIGH)
	sleep(0.25)
	GPIO.output(40,GPIO.LOW)
	sleep(0.25)
	GPIO.output(40,GPIO.HIGH)

finally:
        print('')
