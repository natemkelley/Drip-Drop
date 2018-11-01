import RPi.GPIO as GPIO
import time, sys
from time import sleep

x = 0

while x<36:
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(40, GPIO.OUT)

    GPIO.output(40,GPIO.HIGH)
    print(GPIO.input(40))

    sleep(0.25)
    GPIO.output(40,GPIO.LOW)
    print(GPIO.input(40))

    sleep(0.25)
    x = x +1


GPIO.cleanup()
	
